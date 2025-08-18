"use client";

import { BookOpen } from "lucide-react";

export default function SignUpHeader() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
        <BookOpen className="text-white" size={32} />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">LinguaKids</h1>
      <p className="text-gray-600 text-lg">Learn languages the fun way!</p>
    </div>
  );
}
