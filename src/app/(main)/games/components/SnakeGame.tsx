"use client"

import { Button } from "@/Components/ui/button"
import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"
type Position = { x: number; y: number }
type GameState = "playing" | "paused" | "gameOver"

const GRID_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION: Direction = "RIGHT"
const GAME_SPEED = 150

export function SnakeGame() {
  // Game state
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Position>({ x: 15, y: 15 })
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION)
  const [gameState, setGameState] = useState<GameState>("paused")
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  // Refs for game loop
  const gameLoopRef = useRef<NodeJS.Timeout>()
  const directionRef = useRef<Direction>(INITIAL_DIRECTION)

  // Generate random food position
  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }
    } while (currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [])

  // Check collision with walls or self
  const checkCollision = useCallback((head: Position, body: Position[]): boolean => {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true
    }
    // Self collision
    return body.some((segment) => segment.x === head.x && segment.y === head.y)
  }, [])

  // Move snake
  const moveSnake = useCallback(() => {
    setSnake((currentSnake) => {
      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }

      // Move head based on direction
      switch (directionRef.current) {
        case "UP":
          head.y -= 1
          break
        case "DOWN":
          head.y += 1
          break
        case "LEFT":
          head.x -= 1
          break
        case "RIGHT":
          head.x += 1
          break
      }

      // Check collision
      if (checkCollision(head, newSnake)) {
        setGameState("gameOver")
        return currentSnake
      }

      newSnake.unshift(head)

      // Check if food is eaten
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 10)
        setFood(generateFood(newSnake))
      } else {
        newSnake.pop() // Remove tail if no food eaten
      }

      return newSnake
    })
  }, [food, generateFood, checkCollision])

  // Handle direction change
  const changeDirection = useCallback(
    (newDirection: Direction) => {
      if (gameState !== "playing") return

      // Prevent reverse direction
      const opposites: Record<Direction, Direction> = {
        UP: "DOWN",
        DOWN: "UP",
        LEFT: "RIGHT",
        RIGHT: "LEFT",
      }

      if (opposites[directionRef.current] !== newDirection) {
        setDirection(newDirection)
        directionRef.current = newDirection
      }
    },
    [gameState],
  )

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault()
          changeDirection("UP")
          break
        case "ArrowDown":
          e.preventDefault()
          changeDirection("DOWN")
          break
        case "ArrowLeft":
          e.preventDefault()
          changeDirection("LEFT")
          break
        case "ArrowRight":
          e.preventDefault()
          changeDirection("RIGHT")
          break
        case " ":
          e.preventDefault()
          togglePause()
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [changeDirection])

  // Game loop
  useEffect(() => {
    if (gameState === "playing") {
      gameLoopRef.current = setInterval(moveSnake, GAME_SPEED)
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [gameState, moveSnake])

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
    }
  }, [score, highScore])

  // Start new game
  const startNewGame = () => {
    setSnake(INITIAL_SNAKE)
    setFood({ x: 15, y: 15 })
    setDirection(INITIAL_DIRECTION)
    directionRef.current = INITIAL_DIRECTION
    setScore(0)
    setGameState("playing")
  }

  // Toggle pause
  const togglePause = () => {
    if (gameState === "playing") {
      setGameState("paused")
    } else if (gameState === "paused") {
      setGameState("playing")
    }
  }

  // Touch controls for mobile
  const handleTouchStart = useRef<{ x: number; y: number } | null>(null)

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleTouchStart.current = { x: touch.clientX, y: touch.clientY }
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!handleTouchStart.current) return

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - handleTouchStart.current.x
    const deltaY = touch.clientY - handleTouchStart.current.y

    const minSwipeDistance = 50

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > minSwipeDistance) {
        changeDirection(deltaX > 0 ? "RIGHT" : "LEFT")
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > minSwipeDistance) {
        changeDirection(deltaY > 0 ? "DOWN" : "UP")
      }
    }

    handleTouchStart.current = null
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Snake Game</h2>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Score: {score}</span>
          <span>High Score: {highScore}</span>
        </div>
      </div>

      {/* Game Status */}
      {gameState === "gameOver" && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
          Game Over! Final Score: {score}
        </div>
      )}

      {gameState === "paused" && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4 text-center">
          Game Paused - Press Space or Start to continue
        </div>
      )}

      {/* Game Grid */}
      <div
        className="relative bg-green-100 border-4 border-green-600 mx-auto mb-4 touch-none"
        style={{
          width: `${GRID_SIZE * 15}px`,
          height: `${GRID_SIZE * 15}px`,
          maxWidth: "300px",
          maxHeight: "300px",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className={`absolute ${index === 0 ? "bg-green-700" : "bg-green-500"} rounded-sm`}
            style={{
              left: `${(segment.x / GRID_SIZE) * 100}%`,
              top: `${(segment.y / GRID_SIZE) * 100}%`,
              width: `${100 / GRID_SIZE}%`,
              height: `${100 / GRID_SIZE}%`,
            }}
          />
        ))}

        {/* Food */}
        <div
          className="absolute bg-red-500 rounded-full"
          style={{
            left: `${(food.x / GRID_SIZE) * 100}%`,
            top: `${(food.y / GRID_SIZE) * 100}%`,
            width: `${100 / GRID_SIZE}%`,
            height: `${100 / GRID_SIZE}%`,
          }}
        />
      </div>

      {/* Controls */}
      <div className="space-y-3">
        {gameState === "paused" || gameState === "gameOver" ? (
          <Button onClick={startNewGame} className="w-full bg-green-600 hover:bg-green-700 text-white">
            {gameState === "gameOver" ? "New Game" : "Start Game"}
          </Button>
        ) : (
          <Button onClick={togglePause} variant="outline" className="w-full bg-transparent">
            Pause Game
          </Button>
        )}

        {/* Mobile Controls */}
        <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto md:hidden">
          <div></div>
          <Button variant="outline" size="sm" onClick={() => changeDirection("UP")} className="h-12">
            ↑
          </Button>
          <div></div>
          <Button variant="outline" size="sm" onClick={() => changeDirection("LEFT")} className="h-12">
            ←
          </Button>
          <div></div>
          <Button variant="outline" size="sm" onClick={() => changeDirection("RIGHT")} className="h-12">
            →
          </Button>
          <div></div>
          <Button variant="outline" size="sm" onClick={() => changeDirection("DOWN")} className="h-12">
            ↓
          </Button>
          <div></div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-2">How to Play:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Use arrow keys or swipe to move</li>
          <li>• Eat red food to grow and score points</li>
          <li>• Avoid hitting walls or yourself</li>
          <li>• Press Space to pause/unpause</li>
        </ul>
      </div>
    </div>
  )
}
