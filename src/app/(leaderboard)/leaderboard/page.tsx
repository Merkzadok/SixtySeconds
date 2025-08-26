import MainHeader from "@/app/(main)/home/components/MainHeader";
import Leaderboard from "../components/leaderboard";
import ReadingStats from "@/app/(leaderboard)/components/ReadingStats";

export default function LeaderboardSectionn() {
  return (
    <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 min-h-screen">
      <MainHeader />
        <Leaderboard />
    </div>
  );
}
