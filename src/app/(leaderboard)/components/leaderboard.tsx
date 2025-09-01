"use client";
import React, { useEffect, useState } from "react";
import LeaderboardUser from "./LeaderboardUser";
import ReadingStats from "./ReadingStats";
import { RankType } from "../../../../types/types";
import { useUser } from "@/provider/CurrentUser";

const LeaderBoard = () => {
  const [board, setBoard] = useState<RankType[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (!user?.profileId) return;

    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/leaderboard?userId=${user.profileId}`
        );
        const data = await response.json();
        const allUsers: RankType[] = data.result;

        const top5 = allUsers.slice(0, 5);

        const me = allUsers.find((u) => u.isCurrentUser);

        if (me) {
          const isInTop5 = top5.some((u) => u.id === me.id);
          setBoard(isInTop5 ? top5 : [...top5, me]);
        } else {
          setBoard(top5);
        }
      } catch (error) {
        console.error("Leaderboard fetch error:", error);
      }
    };

    fetchLeaderboard();
  }, [user?.profileId]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <ReadingStats />
        <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-md border-2 border-[#0AA84C] overflow-y-auto">
          <h2 className="text-xl font-bold bg-gradient-to-r from-[#2a7b9b] via-[#57c785] to-[#eddd53] bg-clip-text text-transparent mb-6">
            Шилдэг суралцагчид
          </h2>
          <div className="space-y-4">
            {board.map((user, idx) => (
              <LeaderboardUser
                key={user.id}
                avatarImage={user.avatarImage}
                username={user.username}
                totalScore={user.totalScore}
                isCurrentUser={user.isCurrentUser}
                rank={user.isCurrentUser && idx === 5 ? user.rank : idx + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
