"use client";

import { FormEvent } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

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
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Welcome back! 🎉");
    }, 1000);
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
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <Input
          id="login-password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Signing In..." : "Start Learning! 🚀"}
      </Button>
    </form>
  );
}
