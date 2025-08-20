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
  // Game state
  const [secretCode, setSecretCode] = useState<number[]>([]);
  const [currentGuess, setCurrentGuess] = useState<number[]>([]);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

  // Initialize game
  const initializeGame = () => {
    // Generate random 4-color code
    const code = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6));
    setSecretCode(code);
    setCurrentGuess([]);
    setGuesses([]);
    setFeedback([]);
    setGameState("playing");
    setSelectedPosition(null);
  };

  // Calculate feedback for a guess
  const calculateFeedback = (guess: number[], secret: number[]): Feedback => {
    let black = 0; // Correct color and position
    let white = 0; // Correct color, wrong position

    const secretCopy = [...secret];
    const guessCopy = [...guess];

    // First pass: count black pegs (exact matches)
    for (let i = 0; i < 4; i++) {
      if (guessCopy[i] === secretCopy[i]) {
        black++;
        secretCopy[i] = -1; // Mark as used
        guessCopy[i] = -2; // Mark as used
      }
    }

    // Second pass: count white pegs (color matches in wrong position)
    for (let i = 0; i < 4; i++) {
      if (guessCopy[i] >= 0) {
        const foundIndex = secretCopy.findIndex(
          (color) => color === guessCopy[i]
        );
        if (foundIndex !== -1) {
          white++;
          secretCopy[foundIndex] = -1; // Mark as used
        }
      }
    }

    return { black, white };
  };

  // Handle color selection
  const selectColor = (colorIndex: number) => {
    if (gameState !== "playing" || selectedPosition === null) return;

    const newGuess = [...currentGuess];
    newGuess[selectedPosition] = colorIndex;
    setCurrentGuess(newGuess);

    // Auto-advance to next position
    if (selectedPosition < 3) {
      setSelectedPosition(selectedPosition + 1);
    }
  };

  // Handle position selection
  const selectPosition = (position: number) => {
    if (gameState !== "playing") return;
    setSelectedPosition(position);
  };

  // Submit current guess
  const submitGuess = () => {
    if (currentGuess.length !== 4 || gameState !== "playing") return;

    const newFeedback = calculateFeedback(currentGuess, secretCode);
    const newGuesses = [...guesses, currentGuess];
    const newFeedbackList = [...feedback, newFeedback];

    setGuesses(newGuesses);
    setFeedback(newFeedbackList);

    // Check win condition
    if (newFeedback.black === 4) {
      setGameState("won");
    } else if (newGuesses.length >= 8) {
      setGameState("lost");
    }

    // Reset for next guess
    setCurrentGuess([]);
    setSelectedPosition(0);
  };

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Mastermind</h2>
        <p className="text-sm text-gray-600">
          Crack the 4-color code in 8 attempts or less!
        </p>
      </div>

      {/* Game Status */}
      {gameState === "won" && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
          🎉 Congratulations! You cracked the code!
        </div>
      )}

      {gameState === "lost" && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
          💔 Game Over! The code was:
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

      {/* Previous Guesses */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Attempts ({guesses.length}/8)
        </h3>
        <div className="space-y-2">
          {guesses.map((guess, guessIndex) => (
            <div
              key={guessIndex}
              className="flex items-center gap-3 p-2 bg-gray-50 rounded"
            >
              {/* Guess colors */}
              <div className="flex gap-1">
                {guess.map((colorIndex, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full border-2 border-gray-300 ${COLORS[colorIndex].bg}`}
                  />
                ))}
              </div>

              {/* Feedback pegs */}
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

      {/* Current Guess Input */}
      {gameState === "playing" && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Current Guess
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

          {/* Color Palette */}
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

          {/* Submit Button */}
          <button
            onClick={submitGuess}
            disabled={currentGuess.length !== 4}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all"
          >
            Submit Guess
          </button>
        </div>
      )}

      {/* Restart Button */}
      <button
        onClick={initializeGame}
        className="w-full px-4 py-2 bg-transparent border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all"
      >
        New Game
      </button>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-2">How to Play:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Click a position, then select a color</li>
          <li>• Black peg = correct color & position</li>
          <li>• White peg = correct color, wrong position</li>
          <li>• Crack the code in 8 attempts!</li>
        </ul>
      </div>
    </div>
  );
}
