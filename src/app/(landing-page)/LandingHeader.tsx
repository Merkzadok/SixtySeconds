// components/layout/Header.tsx
import { Button } from "@/Components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="px-4 py-6 md:px-6 sticky top-0 bg-white/80 backdrop-blur-sm border-b border-pink-100 z-50">
      <nav className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-300 to-emerald-300 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-serif font-black text-xl bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            SixtySeconds
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6"></div>
        <Link href="/auth">
          <Button
            variant="outline"
            className="border-pink-200 cursor-pointer text-pink-600 hover:bg-pink-50 bg-transparent"
          >
            Sign In
          </Button>
        </Link>
      </nav>
    </header>
  );
}
