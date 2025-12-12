import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Clock, Target } from "lucide-react";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";

interface MemoryGameProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface CardType {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const emojis = ["🎨", "🎭", "🎪", "🎯", "🎲", "🎸", "🎺", "🎻"];

export function MemoryGame({ onComplete, onBack }: MemoryGameProps) {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);
  const [canFlip, setCanFlip] = useState(true);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver]);

  const initializeGame = () => {
    const gameEmojis = [...emojis, ...emojis];
    const shuffled = gameEmojis
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameOver(false);
    setTime(0);
    setCanFlip(true);
  };

  const handleCardClick = (id: number) => {
    if (!canFlip) return;
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(id)) return;
    if (cards[id].isMatched) return;

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    const newCards = cards.map((card) =>
      card.id === id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      setCanFlip(false);

      const [firstId, secondId] = newFlippedCards;

      if (cards[firstId].emoji === cards[secondId].emoji) {
        // Match found!
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isMatched: true }
                : card
            )
          );
          setFlippedCards([]);
          setMatches(matches + 1);
          setCanFlip(true);

          // Check if game is complete
          if (matches + 1 === emojis.length) {
            const score = Math.max(100 - moves * 5 - Math.floor(time / 2), 20);
            setTimeout(() => {
              setGameOver(true);
              onComplete(score);
            }, 500);
          }
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setCanFlip(true);
        }, 1000);
      }
    }
  };

  if (gameOver) {
    const score = Math.max(100 - moves * 5 - Math.floor(time / 2), 20);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="container mx-auto px-4 py-8 max-w-2xl"
      >
        <Card
          className="p-9 md:p-10 text-center"
          style={{
            background:
              "linear-gradient(135deg, #f5f3ff 0%, #fdf2f8 50%, #fee2e2 100%)",
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex p-6 rounded-full mb-6"
            style={{
              background:
                "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #db2777 100%)",
            }}
          >
            <Trophy className="w-20 h-20 text-white" />
          </motion.div>

          <h2 className="text-4xl text-gray-900 mb-4">Memory Master! 🎉</h2>
          <p className="text-xl text-gray-600 mb-6">
            You earned {score} points!
          </p>

          <div className="space-y-2 mb-8">
            <div className="flex justify-between text-gray-700">
              <span>Moves:</span>
              <span>{moves}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Time:</span>
              <span>{time}s</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Score:</span>
              <span className="text-2xl text-purple-600">{score}</span>
            </div>
          </div>

          <div className="flex gap-5">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 px-6 py-3"
            >
              Back to Games
            </Button>
            <Button
              onClick={initializeGame}
              className="flex-1 px-6 py-3 text-white"
              style={{
                background:
                  "linear-gradient(90deg, #a855f7 0%, #ec4899 50%, #db2777 100%)",
              }}
            >
              Play Again
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8 max-w-4xl"
    >
      <div
        className="rounded-3xl p-7 md:p-10 border border-pink-100"
        style={{
          background:
            "linear-gradient(135deg, #fdf2ff 0%, #fdf2f8 40%, #e0f2fe 100%)",
          boxShadow: "0 18px 45px rgba(15, 23, 42, 0.16)",
        }}
      >
        {/* Header */}
        <div className="mb-7 grid grid-cols-3 gap-5">
          <Card
            className="p-5 md:p-6 text-white mx-1 my-1"
            style={{
              background: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
            }}
          >
            <div className="flex items-center gap-2">
              <Target className="w-6 h-6" />
              <div>
                <p className="text-xs text-white/80">Moves</p>
                <p className="text-2xl">{moves}</p>
              </div>
            </div>
          </Card>

          <Card
            className="p-5 md:p-6 text-white mx-1 my-1"
            style={{
              background: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
            }}
          >
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6" />
              <div>
                <p className="text-xs text-white/80">Matches</p>
                <p className="text-2xl">
                  {matches}/{emojis.length}
                </p>
              </div>
            </div>
          </Card>

          <Card
            className="p-5 md:p-6 text-white mx-1 my-1"
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            }}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6" />
              <div>
                <p className="text-xs text-white/80">Time</p>
                <p className="text-2xl">{time}s</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-3 md:gap-4 mb-6">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="relative aspect-square cursor-pointer"
                onClick={() => handleCardClick(card.id)}
                animate={{
                  rotateY: card.isFlipped || card.isMatched ? 180 : 0,
                }}
                transition={{ duration: 0.3 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Card Back */}
                <div
                  className={`absolute inset-0 rounded-2xl flex items-center justify-center shadow-lg text-white ${
                    card.isFlipped || card.isMatched
                      ? "opacity-0"
                      : "opacity-100"
                  }`}
                  style={{
                    backfaceVisibility: "hidden",
                    background:
                      "linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)",
                  }}
                >
                  <div className="text-4xl">❓</div>
                </div>

                {/* Card Front */}
                <div
                  className={`absolute inset-0 rounded-2xl flex items-center justify-center shadow-lg ${
                    card.isMatched ? "" : "bg-white"
                  } ${
                    card.isFlipped || card.isMatched
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    background: card.isMatched
                      ? "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
                      : undefined,
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{
                      scale: card.isFlipped || card.isMatched ? 1 : 0,
                    }}
                    className="text-5xl md:text-6xl"
                  >
                    {card.emoji}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={initializeGame}
            variant="outline"
            className="px-8 mx-1 my-1"
          >
            Reset Game
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
