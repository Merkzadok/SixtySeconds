"use client";

import Lottie from "lottie-react";
import flyingBird from "@/data/animations/flyingBird.json";
import Welcome from "@/data/animations/WelcomeAnimation.json";
import BrainAnimation from "@/data/animations/Meditating-Brain.json";

export default function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Shapes */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Large background circles */}
        <div className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-pink-100/30 to-purple-100/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-emerald-100/30 to-blue-100/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-yellow-100/20 to-orange-100/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Animated Icons - Top Layer */}
      <div className="absolute top-16 left-5 text-yellow-400 opacity-70 animate-bounce">
        <Lottie animationData={flyingBird} loop={true} className="w-30 h-30" />
      </div>

      <div className="absolute top-32 right-5 text-pink-400 opacity-60 animate-float">
        <Lottie animationData={Welcome} loop={true} className="w-30 h-30" />
      </div>

      <div className="absolute top-5 right-16 text-purple-400 opacity-50 animate-bounce delay-1000">
        <Lottie
          animationData={BrainAnimation}
          loop={true}
          className="w-20 h-20"
        />
      </div>
    </div>
  );
}
