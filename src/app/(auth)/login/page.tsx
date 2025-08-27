"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import { LoaderScreen } from "@/Components/loader/loading";

export default function SignInForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setEmailError("");
    setPasswordError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        const msg = (errorData.message || "").toLowerCase();
        if (msg.includes("email")) setEmailError(errorData.message);
        else if (msg.includes("password")) setPasswordError(errorData.message);
        else throw new Error(errorData.message || "Login failed");
        return;
      }

      const data = await res.json();
      toast.success("Welcome back! 🎉", {
        description: "Great to see you again!",
        duration: 1000,
      });
      localStorage.setItem("Token:", data.accesstoken);

      setTimeout(() => router.push("/profile"), 1000);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong during login";
      setEmailError(msg);
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoaderScreen />}
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Sign-up Button - Top Right */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10">
          <Link href="/register">
            <Button className="bg-gradient-to-r  cursor-pointer border-b-indigo-200 border-2 from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold px-4 py-2 md:px-6 md:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
              <User size={18} />
              <span className="hidden sm:inline">Sign Up</span>
            </Button>
          </Link>
        </div>

        {/* Main Login Form */}
        <div className="relative z-20 w-full max-w-md mx-auto">
          {/* Glassmorphism Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 p-6 text-center">
              <h2 className="text-3xl font-black text-white mb-2">
                Welcome Back
              </h2>
            </div>

            {/* Form Section */}
            <form onSubmit={handleLogin} className="p-8 space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="login-email"
                  className="text-gray-700 font-semibold"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <div className="flex items-center bg-gray-50 border-2 rounded-xl overflow-hidden border-gray-200 focus-within:border-blue-500 focus-within:bg-white transition-all duration-300 hover:shadow-md">
                    <span className="px-4 text-gray-500">
                      <Mail size={20} />
                    </span>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      required
                      className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 py-4 text-gray-800 placeholder-gray-400"
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

              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="login-password"
                  className="text-gray-700 font-semibold"
                >
                  Password
                </Label>
                <div className="relative">
                  <div className="flex items-center bg-gray-50 border-2 rounded-xl overflow-hidden border-gray-200 focus-within:border-blue-500 focus-within:bg-white transition-all duration-300 hover:shadow-md">
                    <span className="px-4 text-gray-500">
                      <Lock size={20} />
                    </span>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      required
                      className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 py-4 text-gray-800 placeholder-gray-400"
                    />
                    <button
                      type="button"
                      className="px-4 text-gray-500 hover:text-gray-700 transition-colors"
                    ></button>
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

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
