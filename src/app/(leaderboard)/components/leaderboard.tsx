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
        <div className="rounded-2xl p-6 shadow-md  ">
          <h2 className="text-xl  mb-4. font-bold bg-gradient-to-r from-[#2a7b9b] via-[#57c785] to-[#eddd53] bg-clip-text text-transparent mb-6">
            Шилдэг суралцагчид
          </h2>
          <div className="space-y-4">
            {board.map((user, idx) => (
              <LeaderboardUser
                avatarImage={user.avatarImage}
                key={user.id}
                username={user.username}
                totalScore={user.totalScore}
                rank={idx + 1}
                isCurrentUser={
                  currentUser ? user.username === currentUser : false
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
