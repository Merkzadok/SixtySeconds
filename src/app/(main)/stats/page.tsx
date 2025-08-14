"use client";
import { BarChart3, Clock, TrendingUp, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { Reading } from "../../../../types/types";

const StatsPage = () => {
  const [duration, setDuration] = useState<Reading[]>([]);
  const [readingCount, setReadingCount] = useState<Number | null>(null);
  const [endTime, setEndTime] = useState<Reading>();
  console.log(typeof readingCount);

  // useEffect(() => {
  //   const readingCounter = async () => {
  //     const response = await fetch("http://localhost:4001/gemini/count/1");
  //     const data = await response.json();
  //     console.log("count", data);
  //     setReadingCount(Number(data?.count));
  //   };
  //   readingCounter();
  // }, []);

  // useEffect(() => {
  //   const durationStats = async () => {
  //     try {
  //       const response = await fetch("http://localhost:4001/gemini/1", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //       });
  //       const data = await response.json();
  //       console.log("data", data);
  //       setDuration(data?.startTime);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   durationStats();
  // }, []);

  useEffect(() => {
    const finishStats = async () => {
      const response = await fetch("http://localhost:4001/gemini/finish/2", {
        method: "PUT",
        body: JSON.stringify({ accuracy: 85 }),
      });
      const data = await response.json();
      console.log("endtime", data);
      setEndTime(data);
    };
    finishStats();
  }, []);
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Parent Dashboard
          </h1>
          <p className="text-gray-600">
            Track User's reading progress and achievements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Stats Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200">
                <BarChart3 className="h-8 w-8 text-blue-600 mb-3" />
                <div className="text-2xl font-bold text-blue-600">
                  {/* {readingCount} {endTime} */}
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
                  {/* {duration}m */}
                </div>
                <div className="text-sm text-gray-600">This Week</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-yellow-200">
                <TrendingUp className="h-8 w-8 text-yellow-600 mb-3" />
                <div className="text-2xl font-bold text-yellow-600">70%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
