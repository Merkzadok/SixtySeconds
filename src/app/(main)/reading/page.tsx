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

const VoiceRecorder = dynamic(
  () => import("../reading/_components/VoiceRecorder"),
  { ssr: false }
);

const SpeechToTextMongolian: React.FC = () => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [stopTime, setStopTime] = useState<Date | null>(null);

  const [sentence, setSentence] = useState<{
    id: number;
    text: string;
    readCount: number;
  } | null>(null);
  const [fullTranscript, setFullTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const recorderRef = useRef<VoiceRecorderHandle>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    recognitionRef.current = createRecognition(
      setFullTranscript,
      setInterimTranscript,
      setListening
    );
    fetchNextSentence();

    return () => recognitionRef.current?.stop();
  }, []);

  const fetchNextSentence = async () => {
    const res = await fetch("/api/sentences");
    const data = await res.json();
    if (data.success)
      setSentence({ ...data.sentence, readCount: data.sentence.readCount });
  };

  const handleSaveAndNext = async () => {
    if (!sentence) return;
    await fetch("/api/se  ntences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: sentence.id }),
    });
    setFullTranscript("");
    setInterimTranscript("");
    setListening(false);
    recognitionRef.current?.stop();
    fetchNextSentence();
  };

  const { matchCount, total, accuracy } = compareTexts(
    sentence?.text || "",
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

  return (
    <div className="max-w-md mx-auto mt-6 px-4 py-6 bg-white rounded-2xl shadow-lg font-sans space-y-6">
      <h1 className="text-center text-3xl font-extrabold text-pink-500">
        Монгол яриаг текст рүү
      </h1>

      {sentence && (
        <ExpectedText
          expectedText={sentence.text}
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
        <VoiceRecorder ref={recorderRef} />

        <button
          onClick={handleSaveAndNext}
          className="block w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white text-lg font-semibold rounded-full shadow transition"
        >
          ✅ Хадгалах ба Дараагийн
        </button>
      </ResultStats>

      {sentence && (
        <p className="text-center text-sm text-gray-600">
          📚 Энэ өгүүлбэрийг уншсан удаа:{" "}
          <span className="font-bold text-purple-600">
            {sentence.readCount}
          </span>
        </p>
      )}
    </div>
  );
};

export default SpeechToTextMongolian;
