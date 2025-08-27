"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/Components/ui/button";
import {
  Menu,
  X,
  LucideIcon,
  Home,
  BookOpen,
  Gamepad2,
  Trophy,
  Crown,
  XCircle,
  Star,
} from "lucide-react";
import Navigation from "./Navigation";
import ProfileAvatar from "./ProfileAvatar";
import MobileNavigation from "./MobileNavigation";
import Link from "next/link";

export type NavigationItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
};

export default function MainHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userScore = 2847;
  const userRating = 4.8;

  const navigationItems: NavigationItem[] = [
    { id: "home", label: "Home", icon: Home, href: "/home" },
    { id: "reading", label: "Reading", icon: BookOpen, href: "/reading" },
    { id: "games", label: "Games", icon: Gamepad2, href: "/games" },
    {
      id: "leaderboard",
      label: "Leaderboard",
      icon: Trophy,
      href: "/leaderboard",
    },
    {
      id: "incorrect-words",
      label: "Incorrect Words",
      icon: XCircle,
      href: "/incorrect-words",
    },
    {
      id: "subscription",
      label: "Subscribe",
      icon: Star,
      href: "/subscription",
    },
  ];

  const getSectionFromPath = (path: string) => {
    if (path?.startsWith("/games")) return "games";
    if (path?.startsWith("/reading")) return "reading";
    if (path?.startsWith("/leaderboard")) return "leaderboard";
    if (path === "/" || path === "/home") return "home";
    if (path?.startsWith("/subscription")) return "subscription";
    if (path?.startsWith("/stats")) return "stats";
    if (path?.startsWith("/incorrect-words")) return "incorrect-words";
    return "home";
  };

  const [activeSection, setActiveSection] = useState(
    getSectionFromPath(pathname)
  );

  useEffect(() => {
    setActiveSection(getSectionFromPath(pathname));
  }, [pathname]);

  return (
    <header className="bg-[#B0DB9C] backdrop-blur-md border-b border-green-200 sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Logo + Nav */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/home">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <span
                    className="text-white font-black text-2xl"
                    role="img"
                    aria-label="owl"
                  >
                    🦉
                  </span>
                </div>
                <span className="font-black text-2xl text-green-900 tracking-tight drop-shadow">
                  SixtySeconds
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <Navigation
                navigationItems={navigationItems}
                activeSection={activeSection}
                setActiveSection={() => {}}
              />
            </div>
          </div>

          {/* Right side: Avatar + Mobile Menu */}
          <div className="flex items-center space-x-4">
            <ProfileAvatar />
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-green-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <MobileNavigation
          navigationItems={navigationItems}
          activeSection={activeSection}
          setActiveSection={() => {}}
          userRating={userRating}
          userScore={userScore}
          closeMenu={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}
