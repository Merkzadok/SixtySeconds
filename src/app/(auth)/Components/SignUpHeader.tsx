"use client";

import Lottie from "lottie-react";
import ReadingBook from "@/data/animations/ReadingBook.json";

export default function SignUpHeader() {
  const animationData = ReadingBook;

  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-30 h-30 bg-gradient-to-r from-orange-100 to-orange-300 rounded-full mb-4 shadow-lg">
        <Lottie
          animationData={animationData}
          loop={true}
          className="w-30 h-30"
        />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">LinguaKids</h1>
      <p className="text-gray-600 text-lg">Learn languages the fun way!</p>
    </div>
  );
}
