import { Crown, Star, Trophy, Zap } from "lucide-react";

type LeaderboardUserProps = {
  name: string;
  lessons: number;
  points: number;
  rank: number;
  isCurrentUser: boolean;
};

export default function LeaderboardUser({
  name,
  lessons,
  points,
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
      className={`flex items-center justify-between p-4 rounded-lg border-2 
      ${
        isCurrentUser
          ? "border-purple-400 bg-purple-50"
          : "border-gray-200 bg-white/80"
      } 
      transition-all duration-200 shadow-sm`}
    >
      <div className="flex items-center space-x-4">
        {getIcon()}
        <div className="text-2xl">
          <img 
          src="/avatars/avatar6.png" 
          alt="" 
  className="w-10 h-10 rounded-full"
/>
        </div>
        <div>
          <p className="font-semibold text-gray-800">{name}</p>
          <p className="text-sm text-gray-500">{lessons} хичээл</p>
        </div>
      </div>

      <div className="flex items-center space-x-1 text-gray-700">
          <Zap className="text-yellow-500 w-5 h-5" />
        <span className="font-Monaco text-md ">{points}</span>
      </div>
    </div>
  );
}
