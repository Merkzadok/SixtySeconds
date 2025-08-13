import React from "react";
import { BookOpen, Trophy, Star, Users } from "lucide-react";
import { AppPage } from "@/app/page";

interface HomePageProps {
  onNavigate: (page: AppPage) => void;
  user: {
    name: string;
    avatar: string;
    score: number;
    lessonsCompleted: number;
    exercisesCompleted: number;
  };
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, user }) => {
  const leaderboardPreview = [
    { name: "Alex", avatar: "👦", score: 920 },
    { name: "Emma", avatar: "👧", score: 850 },
    { name: "Sam", avatar: "🧒", score: 780 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4 border-blue-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">
            Reading Adventure
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate("leaderboard")}
              className="hidden sm:flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full hover:bg-yellow-200 transition-colors"
            >
              <Trophy className="h-4 w-4" />
              <span className="text-sm font-semibold">Rankings</span>
            </button>
            <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
              <span className="text-lg">{user.avatar}</span>
              <span className="font-semibold">{user.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8 relative">
              <div className="text-8xl mb-6 animate-bounce">📚</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-blue-200 rounded-full animate-pulse opacity-20"></div>
              </div>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Let's Read
              <span className="text-blue-600">!</span>
            </h2>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join Emma on an exciting reading adventure! Practice reading, play
              fun games, and become a reading champion!
            </p>

            <div className="space-y-4 mb-8">
              <button
                onClick={() => onNavigate("reading")}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                🚀 Start Reading!
              </button>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => onNavigate("exercises")}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md"
                >
                  🎮 Play Games
                </button>
                <button
                  onClick={() => onNavigate("parent")}
                  className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-md"
                >
                  👨‍👩‍👧 Parent Zone
                </button>
              </div>
            </div>

            {/* Progress Stats */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="bg-white rounded-xl p-4 shadow-md border-2 border-green-200">
                <BookOpen className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">
                  {user.lessonsCompleted}
                </div>
                <div className="text-sm text-gray-600">Lessons</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-2 border-purple-200">
                <Star className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">
                  {user.score}
                </div>
                <div className="text-sm text-gray-600">Points</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Leaderboard Preview */}
        <div className="lg:w-80 bg-white border-l-4 border-yellow-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Trophy className="h-6 w-6 text-yellow-600" />
            <h3 className="text-xl font-bold text-gray-800">Top Readers</h3>
          </div>

          <div className="space-y-4 mb-6">
            {leaderboardPreview.map((player, index) => (
              <div
                key={player.name}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0
                        ? "bg-yellow-100 text-yellow-800"
                        : index === 1
                        ? "bg-gray-100 text-gray-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{player.avatar}</span>
                    <span className="font-semibold text-gray-800">
                      {player.name}
                    </span>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-600">
                  ⭐ {player.score}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate("leaderboard")}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 py-3 px-4 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            View Full Rankings 🏆
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
