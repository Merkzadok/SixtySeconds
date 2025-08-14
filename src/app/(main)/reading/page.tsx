"use client";

import React, { useEffect, useState, useRef } from "react";

const SpeechToTextMongolian: React.FC = () => {
  const expectedText = "монгол улс нь төв ";
  const [listening, setListening] = useState(false);
  const [fullTranscript, setFullTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognition = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognitionConstructor =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) {
      alert("Таны браузер ярианы таних функцийг дэмжихгүй байна!");
      return;
    }

    recognition.current = new SpeechRecognitionConstructor();
    if (recognition.current) {
      recognition.current.lang = "mn-MN";
      recognition.current.interimResults = true;
      recognition.current.continuous = true;

      recognition.current.onresult = (event: SpeechRecognitionEvent) => {
        let interim = "";
        let final = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const result = event.results[i];
          if (result.isFinal) {
            final += result[0].transcript + " ";
          } else {
            interim += result[0].transcript;
          }
        }

        setFullTranscript((prev) => prev + final);
        setInterimTranscript(interim);
      };

      recognition.current.onerror = (event: any) => {
        console.error("Speech recognition error", event);
      };

      recognition.current.onend = () => {
        setListening(false);
      };
    }

    return () => {
      recognition.current?.stop();
    };
  }, []);

  const toggleListening = () => {
    if (!recognition.current) return;

    if (listening) {
      recognition.current.stop();
      setListening(false);
      setInterimTranscript("");
    } else {
      recognition.current.start();
      setListening(true);
    }
  };

  const clearText = () => {
    setFullTranscript("");
    setInterimTranscript("");
  };

  // === 🧠 Харьцуулалт ===
  const compareTexts = () => {
    const expectedWords = expectedText.trim().toLowerCase().split(/\s+/);
    const actualWords = fullTranscript.trim().toLowerCase().split(/\s+/);

    let matchCount = 0;
    expectedWords.forEach((word, index) => {
      if (word === actualWords[index]) {
        matchCount++;
      }
    });

    const accuracy = ((matchCount / expectedWords.length) * 100).toFixed(2);

    return {
      matchCount,
      total: expectedWords.length,
      accuracy,
    };
  };

  const { matchCount, total, accuracy } = compareTexts();

  return (
    <div className="max-w-[700px] m-[30px_auto] font-sans">
      <h1 className="text-center mb-5">Монгол яриаг текст рүү</h1>

      <div className="mb-5">
        <h3>📌 Унших өгүүлбэр:</h3>
        <p className="bg-gray-700 p-4 border-2">{expectedText}</p>
      </div>

      <div className="flex justify-center gap-4 mb-5">
        <button
          onClick={toggleListening}
          className={`py-2 px-4 text-white border-none rounded-md cursor-pointer font-bold ${
            listening ? "bg-red-600" : "bg-blue-600"
          }`}
        >
          {listening ? "Зогсоох" : "Ярих"}
        </button>
        <button
          className="py-2 px-4 bg-cyan-500 text-white border-none rounded-md cursor-pointer font-bold"
          onClick={clearText}
        >
          Цэвэрлэх
        </button>
      </div>

      <div className="min-h-32 border-2 border-gray-300 rounded-lg p-4 bg-gray-800 shadow-inner">
        <h3>🗣️ Танигдсан текст:</h3>
        <p>{fullTranscript}</p>
        <p className="text-gray-900 italic">{interimTranscript}</p>
      </div>

      <div className="mt-8 p-4 bg-gray-900 rounded-lg">
        <h3>📊 Үр дүн:</h3>
        <p>Нийт үгс: {total}</p>
        <p>Зөв таарсан үгс: {matchCount}</p>
        <p>
          🎯 Нарийвчлал (Accuracy):{" "}
          <span
            className={`font-bold ${
              accuracy === "100.00" ? "text-green-500" : "text-orange-400"
            }`}
          >
            {accuracy}%
          </span>
        </p>
      </div>
    </div>
  );
};

export default SpeechToTextMongolian;
