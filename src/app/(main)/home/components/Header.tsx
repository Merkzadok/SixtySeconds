"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Menu, X, LucideIcon } from "lucide-react";
import Navigation from "./Navigation";
import ScoreDisplay from "./ScoreDisplay";
import ProfileAvatar from "./ProfileAvatar";
import MobileNavigation from "./MobileNavigation";

export type NavigationItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

interface HeaderProps {
  activeSection: string;
  setActiveSection: Dispatch<SetStateAction<string>>;
  navigationItems: NavigationItem[];
  userScore: number;
  userRating: number;
}

export default function Header({
  activeSection,
  setActiveSection,
  navigationItems,
  userScore,
  userRating,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="font-bold text-xl text-gray-800">LearnHub</span>
          </div>

          <Navigation
            navigationItems={navigationItems}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex">
              <ScoreDisplay userRating={userRating} userScore={userScore} />
            </div>
            <ProfileAvatar />
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <MobileNavigation
            navigationItems={navigationItems}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            userRating={userRating}
            userScore={userScore}
            closeMenu={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
}
