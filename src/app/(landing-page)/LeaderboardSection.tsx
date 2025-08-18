// components/sections/LeaderboardSection.tsx

import { Badge } from "@/Components/ui/badge";
import { Card, CardContent } from "@/Components/ui/card";
import { Trophy, Crown, Medal, BarChart3, Target } from "lucide-react";

export default function LeaderboardSection() {
  const winners = [
    {
      name: "Emma L.",
      points: "2,450 points",
      language: "Spanish",
      position: "1st",
      icon: Crown,
      bgColor: "from-yellow-100 to-yellow-50",
      borderColor: "border-yellow-200",
      iconBg: "from-yellow-400 to-yellow-500",
      badgeColor: "bg-yellow-500 text-white",
      emoji: "🏆",
    },
    {
      name: "Alex M.",
      points: "2,180 points",
      language: "French",
      position: "2nd",
      icon: Medal,
      bgColor: "from-gray-100 to-gray-50",
      borderColor: "border-gray-200",
      iconBg: "from-gray-400 to-gray-500",
      badgeColor: "bg-gray-500 text-white",
      emoji: "🥈",
    },
    {
      name: "Sofia R.",
      points: "1,920 points",
      language: "Italian",
      position: "3rd",
      icon: Medal,
      bgColor: "from-orange-100 to-orange-50",
      borderColor: "border-orange-200",
      iconBg: "from-orange-400 to-orange-500",
      badgeColor: "bg-orange-500 text-white",
      emoji: "🥉",
    },
  ];

  return (
    <section
      id="leaderboard"
      className="px-4 py-16 md:px-6 bg-gradient-to-br from-yellow-50 to-orange-50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-serif font-black text-3xl md:text-4xl text-gray-800">
            Top Language Learners
          </h2>
          <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
            See how your child ranks among our amazing community of young
            language learners!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Top 3 Winners */}
          <div className="lg:col-span-2">
            <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-white shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  <h3 className="font-serif font-bold text-xl text-gray-800">
                    This Week's Champions
                  </h3>
                </div>

                <div className="space-y-4">
                  {winners.map((winner, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 bg-gradient-to-r ${winner.bgColor} rounded-xl border ${winner.borderColor}`}
                    >
                      <div
                        className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${winner.iconBg} rounded-full`}
                      >
                        <winner.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-lg text-gray-800">
                            {winner.name}
                          </span>
                          <Badge className={`${winner.badgeColor} text-xs`}>
                            {winner.position}
                          </Badge>
                        </div>
                        <p className="font-sans text-sm text-gray-600">
                          {winner.points} • {winner.language}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-serif font-bold text-xl text-yellow-600">
                          {winner.emoji}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Cards */}
          <div className="space-y-6">
            <Card className="border-pink-100 bg-gradient-to-br from-pink-50 to-white">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-200 to-pink-300 rounded-2xl flex items-center justify-center mx-auto">
                  <BarChart3 className="w-8 h-8 text-pink-600" />
                </div>
                <div>
                  <div className="font-serif font-black text-3xl text-gray-800">
                    15,000+
                  </div>
                  <p className="font-sans text-sm text-gray-600">
                    Active Learners
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50 to-white">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-2xl flex items-center justify-center mx-auto">
                  <Target className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <div className="font-serif font-black text-3xl text-gray-800">
                    12
                  </div>
                  <p className="font-sans text-sm text-gray-600">
                    Languages Available
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
