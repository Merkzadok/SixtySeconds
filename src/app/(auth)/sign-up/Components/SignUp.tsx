"use client";

import { FormEvent } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

interface SignUpProps {
  isLoading: boolean;
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  handleInputChange: (field: string, value: string) => void;
  setIsLoading: (value: boolean) => void;
}

export default function SignUp({
  isLoading,
  formData,
  handleInputChange,
  setIsLoading,
}: SignUpProps) {
  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Welcome to our learning adventure! 🚀");
    }, 1000);
  };

  return (
    <form onSubmit={handleSignup} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="signup-name">Your Name</Label>
        <Input
          id="signup-name"
          type="text"
          placeholder="What should we call you?"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email Address</Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password">Create Password</Label>
        <Input
          id="signup-password"
          type="password"
          placeholder="Make it strong and fun!"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-confirm">Confirm Password</Label>
        <Input
          id="signup-confirm"
          type="password"
          placeholder="Type it again to be sure"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Creating Account..." : "Begin Adventure! 🌟"}
      </Button>
    </form>
  );
}
