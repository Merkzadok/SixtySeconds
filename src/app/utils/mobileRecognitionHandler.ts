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
}

export const checkMicrophonePermission = async (): Promise<PermissionState> => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const isSecure =
    location.protocol === "https:" || location.hostname === "localhost";

  try {
    // Check if MediaDevices API is available
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return {
        allowed: false,
        error: "MediaDevices API not supported",
        isMobile,
        isSecure,
      };
    }

    // Check if SpeechRecognition is available
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      return {
        allowed: false,
        error: "Speech Recognition not supported",
        isMobile,
        isSecure,
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
    };
  }
};

// Enhanced recognition creator with mobile optimizations
export const createMobileOptimizedRecognition = (
  setFullTranscript: (transcript: string) => void,
  setInterimTranscript: (transcript: string) => void,
  setListening: (listening: boolean) => void
): SpeechRecognition | null => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return null;
  }

  const recognition = new SpeechRecognition();

  // Mobile-optimized settings
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  // Set language (adjust as needed)
  recognition.lang = "mn-MN"; // Mongolian

  let finalTranscript = "";

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    let interimTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript + " ";
        setFullTranscript(finalTranscript.trim());
      } else {
        interimTranscript += transcript;
      }
    }
    setInterimTranscript(interimTranscript);
  };

  recognition.onstart = () => {
    setListening(true);
  };

  recognition.onend = () => {
    setListening(false);
  };

  recognition.onerror = (event: SpeechRecognitionEvent) => {
    console.error("Speech recognition error:", event.error);
    setListening(false);

    // Mobile-specific error handling
    if (event.error === "not-allowed") {
      alert(
        "Microphone access denied. Please allow microphone access and ensure you're using HTTPS."
      );
    } else if (event.error === "network") {
      alert("Network error. Please check your internet connection.");
    } else if (event.error === "no-speech") {
      console.log("No speech was detected");
    } else if (event.error === "audio-capture") {
      alert("Audio capture failed. Please check your microphone.");
    } else if (event.error === "service-not-allowed") {
      alert(
        "Speech recognition service not allowed. Please enable speech recognition."
      );
    }
  };

  // Auto-restart on mobile if it stops unexpectedly
  recognition.onnomatch = () => {
    console.log("No speech was recognized");
  };

  return recognition;
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

// Utility to get user-friendly error messages
export const getErrorMessage = (
  error: string,
  isMobile: boolean,
  isSecure: boolean
): string => {
  const messages: { [key: string]: string } = {
    "Microphone permission denied": isMobile
      ? "Please allow microphone access in your browser settings and ensure you're using HTTPS."
      : "Please allow microphone access when prompted.",
    "No microphone found":
      "No microphone detected. Please connect a microphone and refresh the page.",
    "Microphone not supported":
      "Your browser doesn't support microphone access.",
    "Speech Recognition not supported": isMobile
      ? "Speech recognition is not supported on this mobile browser. Try using Chrome or Safari."
      : "Speech recognition is not supported on this browser. Please use Chrome, Safari, or Edge.",
    "HTTPS required for microphone access":
      "This app requires HTTPS to access your microphone. Please use a secure connection.",
    "MediaDevices API not supported":
      "Your browser doesn't support the required audio APIs.",
  };

  return messages[error] || error;
};
