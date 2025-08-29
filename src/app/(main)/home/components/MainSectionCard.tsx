"use client";

import Lottie from "lottie-react";
import { BookOpen, Gamepad2, Trophy } from "lucide-react";
import GameApp from "@/data/animations/game-app.json";
import MeditatingBrain from "@/data/animations/ReadingBook.json";
import Rank from "@/data/animations/Rank.json";

export type MainSectionItem = {
  id: string;
  label: string;
  description: string;
  gradient: string;
  bgPattern: string;
};

interface MainSectionCardProps {
  item: MainSectionItem;
}

export default function MainSectionCard({ item }: MainSectionCardProps) {
  const getAnimationData = (id: string) => {
    switch (id) {
      case "games":
        return GameApp;
      case "reading":
        return MeditatingBrain;
      case "rankings":
        return Rank;
      default:
        return MeditatingBrain;
    }
  };

  const getButtonIcon = (id: string) => {
    switch (id) {
      case "games":
        return Gamepad2;
      case "reading":
        return BookOpen;
      case "rankings":
        return Trophy;
      default:
        return BookOpen;
    }
  };

  const animationData = getAnimationData(item.id);
  const ButtonIcon = getButtonIcon(item.id);

  return (
    <div className="group cursor-pointer">
      <div
        className={`${item.bgPattern} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:scale-105 relative overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/30"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/20"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full bg-white/15 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative z-10">
          <div
            className={`w-30 h-30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}
          >
            {animationData ? (
              <Lottie
                animationData={animationData}
                loop
                className="w-35 h-35"
              />
            ) : (
              <ButtonIcon className="w-10 h-10 text-white animate-pulse" />
            )}
          </div>

          <h3 className="text-3xl font-bold text-gray-800 mb-3">
            {item.label}
          </h3>
          <p className="text-gray-700 text-2xl font-medium leading-relaxed">
            {item.description}
          </p>

          <div className="mt-6">
            <div className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm font-semibold shadow-md group-hover:shadow-lg transition-all duration-300">
              {item.label}
              <ButtonIcon className="w-4 h-4 ml-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
