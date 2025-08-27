"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

import { createRecognition } from "@/app/utils/recognitionHandler";
import { compareTexts } from "@/app/utils/compareTexts";
import ExpectedText from "./components/ExpectedText";
import ControlButtons from "./components/ControlButtons";
import TranscriptBox from "./components/TranscriptBox";
import ResultStats from "./components/ResultStats";
import { VoiceRecorderHandle } from "./components/VoiceRecorder";
import { useUser } from "@/provider/CurrentUser";
import { LoaderScreen } from "@/Components/loader/loading";

const VoiceRecorder = dynamic(() => import("./components/VoiceRecorder"), {
  ssr: false,
});

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
  const recorderRef = useRef<VoiceRecorderHandle>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const fetchNextSentence = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/gemini/${user?.profileId}`,
      {
        method: "POST",
        // body:JSON.stringify({sentence})
      }
    );
    const data = await res.json();

    setSentence(data);
  };

  useEffect(() => {
    if (!user) return;
    recognitionRef.current = createRecognition(
      setFullTranscript,
      setInterimTranscript,
      setListening
    );
    fetchNextSentence();

    return () => recognitionRef.current?.stop();
  }, [user]);

  const handleSaveAndNext = async () => {
    if (!sentence) return;

    try {
      const response = await fetch(
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
      console.log(error);
    }
  };

  const { matchCount, total, accuracy } = compareTexts(
    sentence?.sentence || "",
    fullTranscript
  );

  const onToggle = () => {
    if (listening) {
      setStopTime(new Date()); // 🟢 ЭНЭ

      recognitionRef.current?.stop();
      recorderRef.current?.stop();
      setListening(false);
    } else {
      setStartTime(new Date()); // 🟢 ЭНЭ
      recognitionRef.current?.start();
      recorderRef.current?.start();
      setListening(true);
    }
  };
  if (!sentence) return <LoaderScreen />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 p-4">
      <div className="max-w-md w-full px-6 py-8 rounded-3xl shadow-xl bg-gradient-to-b from-white via-green-50 to-white space-y-6 animate-[fadeIn_0.5s_ease-in-out]">
        <h1 className="text-center text-3xl font-extrabold text-green-600 drop-shadow-md animate-[bounce_0.6s_ease-in-out] ">
          Монгол яриаг текст рүү
        </h1>

        <ExpectedText
          expectedText={sentence.sentence}
          actualText={fullTranscript}
        />

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

        <ResultStats matchCount={matchCount} total={total} accuracy={accuracy}>
          <VoiceRecorder
            ref={recorderRef}
            onUploadComplete={(url) => setAudioUrl(url || null)}
          />

          <button
            onClick={handleSaveAndNext}
            className="w-full py-3 mt-2 bg-green-500 hover:bg-green-600 text-white text-lg font-bold rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            ✅ Хадгалах ба Дараагийн
          </button>
        </ResultStats>

        {audioUrl && (
          <div className="mt-6 text-center space-y-2">
            <audio
              src={audioUrl}
              controls
              className="w-full rounded-lg shadow-md"
            />
            <a
              href={audioUrl}
              download="recording.webm"
              className="text-green-600 hover:text-green-800 underline text-sm"
            >
              ⬇️ Татаж авах
            </a>
          </div>
        )}

        <p className="text-center text-sm text-gray-700">
          📚 Энэ өгүүлбэрийг уншсан удаа:{" "}
          <span className="font-bold text-green-600">{sentence.readCount}</span>
        </p>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default SpeechToTextMongolian;
