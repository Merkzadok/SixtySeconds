"use client";
import React from "react";
import { motion } from "framer-motion";
import { Trophy, BarChart3, Book } from "lucide-react";
import LeaderboardUser from "./LeaderboardUser";
import MainHeader from "@/app/(main)/home/components/MainHeader";

const users = [
  { name: "Emma", lessons: 12, points: 980, rank: 1 },
  { name: "Liam", lessons: 10, points: 850, rank: 2 },
  { name: "Olivia", lessons: 9, points: 790, rank: 3 },
  { name: "Noah", lessons: 7, points: 720, rank: 4 },
];

const currentUser = "Liam";

const LeaderBoard = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 ">
     <MainHeader />
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
        >Leaderboard</h1>
        <p className="text-muted-foreground text-lg md:text-xl mt-2">
          See how you compare with other learners!
        </p>
      </div>

      {/* Rankings */}
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Top Learners</h2>
          <div className="space-y-4">
            {users.map((user, idx) => (
              <LeaderboardUser
                key={idx}
                name={user.name}
                lessons={user.lessons}
                points={user.points}
                rank={user.rank}
                isCurrentUser={user.name === currentUser}
              />
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white/90 backdrop-blur rounded-xl p-6 shadow border border-gray-200 hover:shadow-md transition">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center mb-3">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div className="text-xl font-bold">Active Learners</div>
              <div className="text-sm text-gray-600">99 learners</div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur rounded-xl p-6 shadow border border-gray-200 hover:shadow-md transition">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center mb-3">
                <Book className="w-7 h-7 text-white" />
              </div>
              <div className="text-xl font-bold">Book Lovers</div>
              <div className="text-sm text-gray-600">20+ lessons completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
