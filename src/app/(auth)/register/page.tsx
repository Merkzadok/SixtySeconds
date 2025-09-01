"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import { LoaderScreen } from "@/Components/loader/loading";

export default function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setUsernameError("");
    setEmailError("");
    setPasswordError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/create-user`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        const msg = (errorData.message || "").toLowerCase();
        if (msg.includes("username")) setUsernameError(errorData.message);
        else if (msg.includes("email")) setEmailError(errorData.message);
        else if (msg.includes("password")) setPasswordError(errorData.message);
        else throw new Error(errorData.message || "Signup failed");
        return;
      }

      toast.success("Welcome to our learning adventure! 🚀", {
        description: "Хаяг амжилттай үүслээ.",
        duration: 1200,
      });

      setTimeout(() => router.push("/login"), 1200);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Имэйл эсвэл нууц үг буруу байна.";
      setEmailError(msg);

      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-teal-600/10"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10">
          <Link href="/login">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 cursor-pointer border-b-indigo-200 border-2 text-white font-bold px-4 py-2 md:px-6 md:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
              <Mail size={18} />
              <span className="hidden sm:inline">Нэвтрэх</span>
            </Button>
          </Link>
        </div>

        <div className="relative z-20 w-full max-w-md mx-auto">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 p-6 text-center">
              <h2 className="text-3xl font-black text-white mb-2">
                Шинэ хэрэглэгч бүртгүүлэх
              </h2>
            </div>
            <form onSubmit={handleSignup} className="p-8 space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="signup-username"
                  className="text-gray-700 font-semibold"
                >
                  Нэр
                </Label>
                <div className="relative">
                  <div className="flex items-center bg-gray-50 border-2 rounded-xl overflow-hidden border-gray-200 focus-within:border-blue-500 focus-within:bg-white transition-all duration-300 hover:shadow-md">
                    <span className="px-4 text-gray-500">
                      <User size={20} />
                    </span>
                    <input
                      id="signup-username"
                      type="text"
                      placeholder="нэр"
                      value={formData.username}
                      onChange={(e) =>
                        handleInputChange("username", e.target.value)
                      }
                      required
                      className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 h-9 text-gray-800 placeholder-gray-400"
                    />
                  </div>
                  {usernameError && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                        !
                      </span>
                      {usernameError}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="signup-email"
                  className="text-gray-700 font-semibold"
                >
                  Имэйл
                </Label>
                <div className="relative">
                  <div className="flex items-center bg-gray-50 border-2 rounded-xl overflow-hidden border-gray-200 focus-within:border-blue-500 focus-within:bg-white transition-all duration-300 hover:shadow-md">
                    <span className="px-4 text-gray-500">
                      <Mail size={20} />
                    </span>
                    <input
                      id="signup-email"
                      type="email"
                      placeholder="имэйл"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      required
                      className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 h-9 text-gray-800 placeholder-gray-400"
                    />
                  </div>
                  {emailError && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                        !
                      </span>
                      {emailError}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="signup-password"
                  className="text-gray-700 font-semibold"
                >
                  Нууц үг
                </Label>
                <div className="relative">
                  <div className="flex items-center bg-gray-50 border-2 rounded-xl overflow-hidden border-gray-200 focus-within:border-blue-500 focus-within:bg-white transition-all duration-300 hover:shadow-md">
                    <span className="px-4 text-gray-500">
                      <Lock size={20} />
                    </span>
                    <input
                      id="signup-password"
                      type="password"
                      placeholder="нууц үг"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      required
                      className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 h-9 text-gray-800 placeholder-gray-400"
                    />
                  </div>
                  {passwordError && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                        !
                      </span>
                      {passwordError}
                    </p>
                  )}
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Begin Adventure! 🌟"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
