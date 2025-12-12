import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Lightbulb, Sparkles } from "lucide-react";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";

interface WordPuzzleProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface Puzzle {
  word: string;
  hint: string;
  category: string;
}

const puzzles: Puzzle[] = [
  {
    word: "ELEPHANT",
    hint: "Largest land animal with a trunk",
    category: "Animals",
  },
  {
    word: "RAINBOW",
    hint: "Colorful arc in the sky after rain",
    category: "Nature",
  },
  {
    word: "COMPUTER",
    hint: "Electronic device for processing data",
    category: "Technology",
  },
  {
    word: "MOUNTAIN",
    hint: "Very tall natural elevation",
    category: "Geography",
  },
  {
    word: "BUTTERFLY",
    hint: "Insect with colorful wings",
    category: "Animals",
  },
  {
    word: "TELESCOPE",
    hint: "Device for viewing distant stars",
    category: "Science",
  },
  { word: "VOLCANO", hint: "Mountain that erupts lava", category: "Geography" },
  {
    word: "GUITAR",
    hint: "Musical instrument with strings",
    category: "Music",
  },
];

export function WordPuzzle({ onComplete, onBack }: WordPuzzleProps) {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [puzzlesSolved, setPuzzlesSolved] = useState(0);

  const puzzle = puzzles[currentPuzzle];
  const maxWrongGuesses = 6;
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const isWordComplete = puzzle.word
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  useEffect(() => {
    if (isWordComplete && !gameOver) {
      const points = Math.max(20 - wrongGuesses * 2 - (showHint ? 5 : 0), 5);
      setScore(score + points);
      setPuzzlesSolved(puzzlesSolved + 1);

      setTimeout(() => {
        if (currentPuzzle < puzzles.length - 1) {
          setCurrentPuzzle(currentPuzzle + 1);
          setGuessedLetters([]);
          setWrongGuesses(0);
          setShowHint(false);
        } else {
          setGameOver(true);
          onComplete(score + points);
        }
      }, 2000);
    }
  }, [isWordComplete]);

  useEffect(() => {
    if (wrongGuesses >= maxWrongGuesses) {
      setTimeout(() => {
        if (currentPuzzle < puzzles.length - 1) {
          setCurrentPuzzle(currentPuzzle + 1);
          setGuessedLetters([]);
          setWrongGuesses(0);
          setShowHint(false);
        } else {
          setGameOver(true);
          onComplete(score);
        }
      }, 2000);
    }
  }, [wrongGuesses]);

  const handleLetterGuess = (letter: string) => {
    if (guessedLetters.includes(letter)) return;
    if (wrongGuesses >= maxWrongGuesses) return;
    if (isWordComplete) return;

    const newGuessed = [...guessedLetters, letter];
    setGuessedLetters(newGuessed);

    if (!puzzle.word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  if (gameOver) {
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
              "linear-gradient(135deg, #fff7ed 0%, #fee2e2 50%, #ffe4e6 100%)",
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex p-6 rounded-full mb-6"
            style={{
              background:
                "linear-gradient(135deg, #fdba74 0%, #f97316 40%, #ef4444 100%)",
            }}
          >
            <Trophy className="w-20 h-20 text-white" />
          </motion.div>

          <h2 className="text-4xl text-gray-900 mb-4">Puzzle Master! 🎯</h2>
          <p className="text-xl text-gray-600 mb-6">
            You earned {score} points!
          </p>

          <div className="space-y-2 mb-8">
            <div className="flex justify-between text-gray-700">
              <span>Puzzles Solved:</span>
              <span>
                {puzzlesSolved} / {puzzles.length}
              </span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Total Score:</span>
              <span className="text-2xl text-orange-600">{score}</span>
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
              onClick={() => {
                setCurrentPuzzle(0);
                setGuessedLetters([]);
                setWrongGuesses(0);
                setScore(0);
                setGameOver(false);
                setShowHint(false);
                setPuzzlesSolved(0);
              }}
              className="flex-1 px-6 py-3 text-white"
              style={{
                background:
                  "linear-gradient(90deg, #fb923c 0%, #f97316 40%, #ef4444 100%)",
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
      {/* Header */}
      <div className="mb-7 flex items-center justify-between flex-wrap gap-5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
            <Trophy className="w-5 h-5 text-orange-600" />
            <span className="text-orange-900">{score} points</span>
          </div>

          <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-purple-900">
              {puzzlesSolved} / {puzzles.length}
            </span>
          </div>
        </div>

        <Button
          onClick={() => setShowHint(!showHint)}
          variant="outline"
          size="sm"
          className="gap-2 mx-1 my-1"
        >
          <Lightbulb className="w-4 h-4" />
          {showHint ? "Hide" : "Show"} Hint
        </Button>
      </div>

      {/* Category */}
      <div className="text-center mb-6">
        <span
          className="inline-flex items-center gap-2 text-white px-6 py-2 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #fb923c 0%, #f97316 40%, #ef4444 100%)",
          }}
        >
          <span>Category: {puzzle.category}</span>
        </span>
      </div>

      {/* Hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-6 overflow-hidden"
          >
            <Card className="p-5 bg-yellow-50 border-yellow-200 mx-2 my-2">
              <div className="flex items-center gap-2 text-yellow-900">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                <p>{puzzle.hint}</p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Word Display */}
      <Card
        className="p-9 md:p-13 mb-9 mx-2 my-2"
        style={{
          background:
            "linear-gradient(135deg, #fb923c 0%, #f97316 40%, #dc2626 100%)",
        }}
      >
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {puzzle.word.split("").map((letter, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="w-12 h-16 md:w-16 md:h-20 bg-white rounded-xl flex items-center justify-center shadow-lg"
            >
              <AnimatePresence mode="wait">
                {guessedLetters.includes(letter) ? (
                  <motion.span
                    key="letter"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="text-3xl md:text-4xl text-gray-900"
                  >
                    {letter}
                  </motion.span>
                ) : isWordComplete ? (
                  <motion.span
                    key="reveal"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-3xl md:text-4xl text-green-600"
                  >
                    {letter}
                  </motion.span>
                ) : (
                  <span key="placeholder" className="text-2xl text-gray-300">
                    ?
                  </span>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Wrong Guesses Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-center gap-2">
          <span className="text-gray-600">Wrong Guesses:</span>
          <div className="flex gap-1">
            {Array.from({ length: maxWrongGuesses }).map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full ${
                  index < wrongGuesses ? "bg-red-500" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Win/Lose Message */}
      <AnimatePresence>
        {isWordComplete && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="mb-6"
          >
            <Card className="p-6 bg-green-100 border-green-300 text-center mx-2 my-2">
              <p className="text-2xl text-green-900">
                🎉 Correct! Moving to next puzzle...
              </p>
            </Card>
          </motion.div>
        )}

        {wrongGuesses >= maxWrongGuesses && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="mb-6"
          >
            <Card className="p-6 bg-red-100 border-red-300 text-center mx-2 my-2">
              <p className="text-xl text-red-900 mb-2">
                The word was: <span className="text-2xl">{puzzle.word}</span>
              </p>
              <p className="text-red-700">Moving to next puzzle...</p>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard */}
      <div className="grid grid-cols-7 md:grid-cols-9 gap-2">
        {alphabet.map((letter) => {
          const isGuessed = guessedLetters.includes(letter);
          const isCorrect = isGuessed && puzzle.word.includes(letter);
          const isWrong = isGuessed && !puzzle.word.includes(letter);

          return (
            <motion.div
              key={letter}
              whileHover={!isGuessed ? { scale: 1.1 } : {}}
              whileTap={!isGuessed ? { scale: 0.9 } : {}}
            >
              <Button
                onClick={() => handleLetterGuess(letter)}
                disabled={
                  isGuessed || wrongGuesses >= maxWrongGuesses || isWordComplete
                }
                className={`w-full aspect-square p-0 text-lg ${
                  isCorrect
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : isWrong
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-white hover:bg-gray-100 text-gray-900 border-2 border-gray-300"
                }`}
              >
                {letter}
              </Button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
