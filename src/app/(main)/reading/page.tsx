"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

import { createRecognition } from "@/app/utils/recognitionHandler";
import { compareTexts } from "@/app/utils/compareTexts";
import ExpectedText from "./_components/ExpectedText";
import ControlButtons from "./_components/ControlButtons";
import TranscriptBox from "./_components/TranscriptBox";
import ResultStats from "./_components/ResultStats";
import { VoiceRecorderHandle } from "../reading/_components/VoiceRecorder";
import { useUser } from "@/provider/CurrentUser";
import { LoaderScreen } from "@/Components/loader/loading";

const VoiceRecorder = dynamic(
  () => import("../reading/_components/VoiceRecorder"),
  { ssr: false }
);

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
    const res = await fetch(`http://localhost:4001/gemini/${user?.profileId}`, {
      method: "POST",
      // body:JSON.stringify({sentence})
    });
    const data = await res.json();
    console.log(data);
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
      console.log(audioUrl);
      const response = await fetch(
        `http://localhost:4001/gemini/finish/${sentence?.readingId}`,
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
      console.log(response);
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
      console.log("stop: ", new Date());
      recognitionRef.current?.stop();
      recorderRef.current?.stop();
      setListening(false);
    } else {
      console.log("start: ", new Date());
      setStartTime(new Date()); // 🟢 ЭНЭ
      recognitionRef.current?.start();
      recorderRef.current?.start();
      setListening(true);
    }
  };
  if (!sentence) return <LoaderScreen />;

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto mt-20 px-6 py-8 bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-xl font-sans space-y-8">
        <h1 className="text-center text-3xl font-extrabold text-indigo-600 drop-shadow-sm">
          Монгол яриаг текст рүү
        </h1>

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

        <ResultStats matchCount={matchCount} total={total} accuracy={accuracy}>
          <VoiceRecorder
            ref={recorderRef}
            onUploadComplete={(url) => {
              console.log("🎤 Upload болсон аудио URL:", url);
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
  );
};

export default SpeechToTextMongolian;
