import { Crown, Star, Trophy, Zap } from "lucide-react";

type LeaderboardUserProps = {
  username: string;
  avatarImage: string;
  totalScore: number;
  rank: number;
  isCurrentUser: boolean;
};

export default function LeaderboardUser({
  username,
  avatarImage,
  totalScore,
  rank,
  isCurrentUser,
}: LeaderboardUserProps) {
  const getIcon = () => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-500 w-5 h-5" />;
      case 2:
        return <Trophy className="text-blue-500 w-5 h-5" />;
      case 3:
        return <Star className="text-orange-400 w-5 h-5" />;
      default:
        return <span className="text-gray-500 font-bold">#{rank}</span>;
    }
  };

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 shadow-md
        ${
          isCurrentUser
            ? "border-purple-500 bg-gradient-to-r from-purple-100 via-white to-purple-50 animate-pulse"
            : "border-gray-200 bg-white"
        }`}
    >
      <div className="flex items-center space-x-4">
        {getIcon()}
        <div className="text-2xl">
          <img
            src={avatarImage || "/avatar1.png"}
            alt={username}
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="relative">
          <p
            className={`font-semibold ${
              isCurrentUser ? "text-purple-800 font-bold" : "text-gray-800"
            }`}
          >
            {username}
          </p>

          {isCurrentUser && (
            <span className="absolute -top-3 -right-6 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
              Та
            </span>
          )}
        </div>
      </div>

      <div
        className={`flex items-center space-x-1 ${
          isCurrentUser ? "text-purple-700" : "text-gray-700"
        }`}
      >
        <Zap className="w-5 h-5 text-yellow-500" />
        <span className="font-mono text-md font-semibold">{totalScore}</span>
      </div>
    </div>
  );
}
