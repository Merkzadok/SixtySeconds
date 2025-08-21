import React from "react";

type Props = {
  listening: boolean;
  onToggle: () => void;
  onClear: () => void;
};

const ControlButtons: React.FC<Props> = ({ listening, onToggle, onClear }) => (
  <div className="flex justify-center gap-4 mb-6">
    <button
      onClick={onToggle}
      className={`w-32 py-3 rounded-full text-lg font-semibold shadow transition duration-200
      ${
        listening
          ? "bg-red-400 hover:bg-red-500 text-white"
          : "bg-green-400 hover:bg-green-500 text-white"
      }`}
    >
      {listening ? "⏹ Зогсоох" : "🎤 Унших"}
    </button>

    <button
      onClick={onClear}
      className="w-32 py-3 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full text-lg font-semibold shadow transition duration-200"
    >
      ♻️ Цэвэрлэх
    </button>
  </div>
);

export default ControlButtons;
