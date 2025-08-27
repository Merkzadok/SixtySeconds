import MainHeader from "@/app/(main)/home/components/MainHeader";
import Leaderboard from "../components/leaderboard";
import ReadingStats from "@/app/(leaderboard)/components/ReadingStats";
import { User } from "lucide-react";
import UserAudio from "../components/UserAudio";

export default function LeaderboardSectionn() {
  return (
    <div className="min-h-screen">
      <MainHeader />
      <Leaderboard />
      <UserAudio />
    </div>
  );
}
