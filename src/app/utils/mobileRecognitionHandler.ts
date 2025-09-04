"use client";

import { useCallback, useEffect, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
  readonly error: string;
}

export interface PermissionState {
  allowed: boolean;
  error: string | null;
  isMobile: boolean;
  isSecure: boolean;
  browserSupported: boolean;
  deviceInfo: DeviceInfo;
}

export interface DeviceInfo {
  isIOS: boolean;
  isAndroid: boolean;
  isSafari: boolean;
  isChrome: boolean;
  version: string;
}

// Enhanced device detection
export const getDeviceInfo = (): DeviceInfo => {
  const userAgent = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  const isChrome = /Chrome/.test(userAgent);

  // Extract version info
  let version = "";
  if (isIOS) {
    const match = userAgent.match(/OS (\d+)_(\d+)/);
    version = match ? `${match[1]}.${match[2]}` : "unknown";
  } else if (isAndroid) {
    const match = userAgent.match(/Android (\d+\.?\d*)/);
    version = match ? match[1] : "unknown";
  }

  return { isIOS, isAndroid, isSafari, isChrome, version };
};

export const checkMicrophonePermission = async (): Promise<PermissionState> => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const isSecure =
    location.protocol === "https:" || location.hostname === "localhost";

  const deviceInfo = getDeviceInfo();

  // Check browser support
  const browserSupported =
    "webkitSpeechRecognition" in window || "SpeechRecognition" in window;

  try {
    // Check if MediaDevices API is available
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return {
        allowed: false,
        error: "MediaDevices API not supported",
        isMobile,
        isSecure,
        browserSupported,
        deviceInfo,
      };
    }

    // Check if SpeechRecognition is available
    if (!browserSupported) {
      return {
        allowed: false,
        error: "Speech Recognition not supported",
        isMobile,
        isSecure,
        browserSupported: false,
        deviceInfo,
      };
    }

    // Request microphone permission
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Stop the stream immediately as we just needed permission
    stream.getTracks().forEach((track) => track.stop());

    return {
      allowed: true,
      error: null,
      isMobile,
      isSecure,
      browserSupported,
      deviceInfo,
    };
  } catch (err: any) {
    let errorMessage = "Unknown error";

    if (err.name === "NotAllowedError") {
      errorMessage = "Microphone permission denied";
    } else if (err.name === "NotFoundError") {
      errorMessage = "No microphone found";
    } else if (err.name === "NotSupportedError") {
      errorMessage = "Microphone not supported";
    } else if (
      err.name === "NotSecureError" ||
      err.message.includes("secure")
    ) {
      errorMessage = "HTTPS required for microphone access";
    }

    return {
      allowed: false,
      error: errorMessage,
      isMobile,
      isSecure,
      browserSupported,
      deviceInfo,
    };
  }
};

// Enhanced recognition creator with mobile optimizations and auto-restart
export const createMobileOptimizedRecognition = (
  setFullTranscript: (transcript: string) => void,
  setInterimTranscript: (transcript: string) => void,
  setListening: (listening: boolean) => void,
  options: {
    language?: string;
    autoRestart?: boolean;
    maxRestarts?: number;
    silenceTimeout?: number;
  } = {}
): SpeechRecognition | null => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return null;
  }

  const recognition = new SpeechRecognition();
  const deviceInfo = getDeviceInfo();

  // Mobile-optimized settings based on device
  recognition.continuous = !deviceInfo.isIOS; // iOS Safari works better with false
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  // Set language (default to Mongolian)
  recognition.lang = options.language || "mn-MN";

  let finalTranscript = "";
  let isManualStop = false;
  let restartCount = 0;
  const maxRestarts = options.maxRestarts || 5;
  const autoRestart = options.autoRestart !== false;
  let restartTimer: NodeJS.Timeout | null = null;
  let silenceTimer: NodeJS.Timeout | null = null;

  // Clear any existing timers
  const clearTimers = () => {
    if (restartTimer) {
      clearTimeout(restartTimer);
      restartTimer = null;
    }
    if (silenceTimer) {
      clearTimeout(silenceTimer);
      silenceTimer = null;
    }
  };

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    let interimTranscript = "";

    // Reset silence timer when we get results
    clearTimers();

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript + " ";
        setFullTranscript(finalTranscript.trim());
        restartCount = 0; // Reset restart count on successful recognition
      } else {
        interimTranscript += transcript;
      }
    }
    setInterimTranscript(interimTranscript);

    // Set silence timeout for iOS (restarts if no speech for specified time)
    if (deviceInfo.isIOS && options.silenceTimeout) {
      silenceTimer = setTimeout(() => {
        if (!isManualStop && autoRestart && restartCount < maxRestarts) {
          try {
            recognition.stop();
            setTimeout(() => {
              if (!isManualStop) {
                recognition.start();
                restartCount++;
              }
            }, 100);
          } catch (error) {
            console.warn("Auto-restart failed:", error);
          }
        }
      }, options.silenceTimeout);
    }
  };

  recognition.onstart = () => {
    setListening(true);
    clearTimers();
  };

  recognition.onend = () => {
    setListening(false);
    clearTimers();

    // Auto-restart logic for mobile devices
    if (!isManualStop && autoRestart && restartCount < maxRestarts) {
      restartTimer = setTimeout(() => {
        try {
          if (!isManualStop) {
            recognition.start();
            restartCount++;
            console.log(
              `Auto-restarting recognition (attempt ${restartCount})`
            );
          }
        } catch (error) {
          console.warn("Auto-restart failed:", error);
          setListening(false);
        }
      }, 500); // Delay before restart
    }
  };

  recognition.onerror = (event: SpeechRecognitionEvent) => {
    console.error("Speech recognition error:", event.error);
    clearTimers();

    // Handle different error types
    if (event.error === "not-allowed") {
      setListening(false);
      isManualStop = true;
      alert(
        "Microphone access denied. Please allow microphone access and ensure you're using HTTPS."
      );
    } else if (event.error === "network") {
      setListening(false);
      alert("Network error. Please check your internet connection.");
    } else if (event.error === "no-speech") {
      console.log("No speech was detected");
      // Don't stop listening for no-speech on mobile
      if (!deviceInfo?.isIOS && !deviceInfo.isAndroid) {
        setListening(false);
      }
    } else if (event.error === "audio-capture") {
      setListening(false);
      isManualStop = true;
      alert("Audio capture failed. Please check your microphone.");
    } else if (event.error === "service-not-allowed") {
      setListening(false);
      isManualStop = true;
      alert(
        "Speech recognition service not allowed. Please enable speech recognition."
      );
    } else if (event.error === "aborted") {
      // This is normal when manually stopping
      setListening(false);
    }
  };

  recognition.onnomatch = () => {
    console.log("No speech was recognized");
  };

  // Enhanced start method with user gesture requirement for mobile
  const originalStart = recognition.start.bind(recognition);
  recognition.start = () => {
    isManualStop = false;
    restartCount = 0;
    clearTimers();

    // iOS Safari requires user gesture
    if (deviceInfo.isIOS && deviceInfo.isSafari) {
      // Ensure this is called within a user gesture
      try {
        originalStart();
      } catch (error: any) {
        if (error.message.includes("gesture")) {
          console.warn(
            "Speech recognition requires user gesture on iOS Safari"
          );
          throw new Error(
            "Please tap the microphone button to start recording"
          );
        }
        throw error;
      }
    } else {
      originalStart();
    }
  };

  // Enhanced stop method
  const originalStop = recognition.stop.bind(recognition);
  recognition.stop = () => {
    isManualStop = true;
    clearTimers();
    originalStop();
  };

  return recognition;
};

// Mobile-specific speech recognition hook
export const useMobileSpeechRecognition = (
  options: {
    language?: string;
    autoRestart?: boolean;
    maxRestarts?: number;
    silenceTimeout?: number;
  } = {}
) => {
  const [fullTranscript, setFullTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const [permissionState, setPermissionState] =
    useState<PermissionState | null>(null);

  useEffect(() => {
    const initRecognition = async () => {
      const permission = await checkMicrophonePermission();
      setPermissionState(permission);

      if (permission.allowed) {
        const rec = createMobileOptimizedRecognition(
          setFullTranscript,
          setInterimTranscript,
          setIsListening,
          options
        );
        setRecognition(rec);
      }
    };

    initRecognition();
  }, []);

  const startListening = useCallback(() => {
    if (recognition && !isListening) {
      try {
        recognition.start();
      } catch (error) {
        console.error("Failed to start recognition:", error);
      }
    }
  }, [recognition, isListening]);

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop();
    }
  }, [recognition, isListening]);

  const resetTranscript = useCallback(() => {
    setFullTranscript("");
    setInterimTranscript("");
  }, []);

  return {
    fullTranscript,
    interimTranscript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    permissionState,
    supported: !!recognition,
  };
};

// Wake lock API for preventing screen sleep during recording
export const useWakeLock = () => {
  const [wakeLock, setWakeLock] = useState<any>(null);

  const requestWakeLock = async () => {
    try {
      if ("wakeLock" in navigator) {
        const lock = await (navigator as any).wakeLock.request("screen");
        setWakeLock(lock);
        console.log("Screen wake lock acquired");
      }
    } catch (error) {
      console.warn("Wake lock failed:", error);
    }
  };

  const releaseWakeLock = async () => {
    if (wakeLock) {
      await wakeLock.release();
      setWakeLock(null);
      console.log("Screen wake lock released");
    }
  };

  return { requestWakeLock, releaseWakeLock, hasWakeLock: !!wakeLock };
};

// Development helper for local HTTPS
export const getLocalHTTPSInstructions = () => {
  return {
    nextjs: `
// For Next.js development with HTTPS:
// 1. Install mkcert: brew install mkcert (Mac) or choco install mkcert (Windows)
// 2. Create local CA: mkcert -install
// 3. Generate certificates: mkcert localhost 127.0.0.1 ::1
// 4. Update package.json:
"scripts": {
  "dev:https": "next dev --experimental-https --experimental-https-key ./localhost-key.pem --experimental-https-cert ./localhost.pem"
}
`,

    vite: `
// For Vite with HTTPS:
// vite.config.js
import { defineConfig } from 'vite'
import fs from 'fs'

export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost.pem'),
    },
  },
})
`,

    general: `
// Alternative: Use ngrok for quick HTTPS tunnel
// 1. Install ngrok: npm install -g ngrok
// 2. Start your dev server: npm run dev
// 3. In another terminal: ngrok http 3000
// 4. Use the https URL provided by ngrok
`,
  };
};

// Utility to detect if running on mobile
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Utility to check if HTTPS is enabled
export const isHTTPS = (): boolean => {
  return location.protocol === "https:" || location.hostname === "localhost";
};

// Enhanced error messages with device-specific guidance
export const getErrorMessage = (
  error: string,
  isMobile: boolean,
  isSecure: boolean,
  deviceInfo?: DeviceInfo
): string => {
  const messages: { [key: string]: string } = {
    "Microphone permission denied": deviceInfo?.isIOS
      ? "Please allow microphone access in Safari settings: Settings > Safari > Microphone > Allow"
      : isMobile
      ? "Please allow microphone access in your browser settings and ensure you're using HTTPS."
      : "Please allow microphone access when prompted.",
    "No microphone found":
      "No microphone detected. Please connect a microphone and refresh the page.",
    "Microphone not supported":
      "Your browser doesn't support microphone access.",
    "Speech Recognition not supported": deviceInfo?.isIOS
      ? "Speech recognition works best in Safari on iOS. Please use Safari browser."
      : isMobile
      ? "Speech recognition is not supported on this mobile browser. Try using Chrome or Safari."
      : "Speech recognition is not supported on this browser. Please use Chrome, Safari, or Edge.",
    "HTTPS required for microphone access":
      "This app requires HTTPS to access your microphone. Please use a secure connection.",
    "MediaDevices API not supported":
      "Your browser doesn't support the required audio APIs.",
  };

  return messages[error] || error;
};

// PWA installation prompt helper
export const installPWAPrompt = () => {
  return {
    show: () => {
      if ("serviceWorker" in navigator) {
        return "For better mobile experience, add this app to your home screen!";
      }
      return null;
    },
    canInstall: () => {
      return "serviceWorker" in navigator && "standalone" in window.navigator;
    },
  };
};
