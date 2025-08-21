"use client";

import { useState, useEffect } from "react";
import { Keyboard } from "./WordleKeyboard";
import { Button } from "@/Components/ui/button";
import { WordleGrid } from "./WordleGrid";

const WORDS = [
  "REACT",
  "WORLD",
  "HOUSE",
  "PLANT",
  "MUSIC",
  "LIGHT",
  "WATER",
  "PHONE",
  "HAPPY",
  "DREAM",
  "BEACH",
  "SMILE",
  "PEACE",
  "HEART",
  "MAGIC",
  "DANCE",
  "STORY",
  "BRAVE",
  "SHINE",
  "GRACE",
  "TRUST",
  "POWER",
  "FRESH",
  "SWEET",
];

export type LetterState = "correct" | "present" | "absent" | "empty";

export interface GuessLetter {
  letter: string;
  state: LetterState;
}

export interface Guess {
  letters: GuessLetter[];
}

export const Wordle = () => {
  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [keyboardState, setKeyboardState] = useState<
    Record<string, LetterState>
  >({});

  // Initialize game
  useEffect(() => {
    resetGame();
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameStatus !== "playing") return;

      const key = event.key.toUpperCase();

      if (key === "ENTER") {
        handleSubmitGuess();
      } else if (key === "BACKSPACE") {
        handleDeleteLetter();
      } else if (key.match(/[A-Z]/) && key.length === 1) {
        handleAddLetter(key);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentGuess, gameStatus]);

  const resetGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setTargetWord(randomWord);
    setGuesses([]);
    setCurrentGuess("");
    setGameStatus("playing");
    setKeyboardState({});
  };

  const handleAddLetter = (letter: string) => {
    if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + letter);
    }
  };

  const handleDeleteLetter = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const handleSubmitGuess = () => {
    if (currentGuess.length !== 5) return;

    const guessLetters: GuessLetter[] = currentGuess
      .split("")
      .map((letter, index) => {
        let state: LetterState = "absent";

        if (targetWord[index] === letter) {
          state = "correct";
        } else if (targetWord.includes(letter)) {
          state = "present";
        }

        return { letter, state };
      });

    const newGuess: Guess = { letters: guessLetters };
    const newGuesses = [...guesses, newGuess];
    setGuesses(newGuesses);

    // Update keyboard state
    const newKeyboardState = { ...keyboardState };
    guessLetters.forEach(({ letter, state }) => {
      if (
        !newKeyboardState[letter] ||
        (newKeyboardState[letter] === "absent" && state !== "absent") ||
        (newKeyboardState[letter] === "present" && state === "correct")
      ) {
        newKeyboardState[letter] = state;
      }
    });
    setKeyboardState(newKeyboardState);

    // Check win condition
    if (currentGuess === targetWord) {
      setGameStatus("won");
    } else if (newGuesses.length >= 6) {
      setGameStatus("lost");
    }

    setCurrentGuess("");
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <WordleGrid
        guesses={guesses}
        currentGuess={currentGuess}
        maxGuesses={6}
      />

      {gameStatus === "won" && (
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600 mb-2">You Win! 🎉</p>
          <p className="text-muted-foreground">
            You guessed &quot;{targetWord}&quot; correctly!
          </p>
        </div>
      )}

      {gameStatus === "lost" && (
        <div className="text-center">
          <p className="text-2xl font-bold text-red-600 mb-2">Game Over 😔</p>
          <p className="text-muted-foreground">
            The word was &quot;{targetWord}&quot;
          </p>
        </div>
      )}

      <Keyboard
        onKeyPress={handleAddLetter}
        onEnter={handleSubmitGuess}
        onDelete={handleDeleteLetter}
        keyboardState={keyboardState}
        disabled={gameStatus !== "playing"}
      />

      {gameStatus !== "playing" && (
        <Button onClick={resetGame} className="mt-4">
          Play Again
        </Button>
      )}
    </div>
  );
};
