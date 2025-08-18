// components/sections/GamesSection.tsx

import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Play, Star, Gamepad2, Target, BookOpen } from "lucide-react";

export default function GamesSection() {
  const games = [
    {
      title: "Word Safari",
      description:
        "Match words with adorable animals while exploring different habitats.",
      icon: Gamepad2,
      iconColor: "text-pink-500",
      borderColor: "border-pink-100 hover:border-pink-200",
      badge: { text: "Popular", color: "bg-pink-500 text-white" },
      rating: 5,
      ageRange: "Ages 4-8",
    },
    {
      title: "Speak & Shine",
      description:
        "Practice pronunciation with AI feedback and fun voice challenges.",
      icon: Target,
      iconColor: "text-emerald-500",
      borderColor: "border-emerald-100 hover:border-emerald-200",
      badge: { text: "New", color: "bg-emerald-500 text-white" },
      rating: 4,
      ageRange: "Ages 6-12",
    },
    {
      title: "Magic Tales",
      description:
        "Interactive stories where children choose their own language learning adventure.",
      icon: BookOpen,
      iconColor: "text-purple-500",
      borderColor: "border-purple-100 hover:border-purple-200",
      badge: null,
      rating: 5,
      ageRange: "Ages 5-10",
    },
  ];

  return (
    <section id="games" className="px-4 py-16 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-serif font-black text-3xl md:text-4xl text-gray-800">
            Explore Our Games
          </h2>
          <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
            Discover a world of interactive games designed to make language
            learning an adventure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <Card
              key={index}
              className={`${game.borderColor} transition-all duration-300 hover:shadow-lg group overflow-hidden`}
            >
              <div className="relative">
                <img
                  src="/wordle.webp"
                  alt={game.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {game.badge && (
                  <div className="absolute top-3 right-3">
                    <Badge className={game.badge.color}>
                      {game.badge.text}
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <game.icon className={`w-5 h-5 ${game.iconColor}`} />
                  <h3 className="font-serif font-bold text-lg text-gray-800">
                    {game.title}
                  </h3>
                </div>
                <p className="font-sans text-gray-600 text-sm">
                  {game.description}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < game.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-sans text-xs text-gray-500">
                    {game.ageRange}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Play className="w-5 h-5 mr-2" />
            Play All Games
          </Button>
        </div>
      </div>
    </section>
  );
}
