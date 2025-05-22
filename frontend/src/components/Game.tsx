import { useEffect, useState } from "react";
import { fetchQuestion, submitAnswer } from "../services/game.service";
import type { GameQuestion } from "../types";
import QuestionPanel from "../components/QuestionPanel";
import GameOverScreen from "../components/GameOverScreen";
import ErrorPopup from "../components/ErrorPopup";

export default function Game() {
  const [question, setQuestion] = useState<GameQuestion | null>(null);
  const [score, setScore] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadQuestion = async () => {
    setIsFetching(true);
    try {
      const data = await fetchQuestion();
      setQuestion(data);
    } catch (err) {
      console.error("Error loading question:", err);
      setError(
        "Erreur lors de la récupération de la question. Veuillez vérifier la configuration de l'API."
      );
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
    } catch (err) {
      console.error("Error submitting answer:", err);
      setError(
        "Impossible d’envoyer votre réponse. La question a peut-être expiré ou un problème serveur est survenu."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setGameOver(false);
    setError(null);
    loadQuestion();
  };

  useEffect(() => {
    void loadQuestion();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-800 to-indigo-950 p-4 relative flex items-center justify-center">
      {error && <ErrorPopup message={error} onClose={() => setError(null)} />}

      {isFetching && !error && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        </div>
      )}

      {gameOver ? (
        <GameOverScreen score={score} onRestart={handleRestart} />
      ) : question ? (
        <QuestionPanel
          actor={question.actor}
          actorImage={question.actorImage}
          movie={question.movie}
          movieImage={question.movieImage}
          onAnswer={handleAnswer}
          isSubmitting={isSubmitting}
          score={score}
        />
      ) : null}
    </div>
  );
}
