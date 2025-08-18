"use client";

import { cn } from "@/lib/utils";
import type { LetterState } from "./Wordle";
import { Button } from "@/Components/ui/button";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onEnter: () => void;
  onDelete: () => void;
  keyboardState: Record<string, LetterState>;
  disabled: boolean;
}

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"],
];

export const Keyboard = ({
  onKeyPress,
  onEnter,
  onDelete,
  keyboardState,
  disabled,
}: KeyboardProps) => {
  const handleKeyClick = (key: string) => {
    if (disabled) return;

    if (key === "ENTER") {
      onEnter();
    } else if (key === "DELETE") {
      onDelete();
    } else {
      onKeyPress(key);
    }
  };

  const getKeyStyle = (key: string) => {
    const state = keyboardState[key];

    return cn(
      "h-12 font-semibold text-sm transition-colors",
      {
        "bg-background text-foreground border border-border hover:bg-muted":
          !state,
        "bg-green-500 text-white hover:bg-green-600": state === "correct",
        "bg-yellow-500 text-white hover:bg-yellow-600": state === "present",
        "bg-gray-500 text-white hover:bg-gray-600": state === "absent",
      },
      key === "ENTER" || key === "DELETE" ? "px-3" : "w-10"
    );
  };

  return (
    <div className="flex flex-col gap-1 w-full max-w-lg">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 justify-center">
          {row.map((key) => (
            <Button
              key={key}
              variant="outline"
              className={getKeyStyle(key)}
              onClick={() => handleKeyClick(key)}
              disabled={disabled}
            >
              {key === "DELETE" ? "⌫" : key}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
};
