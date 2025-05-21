import { useEffect, useState } from "react";
import { fetchQuestion, submitAnswer } from "../services/game.service";
import type { GameQuestion } from "../types";
import ImageCard from "../components/ImageCard";

export default function Game() {
  const [question, setQuestion] = useState<GameQuestion | null>(null);
  const [score, setScore] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const loadQuestion = async () => {
    setIsFetching(true);
    try {
      const data = await fetchQuestion();
      setQuestion(data);
    } catch (error) {
      console.error("Error loading question:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleAnswer = async (answer: "yes" | "no") => {
    if (!question) return;

    setIsSubmitting(true);
    try {
      const res = await submitAnswer({ hash: question.hash, answer });
      if (res.correct) {
        setScore((prev) => prev + 1);
        await loadQuestion();
      } else {
        setGameOver(true);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setGameOver(false);
    loadQuestion();
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  if (!question) return <div className="text-center mt-10">Chargement...</div>;

  if (gameOver) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold mb-4">Partie terminée</h1>
        <p className="mb-6">Score : {score}</p>
        <button
          onClick={handleRestart}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
        >
          Rejouer
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center mt-10 gap-6 min-h-[80vh]">
      {/* Overlay loading during question fetch */}
      {isFetching && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
        </div>
      )}

      <div className="text-xl font-semibold">Score : {score}</div>
      <div className="flex gap-8">
        <ImageCard title={question.actor} imageUrl={question.actorImage} />
        <ImageCard title={question.movie} imageUrl={question.movieImage} />
      </div>
      <div className="flex gap-4 mt-6">
        {isSubmitting ? (
          <div className="mt-4 animate-spin rounded-full h-10 w-10 border-t-4 border-gray-600"></div>
        ) : (
          <>
            <button
              onClick={() => handleAnswer("yes")}
              className="bg-green-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-green-700"
            >
              Oui
            </button>
            <button
              onClick={() => handleAnswer("no")}
              className="bg-red-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-red-700"
            >
              Non
            </button>
          </>
        )}
      </div>
    </div>
  );
}
