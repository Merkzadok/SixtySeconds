import React from "react";
import { getColoredTextParts } from "../../../utils/compareMatchedWords";

type Props = {
  expectedText: string;
  actualText: string;
};

const ExpectedText: React.FC<Props> = ({ expectedText, actualText }) => {
  const coloredParts = getColoredTextParts(expectedText, actualText);

  return (
    <div className="mb-6">
      <h3 className="text-xl font-extrabold text-green-600 mb-3 drop-shadow-sm ">
        📌 Унших өгүүлбэр:
      </h3>

      <div className="relative p-6 rounded-3xl shadow-lg bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 border border-green-200 hover:scale-[1.01] transition-transform duration-200">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse pointer-events-none"></div>

        <div className="relative flex flex-wrap gap-2 text-lg leading-relaxed font-sans z-10">
          {coloredParts.map((part, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-full transition-all duration-300 ${
                part.isMatch
                  ? "bg-green-200 text-green-700 font-bold animate-[pop_0.4s_ease-out]"
                  : "text-black"
              }`}
            >
              {part.word}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pop {
          0% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ExpectedText;
