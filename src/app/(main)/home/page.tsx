"use client";
import { useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Gamepad2, Trophy, Star } from "lucide-react";
import MainSectionCard from "./components/MainSectionCard";
import QuickStatCard from "./components/QuickCard";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  // const [activeSection, setActiveSection] = useState("home");
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const quickStatsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Main sections data
  const mainSectionItems = [
    {
      id: "games",
      label: "Games",
      description: "Play fun interactive learning games",
      gradient: "from-orange-400 via-red-400 to-pink-500",
      bgPattern: "bg-gradient-to-br from-orange-100 via-red-50 to-pink-100",
      href: "/games",
    },
    {
      id: "reading",
      label: "Reading",
      description: "Discover amazing books and stories",
      gradient: "from-blue-400 via-indigo-400 to-purple-500",
      bgPattern: "bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100",
      href: "/reading",
    },
    {
      id: "rankings",
      label: "Rankings",
      description: "See where you stand among peers",
      gradient: "from-yellow-400 via-amber-400 to-orange-500",
      bgPattern: "bg-gradient-to-br from-yellow-100 via-amber-50 to-orange-100",
      href: "/leaderboard",
    },

  ];

  // Quick stats data
  const quickStats = [
    { label: "Courses", value: "24", icon: BookOpen },
    { label: "Games", value: "12", icon: Gamepad2 },
    { label: "Rank", value: "#47", icon: Trophy },
    { label: "Points", value: "2,847", icon: Star },
  ];
  const gsapCtx = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    // Create a context so GSAP can clean up on unmount
    gsapCtx.current = gsap.context(() => {
      // Reset initial state
      gsap.set(cardsRef.current, { opacity: 0, y: 50 });
      gsap.set(quickStatsRef.current, { opacity: 0, y: 30 });

      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 80%",
        },
      });

      gsap.to(quickStatsRef.current, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: quickStatsRef.current[0],
          start: "top 85%",
        },
      });
    });

    return () => gsapCtx.current?.revert(); // cleanup animations on unmount
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-8">
          {/* Welcome Section */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Welcome to LearnHub
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Your personalized learning journey starts here. Explore, learn,
              and grow with our interactive platform.
            </p>
          </motion.div>

          {/* Main Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {mainSectionItems.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
              >
                <Link href={item.href}>
                  <MainSectionCard item={item} />
                </Link>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {quickStats.map((stat, i) => (
              <div
                key={stat.label}
                ref={(el) => {
                  quickStatsRef.current[i] = el;
                }}
              >
                <QuickStatCard stat={stat} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
