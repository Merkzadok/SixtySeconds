"use client";

import { useState } from "react";

import { MastermindGame } from "./components/MasterMindGame";
import { MemoryGame } from "./components/MemoryGame";
import { SnakeGame } from "./components/SnakeGame";
import { Wordle } from "./components/Wordle";
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import ProtectedRoute from "@/provider/ProtectPage";
import Image from "next/image";

type GameType = "mastermind" | "memory" | "snake" | "wordle" | null;

const Games = () => {
  const [selectedGame, setSelectedGame] = useState<GameType>(null);

  const games = [
    {
      id: "mastermind" as const,
      title: "Оюун ухаан",
      description: "Ухаанаа ажиллуулж код таах тоглоом",
      image: "/mastermind.png",
      component: <MastermindGame />,
    },
    {
      id: "memory" as const,
      title: "Санах ой",
      description: "Ижил картуудыг олж тоглох тоглоом",
      image: "/memory.png",
      component: <MemoryGame />,
    },
    {
      id: "snake" as const,
      title: "Могой",
      description: "Могойгоо хооллоод урт болгоё тоглоом",
      image: "/Sanke.png",
      component: <SnakeGame />,
    },
    {
      id: "wordle" as const,
      title: "Үг таах",
      description: "5 үсэгтэй үгийг 6 оролдлогоор ба багатайгаар таах тоглоом",
      image: "/wordle.webp",
      component: <Wordle />,
    },
  ];

  if (selectedGame) {
    const currentGame = games.find((game) => game.id === selectedGame);
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background p-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-3xl font-bold">{currentGame?.title}</h1>
              <Button variant="outline" onClick={() => setSelectedGame(null)}>
                ← Тоглоом сонгох руу буцах
              </Button>
            </div>
            {currentGame?.component}
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#C0e6BA] p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 mt-12">
            <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
              🎮 Тоглоом цуглуулга
            </h1>
            <p className="text-lg font-semibold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
              Тоглоомоо сонгоорой ✨
            </p>
          </div>
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <Card
                key={game.id}
                className="cursor-pointer hover:shadow-lg transition-shadow flex items-center justify-center"
                onClick={() => setSelectedGame(game.id)}
              >
                <Image
                  src={game.image}
                  alt={game.title}
                  width={220}
                  height={220}
                  className="object-contain"
                />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Games;
