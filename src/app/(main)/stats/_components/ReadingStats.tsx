"use client";

import { BarChart3, Clock, TrendingUp, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { Reading } from "../../../../../types/types";
import { useUser } from "@/provider/CurrentUser";

const ReadingStats = () => {
  const [readingStats, setReadingStats] = useState<Reading>();
  const { user } = useUser();
  const [record, setRecord] = useState<{
    readingId: number;
    audioUrl: string;
  } | null>(null);

  useEffect(() => {
    if (!user) return;

    // Stats-г авч ирэх
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `http://localhost:4001/gemini/stats/${user.profileId}`
        );
        const data = await response.json();
        setReadingStats(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, [user]);

  // Audio URL-г хадгалах функц (VoiceRecorder callback-аас дуудаж хэрэглэнэ)
  const handleSaveAndNext = async () => {
    if (!record) return;

    try {
      const response = await fetch(
        `http://localhost:4001/gemini/finish/${record.readingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(record),
        }
      );
      const data = await response.json();
      console.log("Saved record:", data);
      setRecord({
        readingId: record.readingId,
        audioUrl: data.audioUrl, // Cloudinary URL
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Stats Dashboard
          </h1>
          <p className="text-gray-600">
            Track User's reading progress and achievements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
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

        {/* Audio/Video Preview */}
        {record?.audioUrl && (
          <div className="mt-6 text-center">
            <h2 className="text-lg font-semibold mb-2">Your Last Recording</h2>
            <video
              src={record.audioUrl} // Cloudinary URL
              controls
              className="mx-auto rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingStats;
