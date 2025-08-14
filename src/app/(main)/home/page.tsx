// "use client";

// import { useState } from "react";
// import {
//   Home,
//   BookOpen,
//   Gamepad2,
//   Trophy,
//   User,
//   Star,
//   Menu,
//   X,
// } from "lucide-react";
// import { Button } from "@/Components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

// export default function HomePage() {
//   const [activeSection, setActiveSection] = useState("home");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const userScore = 2847;
//   const userRating = 4.8;

//   const navigationItems = [
//     { id: "home", label: "Home", icon: Home },
//     { id: "reading", label: "Reading", icon: BookOpen },
//     { id: "games", label: "Games", icon: Gamepad2 },
//     { id: "rankings", label: "Rankings", icon: Trophy },
//     { id: "profile", label: "Profile", icon: User },
//   ];

//   const mainSectionItems = [
//     {
//       id: "games",
//       label: "Games",
//       icon: Gamepad2,
//       description: "Play fun interactive learning games",
//       gradient: "from-orange-400 via-red-400 to-pink-500",
//       bgPattern: "bg-gradient-to-br from-orange-100 via-red-50 to-pink-100",
//     },
//     {
//       id: "reading",
//       label: "Reading",
//       icon: BookOpen,
//       description: "Discover amazing books and stories",
//       gradient: "from-blue-400 via-indigo-400 to-purple-500",
//       bgPattern: "bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100",
//     },
//     {
//       id: "rankings",
//       label: "Rankings",
//       icon: Trophy,
//       description: "See where you stand among peers",
//       gradient: "from-yellow-400 via-amber-400 to-orange-500",
//       bgPattern: "bg-gradient-to-br from-yellow-100 via-amber-50 to-orange-100",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50">
//       {/* Header */}
//       <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo */}
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-sm">L</span>
//               </div>
//               <span className="font-bold text-xl text-gray-800">LearnHub</span>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex items-center space-x-1">
//               {navigationItems.map((item) => {
//                 const Icon = item.icon;
//                 return (
//                   <Button
//                     key={item.id}
//                     variant={activeSection === item.id ? "default" : "ghost"}
//                     className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
//                       activeSection === item.id
//                         ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
//                         : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
//                     }`}
//                     onClick={() => setActiveSection(item.id)}
//                   >
//                     <Icon size={18} />
//                     <span className="font-medium">{item.label}</span>
//                   </Button>
//                 );
//               })}
//             </nav>

//             {/* Score and Profile Section */}
//             <div className="flex items-center space-x-4">
//               {/* Score Display */}
//               <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-2 rounded-full">
//                 <div className="flex items-center space-x-1">
//                   <Star className="w-4 h-4 text-yellow-500 fill-current" />
//                   <Star className="w-4 h-4 text-yellow-500 fill-current" />
//                   <span className="text-sm font-semibold text-gray-700">
//                     {userRating}
//                   </span>
//                 </div>
//                 <div className="w-px h-4 bg-gray-300"></div>
//                 <span className="text-sm font-bold text-gray-800">
//                   {userScore.toLocaleString()}
//                 </span>
//               </div>

//               {/* Profile Avatar */}
//               <Avatar className="w-10 h-10 ring-2 ring-purple-200 cursor-pointer hover:ring-purple-300 transition-all">
//                 <AvatarImage src="/user-profile-illustration.png" />
//                 <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white font-semibold">
//                   JD
//                 </AvatarFallback>
//               </Avatar>

//               {/* Mobile Menu Button */}
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="md:hidden"
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               >
//                 {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
//               </Button>
//             </div>
//           </div>

//           {/* Mobile Navigation */}
//           {isMobileMenuOpen && (
//             <div className="md:hidden py-4 border-t border-purple-100">
//               <div className="flex flex-col space-y-2">
//                 {navigationItems.map((item) => {
//                   const Icon = item.icon;
//                   return (
//                     <Button
//                       key={item.id}
//                       variant={activeSection === item.id ? "default" : "ghost"}
//                       className={`flex items-center justify-start space-x-3 w-full px-4 py-3 rounded-lg ${
//                         activeSection === item.id
//                           ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
//                           : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
//                       }`}
//                       onClick={() => {
//                         setActiveSection(item.id);
//                         setIsMobileMenuOpen(false);
//                       }}
//                     >
//                       <Icon size={20} />
//                       <span className="font-medium">{item.label}</span>
//                     </Button>
//                   );
//                 })}
//               </div>

//               {/* Mobile Score Display */}
//               <div className="mt-4 pt-4 border-t border-purple-100">
//                 <div className="flex items-center justify-center space-x-4 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-3 rounded-lg">
//                   <div className="flex items-center space-x-1">
//                     <Star className="w-4 h-4 text-yellow-500 fill-current" />
//                     <Star className="w-4 h-4 text-yellow-500 fill-current" />
//                     <span className="text-sm font-semibold text-gray-700">
//                       {userRating}
//                     </span>
//                   </div>
//                   <div className="w-px h-4 bg-gray-300"></div>
//                   <span className="text-sm font-bold text-gray-800">
//                     {userScore.toLocaleString()}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="text-center space-y-8">
//           {/* Welcome Section */}
//           <div className="space-y-4">
//             <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
//               Welcome to LearnHub
//             </h1>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
//               Your personalized learning journey starts here. Explore, learn,
//               and grow with our interactive platform.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
//             {mainSectionItems.map((item, index) => {
//               const Icon = item.icon;
//               return (
//                 <div
//                   key={item.id}
//                   className="group cursor-pointer"
//                   onClick={() => setActiveSection(item.id)}
//                 >
//                   <div
//                     className={`${item.bgPattern} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:scale-105 relative overflow-hidden`}
//                   >
//                     {/* Background Pattern */}
//                     <div className="absolute inset-0 opacity-10">
//                       <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/30"></div>
//                       <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/20"></div>
//                       <div className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full bg-white/15 transform -translate-x-1/2 -translate-y-1/2"></div>
//                     </div>

//                     {/* Animated Icon Container */}
//                     <div className="relative z-10">
//                       <div
//                         className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}
//                       >
//                         <Icon
//                           className={`w-10 h-10 text-white transition-all duration-300 ${
//                             item.id === "games"
//                               ? "group-hover:animate-bounce"
//                               : item.id === "reading"
//                               ? "group-hover:animate-pulse"
//                               : "group-hover:animate-pulse"
//                           }`}
//                         />
//                       </div>
//                       <h3 className="text-2xl font-bold text-gray-800 mb-3">
//                         {item.label}
//                       </h3>
//                       <p className="text-gray-700 text-base font-medium leading-relaxed">
//                         {item.description}
//                       </p>

//                       {/* Action Button */}
//                       <div className="mt-6">
//                         <div
//                           className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${item.gradient} text-white rounded-full text-sm font-semibold shadow-md group-hover:shadow-lg transition-all duration-300`}
//                         >
//                           Start {item.label}
//                           <Icon className="w-4 h-4 ml-2" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Quick Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
//             {[
//               { label: "Courses", value: "24", icon: BookOpen },
//               { label: "Games", value: "12", icon: Gamepad2 },
//               { label: "Rank", value: "#47", icon: Trophy },
//               {
//                 label: "Points",
//                 value: userScore.toLocaleString(),
//                 icon: Star,
//               },
//             ].map((stat, index) => {
//               const Icon = stat.icon;
//               return (
//                 <div
//                   key={stat.label}
//                   className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-white/50"
//                 >
//                   <Icon className="w-6 h-6 text-purple-500 mx-auto mb-2" />
//                   <div className="text-2xl font-bold text-gray-800">
//                     {stat.value}
//                   </div>
//                   <div className="text-sm text-gray-600">{stat.label}</div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { Home, BookOpen, Gamepad2, Trophy, User, Star } from "lucide-react";
import MainSectionCard from "./components/MainSectionCard";
import QuickStatCard from "./components/QuickCard";
import Header from "./components/Header";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const userScore = 2847;
  const userRating = 4.8;

  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "reading", label: "Reading", icon: BookOpen },
    { id: "games", label: "Games", icon: Gamepad2 },
    { id: "rankings", label: "Rankings", icon: Trophy },
    { id: "profile", label: "Profile", icon: User },
  ];

  const mainSectionItems = [
    {
      id: "games",
      label: "Games",
      icon: Gamepad2,
      description: "Play fun interactive learning games",
      gradient: "from-orange-400 via-red-400 to-pink-500",
      bgPattern: "bg-gradient-to-br from-orange-100 via-red-50 to-pink-100",
    },
    {
      id: "reading",
      label: "Reading",
      icon: BookOpen,
      description: "Discover amazing books and stories",
      gradient: "from-blue-400 via-indigo-400 to-purple-500",
      bgPattern: "bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100",
    },
    {
      id: "rankings",
      label: "Rankings",
      icon: Trophy,
      description: "See where you stand among peers",
      gradient: "from-yellow-400 via-amber-400 to-orange-500",
      bgPattern: "bg-gradient-to-br from-yellow-100 via-amber-50 to-orange-100",
    },
  ];

  const quickStats = [
    { label: "Courses", value: "24", icon: BookOpen },
    { label: "Games", value: "12", icon: Gamepad2 },
    { label: "Rank", value: "#47", icon: Trophy },
    { label: "Points", value: userScore.toLocaleString(), icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        navigationItems={navigationItems}
        userScore={userScore}
        userRating={userRating}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-8">
          {/* Welcome Section */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Welcome to LearnHub
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Your personalized learning journey starts here. Explore, learn,
              and grow with our interactive platform.
            </p>
          </div>

          {/* Main Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {mainSectionItems.map((item) => (
              <MainSectionCard
                key={item.id}
                item={item}
                onClick={setActiveSection}
              />
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {quickStats.map((stat) => (
              <QuickStatCard key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
