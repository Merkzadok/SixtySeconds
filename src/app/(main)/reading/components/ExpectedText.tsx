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
      <h3 className="text-lg font-semibold text-purple-700 mb-2">
        📌 Унших өгүүлбэр:
      </h3>
      <div className="bg-yellow-100 text-gray-800 p-4 rounded-xl leading-relaxed shadow-inner text-lg space-x-1 flex flex-wrap gap-y-1">
        {coloredParts.map((part, index) => (
          <span
            key={index}
            className={
              part.isMatch ? "text-green-600 font-semibold" : "text-gray-700"
            }
          >
            {part.word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ExpectedText;
