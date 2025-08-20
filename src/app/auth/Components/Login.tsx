"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useRouter } from "next/navigation";

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

        // Handle specific error messages:
        const msg =
          typeof errorData.message === "string"
            ? errorData.message.toLowerCase()
            : "";

        if (msg.includes("email")) {
          setEmailError(errorData.message);
        } else if (msg.includes("password")) {
          setPasswordError(errorData.message);
        } else {
          // fallback generic error
          throw new Error(errorData.message || "Login failed");
        }
        return; // stop further processing
      }

      const data = await res.json();
      console.log("Login success:", data);

      // TODO: handle token storage (e.g., localStorage) or redirect here
      alert("Welcome back! 🎉");
      router.push("/profile");
    } catch (err: any) {
      console.error("Login error:", err);
      // Fallback for unexpected errors
      setEmailError(err.message || "Something went wrong during login");
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
