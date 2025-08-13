import React, { useState } from "react";
import { BarChart3, Clock, Trophy, Gift, Play, TrendingUp } from "lucide-react";
import { AppPage } from "@/app/page";

interface ParentDashboardProps {
  onNavigate: (page: AppPage) => void;
  user: {
    name: string;
    score: number;
    lessonsCompleted: number;
    exercisesCompleted: number;
  };
  setUser: (user: any) => void;
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({
  onNavigate,
  user,
  setUser,
}) => {
  const [showRewardSent, setShowRewardSent] = useState(false);

  // Mock data for child's progress
  const weeklyProgress = [
    { day: "Mon", lessons: 2, exercises: 5, timeSpent: 25 },
    { day: "Tue", lessons: 1, exercises: 3, timeSpent: 20 },
    { day: "Wed", lessons: 3, exercises: 7, timeSpent: 35 },
    { day: "Thu", lessons: 2, exercises: 4, timeSpent: 30 },
    { day: "Fri", lessons: 2, exercises: 6, timeSpent: 28 },
    { day: "Sat", lessons: 1, exercises: 2, timeSpent: 15 },
    { day: "Sun", lessons: 1, exercises: 1, timeSpent: 12 },
  ];

  // Get recent recordings from user data
  const recentRecordings = (user as any).recordings || [
    {
      sentence: "The cat sat on the mat.",
      accuracy: 95,
      date: "Today 3:45 PM",
      audioUrl: null,
    },
    {
      sentence: "I love to read books.",
      accuracy: 88,
      date: "Today 3:30 PM",
      audioUrl: null,
    },
    {
      sentence: "The sun is shining bright.",
      accuracy: 92,
      date: "Yesterday 4:15 PM",
      audioUrl: null,
    },
  ];

  const sendReward = () => {
    setShowRewardSent(true);
    setUser({ ...user, score: user.score + 100 });
    setTimeout(() => setShowRewardSent(false), 3000);
  };

  const totalTimeSpent = weeklyProgress.reduce(
    (acc, day) => acc + day.timeSpent,
    0
  );
  const averageAccuracy = Math.round(
    recentRecordings.reduce((acc, rec) => acc + rec.accuracy, 0) /
      recentRecordings.length
  );

  const formatDate = (timestamp: string) => {
    if (!timestamp) return "Earlier";
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {showRewardSent && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-yellow-200 animate-bounce">
            <div className="text-6xl mb-4">🎁</div>
            <h3 className="text-2xl font-bold text-yellow-600 mb-2">
              Reward Sent!
            </h3>
            <p className="text-gray-600">
              {user.name} received 100 bonus points!
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Parent Dashboard
          </h1>
          <p className="text-gray-600">
            Track {user.name}'s reading progress and achievements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Stats Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200">
                <BarChart3 className="h-8 w-8 text-blue-600 mb-3" />
                <div className="text-2xl font-bold text-blue-600">
                  {user.lessonsCompleted}
                </div>
                <div className="text-sm text-gray-600">Lessons</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200">
                <Trophy className="h-8 w-8 text-green-600 mb-3" />
                <div className="text-2xl font-bold text-green-600">
                  {user.exercisesCompleted}
                </div>
                <div className="text-sm text-gray-600">Exercises</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200">
                <Clock className="h-8 w-8 text-purple-600 mb-3" />
                <div className="text-2xl font-bold text-purple-600">
                  {totalTimeSpent}m
                </div>
                <div className="text-sm text-gray-600">This Week</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-yellow-200">
                <TrendingUp className="h-8 w-8 text-yellow-600 mb-3" />
                <div className="text-2xl font-bold text-yellow-600">
                  {averageAccuracy}%
                </div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
            </div>

            {/* Weekly Progress Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Weekly Activity
              </h3>
              <div className="flex items-end justify-between h-32 border-b border-gray-200">
                {weeklyProgress.map((day) => (
                  <div
                    key={day.day}
                    className="flex flex-col items-center space-y-2"
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <div
                        className="w-6 bg-blue-500 rounded-t"
                        style={{ height: `${(day.lessons / 3) * 60}px` }}
                      />
                      <div
                        className="w-6 bg-green-500 rounded-t"
                        style={{ height: `${(day.exercises / 7) * 60}px` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">{day.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Lessons</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Exercises</span>
                </div>
              </div>
            </div>

            {/* Recent Reading Recordings */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Recent Reading Practice
              </h3>
              <div className="space-y-4">
                {recentRecordings.map((recording, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">
                        "{recording.sentence}"
                      </div>
                      <div className="text-sm text-gray-500">
                        {recording.timestamp
                          ? formatDate(recording.timestamp)
                          : recording.date}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          recording.accuracy >= 90
                            ? "bg-green-100 text-green-800"
                            : recording.accuracy >= 80
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {recording.accuracy}%
                      </div>
                      {recording.audioUrl ? (
                        <div className="flex items-center space-x-2">
                          <audio controls className="h-8">
                            <source src={recording.audioUrl} type="audio/wav" />
                          </audio>
                        </div>
                      ) : (
                        <button className="p-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed">
                          <Play className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reward & Actions */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 shadow-lg text-white">
              <Gift className="h-8 w-8 mb-4" />
              <h3 className="text-xl font-bold mb-2">Send a Reward</h3>
              <p className="text-yellow-100 mb-4">
                Give {user.name} extra points for great work!
              </p>
              <button
                onClick={sendReward}
                className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 backdrop-blur-sm"
              >
                🎁 Send 100 Points
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => onNavigate("leaderboard")}
                  className="w-full bg-purple-100 text-purple-700 py-3 px-4 rounded-xl font-semibold hover:bg-purple-200 transition-colors"
                >
                  View Leaderboard
                </button>
                <button
                  onClick={() => onNavigate("reading")}
                  className="w-full bg-blue-100 text-blue-700 py-3 px-4 rounded-xl font-semibold hover:bg-blue-200 transition-colors"
                >
                  Start Reading Practice
                </button>
                <button
                  onClick={() => onNavigate("exercises")}
                  className="w-full bg-green-100 text-green-700 py-3 px-4 rounded-xl font-semibold hover:bg-green-200 transition-colors"
                >
                  Practice Exercises
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Achievements
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl">📚</div>
                  <div>
                    <div className="font-semibold text-green-800">
                      Reading Star
                    </div>
                    <div className="text-sm text-green-600">
                      Completed 10+ lessons
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <div className="font-semibold text-blue-800">
                      Accuracy Expert
                    </div>
                    <div className="text-sm text-blue-600">
                      90%+ reading accuracy
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl">🏆</div>
                  <div>
                    <div className="font-semibold text-yellow-800">
                      Daily Reader
                    </div>
                    <div className="text-sm text-yellow-600">7 days streak</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
