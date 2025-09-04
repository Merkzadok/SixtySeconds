import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

import { compareTexts } from "@/app/utils/compareTexts";
import ExpectedText from "../components/ExpectedText";
import ControlButtons from "../components/ControlButtons";
import TranscriptBox from "../components/TranscriptBox";
import ResultStats from "../components/ResultStats";
import { VoiceRecorderHandle } from "../components/VoiceRecorder";
import { useUser } from "@/provider/CurrentUser";
import { LoaderScreen } from "@/Components/loader/loading";
import ProtectedRoute from "@/provider/ProtectPage";
import {
  checkMicrophonePermission,
  createMobileOptimizedRecognition,
} from "@/app/utils/mobileRecognitionHandler";

const VoiceRecorder = dynamic(() => import("../components/VoiceRecorder"), {
  ssr: false,
});

interface PermissionState {
  allowed: boolean;
  error: string | null;
  isMobile: boolean;
  isSecure: boolean;
}

const SpeechToTextMongolian: React.FC = () => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [stopTime, setStopTime] = useState<Date | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { user } = useUser();

  const [sentence, setSentence] = useState<{
    readingId: number;
    sentence: string;
    readCount: number;
  } | null>(null);
  const [fullTranscript, setFullTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [permissionState, setPermissionState] = useState<PermissionState>({
    allowed: true,
    error: null,
    isMobile: false,
    isSecure: true,
  });
  const [isLoading, setIsLoading] = useState(true);

  const recorderRef = useRef<VoiceRecorderHandle>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const fetchNextSentence = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/gemini/${user?.profileId}`,
      {
        method: "POST",
      }
    );
    const data = await res.json();
    setSentence(data);
  };

  useEffect(() => {
    const initializeApp = async () => {
      if (!user) return;

      setIsLoading(true);

      try {
        const permissionResult = await checkMicrophonePermission();
        setPermissionState(permissionResult);

        if (permissionResult.allowed) {
          recognitionRef.current = createMobileOptimizedRecognition(
            setFullTranscript,
            setInterimTranscript,
            setListening
          );

          if (recognitionRef.current) {
            await fetchNextSentence();
          } else {
            setPermissionState((prev) => ({
              ...prev,
              allowed: false,
              error: "Speech Recognition not supported on this device",
            }));
          }
        }
      } catch (error) {
        console.error("Initialization error:", error);
        setPermissionState((prev) => ({
          ...prev,
          allowed: false,
          error: "Failed to initialize speech recognition",
        }));
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();

    return () => {
      recognitionRef.current?.stop();
    };
  }, [user?.id]);

  const handleSaveAndNext = async () => {
    if (!sentence) return;

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/gemini/finish/${sentence?.readingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: sentence.readingId,
            startTime,
            stopTime,
            audioUrl,
            accuracy: compareTexts(sentence.sentence, fullTranscript).accuracy,
          }),
        }
      );

      setFullTranscript("");
      setInterimTranscript("");
      setListening(false);
      recognitionRef.current?.stop();
      fetchNextSentence();
      setAudioUrl("");
    } catch (error) {
      console.error("❌ Error saving sentence:", error);
    }
  };

  const { matchCount, total, accuracy } = compareTexts(
    sentence?.sentence || "",
    fullTranscript
  );

  const onToggle = () => {
    if (listening) {
      setStopTime(new Date());
      recognitionRef.current?.stop();
      recorderRef.current?.stop();
      setListening(false);
    } else {
      setStartTime(new Date());
      recognitionRef.current?.start();
      recorderRef.current?.start();
      setListening(true);
    }
  };

  if (isLoading) {
    return <LoaderScreen />;
  }

  if (!permissionState.allowed) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4 max-w-lg mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h1 className="text-xl font-semibold text-red-600 mb-4">
            🎤 {permissionState.isMobile ? "Mobile " : ""}Microphone Access
            Required
          </h1>

          <p className="text-gray-700 mb-4">{permissionState.error}</p>

          {!permissionState.isSecure && (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
              <p className="text-yellow-800 font-semibold">🔒 HTTPS Required</p>
              <p className="text-sm text-yellow-700 mt-1">
                This app requires HTTPS to access your microphone, especially on
                mobile devices.
              </p>
            </div>
          )}

          {permissionState.isMobile && (
            <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
              <p className="text-blue-800 font-semibold">
                📱 Mobile Instructions
              </p>
              <ul className="text-sm text-blue-700 mt-2 text-left list-disc list-inside space-y-1">
                <li>Ensure you're using HTTPS</li>
                <li>Allow microphone permissions when prompted</li>
                <li>Try refreshing the page</li>
                <li>Check your browser settings</li>
              </ul>
            </div>
          )}

          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  if (!sentence) return <LoaderScreen />;

  return (
    <ProtectedRoute>
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto mt-20 px-6 py-8 bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-xl font-sans space-y-8">
          {/* Mobile indicator */}
          {permissionState.isMobile && (
            <div className="text-center text-xs text-gray-500">
              📱 Mobile Mode Active
            </div>
          )}

          {sentence && (
            <ExpectedText
              expectedText={sentence?.sentence}
              actualText={fullTranscript}
            />
          )}

          <ControlButtons
            listening={listening}
            onToggle={onToggle}
            onClear={() => {
              setFullTranscript("");
              setInterimTranscript("");
            }}
          />

          <TranscriptBox
            fullTranscript={fullTranscript}
            interimTranscript={interimTranscript}
          />

          <ResultStats
            matchCount={matchCount}
            total={total}
            accuracy={accuracy}
          >
            <VoiceRecorder
              ref={recorderRef}
              onUploadComplete={(url) => {
                setAudioUrl(url || null);
              }}
            />

            <button
              onClick={handleSaveAndNext}
              className="block w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white text-lg font-semibold rounded-xl shadow-md transition-transform hover:scale-105"
            >
              ✅ Хадгалах ба Дараагийн
            </button>
          </ResultStats>

          {audioUrl && (
            <div className="mt-6 text-center space-y-3">
              <audio
                src={audioUrl}
                controls
                className="w-full rounded-lg shadow-sm"
              />
              <a
                href={audioUrl}
                download="recording.webm"
                className="inline-block text-indigo-600 hover:text-indigo-800 underline text-sm"
              >
                ⬇️ Татаж авах
              </a>
            </div>
          )}

          {sentence && (
            <p className="text-center text-sm text-gray-600">
              📚 Энэ өгүүлбэрийг уншсан удаа:{" "}
              <span className="font-bold text-indigo-600">
                {sentence.readCount}
              </span>
            </p>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SpeechToTextMongolian;
