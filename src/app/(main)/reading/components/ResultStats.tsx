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
  <div className="relative p-6 rounded-3xl bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 border border-green-200 shadow-lg space-y-3 hover:scale-[1.02] transition-transform duration-300">
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/30 via-white/10 to-white/30 animate-pulse pointer-events-none"></div>

    <div className="relative z-10">
      <h3 className="text-2xl font-extrabold text-green-600 drop-shadow-sm animate-[bounce_0.6s_ease-in-out]">
        📊 Үр дүн:
      </h3>

      <p className="text-lg mt-2">
        🔠 <span className="font-medium text-blue-600">Нийт үгс:</span>{" "}
        <span className="text-gray-900 font-bold">{total}</span>
      </p>

      <p className="text-lg">
        ✅ <span className="font-medium text-green-600">Зөв таарсан үгс:</span>{" "}
        <span className="text-green-700 font-bold animate-[pop_0.5s_ease-out]">
          {matchCount}
        </span>
      </p>

      <p className="text-lg">
        🎯{" "}
        <span className="font-semibold text-orange-500">
          Нарийвчлал (Accuracy):
        </span>{" "}
        <span
          className={`font-bold animate-[pop_0.5s_ease-out] ${
            accuracy === "100.00" ? "text-green-600" : "text-orange-500"
          }`}
        >
          {accuracy}%
        </span>
      </p>

      {children && <div className="pt-2">{children}</div>}
    </div>
  </div>
);

export default ResultStats;
