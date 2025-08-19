"use client";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/Components/ui/button";
import { NavigationItem } from "./MainHeader";
import Link from "next/link";

interface NavigationProps {
  navigationItems: NavigationItem[];
  activeSection: string;
  setActiveSection: Dispatch<SetStateAction<string>>;
}

export default function Navigation({
  navigationItems,
  activeSection,
  setActiveSection,
}: NavigationProps) {
  return (
    <nav className="hidden md:flex items-center space-x-1">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link href={item.href} key={item.id}>
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                activeSection === item.id
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              <Icon size={18} />
              <span className="font-medium">{item.label}</span>
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}
