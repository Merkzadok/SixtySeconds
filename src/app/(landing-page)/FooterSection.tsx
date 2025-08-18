// components/layout/Footer.tsx
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="px-4 py-8 md:px-6 bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-6 bg-gradient-to-br from-pink-300 to-emerald-300 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-serif font-black text-lg text-gray-800">
            LinguaPlay
          </span>
        </div>
        <p className="font-sans text-sm text-gray-600">
          © 2024 LinguaPlay. Making language learning magical for children
          worldwide.
        </p>
      </div>
    </footer>
  );
}
