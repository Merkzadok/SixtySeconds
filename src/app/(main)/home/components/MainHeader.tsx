"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/Components/ui/button";
import {
  Menu,
  X,
  LucideIcon,
  Home,
  BookOpen,
  Gamepad2,
  Trophy,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userScore = 2847;
  const userRating = 4.8;

  const navigationItems: NavigationItem[] = [
    { id: "home", label: "Нүүр хуудас", icon: Home, href: "/home" },
    { id: "reading", label: "Унших", icon: BookOpen, href: "/reading" },
    { id: "games", label: "Тоглоом", icon: Gamepad2, href: "/games" },
    {
      id: "leaderboard",
      label: "Шилдэг суралцагчид",
      icon: Trophy,
      href: "/leaderboard",
    },
    {
      id: "incorrect-words",
      label: "Алдаатай үгс",
      icon: XCircle,
      href: "/incorrect-words",
    },
    {
      id: "subscription",
      label: "Гишүүнчлэл",
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
          <div className="flex items-center space-x-8">
            <Link href="/home">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <span
                    className="text-white text-2xl"
                    role="img"
                    aria-label="owl"
                  >
                    🦉
                  </span>
                </div>

                <div className="flex gap-1 leading-none">
                  <p className="font-black text-xl text-green-900 drop-shadow">
                    60
                  </p>
                  <p className="font-black text-xl text-green-900 drop-shadow">
                    Секунд
                  </p>
                </div>
              </div>
            </Link>

            <div className="hidden md:block md:pr-2 ">
              <Navigation
                navigationItems={navigationItems}
                activeSection={activeSection}
                setActiveSection={() => {}}
              />
            </div>
          </div>

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
