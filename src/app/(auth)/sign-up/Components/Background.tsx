"use client";

import {
  Stars,
  Heart,
  Globe,
  Sparkles,
  Users,
  BookOpen,
  Target,
  Trophy,
  Music,
  Palette,
} from "lucide-react";

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
      <div className="absolute top-16 left-16 text-yellow-400 opacity-70 animate-bounce">
        <Stars size={28} className="drop-shadow-sm" />
      </div>

      <div className="absolute top-32 right-24 text-pink-400 opacity-60 animate-float">
        <Heart size={24} className="drop-shadow-sm" />
      </div>

      <div className="absolute top-1/4 right-16 text-purple-400 opacity-50 animate-bounce delay-1000">
        <BookOpen size={32} className="drop-shadow-sm" />
      </div>

      <div className="absolute top-1/2 left-8 text-blue-400 opacity-60 animate-float delay-500">
        <Users size={26} className="drop-shadow-sm" />
      </div>

      <div className="absolute bottom-1/3 left-24 text-green-400 opacity-70 animate-bounce delay-700">
        <Globe size={30} className="drop-shadow-sm" />
      </div>

      <div className="absolute bottom-24 right-32 text-purple-500 opacity-60 animate-float delay-300">
        <Sparkles size={28} className="drop-shadow-sm" />
      </div>

      <div className="absolute bottom-40 right-16 text-emerald-400 opacity-50 animate-bounce delay-1500">
        <Target size={24} className="drop-shadow-sm" />
      </div>

      <div className="absolute top-2/3 right-8 text-orange-400 opacity-60 animate-float delay-800">
        <Trophy size={26} className="drop-shadow-sm" />
      </div>

      {/* Additional decorative elements */}
      <div className="absolute top-1/3 left-1/4 text-cyan-400 opacity-40 animate-bounce delay-1200">
        <Music size={22} className="drop-shadow-sm" />
      </div>

      <div className="absolute bottom-1/2 left-16 text-rose-400 opacity-50 animate-float delay-600">
        <Palette size={24} className="drop-shadow-sm" />
      </div>

      {/* Small decorative dots */}
      <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-pink-300 rounded-full opacity-60 animate-ping"></div>
      <div className="absolute top-3/4 left-1/3 w-3 h-3 bg-purple-300 rounded-full opacity-50 animate-ping delay-1000"></div>
      <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-emerald-300 rounded-full opacity-60 animate-ping delay-2000"></div>
    </div>
  );
}
