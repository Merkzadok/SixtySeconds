import React from "react";

type Props = {
  fullTranscript: string;
  interimTranscript: string;
};

const TranscriptBox: React.FC<Props> = ({
  fullTranscript,
  interimTranscript,
}) => (
  <div
    style={{
      minHeight: 120,
      border: "2px solid #ddd",
      borderRadius: 8,
      padding: 15,
      backgroundColor: "#252525ff",
      boxShadow: "inset 0 0 5px #ccc",
    }}
  >
    <h3>🗣️ Танигдсан текст:</h3>
    <p>{fullTranscript}</p>
    <p style={{ color: "#111111ff", fontStyle: "italic" }}>
      {interimTranscript}
    </p>
  </div>
);

export default TranscriptBox;
