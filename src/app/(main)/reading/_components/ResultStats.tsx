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
  <div
    style={{
      marginTop: 30,
      padding: 15,
      backgroundColor: "#1d1c1cff",
      borderRadius: 8,
    }}
  >
    <h3>📊 Үр дүн:</h3>
    <p>Нийт үгс: {total}</p>
    <p>Зөв таарсан үгс: {matchCount}</p>
    <p>
      🎯 Нарийвчлал (Accuracy):{" "}
      <span
        style={{
          fontWeight: "bold",
          color: accuracy === "100.00" ? "green" : "orange",
        }}
      >
        {accuracy}%
      </span>
    </p>
    {children}
  </div>
);

export default ResultStats;
