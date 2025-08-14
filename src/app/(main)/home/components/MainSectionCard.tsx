import Lottie from "lottie-react";
import { BookOpen, Gamepad2, Trophy } from "lucide-react";

import BrainAnimation from "/Users/25LP1749/Desktop/final-project/final-project/public/Meditating-Brain.json";
import GamesAnimation from "/Users/25LP1749/Desktop/final-project/final-project/public/game-app.json";
import RankingsAnimation from "/Users/25LP1749/Desktop/final-project/final-project/public/Rank.json";

export type MainSectionItem = {
  id: string;
  label: string;
  description: string;
  gradient: string;
  bgPattern: string;
};

interface MainSectionCardProps {
  item: MainSectionItem;
  onClick: (id: string) => void;
}

export default function MainSectionCard({
  item,
  onClick,
}: MainSectionCardProps) {
  // Get the appropriate animation based on item id
  const getAnimation = (id: string) => {
    switch (id) {
      case "games":
        return GamesAnimation;
      case "reading":
        return BrainAnimation;
      case "rankings":
        return RankingsAnimation;
      default:
        return BrainAnimation; // fallback animation
    }
  };

  // Fallback icons for the button (you can also use small Lottie animations here if you want)
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

  const animationData = getAnimation(item.id);
  const ButtonIcon = getButtonIcon(item.id);

  return (
    <div className="group cursor-pointer" onClick={() => onClick(item.id)}>
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
            className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}
          >
            <Lottie
              animationData={animationData}
              loop={true}
              className="w-20 h-20"
            />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            {item.label}
          </h3>
          <p className="text-gray-700 text-base font-medium leading-relaxed">
            {item.description}
          </p>
          <div className="mt-6">
            <div
              className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${item.gradient} text-white rounded-full text-sm font-semibold shadow-md group-hover:shadow-lg transition-all duration-300`}
            >
              Start {item.label}
              <ButtonIcon className="w-4 h-4 ml-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
