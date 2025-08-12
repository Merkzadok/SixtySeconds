// "use client";

// import { useState } from "react";
// import { BookOpen, Stars, Sparkles, Heart, Globe, Users } from "lucide-react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/Components/ui/card";
// import SignIn from "./Components/Login";
// import SignUp from "./Components/SignUp";

// export default function AuthPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative">
//       {/* Background decorations */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-10 left-10 text-yellow-300 opacity-60">
//           <Stars size={32} />
//         </div>
//         <div className="absolute top-20 right-20 text-pink-300 opacity-60">
//           <Heart size={28} />
//         </div>
//         <div className="absolute bottom-20 left-20 text-green-300 opacity-60">
//           <Globe size={36} />
//         </div>
//         <div className="absolute bottom-10 right-10 text-purple-300 opacity-60">
//           <Sparkles size={30} />
//         </div>
//         <div className="absolute top-1/2 left-5 text-blue-300 opacity-40">
//           <Users size={24} />
//         </div>
//       </div>

//       <div className="w-full max-w-md relative z-10">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
//             <BookOpen className="text-white" size={32} />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">LinguaKids</h1>
//           <p className="text-gray-600 text-lg">Learn languages the fun way!</p>
//         </div>

//         <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
//           <CardHeader className="text-center pb-4">
//             <CardTitle className="text-2xl font-bold text-gray-800">
//               Join the Adventure!
//             </CardTitle>
//             <CardDescription className="text-gray-600">
//               Start your language learning journey today
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <Tabs defaultValue="login" className="w-full">
//               <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 p-1 rounded-xl">
//                 <TabsTrigger
//                   value="login"
//                   className="rounded-lg cursor-pointer py-3 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
//                 >
//                   Sign In
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="signup"
//                   className="rounded-lg cursor-pointer py-3 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
//                 >
//                   Join Now
//                 </TabsTrigger>
//               </TabsList>

//               <TabsContent value="login">
//                 <SignIn
//                   isLoading={isLoading}
//                   formData={formData}
//                   handleInputChange={handleInputChange}
//                   setIsLoading={setIsLoading}
//                 />
//               </TabsContent>

//               <TabsContent value="signup">
//                 <SignUp
//                   isLoading={isLoading}
//                   formData={formData}
//                   handleInputChange={handleInputChange}
//                   setIsLoading={setIsLoading}
//                 />
//               </TabsContent>
//             </Tabs>

//             {/* Fun footer */}
//             <div className="mt-6 pt-6 border-t border-gray-100">
//               <p className="text-center text-sm text-gray-500">
//                 Ready to learn with friends from around the world? 🌍
//               </p>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Bottom encouragement */}
//         <div className="text-center mt-6 space-y-2">
//           <p className="text-gray-600 text-sm">🎯 Learn at your own pace</p>
//           <p className="text-gray-600 text-sm">🏆 Earn badges and rewards</p>
//           <p className="text-gray-600 text-sm">
//             👨‍👩‍👧‍👦 Safe and supervised environment
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import Background from "./Components/Background";
import Header from "./Components/Header";
import AuthTabs from "./Components/AuthTabs";
import FooterEncouragement from "./Components/Footer";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
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
