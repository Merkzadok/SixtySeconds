"use client";

import { useState, useEffect, useCallback } from "react";

type Card = {
  id: number;
  word: string;
  isFlipped: boolean;
  isMatched: boolean;
};

type GameState = "playing" | "won";

const WORD_POOL = [
  "Хонь",
  "Арслан",
  "Пуужин",
  "Ном",
  "Алим",
  "Дэвтэр",
  "Нар",
  "Сар",
  "Морь",
  "Гал",
  "Уул",
  "Гол",
  "Мод",
  "Цэцэг",
  "Тэнгис",
  "Ой",
  "Баатар",
  "Тоглоом",
  "Зураг",
  "Хот",
  "Тал",
  "Бороо",
  "Нисэх",
  "Зам",
];

const getRandomWords = () => {
  const shuffled = [...WORD_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 8);
};

export function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [gameTime, setGameTime] = useState(0);

  const initializeGame = useCallback(() => {
    const WORDS = getRandomWords();

    const gameCards: Card[] = WORDS.flatMap((word, index) => [
      {
        id: index * 2,
        word,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: index * 2 + 1,
        word,
        isFlipped: false,
        isMatched: false,
      },
    ]);

    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }

    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameState("playing");
    setStartTime(Date.now());
    setGameTime(0);
  }, []);

  const handleCardClick = (cardId: number) => {
    if (gameState !== "playing") return;

    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2)
      return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards((prevCards) =>
      prevCards.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
    );

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);

      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find((c) => c.id === firstCardId);
      const secondCard = cards.find((c) => c.id === secondCardId);

      if (firstCard && secondCard && firstCard.word === secondCard.word) {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.id === firstCardId || c.id === secondCardId
                ? { ...c, isMatched: true }
                : c
            )
          );
          setMatches((prev) => prev + 1);
          setFlippedCards([]);
        }, 1000);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.id === firstCardId || c.id === secondCardId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
        }, 1500);
      }
    }
  };

  useEffect(() => {
    if (matches === 8 && gameState === "playing") {
      setGameState("won");
    }
  }, [matches, gameState]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === "playing") {
      interval = setInterval(() => {
        setGameTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, startTime]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Санах ой</h2>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Оролдлого: {moves}</span>
          <span>Тохирол: {matches}/8</span>
          <span>Хугацаа: {formatTime(gameTime)}</span>
        </div>
      </div>

      {gameState === "won" && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
          🎉 Баяр хүргэе! Чи хожлоо{moves} {formatTime(gameTime)}!
        </div>
      )}

      <div className="grid grid-cols-4 gap-2 mb-6">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            disabled={
              card.isFlipped || card.isMatched || flippedCards.length >= 2
            }
            className={`
              aspect-square rounded-lg border-2 text-sm sm:text-lg font-semibold transition-all duration-300 transform flex items-center justify-center
              ${
                card.isFlipped || card.isMatched
                  ? card.isMatched
                    ? "bg-green-200 border-green-400 text-green-800 scale-95"
                    : "bg-blue-200 border-blue-400 text-blue-800"
                  : "bg-gray-200 border-gray-400 hover:bg-gray-300 hover:scale-105 active:scale-95"
              }
              ${
                flippedCards.length >= 2 && !card.isFlipped && !card.isMatched
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }
            `}
          >
            {card.isFlipped || card.isMatched ? card.word : "?"}
          </button>
        ))}
      </div>

      <button
        onClick={initializeGame}
        className="w-full px-4 py-2 bg-transparent border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all mb-4"
      >
        Шинэ тоглоом
      </button>

      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-2">Тоглох заавар:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Картан дээр дараад тэднийг эргүүл</li>
          <li>• Ижил утгатай үгнүүдийг ол</li>
          <li>• Бүх хосыг олж хожоорой</li>
          <li>• Хамгийн цөөн оролдлогоор хожихыг хичээгээрэй!</li>
        </ul>
      </div>
    </div>
  );
}
