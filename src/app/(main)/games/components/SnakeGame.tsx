"use client";

import { Button } from "@/Components/ui/button";
import type React from "react";

import { useState, useEffect, useCallback, useRef } from "react";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };
type GameState = "playing" | "paused" | "gameOver";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION: Direction = "RIGHT";
const GAME_SPEED = 150;

export function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [gameState, setGameState] = useState<GameState>("paused");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const directionRef = useRef<Direction>(INITIAL_DIRECTION);

  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      currentSnake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    );
    return newFood;
  }, []);

  const checkCollision = useCallback(
    (head: Position, body: Position[]): boolean => {
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        return true;
      }
      return body.some(
        (segment) => segment.x === head.x && segment.y === head.y
      );
    },
    []
  );

  const moveSnake = useCallback(() => {
    setSnake((currentSnake) => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };

      switch (directionRef.current) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
      }

      if (checkCollision(head, newSnake)) {
        setGameState("gameOver");
        return currentSnake;
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, generateFood, checkCollision]);

  const togglePause = useCallback(() => {
    if (gameState === "playing") {
      setGameState("paused");
    } else if (gameState === "paused") {
      setGameState("playing");
    }
  }, [gameState]);

  const changeDirection = useCallback(
    (newDirection: Direction) => {
      if (gameState !== "playing") return;

      const opposites: Record<Direction, Direction> = {
        UP: "DOWN",
        DOWN: "UP",
        LEFT: "RIGHT",
        RIGHT: "LEFT",
      };

      if (opposites[directionRef.current] !== newDirection) {
        directionRef.current = newDirection;
      }
    },
    [gameState]
  );

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          changeDirection("UP");
          break;
        case "ArrowDown":
          e.preventDefault();
          changeDirection("DOWN");
          break;
        case "ArrowLeft":
          e.preventDefault();
          changeDirection("LEFT");
          break;
        case "ArrowRight":
          e.preventDefault();
          changeDirection("RIGHT");
          break;
        case " ":
          e.preventDefault();
          togglePause();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [changeDirection, togglePause]);

  useEffect(() => {
    if (gameState === "playing") {
      gameLoopRef.current = setInterval(moveSnake, GAME_SPEED);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState, moveSnake]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  const startNewGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood({ x: 15, y: 15 });
    directionRef.current = INITIAL_DIRECTION;
    setScore(0);
    setGameState("playing");
  };

  const handleTouchStart = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleTouchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!handleTouchStart.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - handleTouchStart.current.x;
    const deltaY = touch.clientY - handleTouchStart.current.y;

    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > minSwipeDistance) {
        changeDirection(deltaX > 0 ? "RIGHT" : "LEFT");
      }
    } else {
      if (Math.abs(deltaY) > minSwipeDistance) {
        changeDirection(deltaY > 0 ? "DOWN" : "UP");
      }
    }

    handleTouchStart.current = null;
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-4 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">Могой</h2>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Оноо: {score}</span>
          <span>Өндөр оноо: {highScore}</span>
        </div>
      </div>

      {gameState === "gameOver" && (
        <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-center text-red-700">
          Тоглоом дууслаа! Нийт оноо: {score}
        </div>
      )}

      {gameState === "paused" && (
        <div className="mb-4 rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-center text-yellow-700">
          Түр зогслоо- Тоглоомыг эхлүүлэх эсвэл үргэлжлүүлэхийн тулд товчийг
          дарна уу
        </div>
      )}

      <div
        className="relative mx-auto mb-4 touch-none rounded-md border-4 border-blue-950"
        style={{
          width: `${GRID_SIZE * 15}px`,
          height: `${GRID_SIZE * 15}px`,
          maxWidth: "300px",
          maxHeight: "300px",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {[...Array(GRID_SIZE)].map((_, y) =>
          [...Array(GRID_SIZE)].map((_, x) => (
            <div
              key={`cell-${x}-${y}`}
              className={`absolute transition-all duration-150 ${
                (x + y) % 2 === 0 ? "bg-blue-800" : "bg-blue-900"
              }`}
              style={{
                left: `${(x / GRID_SIZE) * 100}%`,
                top: `${(y / GRID_SIZE) * 100}%`,
                width: `${100 / GRID_SIZE}%`,
                height: `${100 / GRID_SIZE}%`,
              }}
            />
          ))
        )}

        {snake.map((segment, index) => (
          <div
            key={`snake-${index}`}
            className={`absolute z-10 rounded-sm ${
              index === 0 ? "bg-green-700" : "bg-green-500"
            }`}
            style={{
              left: `${(segment.x / GRID_SIZE) * 100}%`,
              top: `${(segment.y / GRID_SIZE) * 100}%`,
              width: `${100 / GRID_SIZE}%`,
              height: `${100 / GRID_SIZE}%`,
            }}
          />
        ))}

        <div
          className="absolute z-10 rounded-full bg-red-500"
          style={{
            left: `${(food.x / GRID_SIZE) * 100}%`,
            top: `${(food.y / GRID_SIZE) * 100}%`,
            width: `${100 / GRID_SIZE}%`,
            height: `${100 / GRID_SIZE}%`,
          }}
        />
      </div>

      <div className="space-y-3">
        {gameState === "paused" || gameState === "gameOver" ? (
          <Button
            onClick={startNewGame}
            className="w-full bg-green-600 text-white hover:bg-green-700"
          >
            {gameState === "gameOver" ? "Шинэ Тоглоом" : "Үргэлжлүүлэх"}
          </Button>
        ) : (
          <Button
            onClick={togglePause}
            variant="outline"
            className="w-full bg-transparent"
          >
            Түр зогсоох
          </Button>
        )}

        <div className="mx-auto grid max-w-48 grid-cols-3 gap-2 md:hidden">
          <div></div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => changeDirection("UP")}
            className="h-12"
          >
            ↑
          </Button>
          <div></div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => changeDirection("LEFT")}
            className="h-12"
          >
            ←
          </Button>
          <div></div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => changeDirection("RIGHT")}
            className="h-12"
          >
            →
          </Button>
          <div></div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => changeDirection("DOWN")}
            className="h-12"
          >
            ↓
          </Button>
          <div></div>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-gray-50 p-4">
        <h4 className="mb-2 font-semibold text-gray-700">Тоглох заавар:</h4>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>• Хулгана ба хуруугаараа дээш, доош, зүүн, баруун хөдөлгөөрэй</li>
          <li>• Улаан хоолыг идэж оноо аваарай</li>
          <li>• Хана эсвэл өөрийгөө бүү мөргөөрэй </li>
          <li>• Түр зогсоох товчийг дарж зогсоох буюу үргэлжлүүлэх</li>
        </ul>
      </div>
    </div>
  );
}
