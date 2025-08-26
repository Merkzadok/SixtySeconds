import MainHeader from "@/app/(main)/home/components/MainHeader";
import Leaderboard from "../components/leaderboard";
import ReadingStats from "@/app/(leaderboard)/components/ReadingStats";

export default function LeaderboardSectionn() {
  return (
    <div className="min-h-screen">
      <MainHeader />
        <Leaderboard />
    </div>
  );
}
