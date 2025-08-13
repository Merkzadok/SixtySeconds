import React, { useState } from "react";
import { Trophy, Medal, Star, Crown, TrendingUp } from "lucide-react";
import { AppPage } from "@/app/page";

interface LeaderboardProps {
  onNavigate: (page: AppPage) => void;
  user: {
    name: string;
    avatar: string;
    score: number;
  };
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onNavigate, user }) => {
  const [timeFilter, setTimeFilter] = useState<"week" | "month" | "all">(
    "week"
  );

  const allPlayers = [
    { name: "Alex", avatar: "👦", score: 920, lessonsCompleted: 15, streak: 7 },
    {
      name: "Emma",
      avatar: "👧",
      score: user.score,
      lessonsCompleted: 12,
      streak: 5,
    },
    { name: "Sam", avatar: "🧒", score: 780, lessonsCompleted: 10, streak: 3 },
    { name: "Maya", avatar: "👧", score: 750, lessonsCompleted: 11, streak: 4 },
    { name: "Jack", avatar: "👦", score: 720, lessonsCompleted: 9, streak: 6 },
    { name: "Lily", avatar: "👧", score: 680, lessonsCompleted: 8, streak: 2 },
    { name: "Noah", avatar: "👦", score: 650, lessonsCompleted: 7, streak: 1 },
    { name: "Zoe", avatar: "👧", score: 620, lessonsCompleted: 6, streak: 3 },
  ];

  const sortedPlayers = [...allPlayers].sort((a, b) => b.score - a.score);
  const userRank =
    sortedPlayers.findIndex((player) => player.name === user.name) + 1;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-orange-500" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number, isUser: boolean) => {
    if (isUser)
      return "bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-300";
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-300";
      case 2:
        return "bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-300";
      case 3:
        return "bg-gradient-to-r from-orange-100 to-orange-200 border-2 border-orange-300";
      default:
        return "bg-white border border-gray-200";
    }
  };

  const achievements = [
    { icon: "🏆", title: "Top Reader", description: "Highest score this week" },
    {
      icon: "🔥",
      title: "Streak Master",
      description: "7+ days reading streak",
    },
    {
      icon: "⭐",
      title: "Perfect Score",
      description: "100% accuracy in lesson",
    },
    { icon: "📚", title: "Book Lover", description: "Completed 20+ lessons" },
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-12 w-12 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Leaderboard</h1>
          </div>
          <p className="text-gray-600">
            See how you compare with other readers!
          </p>
        </div>

        {/* Time Filter */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            {(["week", "month", "all"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-6 py-2 rounded-xl font-semibold transition-all duration-200 ${
                  timeFilter === filter
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {filter === "week"
                  ? "This Week"
                  : filter === "month"
                  ? "This Month"
                  : "All Time"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            {/* Top 3 Podium */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-4 border-yellow-200">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                🏆 Top Readers 🏆
              </h2>
              <div className="flex items-end justify-center space-x-4 mb-8">
                {/* Second Place */}
                <div className="text-center">
                  <div className="bg-gradient-to-t from-gray-300 to-gray-200 rounded-t-xl p-4 h-16 flex items-center justify-center mb-2">
                    <Medal className="h-8 w-8 text-gray-500" />
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-gray-300">
                    <div className="text-3xl mb-2">
                      {sortedPlayers[1]?.avatar}
                    </div>
                    <div className="font-bold text-gray-800">
                      {sortedPlayers[1]?.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      ⭐ {sortedPlayers[1]?.score}
                    </div>
                  </div>
                </div>

                {/* First Place */}
                <div className="text-center">
                  <div className="bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-xl p-4 h-20 flex items-center justify-center mb-2">
                    <Crown className="h-10 w-10 text-yellow-600" />
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-yellow-400">
                    <div className="text-4xl mb-2">
                      {sortedPlayers[0]?.avatar}
                    </div>
                    <div className="font-bold text-gray-800">
                      {sortedPlayers[0]?.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      ⭐ {sortedPlayers[0]?.score}
                    </div>
                  </div>
                </div>

                {/* Third Place */}
                <div className="text-center">
                  <div className="bg-gradient-to-t from-orange-400 to-orange-300 rounded-t-xl p-4 h-12 flex items-center justify-center mb-2">
                    <Medal className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-orange-300">
                    <div className="text-3xl mb-2">
                      {sortedPlayers[2]?.avatar}
                    </div>
                    <div className="font-bold text-gray-800">
                      {sortedPlayers[2]?.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      ⭐ {sortedPlayers[2]?.score}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Rankings */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Full Rankings
              </h3>
              <div className="space-y-3">
                {sortedPlayers.map((player, index) => {
                  const rank = index + 1;
                  const isUser = player.name === user.name;

                  return (
                    <div
                      key={player.name}
                      className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-200 ${getRankBg(
                        rank,
                        isUser
                      )} ${isUser ? "scale-105 shadow-lg" : "hover:shadow-md"}`}
                    >
                      <div className="flex-shrink-0 w-12 flex justify-center">
                        {getRankIcon(rank)}
                      </div>

                      <div className="flex items-center space-x-3 flex-1">
                        <span className="text-2xl">{player.avatar}</span>
                        <div>
                          <div className="font-bold text-gray-800 flex items-center space-x-2">
                            <span>{player.name}</span>
                            {isUser && (
                              <span className="text-blue-600">(You!)</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            {player.lessonsCompleted} lessons • {player.streak}{" "}
                            day streak
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-lg text-gray-800">
                          ⭐ {player.score}
                        </div>
                        {player.streak >= 7 && (
                          <div className="text-orange-500 text-sm">
                            🔥 Hot Streak!
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Your Stats */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Your Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Current Rank</span>
                  <span className="font-bold text-2xl">#{userRank}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total Points</span>
                  <span className="font-bold">⭐ {user.score}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>This Week</span>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-bold text-green-200">+180</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Available Badges
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {achievement.title}
                      </div>
                      <div className="text-xs text-gray-600">
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Climb Higher!
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => onNavigate("reading")}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200"
                >
                  📚 Practice Reading
                </button>
                <button
                  onClick={() => onNavigate("exercises")}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
                >
                  🎮 Play Games
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
