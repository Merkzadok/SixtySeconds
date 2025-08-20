import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { BookOpen, Gamepad2, Trophy } from "lucide-react";

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
  const [animationData, setAnimationData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Get the appropriate animation file path from public folder
  const getAnimationPath = (id: string) => {
    switch (id) {
      case "games":
        return "/game-app.json"; // Your games animation file
      case "reading":
        return "/Meditating-Brain.json"; // Your brain animation file
      case "rankings":
        return "/Rank.json"; // Your rankings animation file
      default:
        return "/Meditating-Brain.json";
    }
  };

  // Load animation data dynamically
  useEffect(() => {
    const loadAnimation = async () => {
      try {
        setLoading(true);
        const response = await fetch(getAnimationPath(item.id));
        if (response.ok) {
          const data = await response.json();
          setAnimationData(data);
        } else {
          console.error("Failed to load animation:", response.status);
        }
      } catch (error) {
        console.error("Error loading animation:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAnimation();
  }, [item.id]);

  // Fallback icons
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
            className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            ) : animationData ? (
              <Lottie
                animationData={animationData}
                loop={true}
                className="w-12 h-12"
              />
            ) : (
              <ButtonIcon className="w-10 h-10 text-white animate-pulse" />
            )}
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
