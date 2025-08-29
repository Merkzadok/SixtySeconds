"use client";
import { useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Star } from "lucide-react";
import MainSectionCard from "./components/MainSectionCard";
import QuickStatCard from "./components/QuickCard";
import Link from "next/link";
import ProtectedRoute from "@/provider/ProtectPage";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const quickStatsRef = useRef<(HTMLDivElement | null)[]>([]);
  const gsapCtx = useRef<gsap.Context | null>(null);

  // Main sections data
  const mainSectionItems = [
    {
      id: "reading",
      label: "Унших",
      description: "Гайхалтай ном түүхийн ертөнцөөр аялцгаая",
      gradient: "from-lime-400 via-green-400 to-emerald-500",
      bgPattern: "bg-gradient-to-br from-lime-100 via-green-50 to-emerald-100",
      href: "/reading",
    },
    {
      id: "rankings",
      label: "Түвшин",
      description: "Амжилтаа шалгаад түвшингээ ахиулцгаая",
      gradient: "from-emerald-400 via-green-400 to-lime-500",
      bgPattern: "bg-gradient-to-br from-emerald-100 via-green-50 to-lime-100",
      href: "/leaderboard",
    },
  ];

  // Quick stats data
  const quickStats = [
    { label: "Түвшин", value: "#47", icon: Trophy },
    { label: "Оноо", value: "2,847", icon: Star },
  ];

  useLayoutEffect(() => {
    gsapCtx.current = gsap.context(() => {
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

    return () => gsapCtx.current?.revert();
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-8">
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                mainSectionItems.length > 2
                  ? "lg:grid-cols-3"
                  : "lg:grid-cols-2"
              } gap-6 mt-12`}
            >
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

            <div className="flex justify-center mt-12">
              <div className="inline-grid grid-cols-2 md:grid-cols-4 gap-4">
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
          </div>
        </main>

        {/* Footer (always bottom) */}
        <footer className="py-6 px-4 md:px-8 border-t-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex justify-center items-center gap-8 text-sm text-green-700">
            <a
              href="#"
              className="hover:text-green-600 transition-colors font-medium"
            >
              Аюулгүй байдал
            </a>
            <a
              href="#"
              className="hover:text-green-600 transition-colors font-medium"
            >
              Нөхцөл
            </a>
            <a
              href="#"
              className="hover:text-green-600 transition-colors font-medium"
            >
              Тусламж
            </a>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  );
}
