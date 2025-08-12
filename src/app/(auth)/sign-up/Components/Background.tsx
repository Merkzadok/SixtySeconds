"use client";

import { Stars, Heart, Globe, Sparkles, Users } from "lucide-react";

export default function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-10 left-10 text-yellow-300 opacity-60">
        <Stars size={32} />
      </div>
      <div className="absolute top-20 right-20 text-pink-300 opacity-60">
        <Heart size={28} />
      </div>
      <div className="absolute bottom-20 left-20 text-green-300 opacity-60">
        <Globe size={36} />
      </div>
      <div className="absolute bottom-10 right-10 text-purple-300 opacity-60">
        <Sparkles size={30} />
      </div>
      <div className="absolute top-1/2 left-5 text-blue-300 opacity-40">
        <Users size={24} />
      </div>
    </div>
  );
}
