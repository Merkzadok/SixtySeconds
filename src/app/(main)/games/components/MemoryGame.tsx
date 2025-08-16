"use client"

import { Button } from "@/Components/ui/button"
import { useState, useEffect, useCallback } from "react"

type Card = {
  id: number
  symbol: string
  isFlipped: boolean
  isMatched: boolean
}

type GameState = "playing" | "won"

// Card symbols (emojis work well for this)
const SYMBOLS = ["🎯", "🎮", "🎲", "🎪", "🎨", "🎭", "🎸", "🎺"]

export function MemoryGame() {
  // Game state
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [gameState, setGameState] = useState<GameState>("playing")
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [gameTime, setGameTime] = useState(0)

  // Initialize game
  const initializeGame = useCallback(() => {
    // Create pairs of cards
    const gameCards: Card[] = []
    SYMBOLS.forEach((symbol, index) => {
      // Add two cards for each symbol
      gameCards.push(
        {
          id: index * 2,
          symbol,
          isFlipped: false,
          isMatched: false,
        },
        {
          id: index * 2 + 1,
          symbol,
          isFlipped: false,
          isMatched: false,
        },
      )
    })

    // Shuffle cards
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]]
    }

    setCards(gameCards)
    setFlippedCards([])
    setMoves(0)
    setMatches(0)
    setGameState("playing")
    setStartTime(Date.now())
    setGameTime(0)
  }, [])

  // Handle card click
  const handleCardClick = (cardId: number) => {
    if (gameState !== "playing") return

    const card = cards.find((c) => c.id === cardId)
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2) return

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    // Update card state
    setCards((prevCards) => prevCards.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)))

    // Check for match when two cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1)

      const [firstCardId, secondCardId] = newFlippedCards
      const firstCard = cards.find((c) => c.id === firstCardId)
      const secondCard = cards.find((c) => c.id === secondCardId)

      if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
        // Match found
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) => (c.id === firstCardId || c.id === secondCardId ? { ...c, isMatched: true } : c)),
          )
          setMatches((prev) => prev + 1)
          setFlippedCards([])
        }, 1000)
      } else {
        // No match - flip cards back
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) => (c.id === firstCardId || c.id === secondCardId ? { ...c, isFlipped: false } : c)),
          )
          setFlippedCards([])
        }, 1500)
      }
    }
  }

  // Check win condition
  useEffect(() => {
    if (matches === SYMBOLS.length && gameState === "playing") {
      setGameState("won")
    }
  }, [matches, gameState])

  // Update game time
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameState === "playing") {
      interval = setInterval(() => {
        setGameTime(Math.floor((Date.now() - startTime) / 1000))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameState, startTime])

  // Initialize game on mount
  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Memory Game</h2>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Moves: {moves}</span>
          <span>
            Matches: {matches}/{SYMBOLS.length}
          </span>
          <span>Time: {formatTime(gameTime)}</span>
        </div>
      </div>

      {/* Game Status */}
      {gameState === "won" && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
          🎉 Congratulations! You won in {moves} moves and {formatTime(gameTime)}!
        </div>
      )}

      {/* Game Grid */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            disabled={card.isFlipped || card.isMatched || flippedCards.length >= 2}
            className={`
              aspect-square rounded-lg border-2 text-2xl font-bold transition-all duration-300 transform
              ${
                card.isFlipped || card.isMatched
                  ? card.isMatched
                    ? "bg-green-200 border-green-400 text-green-800 scale-95"
                    : "bg-blue-200 border-blue-400 text-blue-800"
                  : "bg-gray-200 border-gray-400 hover:bg-gray-300 hover:scale-105 active:scale-95"
              }
              ${flippedCards.length >= 2 && !card.isFlipped && !card.isMatched ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            `}
          >
            {card.isFlipped || card.isMatched ? card.symbol : "?"}
          </button>
        ))}
      </div>

      {/* Controls */}
      <Button onClick={initializeGame} variant="outline" className="w-full bg-transparent mb-4">
        New Game
      </Button>

      {/* Instructions */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-2">How to Play:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Click cards to flip them over</li>
          <li>• Find matching pairs of symbols</li>
          <li>• Match all pairs to win</li>
          <li>• Try to win in as few moves as possible!</li>
        </ul>
      </div>
    </div>
  )
}
//git// 