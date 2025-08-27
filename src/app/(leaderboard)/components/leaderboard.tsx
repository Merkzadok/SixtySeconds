"use client";
import React, { useEffect, useState } from "react";
import { BarChart3, Book } from "lucide-react";
import LeaderboardUser from "./LeaderboardUser";
import ReadingStats from "./ReadingStats";
import { RankType } from "../../../../types/types";
import { useUser } from "@/provider/CurrentUser";

const LeaderBoard = () => {
  const [board, setBoard] = useState<RankType[]>([]);
  const { user } = useUser();
  useEffect(() => {
    const showRank = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/leaderboard`
      );
      const data = await response.json();
      console.log("dad", data);
      setBoard(data.result);
    };
    showRank();
    fetchCurrentUser();
  }, []);

  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const fetchCurrentUser = async () => {
    if (!user) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/${user.profileId}`
      );
      const data = await response.json();
      setCurrentUser(data.username);
    } catch (error) {}
  };

  return (
    <div className="max-w-6xl mx-auto px-4 ">
      <div className="max-w-3xl mx-auto space-y-8">
        <ReadingStats />
        <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-md border-2 border-[#0AA84C]  max-h-[400px] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4. font-bold bg-gradient-to-r from-[#2a7b9b] via-[#57c785] to-[#eddd53] bg-clip-text text-transparent mb-6">
            Шилдэг суралцагчид
          </h2>
          <div className="space-y-4 h-[400px]">
            {board.map((user, idx) => (
              <LeaderboardUser
                avatarImage={user.avatarImage}
                key={user.id}
                username={user.username}
                // lessons={user.lessons}
                totalScore={user.totalScore}
                rank={idx + 1}
                isCurrentUser={
                  currentUser ? user.username === currentUser : false
                }
              />
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-xl p-6 shadow border border-gray-200 hover:shadow-md transition">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center mb-3">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div className="text-xl font-bold">Идэвхтэй суралцагчид</div>
              <div className="text-sm text-gray-600">99 суралцагч</div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur rounded-xl p-6 shadow border border-gray-200 hover:shadow-md transition">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center mb-3">
                <Book className="w-7 h-7 text-white" />
              </div>
              <div className="text-xl font-bold">Номд дурлагчид</div>
              <div className="text-sm text-gray-600">20+ хичээл судалсан</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
