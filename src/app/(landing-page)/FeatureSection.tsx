"use client";
// components/sections/FeaturesSection.tsx
import { Card, CardContent } from "@/Components/ui/card";

import Welcome from "@/data/animations/WelcomeAnimation.json";
import ReadingBook from "@/data/animations/ReadingBook.json";
import Rank from "@/data/animations/Rank.json";
import Lottie from "lottie-react";

export default function FeaturesSection() {
  const features = [
    {
      animation: ReadingBook,
      title: "Interactive Lessons",
      description:
        "Engaging stories and games that adapt to your child's learning pace and style.",
      bgColor: "from-pink-200 to-pink-300",
      iconColor: "text-pink-600",
      borderColor: "border-pink-100 hover:border-pink-200",
    },
    {
      animation: Welcome,
      title: "Fun Challenges",
      description:
        "Exciting quests and mini-games that reward progress and build confidence.",
      bgColor: "from-emerald-200 to-emerald-300",
      iconColor: "text-emerald-600",
      borderColor: "border-emerald-100 hover:border-emerald-200",
    },
    {
      animation: Rank,
      title: "Progress Tracking",
      description:
        "Parents can monitor learning milestones and celebrate achievements together.",
      bgColor: "from-purple-200 to-purple-300",
      iconColor: "text-purple-600",
      borderColor: "border-purple-100 hover:border-purple-200",
    },
  ];

  return (
    <section className="px-4 py-16 md:px-6 bg-white/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-serif font-black text-3xl md:text-4xl text-gray-800">
            Why Children Love SixtySeconds
          </h2>
          <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
            Our carefully designed features make language learning feel like
            play, not work.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`${feature.borderColor} transition-all duration-300 hover:shadow-lg group`}
            >
              <CardContent className="p-8 text-center space-y-4">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}
                >
                  <Lottie
                    animationData={feature.animation}
                    loop={true}
                    autoplay={true}
                    className="w-12 h-12"
                  />
                </div>
                <h3 className="font-serif font-bold text-xl text-gray-800">
                  {feature.title}
                </h3>
                <p className="font-sans text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
