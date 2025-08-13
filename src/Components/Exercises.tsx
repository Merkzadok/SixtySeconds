import React, { useState } from "react";
import { CheckCircle, XCircle, RotateCcw, Shuffle } from "lucide-react";
import { AppPage } from "@/app/page";

interface ExercisesProps {
  onNavigate: (page: AppPage) => void;
  user: {
    name: string;
    score: number;
  };
  setUser: (user: any) => void;
}

const Exercises: React.FC<ExercisesProps> = ({ onNavigate, user, setUser }) => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [exerciseType, setExerciseType] = useState<
    "error" | "order" | "matching"
  >("error");

  // Error Detection Exercises
  const errorExercises = [
    {
      sentence: "The big dag is happy.",
      correct: "dog",
      error: "dag",
      position: 2,
    },
    {
      sentence: "I have a ret car.",
      correct: "red",
      error: "ret",
      position: 3,
    },
    {
      sentence: "The sun is brigt today.",
      correct: "bright",
      error: "brigt",
      position: 3,
    },
  ];

  // Sentence Ordering Exercises
  const orderExercises = [
    { words: ["The", "cat", "is", "sleeping"], correct: "The cat is sleeping" },
    {
      words: ["I", "love", "to", "read", "books"],
      correct: "I love to read books",
    },
    {
      words: ["My", "mom", "makes", "good", "food"],
      correct: "My mom makes good food",
    },
  ];

  // Word Matching Game
  const matchingExercises = [
    {
      words: ["cat", "dog", "bird", "fish"],
      images: ["🐱", "🐶", "🐦", "🐠"],
      pairs: [
        { word: "cat", image: "🐱" },
        { word: "dog", image: "🐶" },
        { word: "bird", image: "🐦" },
        { word: "fish", image: "🐠" },
      ],
    },
    {
      words: ["sun", "moon", "star", "cloud"],
      images: ["☀️", "🌙", "⭐", "☁️"],
      pairs: [
        { word: "sun", image: "☀️" },
        { word: "moon", image: "🌙" },
        { word: "star", image: "⭐" },
        { word: "cloud", image: "☁️" },
      ],
    },
    {
      words: ["apple", "banana", "orange", "grape"],
      images: ["🍎", "🍌", "🍊", "🍇"],
      pairs: [
        { word: "apple", image: "🍎" },
        { word: "banana", image: "🍌" },
        { word: "orange", image: "🍊" },
        { word: "grape", image: "🍇" },
      ],
    },
  ];

  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
    null
  );
  const [orderedWords, setOrderedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [gameWords, setGameWords] = useState<string[]>([]);
  const [gameImages, setGameImages] = useState<string[]>([]);

  React.useEffect(() => {
    if (exerciseType === "order") {
      const shuffled = [...orderExercises[currentExercise].words].sort(
        () => Math.random() - 0.5
      );
      setAvailableWords(shuffled);
      setOrderedWords([]);
    } else if (exerciseType === "matching") {
      const exercise = matchingExercises[currentExercise];
      const shuffledWords = [...exercise.words].sort(() => Math.random() - 0.5);
      const shuffledImages = [...exercise.images].sort(
        () => Math.random() - 0.5
      );
      setGameWords(shuffledWords);
      setGameImages(shuffledImages);
      setMatchedPairs([]);
      setSelectedWord(null);
      setSelectedImage(null);
    }
  }, [currentExercise, exerciseType]);

  const handleErrorClick = (word: string) => {
    const exercise = errorExercises[currentExercise];
    setSelectedWord(word);

    if (word === exercise.error) {
      setFeedback("correct");
      setTimeout(() => {
        setFeedback(null);
        setSelectedWord(null);
        if (currentExercise < errorExercises.length - 1) {
          setCurrentExercise((prev) => prev + 1);
        } else {
          setExerciseType("matching");
          setCurrentExercise(0);
        }
      }, 2000);
    } else {
      setFeedback("incorrect");
      setTimeout(() => {
        setFeedback(null);
        setSelectedWord(null);
      }, 1500);
    }
  };

  const handleWordClick = (word: string, fromOrdered: boolean = false) => {
    if (fromOrdered) {
      setOrderedWords((prev) => prev.filter((w) => w !== word));
      setAvailableWords((prev) => [...prev, word]);
    } else {
      setOrderedWords((prev) => [...prev, word]);
      setAvailableWords((prev) => prev.filter((w) => w !== word));
    }
  };

  const handleMatchingClick = (item: string, type: "word" | "image") => {
    if (type === "word") {
      if (selectedWord === item) {
        setSelectedWord(null);
      } else {
        setSelectedWord(item);
        if (selectedImage) {
          checkMatch(item, selectedImage);
        }
      }
    } else {
      if (selectedImage === item) {
        setSelectedImage(null);
      } else {
        setSelectedImage(item);
        if (selectedWord) {
          checkMatch(selectedWord, item);
        }
      }
    }
  };

  const checkMatch = (word: string, image: string) => {
    const exercise = matchingExercises[currentExercise];
    const correctPair = exercise.pairs.find(
      (pair) => pair.word === word && pair.image === image
    );

    if (correctPair) {
      setFeedback("correct");
      setMatchedPairs((prev) => [...prev, word, image]);
      setSelectedWord(null);
      setSelectedImage(null);
      setUser({ ...user, score: user.score + 20 });

      setTimeout(() => {
        setFeedback(null);
        if (matchedPairs.length + 2 >= exercise.pairs.length * 2) {
          // All pairs matched
          if (currentExercise < matchingExercises.length - 1) {
            setCurrentExercise((prev) => prev + 1);
          } else {
            setExerciseType("order");
            setCurrentExercise(0);
          }
        }
      }, 1500);
    } else {
      setFeedback("incorrect");
      setSelectedWord(null);
      setSelectedImage(null);
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  const checkSentenceOrder = () => {
    const exercise = orderExercises[currentExercise];
    const userSentence = orderedWords.join(" ");

    if (userSentence === exercise.correct) {
      setFeedback("correct");
      setUser({ ...user, score: user.score + 30 });
      setTimeout(() => {
        setFeedback(null);
        if (currentExercise < orderExercises.length - 1) {
          setCurrentExercise((prev) => prev + 1);
        } else {
          // Move to next exercise type or complete
          onNavigate("home");
        }
      }, 2000);
    } else {
      setFeedback("incorrect");
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  const resetOrder = () => {
    const shuffled = [...orderExercises[currentExercise].words].sort(
      () => Math.random() - 0.5
    );
    setAvailableWords(shuffled);
    setOrderedWords([]);
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-4xl mx-auto p-8">
        {exerciseType === "error" && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-purple-800 mb-2">
              🔍 Find the Mistake!
            </h2>
            <p className="text-purple-600 mb-8">
              Click on the word that is spelled incorrectly
            </p>

            <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-purple-200 mb-8">
              <div className="text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed mb-8">
                {errorExercises[currentExercise].sentence
                  .split(" ")
                  .map((word, index) => (
                    <span
                      key={index}
                      onClick={() =>
                        handleErrorClick(word.replace(/[.,!?]/g, ""))
                      }
                      className={`cursor-pointer mx-2 px-3 py-1 rounded-lg transition-all duration-200 hover:bg-purple-100 ${
                        selectedWord === word.replace(/[.,!?]/g, "")
                          ? "bg-purple-200 scale-110"
                          : ""
                      }`}
                    >
                      {word}
                    </span>
                  ))}
              </div>

              {feedback === "correct" && (
                <div className="bg-green-100 border-2 border-green-300 rounded-2xl p-6">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-green-800 mb-2">
                    Excellent!
                  </h4>
                  <p className="text-green-700">
                    You found the mistake! The correct word is "
                    {errorExercises[currentExercise].correct}"
                  </p>
                </div>
              )}

              {feedback === "incorrect" && (
                <div className="bg-orange-100 border-2 border-orange-300 rounded-2xl p-6">
                  <XCircle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-orange-800 mb-2">
                    Not quite!
                  </h4>
                  <p className="text-orange-700">
                    Look more carefully for the spelling mistake.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {exerciseType === "matching" && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-800 mb-2">
              🎮 Match the Words!
            </h2>
            <p className="text-green-600 mb-8">
              Click on a word and then click on its matching picture
            </p>

            <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-green-200 mb-8">
              <div className="grid grid-cols-2 gap-8">
                {/* Words Column */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Words
                  </h3>
                  <div className="space-y-3">
                    {gameWords.map((word, index) => (
                      <button
                        key={`word-${word}-${index}`}
                        onClick={() => handleMatchingClick(word, "word")}
                        disabled={matchedPairs.includes(word)}
                        className={`w-full p-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                          matchedPairs.includes(word)
                            ? "bg-green-100 text-green-800 cursor-not-allowed opacity-50"
                            : selectedWord === word
                            ? "bg-blue-200 text-blue-800 scale-105 shadow-lg"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:scale-105"
                        }`}
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Images Column */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Pictures
                  </h3>
                  <div className="space-y-3">
                    {gameImages.map((image, index) => (
                      <button
                        key={`image-${image}-${index}`}
                        onClick={() => handleMatchingClick(image, "image")}
                        disabled={matchedPairs.includes(image)}
                        className={`w-full p-4 rounded-xl text-4xl transition-all duration-200 ${
                          matchedPairs.includes(image)
                            ? "bg-green-100 cursor-not-allowed opacity-50"
                            : selectedImage === image
                            ? "bg-blue-200 scale-105 shadow-lg"
                            : "bg-gray-100 hover:bg-gray-200 hover:scale-105"
                        }`}
                      >
                        {image}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {feedback === "correct" && (
                <div className="mt-6 bg-green-100 border-2 border-green-300 rounded-2xl p-6">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-green-800 mb-2">
                    Perfect Match!
                  </h4>
                  <p className="text-green-700">
                    Great job! You found the right pair! 🌟
                  </p>
                </div>
              )}

              {feedback === "incorrect" && (
                <div className="mt-6 bg-orange-100 border-2 border-orange-300 rounded-2xl p-6">
                  <XCircle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-orange-800 mb-2">
                    Try again!
                  </h4>
                  <p className="text-orange-700">
                    That's not quite right. Look carefully and try another
                    match!
                  </p>
                </div>
              )}

              {/* Progress indicator for matching game */}
              <div className="mt-6 text-center">
                <div className="text-sm font-semibold text-gray-600">
                  Matched: {matchedPairs.length / 2} /{" "}
                  {matchingExercises[currentExercise].pairs.length}
                </div>
              </div>
            </div>
          </div>
        )}

        {exerciseType === "order" && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-pink-800 mb-2">
              📝 Put the Words in Order!
            </h2>
            <p className="text-pink-600 mb-8">
              Drag the words to make a correct sentence
            </p>

            <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-pink-200 mb-8">
              {/* Ordered Words Area */}
              <div className="min-h-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-4 mb-6">
                <p className="text-sm text-gray-500 mb-2">Your sentence:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {orderedWords.length === 0 ? (
                    <span className="text-gray-400 italic">
                      Drop words here...
                    </span>
                  ) : (
                    orderedWords.map((word, index) => (
                      <span
                        key={`ordered-${word}-${index}`}
                        onClick={() => handleWordClick(word, true)}
                        className="bg-pink-100 text-pink-800 px-4 py-2 rounded-lg cursor-pointer hover:bg-pink-200 transition-colors font-semibold"
                      >
                        {word}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Available Words */}
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Available words:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {availableWords.map((word, index) => (
                    <span
                      key={`available-${word}-${index}`}
                      onClick={() => handleWordClick(word)}
                      className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors font-semibold"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={checkSentenceOrder}
                  disabled={
                    orderedWords.length !==
                    orderExercises[currentExercise].words.length
                  }
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-600 hover:to-green-700 transition-all duration-200"
                >
                  <CheckCircle className="inline h-4 w-4 mr-2" />
                  Check Answer
                </button>

                <button
                  onClick={resetOrder}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-200"
                >
                  <Shuffle className="inline h-4 w-4 mr-2" />
                  Reset
                </button>
              </div>

              {feedback === "correct" && (
                <div className="mt-6 bg-green-100 border-2 border-green-300 rounded-2xl p-6">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-green-800 mb-2">
                    Perfect!
                  </h4>
                  <p className="text-green-700">
                    You made a perfect sentence! 🌟
                  </p>
                </div>
              )}

              {feedback === "incorrect" && (
                <div className="mt-6 bg-orange-100 border-2 border-orange-300 rounded-2xl p-6">
                  <XCircle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-orange-800 mb-2">
                    Try again!
                  </h4>
                  <p className="text-orange-700">
                    The word order isn't quite right. Give it another try!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="text-center">
          <div className="bg-white rounded-xl p-4 inline-block shadow-md">
            <span className="text-sm font-semibold text-gray-600">
              {exerciseType === "error"
                ? "Find Mistakes"
                : exerciseType === "matching"
                ? "Word Matching"
                : "Word Order"}
              : {currentExercise + 1}/3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercises;
