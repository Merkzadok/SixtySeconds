"use client";

import { Fredoka } from "next/font/google";
import { Button } from "@/Components/ui/button";
import Lottie from "lottie-react";
import globeAnimation from "@/data/animations/WelcomeAnimation.json";
import logoAnimation from "@/data/animations/flyingBird.json";
import Link from "next/link";

const fredoka = Fredoka({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function LandingPage() {
  return (
    <div
      className={`${fredoka.className} min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex flex-col`}
    >
      {/* Header */}
      <header className="flex items-center justify-start p-4 md:p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
            <Lottie animationData={logoAnimation} loop={true} />
          </div>
          <span className="font-black text-4xl text-gray-800 tracking-tight">
            60 Секунд
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center  justify-center px-4  md:px-6">
        <div className="w-full max-w-6xl  grid md:grid-cols-2 gap-15 items-center">
          {/* Left Side - Animation */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Animated Globe */}
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <Lottie
                  animationData={globeAnimation}
                  loop={true}
                  className="absolute inset-0"
                />
              </div>

              {/* Floating Language Bubbles */}
              <div className="absolute -top-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-bounce delay-100 shadow-md">
                Сайн уу
              </div>
              <div className="absolute -top-2 -right-6 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-bounce delay-200 shadow-md">
                Hola
              </div>
              <div className="absolute -bottom-4 -left-6 bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-bounce delay-300 shadow-md">
                Bonjour
              </div>
              <div className="absolute -bottom-2 -right-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold animate-bounce delay-500 shadow-md">
                Hallo
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="text-center md:text-left space-y-8">
            <h1 className="text-4xl font-black text-gray-700 font-Comfortaa">Чөлөөт цагаараа хөгжилтэй аргаар 
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">уншиж
            </span>{" "}сурцгаая!</h1>
            {/* <p className="text-xl md:text-2xl text-gray-600 max-w-lg font-medium leading-relaxed">
              Join millions of learners worldwide and start your language
              journey today with interactive lessons and engaging exercises.
            </p> */}

            {/* Stacked Buttons */}
            <div className="flex flex-col gap-4 justify-center md:justify-start max-w-sm mx-auto md:mx-0">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r cursor-pointer from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 text-lg font-black rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-green-400"
                >
                  БҮРТГҮҮЛЭХ
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white cursor-pointer text-cyan-600 hover:bg-cyan-50 px-8 py-4 text-lg font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border-2 border-cyan-200 hover:border-cyan-300"
                >
                  НЭВТРЭХ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-6 px-4 md:px-6 border-t-2 border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="flex justify-center items-center gap-8 text-sm text-gray-600">
          <a
            href="#"
            className="hover:text-green-600 transition-colors font-medium"
          >
            Privacy
          </a>
          <a
            href="#"
            className="hover:text-green-600 transition-colors font-medium"
          >
            Terms
          </a>
          <a
            href="#"
            className="hover:text-green-600 transition-colors font-medium"
          >
            Help
          </a>
        </div>
      </footer>
    </div>
  );
}
