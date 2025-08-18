"use client";

import { useState } from "react";
import Background from "./Components/Background";
import Header from "./Components/Header";
import AuthTabs from "./Components/AuthTabs";
import FooterEncouragement from "./Components/Footer";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Background />
      <div className="w-full max-w-md relative z-10">
        <Header />
        <AuthTabs
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          formData={formData}
          handleInputChange={handleInputChange}
        />
        <FooterEncouragement />
      </div>
    </div>
  );
}
