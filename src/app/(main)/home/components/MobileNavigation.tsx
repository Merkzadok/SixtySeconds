"use client";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/Components/ui/button";
import { NavigationItem } from "./MainHeader";

interface MobileNavigationProps {
  navigationItems: NavigationItem[];
  activeSection: string;
  setActiveSection: Dispatch<SetStateAction<string>>;
  userRating: number;
  userScore: number;
  closeMenu: () => void;
}

export default function MobileNavigation({
  navigationItems,
  activeSection,
  setActiveSection,
  userRating,
  userScore,
  closeMenu,
}: MobileNavigationProps) {
  return (
    <div className="md:hidden py-4 border-t border-purple-100">
      <div className="flex flex-col space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              className={`flex items-center justify-start space-x-3 w-full px-4 py-3 rounded-lg ${
                activeSection === item.id
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
              }`}
              onClick={() => {
                setActiveSection(item.id);
                closeMenu();
              }}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
