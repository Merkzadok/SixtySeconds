"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SignInProps {
  isLoading: boolean;
  formData: { email: string; password: string };
  handleInputChange: (field: string, value: string) => void;
  setIsLoading: (value: boolean) => void;
}

export default function SignIn({
  isLoading,
  formData,
  handleInputChange,
  setIsLoading,
}: SignInProps) {
  // Add error state for email (and password if you want)
  const router = useRouter(); // ✅ initialize router
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Clear errors on new submit
    setEmailError("");
    setPasswordError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();

        const msg =
          typeof errorData.message === "string"
            ? errorData.message.toLowerCase()
            : "";

        if (msg.includes("email")) {
          setEmailError(errorData.message);
        } else if (msg.includes("password")) {
          setPasswordError(errorData.message);
        } else {
          throw new Error(errorData.message || "Login failed");
        }
        return;
      }

      const data = await res.json();

      toast.success("Welcome back! 🎉", {
        description: "Great to see you again!",
        duration: 1000,
      });
      localStorage.setItem("Token:", data.accesstoken);

      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    } catch (err: unknown) {
      // Narrow the type
      if (err instanceof Error) {
        console.error("Login error:", err);
        setEmailError(err.message || "Something went wrong during login");
      } else {
        console.error("Unexpected error:", err);
        setEmailError("Something went wrong during login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email Address</Label>
        <Input
          id="login-email"
          type="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          aria-describedby="email-error"
          required
          className={emailError ? "border-red-500" : ""}
        />
        {emailError && (
          <p id="email-error" className="text-red-600 text-sm mt-1">
            {emailError}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <Input
          id="login-password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          aria-describedby="password-error"
          required
          className={passwordError ? "border-red-500" : ""}
        />
        {passwordError && (
          <p id="password-error" className="text-red-600 text-sm mt-1">
            {passwordError}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-orange-200 to-orange-600"
      >
        {isLoading ? "Signing In..." : "Start Learning! 🚀"}
      </Button>
    </form>
  );
}
