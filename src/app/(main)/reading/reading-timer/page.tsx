"use client";

import React, { useEffect, useRef, useState } from "react";
import { useUser } from "@/provider/CurrentUser";
import { createRecognition } from "@/app/utils/recognitionHandler";
import { compareTexts } from "@/app/utils/compareTexts";
import dynamic from "next/dynamic";
import { VoiceRecorderHandle } from "../components/VoiceRecorder";
import ExpectedText from "../components/ExpectedText";

const VoiceRecorder = dynamic(() => import("../components/VoiceRecorder"), {
  ssr: false,
});

type sentenceType = {
  sentence: string;
};

const ReadingTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [testStarted, setTestStarted] = useState(false);
  const [fullTranscript, setFullTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [sentence, setSentence] = useState<sentenceType | null>(null);
  const [totalWords, setTotalWords] = useState(0);
  const [matchedWords, setMatchedWords] = useState(0);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const recorderRef = useRef<VoiceRecorderHandle>(null);
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    recognitionRef.current = createRecognition(
      setFullTranscript,
      setInterimTranscript,
      () => {}
    );
    fetchNextSentence();
  }, [user]);

  useEffect(() => {
    if (testStarted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }

    if (timeLeft === 0) {
      stopTest();
    }
  }, [testStarted, timeLeft]);

  const fetchNextSentence = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/gemini/${user?.profileId}`,
      { method: "POST" }
    );
    const data = await res.json();
    setSentence(data);
  };

  const startTest = () => {
    setTestStarted(true);
    setTimeLeft(60);
    recorderRef.current?.start();
    recognitionRef.current?.start();
  };

  const stopTest = () => {
    recognitionRef.current?.stop();
    recorderRef.current?.stop();
    setTestStarted(false);
  };

  const onSentenceFinish = () => {
    if (!sentence?.sentence) return;
    const { matchCount, total } = compareTexts(
      sentence.sentence,
      fullTranscript
    );

    setMatchedWords((prev) => prev + matchCount);
    setTotalWords((prev) => prev + total);

    setFullTranscript("");
    setInterimTranscript("");
    fetchNextSentence();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl p-8 shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-center text-indigo-700">
          ⏱ 60 секундийн уншлагын сорил
        </h2>

        <div className="text-center text-xl font-bold text-red-600">
          Үлдсэн хугацаа: {timeLeft} сек
        </div>

        {sentence && (
          <ExpectedText
            expectedText={sentence.sentence}
            actualText={fullTranscript}
          />
        )}

        <div className="text-gray-800 bg-gray-100 p-4 rounded-xl shadow-inner min-h-[80px]">
          <p className="font-semibold">🎙 Танигдсан:</p>
          <p>{fullTranscript}</p>
          <p className="text-sm text-gray-500 italic">{interimTranscript}</p>
        </div>

        <div className="flex justify-center gap-4">
          {!testStarted ? (
            <button
              onClick={startTest}
              className="px-6 py-3 bg-green-500 text-white rounded-full font-bold shadow hover:bg-green-600"
            >
              🚀 Эхлүүлэх
            </button>
          ) : (
            <button
              onClick={() => {
                onSentenceFinish();
              }}
              className="px-6 py-3 bg-blue-500 text-white rounded-full font-bold shadow hover:bg-blue-600"
            >
              ➕ Дараагийн өгүүлбэр
            </button>
          )}
        </div>

        {!testStarted && timeLeft < 60 && (
          <div className="mt-4 text-center text-lg text-gray-700 space-y-1">
            <p>
              🔠 Нийт үгс: <b>{totalWords}</b>
            </p>
            <p>
              ✅ Зөв үгс: <b>{matchedWords}</b>
            </p>
            <p>
              🎯 Нарийвчлал:{" "}
              <b className="text-orange-600">
                {totalWords > 0
                  ? ((matchedWords / totalWords) * 100).toFixed(2)
                  : "0.00"}
                %
              </b>
            </p>
          </div>
        )}

        <VoiceRecorder ref={recorderRef} onUploadComplete={(url) => {}} />
      </div>
    </div>
  );
};

export default ReadingTimer;
