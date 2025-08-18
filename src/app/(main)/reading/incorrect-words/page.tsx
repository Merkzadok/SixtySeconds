"use client";

import React, { useEffect, useState } from "react";

type Sentence = { id: number; text: string; wrongWord: string; score: number };

const IncorrectWordPage: React.FC = () => {
  const [totalScore, setTotalScore] = useState(0); // Нийт оноо хадгалах
  const [sentence, setSentence] = useState<Sentence | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    score: number;
  } | null>(null);

  const fetchSentence = async () => {
    const res = await fetch("/api/incorrect-sentences");
    const data = await res.json();
    if (data.success) {
      setSentence(data.sentence);
      setSelectedWord(null);
      setFeedback(null);
    }
  };

  useEffect(() => {
    fetchSentence();
  }, []);

  const submitSelection = async () => {
    if (!sentence || !selectedWord) return;

    const correct = selectedWord === sentence.wrongWord;
    const res = await fetch("/api/incorrect-sentences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: sentence.id, correct }),
    });

    const data = await res.json();

    if (data.success) {
      setFeedback({ correct, score: data.score });

      // ✔ Оноо зөв бол нэмнэ
      if (correct) {
        setTotalScore((prev) => prev + 1);
      }
    }
  };

  if (!sentence)
    return <p className="text-center text-lg mt-10">Түр хүлээнэ үү...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-purple-700">
        🔍 Алдаатай үг хайх
      </h2>
      <p className="text-center text-gray-600 text-md">
        Доорх өгүүлбэрээс алдаатай үгийг сонгоорой.
      </p>

      {/* Өгүүлбэр */}
      <div className="bg-gray-400 p-5 rounded-lg shadow-sm text-xl text-center leading-relaxed">
        {sentence.text.split(" ").map((word, idx) => (
          <span
            key={idx}
            onClick={() => setSelectedWord(word)}
            className={`inline-block px-2 py-1 mx-[2px] rounded-md cursor-pointer transition-all duration-200 ${
              selectedWord === word
                ? "bg-yellow-300 text-black underline underline-offset-4"
                : "hover:bg-blue-200 hover:underline"
            }`}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Баталгаажуулах товч */}
      <div className="flex justify-center">
        <button
          disabled={!selectedWord}
          onClick={submitSelection}
          className={`px-6 py-2 text-white font-bold rounded-md transition duration-200 ${
            !selectedWord
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Баталгаажуулах
        </button>
      </div>

      {/* Feedback хэсэг */}
      {feedback && (
        <div className="text-center space-y-3">
          <p
            className={`text-lg font-bold ${
              feedback.correct ? "text-green-600" : "text-red-500"
            }`}
          >
            {feedback.correct
              ? "🎉 Зөв сонголт!"
              : "😅 Уучлаарай, буруу байна."}
          </p>
          <p className="text-sm text-gray-600">
            Энэ өгүүлбэрийн оноо:{" "}
            <span className="font-semibold">{feedback.score}</span>
          </p>
          <p className="text-sm text-gray-700 font-semibold">
            🏆 Нийт оноо: <span className="text-blue-600">{totalScore}</span>
          </p>
          <button
            onClick={fetchSentence}
            className="mt-2 px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
          >
            ➡️ Дараагийн өгүүлбэр
          </button>
        </div>
      )}
    </div>
  );
};

export default IncorrectWordPage;
