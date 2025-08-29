import React from "react";

type Props = {
  listening: boolean;
  onToggle: () => void;
  onClear: () => void;
};

const ControlButtons: React.FC<Props> = ({ listening, onToggle, onClear }) => (
  <div className="flex justify-center gap-8 mb-8">
    <button
      onClick={onToggle}
      className={`w-32 h-32 flex flex-col items-center justify-center rounded-full text-lg font-bold shadow-md transition-all duration-300
      ${
        listening
          ? "bg-gradient-to-br from-rose-300 via-rose-400 to-rose-500 text-white"
          : "bg-gradient-to-br from-green-300 via-green-400 to-green-500 text-white"
      } hover:scale-110 active:scale-95 hover:shadow-xl`}
    >
      <span className="text-3xl mb-1 animate-bounce">
        {listening ? "⏹" : "🎤"}
      </span>
      {listening ? "Зогсоох" : "Унших"}
    </button>

    {/* Clear button */}
    <button
      onClick={onClear}
      className="w-32 h-32 flex flex-col items-center justify-center rounded-full text-lg font-bold text-white shadow-md transition-all duration-300 bg-gradient-to-br from-sky-300 via-sky-400 to-sky-500 hover:scale-110 active:scale-95 hover:shadow-xl"
    >
      <span className="text-3xl mb-1">♻️</span>
      Цэвэрлэх
    </button>
  </div>
);

export default ControlButtons;
