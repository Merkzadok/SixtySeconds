// components/layout/Header.tsx
import { Button } from "@/Components/ui/button";
import { Sparkles } from "lucide-react";

export default function LandingHeader() {
  return (
    <header className="px-4 py-6 md:px-6 sticky top-0 bg-white/80 backdrop-blur-sm border-b border-pink-100 z-50">
      <nav className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-300 to-emerald-300 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-serif font-black text-xl text-gray-800">
            LinguaPlay
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#games"
            className="font-sans text-gray-600 hover:text-pink-600 transition-colors"
          >
            Games
          </a>
          <a
            href="#leaderboard"
            className="font-sans text-gray-600 hover:text-pink-600 transition-colors"
          >
            Leaderboard
          </a>
          <a
            href="#profile"
            className="font-sans text-gray-600 hover:text-pink-600 transition-colors"
          >
            Profile
          </a>
        </div>
        <Button
          variant="outline"
          className="border-pink-200 text-pink-600 hover:bg-pink-50 bg-transparent"
        >
          Sign In
        </Button>
      </nav>
    </header>
  );
}
