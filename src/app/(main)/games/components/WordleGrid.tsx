import { cn } from "@/lib/utils";
import type { Guess } from "./Wordle";

interface WordleGridProps {
  guesses: Guess[];
  currentGuess: string;
  maxGuesses: number;
}

export const WordleGrid = ({
  guesses,
  currentGuess,
  maxGuesses,
}: WordleGridProps) => {
  const renderRow = (guess: Guess | null, isCurrentRow = false) => {
    const letters = guess?.letters || [];
    const currentLetters = isCurrentRow ? currentGuess.split("") : [];

    return (
      <div className="flex gap-1 justify-center">
        {Array.from({ length: 5 }).map((_, index) => {
          const letter = letters[index]?.letter || currentLetters[index] || "";
          const state = letters[index]?.state || "empty";

          return (
            <div
              key={index}
              className={cn(
                "w-12 h-12 border-2 flex items-center justify-center text-lg font-bold uppercase transition-colors",
                {
                  "border-border bg-background text-foreground":
                    state === "empty" && !letter,
                  "border-muted-foreground bg-background text-foreground":
                    state === "empty" && letter,
                  "border-green-500 bg-green-500 text-white":
                    state === "correct",
                  "border-yellow-500 bg-yellow-500 text-white":
                    state === "present",
                  "border-gray-500 bg-gray-500 text-white": state === "absent",
                }
              )}
            >
              {letter}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-1">
      {Array.from({ length: maxGuesses }).map((_, index) => {
        const guess = guesses[index];
        const isCurrentRow =
          index === guesses.length && guesses.length < maxGuesses;

        return <div key={index}>{renderRow(guess, isCurrentRow)}</div>;
      })}
    </div>
  );
};
