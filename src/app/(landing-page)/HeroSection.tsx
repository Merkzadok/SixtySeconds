// components/sections/HeroSection.tsx
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Play, Star } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="px-4 py-12 md:px-6 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-100 border-pink-200">
                New Adventure Awaits
              </Badge>
              <h1 className="font-serif font-black text-4xl md:text-6xl text-gray-800 leading-tight">
                Unlock the Joy of{" "}
                <span className="text-transparent bg-gradient-to-r from-pink-400 to-emerald-400 bg-clip-text">
                  Language Learning!
                </span>
              </h1>
              <p className="font-sans text-lg md:text-xl text-gray-600 leading-relaxed">
                Engage your child with fun, interactive games designed to make
                learning a new language exciting and effective.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Your Adventure Today!
                </Button>
              </Link>
              {/* <Button
                variant="outline"
                size="lg"
                className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 px-8 py-6 text-lg rounded-xl bg-transparent"
              >
                Watch Demo
              </Button> */}
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="font-sans text-sm text-gray-600">
                Loved by{" "}
                <span className="font-semibold text-gray-800">10,000+</span>{" "}
                families worldwide
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 animate-float">
              <img
                src="/kids.png"
                alt="Children enjoying language learning games"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full animate-bounce-gentle opacity-80"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full animate-float opacity-80"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
