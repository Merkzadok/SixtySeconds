"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { useUser } from "@/provider/CurrentUser";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react"; // 👈 жижиг сумны icon

export default function ProfileAvatar() {
  const { user, setUser } = useUser();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dropdown-г гадна даралт дээр хаах
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("Token:"); // login үедээ хэрхэн хадгалсантай тааруулах
    setUser(null);
    router.push("/");
  };

  if (!user) return null;

  return (
    <div className="relative flex items-center gap-1" ref={dropdownRef}>
      {/* Avatar → profile руу орох */}
      <div onClick={() => router.push("/profile")}>
        <Avatar className="w-10 h-10 ring-2 ring-purple-200 cursor-pointer hover:ring-purple-300 transition-all">
          {user.profile?.avatarImage ? (
            <AvatarImage src={user.profile.avatarImage} />
          ) : (
            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white font-semibold">
              {user.profile?.name?.[0].toUpperCase() || "U"}
            </AvatarFallback>
          )}
        </Avatar>
      </div>

      {/* Жижиг сум → dropdown toggle */}
    <button
  onClick={() => setOpen(!open)}
  className="flex items-center gap-1 px-2 py-1 rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition"
>
  <ChevronDown size={16} className="text-purple-600" />
</button>


      {/* Dropdown → зөвхөн Logout */}
      {open && (
        <div className="absolute right-0 top-12 w-36 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-lg font-medium"
          >
            Гарах
          </button>
        </div>
      )}
    </div>
  );
}
