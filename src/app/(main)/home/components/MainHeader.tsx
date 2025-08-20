"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/Components/ui/button";
import {
  Menu,
  X,
  LucideIcon,
  Home,
  BookOpen,
  Gamepad2,
  Trophy,
  User,
  Crown,
} from "lucide-react";
import Navigation from "./Navigation";
import ScoreDisplay from "./ScoreDisplay";
import ProfileAvatar from "./ProfileAvatar";
import MobileNavigation from "./MobileNavigation";
import Link from "next/link";

export type NavigationItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
};

// interface HeaderProps {
//   activeSection: string;
//   setActiveSection: Dispatch<SetStateAction<string>>;
// }

export default function MainHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // All data is now internal to the Header component
  const userScore = 2847;
  const userRating = 4.8;

  const [activeSection, setActiveSection] = useState("home");

  const navigationItems: NavigationItem[] = [
    { id: "home", label: "Home", icon: Home, href: "/home" },
    { id: "reading", label: "Reading", icon: BookOpen, href: "/reading" },
    { id: "games", label: "Games", icon: Gamepad2, href: "/games" },
    {
      id: "leaderboard",
      label: "Leaderboard",
      icon: Trophy,
      href: "leaderboard",
    },
    // { id: "profile", label: "Profile", icon: User, href: "profile" },
  ];

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

            {/* Subscription Button */}
            <Button
              className="hidden md:flex items-center space-x-2 bg-gradient-to-r cursor-pointer from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() => {
                // Handle subscription logic here
                console.log("Subscribe clicked");
              }}
            >
              <Crown size={16} />
              <span>Subscribe</span>
            </Button>
            <Link href="/profile">
              <ProfileAvatar />
            </Link>
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
