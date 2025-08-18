import React from "react";

type Props = {
  listening: boolean;
  onToggle: () => void;
  onClear: () => void;
};

const ControlButtons: React.FC<Props> = ({ listening, onToggle, onClear }) => (
  <div className="flex justify-center gap-4 mb-5">
    <button
      onClick={onToggle}
      className={`px-5 py-2 font-bold text-white rounded 
      ${
        listening
          ? "bg-red-500 hover:bg-red-600"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {listening ? "Зогсоох" : "Унших"}
    </button>
    <button
      onClick={onClear}
      className="px-5 py-2 font-bold text-white bg-cyan-400 hover:bg-cyan-500 rounded"
    >
      Цэвэрлэх
    </button>
  </div>
);

export default ControlButtons;
