import React from "react";

type Props = {
  matchCount: number;
  total: number;
  accuracy: string;
  children?: React.ReactNode;
};

const ResultStats: React.FC<Props> = ({
  matchCount,
  total,
  accuracy,
  children,
}) => (
  <div className="bg-violet-100 border border-violet-300 p-4 rounded-xl text-gray-900 shadow-inner space-y-2">
    <h3 className="text-lg font-semibold text-purple-700">📊 Үр дүн:</h3>
    <p>
      🔠 <span className="font-medium">Нийт үгс:</span>{" "}
      <span className="text-gray-800 font-semibold">{total}</span>
    </p>
    <p>
      ✅ <span className="font-medium">Зөв таарсан үгс:</span>{" "}
      <span className="text-gray-800 font-semibold">{matchCount}</span>
    </p>
    <p>
      🎯{" "}
      <span className="font-bold text-orange-600">Нарийвчлал (Accuracy):</span>{" "}
      <span
        className={
          accuracy === "100.00"
            ? "text-green-600 font-bold"
            : "text-orange-500 font-bold"
        }
      >
        {accuracy}%
      </span>
    </p>
    {children}
  </div>
);

export default ResultStats;
