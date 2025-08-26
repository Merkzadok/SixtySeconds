"use client";
import { BarChart3, Clock, TrendingUp, Trophy } from "lucide-react";
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
      <div className=" flex flex-col items-center text-center mb-7 mt-12 ">
        <h1 className="text-6xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Амжилтын самбар
        </h1>
      </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 ">
          {/* Stats Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200">
                <BarChart3 className="h-8 w-8 text-blue-600 mb-3" />
                <div className="text-2xl font-bold text-blue-600">
                  {readingStats?.count}
                </div>
                <div className="text-sm text-gray-600">Reading</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200">
                <Trophy className="h-8 w-8 text-green-600 mb-3" />
                <div className="text-2xl font-bold text-green-600">21</div>
                <div className="text-sm text-gray-600">Exercises</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200">
                <Clock className="h-8 w-8 text-purple-600 mb-3" />

                <div className="text-2xl font-bold text-purple-600">
                  {readingStats?.averageDuration}m
                </div>

                <div className="text-2xl font-bold text-purple-600"></div>

                <div className="text-sm text-gray-600">This Week</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-yellow-200">
                <TrendingUp className="h-8 w-8 text-yellow-600 mb-3" />
                <div className="text-2xl font-bold text-yellow-600">
                  {readingStats?.averageAccuracy}%
                </div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ReadingStats;
