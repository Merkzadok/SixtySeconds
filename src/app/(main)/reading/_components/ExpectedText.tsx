import React from "react";
import { getColoredTextParts } from "../../../utils/compareMatchedWords";

type Props = {
  expectedText: string;
  actualText: string;
};

const ExpectedText: React.FC<Props> = ({ expectedText, actualText }) => {
  const coloredParts = getColoredTextParts(expectedText, actualText);

  return (
    <div className="mb-5">
      <h3 className="text-lg font-semibold mb-2">📌 Унших өгүүлбэр:</h3>
      <div className="bg-neutral-900 text-white p-4 rounded leading-relaxed flex flex-wrap gap-1">
        {coloredParts.map((part, index) => (
          <span
            key={index}
            className={
              part.matched ? "text-green-400 font-semibold" : "text-white"
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
