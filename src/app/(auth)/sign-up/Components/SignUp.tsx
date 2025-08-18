"use client";

import { FormEvent } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

interface SignUpProps {
  isLoading: boolean;
  formData: {
    username: string;
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

    // Optional: password confirmation check before API call
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);

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
        console.error("Error response from API:", errorData);
        throw new Error(
          typeof errorData.message === "string"
            ? errorData.message
            : JSON.stringify(errorData) || "Signup failed"
        );
      }

      const data = await res.json();
      console.log("Signup success:", data);

      alert("Welcome to our learning adventure! 🚀");

      // Optionally reset form or redirect
      // handleInputChange("name", "");
      // handleInputChange("email", "");
      // handleInputChange("password", "");
      // handleInputChange("confirmPassword", "");
    } catch (err: any) {
      console.error("Signup error:", err);
      alert(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="signup-name">Your Name</Label>
        <Input
          id="signup-name"
          type="text"
          placeholder="What should we call you?"
          value={formData.username}
          onChange={(e) => handleInputChange("username", e.target.value)}
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
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-orange-200 to-orange-600  "
      >
        {isLoading ? "Creating Account..." : "Begin Adventure! 🌟"}
      </Button>
    </form>
  );
}
