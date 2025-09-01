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
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer ${
                activeSection === item.id
                  ? " bg-green-500 text-white shadow-lg"
                  : "bg-green-100 text-gray-600 hover:bg-green-500 hover:text-white"
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
