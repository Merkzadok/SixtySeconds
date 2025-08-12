"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import SignIn from "./Login";
import SignUp from "./SignUp";

interface Props {
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

export default function AuthTabs({
  isLoading,
  setIsLoading,
  formData,
  handleInputChange,
}: Props) {
  return (
    <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-gray-800">
          Join the Adventure!
        </CardTitle>
        <CardDescription className="text-gray-600">
          Start your language learning journey today
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger
              value="login"
              className="rounded-lg cursor-pointer py-3 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="rounded-lg cursor-pointer py-3 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              Join Now
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <SignIn
              isLoading={isLoading}
              formData={formData}
              handleInputChange={handleInputChange}
              setIsLoading={setIsLoading}
            />
          </TabsContent>

          <TabsContent value="signup">
            <SignUp
              isLoading={isLoading}
              formData={formData}
              handleInputChange={handleInputChange}
              setIsLoading={setIsLoading}
            />
          </TabsContent>
        </Tabs>

        {/* Fun footer inside card */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-center text-sm text-gray-500">
            Ready to learn with friends from around the world? 🌍
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
