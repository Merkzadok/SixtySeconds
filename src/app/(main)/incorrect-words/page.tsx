"use client";

import { LoaderScreen } from "@/Components/loader/loading";
import { useUser } from "@/provider/CurrentUser";
import ProtectedRoute from "@/provider/ProtectPage";
import React, { useEffect, useState } from "react";

type Sentence = {
  id: number;
  sentence: string;
  wrongWord: string;
  score: number;
  words: string[];
  correctAnswer: string;
};

const IncorrectWordPage: React.FC = () => {
  const [totalScore, setTotalScore] = useState(0);
  const [sentence, setSentence] = useState<Sentence | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    score: number;
  } | null>(null);
  const { user } = useUser();

  const fetchSentence = async () => {
    if (!user?.profileId) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wrong/${user?.profileId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();

    setSentence(data);
    setSelectedWord(null);
    setFeedback(null);
  };

  useEffect(() => {
    fetchSentence();
  }, [user?.profileId]);

  const submitSelection = async () => {
    if (!sentence?.sentence || !selectedWord) return;

    const correct = selectedWord === sentence?.wrongWord;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wrong/${user?.profileId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: sentence.id, correct, selectedWord }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setFeedback({ correct, score: data.score });

      if (correct) {
        setTotalScore((prev) => prev + 1);
      }
    }
  };

  if (!sentence) return <LoaderScreen />;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#C0E6BA] py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-white drop-shadow-lg">
              🔍 Алдаатай үг хайх
            </h2>
            <p className="text-slate-600 text-lg font-medium">
              Доорх өгүүлбэрээс алдаатай үгийг сонгоорой.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-black/30 rounded-xl transform translate-x-2 translate-y-2"></div>

            <div className="relative bg-green-700 rounded-xl border-8 border-amber-900 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent mix-blend-overlay"></div>

              <div className="relative p-8 md:p-12">
                <div className="bg-green-800/50 backdrop-blur-sm p-8 rounded-lg border border-green-600/30 shadow-inner">
                  <div className="text-center text-2xl md:text-3xl leading-relaxed font-mono tracking-wide">
                    {sentence &&
                      sentence?.words?.map((word, index) => (
                        <span
                          key={index}
                          onClick={() => setSelectedWord(word)}
                          className={`inline-block px-3 py-2 mx-1 my-1 rounded-md cursor-pointer transition-all duration-300 transform font-semibold ${
                            selectedWord === word
                              ? "bg-yellow-400 text-green-800 scale-110 shadow-lg border-2 border-yellow-300 font-bold"
                              : "text-white hover:bg-white/20 hover:scale-105 hover:shadow-md hover:text-yellow-100"
                          } shadow-sm`}
                          style={{
                            textShadow:
                              selectedWord === word
                                ? "1px 1px 2px rgba(0,0,0,0.3)"
                                : "1px 1px 3px rgba(0,0,0,0.5)",
                            fontFamily: "Georgia, serif",
                          }}
                        >
                          {word}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    disabled={!selectedWord}
                    onClick={submitSelection}
                    className={`px-8 py-4 text-xl font-bold rounded-xl transition-all duration-300 transform shadow-lg ${
                      !selectedWord
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50"
                        : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white hover:scale-105 hover:shadow-xl active:scale-95"
                    }`}
                    style={{
                      textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    ✓ Баталгаажуулах
                  </button>
                </div>
              </div>
            </div>
          </div>

          {feedback && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-xl">
              <div className="text-center space-y-4">
                <p
                  className={`text-2xl font-bold ${
                    feedback.correct ? "text-green-400" : "text-red-400"
                  }`}
                  style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                >
                  {feedback.correct
                    ? "🎉 Зөв сонголт!"
                    : "😅 Уучлаарай, буруу байна."}
                </p>

                <div className="flex justify-center space-x-8 text-lg">
                  <p className="text-slate-600 text-lg font-medium">
                    ✅ Зөв үг:{" "}
                    <span className="font-bold text-blue-300">
                      {sentence?.correctAnswer}
                    </span>
                  </p>
                  {/* <p className="text-slate-600 text-lg font-medium">
                    ❌ Чиний сонгосон:{" "}
                    <span className="font-bold text-red-300">
                      {selectedWord}
                    </span>
                  </p> */}
                </div>

                <button
                  onClick={fetchSentence}
                  className="mt-4 px-8 py-3 bg-green-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
                  style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
                >
                  ➡️ Дараагийн өгүүлбэр
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default IncorrectWordPage;
