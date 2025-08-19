import React from "react";

type Props = {
  fullTranscript: string;
  interimTranscript: string;
};

const TranscriptBox: React.FC<Props> = ({
  fullTranscript,
  interimTranscript,
}) => (
  <div className="min-h-[120px] p-4 rounded-xl bg-gray-100 shadow-inner space-y-2">
    <h3 className="text-base font-bold text-gray-800">🗣️ Танигдсан текст:</h3>
    <p className="text-gray-900 text-base font-medium">{fullTranscript}</p>
    <p className="text-gray-600 italic">{interimTranscript}</p>
  </div>
);

export default TranscriptBox;
