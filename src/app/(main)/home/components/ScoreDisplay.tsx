import { Star } from "lucide-react";

interface ScoreDisplayProps {
  userRating: number;
  userScore: number;
}

export default function ScoreDisplay({
  userRating,
  userScore,
}: ScoreDisplayProps) {
  return (
    <div className="flex items-center space-x-4 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-2 rounded-full">
      <div className="flex items-center space-x-1">
        <Star className="w-4 h-4 text-yellow-500 fill-current" />
        <span className="text-sm font-semibold text-gray-700">
          {userRating}
        </span>
      </div>
      <div className="w-px h-4 bg-gray-300"></div>
      <span className="text-sm font-bold text-gray-800">
        {userScore.toLocaleString()}
      </span>
    </div>
  );
}
