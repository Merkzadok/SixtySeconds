// components/sections/ProfileSection.tsx
import { Card, CardContent } from "@/Components/ui/card";
import { User, Trophy, Star, Crown, Medal } from "lucide-react";

export default function ProfileSection() {
  const avatars = [
    { emoji: "🦄", bgColor: "from-pink-100 to-pink-200" },
    { emoji: "🐸", bgColor: "from-blue-100 to-blue-200" },
    { emoji: "🦋", bgColor: "from-yellow-100 to-yellow-200" },
  ];

  const badges = [
    {
      icon: Star,
      bgColor: "from-yellow-200 to-yellow-300",
      iconColor: "text-yellow-600",
    },
    {
      icon: Crown,
      bgColor: "from-pink-200 to-pink-300",
      iconColor: "text-pink-600",
    },
    {
      icon: Medal,
      bgColor: "from-purple-200 to-purple-300",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <section id="profile" className="px-4 py-16 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-serif font-black text-3xl md:text-4xl text-gray-800">
            Personalized Learning Journey
          </h2>
          <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
            Every child gets a unique profile that tracks their progress and
            celebrates their achievements.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Card className="border-purple-100 bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-gray-800">
                      Personal Avatar
                    </h3>
                    <p className="font-sans text-gray-600">
                      Customize your learning companion
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {avatars.map((avatar, index) => (
                    <div
                      key={index}
                      className={`aspect-square bg-gradient-to-br ${avatar.bgColor} rounded-xl flex items-center justify-center`}
                    >
                      <span className="text-2xl">{avatar.emoji}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50 to-white">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-full flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-gray-800">
                      Achievement Badges
                    </h3>
                    <p className="font-sans text-gray-600">
                      Collect rewards for milestones
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  {badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`w-12 h-12 bg-gradient-to-br ${badge.bgColor} rounded-full flex items-center justify-center`}
                    >
                      <badge.icon className={`w-6 h-6 ${badge.iconColor}`} />
                    </div>
                  ))}
                  <div className="w-12 h-12 bg-gray-100 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-400 text-xs">+5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative">
            <Card className="border-pink-100 bg-gradient-to-br from-pink-50 to-white shadow-xl">
              <CardContent className="p-8">
                <img
                  src="/wordle.webp"
                  alt="Profile Dashboard Preview"
                  className="w-full rounded-xl shadow-lg"
                />
              </CardContent>
            </Card>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full animate-bounce-gentle opacity-80"></div>
            <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full animate-float opacity-80"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
