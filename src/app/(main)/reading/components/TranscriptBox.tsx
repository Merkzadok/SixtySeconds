import React from "react";

type Props = {
  fullTranscript: string;
  interimTranscript: string;
};

const TranscriptBox: React.FC<Props> = ({
  fullTranscript,
  interimTranscript,
}) => (
  <div className="min-h-[140px] p-6 rounded-3xl bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 shadow-lg relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse rounded-3xl pointer-events-none"></div>

    <div className="relative z-10 space-y-2">
      <h3 className="text-lg font-extrabold text-green-600 drop-shadow-sm">
        🗣️ Танигдсан текст:
      </h3>

      <p className="text-gray-900 font-semibold text-lg px-2 py-1 rounded-full bg-green-100 inline-block animate-[pop_0.4s_ease-out]">
        {fullTranscript || "Текстийг энд харуулна..."}
      </p>

      {interimTranscript && (
        <p className="text-gray-600 italic text-base animate-pulse">
          {interimTranscript}
        </p>
      )}
    </div>
  </div>
);

export default TranscriptBox;
