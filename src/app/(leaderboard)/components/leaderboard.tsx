"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Crown, Trophy, Star, BarChart3, Globe } from "lucide-react";

interface User {
  id: number;
  name: string;
  avatar: string;
  lessons: number;
  points: number;
  isCurrentUser?: boolean;
}

interface Statistics {
  activelearners: number;
  languagesAvailable: number;
}

const LeaderBoard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<Statistics>({
    activelearners: 0,
    languagesAvailable: 0,
  });

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setStats(data.stats);
      });
  }, []);

  const getCardStyles = (position: number) => {
    switch (position) {
      case 1: return "bg-yellow-100 border-yellow-400";
      case 2: return "bg-blue-100 border-blue-400";
      case 3: return "bg-orange-100 border-orange-400";
      default: return "bg-white/80 border-gray-200 hover:border-gray-300";
    }
  };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="w-6 h-6 text-yellow-600" />;
      case 2: return <Trophy className="w-6 h-6 text-blue-600" />;
      case 3: return <Star className="w-6 h-6 text-orange-600" />;
      default: return <span className="text-gray-500 font-bold text-lg">#{position}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFE6] py-12 px-6">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <motion.div
          animate={{ rotate: [0, -15, 15, -10, 10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
        >
          <Trophy className="w-12 h-12 text-yellow-500 mb-4" />
        </motion.div>
        <h1 className="text-4xl font-bold">Leaderboard</h1>
        <p className="text-gray-600 mt-2 text-lg">
          See how you compare with other readers!
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* Full Rankings */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Full Rankings</h2>
          <div className="space-y-4">
            {users.map((user, idx) => (
              <div
                key={user.id}
                className={`p-4 rounded-xl border-2 ${getCardStyles(idx + 1)} ${
                  user.isCurrentUser ? "ring-2 ring-purple-400" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getRankIcon(idx + 1)}
                    <div className="text-3xl">{user.avatar}</div>
                    <div>
                      <h3 className="font-bold text-lg">
                        {user.name} {user.isCurrentUser && "(You!)"}
                      </h3>
                      <p className="text-gray-600 text-sm">{user.lessons} lessons</p>
                    </div>
                  </div>
                  <div className="text-xl font-bold">{user.points}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold mb-1">{stats.activelearners}</div>
              <div className="text-gray-600 text-sm">Active Learners</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold mb-1">{stats.languagesAvailable}</div>
              <div className="text-gray-600 text-sm">Languages Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
