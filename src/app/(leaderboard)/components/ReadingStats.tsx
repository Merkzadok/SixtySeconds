"use client";
import { BarChart3, Clock, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Reading } from "../../../../types/types";
import { useUser } from "@/provider/CurrentUser";

const ReadingStats = () => {
  const [readingStats, setReadingStats] = useState<Reading>();
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    const readingCounter = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/gemini/stats/${user?.profileId}`
      );
      const data = await response.json();
      setReadingStats(data);
    };
    readingCounter();
  }, [user]);

  return (
    <div>
      <div className="flex flex-col items-center text-center mb-7 mt-12">
        <h1 className="text-4xl md:text-6xl font-bold  bg-[#2a7b9b]  bg-clip-text text-transparent mb-6">
          Амжилтын самбар
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* card heseg  */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200 min-h-[160px] flex flex-col items-center justify-center text-center">
          <BarChart3 className="h-10 w-10 text-blue-600 mb-4" />
          <div className="text-3xl font-bold text-blue-600">
            {readingStats?.count}
          </div>
          <div className="text-sm text-gray-600 mt-1">уншсан өгүүлбэр</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200 min-h-[160px] flex flex-col items-center justify-center text-center">
          <Clock className="h-10 w-10 text-purple-600 mb-4" />
          <div className="text-3xl font-bold text-purple-600">
            {readingStats?.averageDuration}
          </div>
          <div className="text-sm text-gray-600 mt-1">Энэ долоо хоногт</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-yellow-200 min-h-[160px] flex flex-col items-center justify-center text-center">
          <TrendingUp className="h-10 w-10 text-yellow-600 mb-4" />
          <div className="text-3xl font-bold text-yellow-600">
            {readingStats?.averageAccuracy}%
          </div>
          <div className="text-sm text-gray-600 mt-1">Нарийвчлал</div>
        </div>
      </div>
    </div>
  );
};

export default ReadingStats;
