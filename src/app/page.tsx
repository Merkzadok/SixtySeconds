"use client";

import Exercises from "@/Components/Exercises";
import HomePage from "@/Components/HomePage";
import Leaderboard from "@/Components/Leaderboard";
import Navigation from "@/Components/Navigation";
import ParentDashboard from "@/Components/ParentDashboard";
import ReadingLesson from "@/Components/ReadingLesson";
import React, { useState } from "react";

export type AppPage =
  | "home"
  | "reading"
  | "exercises"
  | "parent"
  | "leaderboard";

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>("home");
  const [user, setUser] = useState({
    name: "Emma",
    avatar: "👧",
    score: 850,
    lessonsCompleted: 12,
    exercisesCompleted: 28,
    recordings: [],
  });

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} user={user} />;
      case "reading":
        return (
          <ReadingLesson
            onNavigate={setCurrentPage}
            user={user}
            setUser={setUser}
          />
        );
      case "exercises":
        return (
          <Exercises
            onNavigate={setCurrentPage}
            user={user}
            setUser={setUser}
          />
        );
      case "parent":
        return (
          <ParentDashboard
            onNavigate={setCurrentPage}
            user={user}
            setUser={setUser}
          />
        );
      case "leaderboard":
        return <Leaderboard onNavigate={setCurrentPage} user={user} />;
    default:return <HomePage onNavigate={setCurrentPage} user={user} />;

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">

      {currentPage !== "home" && (
        <Navigation
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          user={user}
        />
      )} 
      {renderCurrentPage()}
    </div>
  );
}

export default App;
