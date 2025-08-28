"use client";

import { useState, useEffect } from "react";

const COLORS = [
  { name: "Soft Red", value: "#c24141", bg: "bg-red-600" },
  { name: "Slate Blue", value: "#4c6ef5", bg: "bg-blue-600" },
  { name: "Emerald", value: "#16a34a", bg: "bg-green-700" },
  { name: "Goldenrod", value: "#ca8a04", bg: "bg-yellow-700" },
  { name: "Amethyst", value: "#7c3aed", bg: "bg-purple-700" },
  { name: "Burnt Orange", value: "#c2410c", bg: "bg-yellow-300" },
];

type GameState = "playing" | "won" | "lost";
type Guess = number[];
type Feedback = { black: number; white: number };

export function MastermindGame() {
  const [secretCode, setSecretCode] = useState<number[]>([]);
  const [currentGuess, setCurrentGuess] = useState<number[]>([]);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

  const initializeGame = () => {
    const code = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6));
    setSecretCode(code);
    setCurrentGuess([]);
    setGuesses([]);
    setFeedback([]);
    setGameState("playing");
    setSelectedPosition(null);
  };

  const calculateFeedback = (guess: number[], secret: number[]): Feedback => {
    let black = 0;
    let white = 0;

    const secretCopy = [...secret];
    const guessCopy = [...guess];

    for (let i = 0; i < 4; i++) {
      if (guessCopy[i] === secretCopy[i]) {
        black++;
        secretCopy[i] = -1;
        guessCopy[i] = -2;
      }
    }

    for (let i = 0; i < 4; i++) {
      if (guessCopy[i] >= 0) {
        const foundIndex = secretCopy.findIndex(
          (color) => color === guessCopy[i]
        );
        if (foundIndex !== -1) {
          white++;
          secretCopy[foundIndex] = -1;
        }
      }
    }

    return { black, white };
  };

  const selectColor = (colorIndex: number) => {
    if (gameState !== "playing" || selectedPosition === null) return;

    const newGuess = [...currentGuess];
    newGuess[selectedPosition] = colorIndex;
    setCurrentGuess(newGuess);

    if (selectedPosition < 3) {
      setSelectedPosition(selectedPosition + 1);
    }
  };

  const selectPosition = (position: number) => {
    if (gameState !== "playing") return;
    setSelectedPosition(position);
  };

  const submitGuess = () => {
    if (currentGuess.length !== 4 || gameState !== "playing") return;

    const newFeedback = calculateFeedback(currentGuess, secretCode);
    const newGuesses = [...guesses, currentGuess];
    const newFeedbackList = [...feedback, newFeedback];

    setGuesses(newGuesses);
    setFeedback(newFeedbackList);

    if (newFeedback.black === 4) {
      setGameState("won");
    } else if (newGuesses.length >= 8) {
      setGameState("lost");
    }

    setCurrentGuess([]);
    setSelectedPosition(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Оюун Ухаан</h2>
        <p className="text-sm text-gray-600">
          4 өнгийн нууц кодыг 8 оролдлогоор таахыг хичээгээрэй!
        </p>
      </div>

      {gameState === "won" && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
          🎉 Баяр хүргэе! Чи кодыг тааллаа!
        </div>
      )}

      {gameState === "lost" && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
          💔 Тоглоом дууслаа! Код...байлаа:
          <div className="flex justify-center gap-1 mt-2">
            {secretCode.map((colorIndex, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full border-2 border-gray-300 ${COLORS[colorIndex].bg}`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Оролдлогууд ({guesses.length}/8)
        </h3>
        <div className="space-y-2">
          {guesses.map((guess, guessIndex) => (
            <div
              key={guessIndex}
              className="flex items-center gap-3 p-2 bg-gray-50 rounded"
            >
              <div className="flex gap-1">
                {guess.map((colorIndex, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full border-2 border-gray-300 ${COLORS[colorIndex].bg}`}
                  />
                ))}
              </div>

              <div className="flex gap-1 ml-auto">
                {Array.from({ length: feedback[guessIndex].black }, (_, i) => (
                  <div
                    key={`black-${i}`}
                    className="w-3 h-3 bg-black rounded-full"
                  />
                ))}
                {Array.from({ length: feedback[guessIndex].white }, (_, i) => (
                  <div
                    key={`white-${i}`}
                    className="w-3 h-3 bg-white border border-gray-400 rounded-full"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {gameState === "playing" && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Одоо таах оролдлого
          </h3>
          <div className="flex gap-2 justify-center mb-4">
            {Array.from({ length: 4 }, (_, i) => (
              <button
                key={i}
                onClick={() => selectPosition(i)}
                className={`w-12 h-12 rounded-full border-4 transition-all ${
                  selectedPosition === i
                    ? "border-blue-500 shadow-lg"
                    : "border-gray-300 hover:border-gray-400"
                } ${
                  currentGuess[i] !== undefined
                    ? COLORS[currentGuess[i]].bg
                    : "bg-gray-100"
                }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {COLORS.map((color, index) => (
              <button
                key={index}
                onClick={() => selectColor(index)}
                className={`w-full h-10 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all ${color.bg}`}
                title={color.name}
              />
            ))}
          </div>

          <button
            onClick={submitGuess}
            disabled={currentGuess.length !== 4}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all"
          >
            Таамаг оруулах
          </button>
        </div>
      )}

      <button
        onClick={initializeGame}
        className="w-full px-4 py-2 bg-transparent border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all"
      >
        Шинэ тоглоом
      </button>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-2">Тоглох заавар:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Босгон дээр дараад өнгөө сонгох</li>
          <li>• Хар шон = зөв өнгө ба зөв байрлал</li>
          <li>• Цагаан шон = зөв өнгө ба буруу байрлал</li>
          <li>• 8 оролдлогоор кодыг таал!</li>
        </ul>
      </div>
    </div>
  );
}
