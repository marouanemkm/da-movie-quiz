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

  if (!question && !error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-800 to-indigo-950">
        <span className="text-white text-3xl font-semibold">Chargement…</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-800 to-indigo-950 p-4 relative flex items-center justify-center">
      {/* Error popup */}
      {error && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-white max-w-md w-full rounded-xl shadow-xl p-6 space-y-4 text-gray-800">
            <h2 className="text-xl font-semibold text-red-600">
              Une erreur est survenue
            </h2>
            <p>{error}</p>
            <ul className="list-disc list-inside text-sm">
              <li>
                Clé TMDB bien renseignée dans le fichier <code>.env</code> côté
                API ?
              </li>
              <li>Connexion internet fonctionnelle ?</li>
              <li>L’API TMDB est-elle disponible ?</li>
              <li>Les services Docker sont-ils bien démarrés ?</li>
            </ul>
            <div className="flex justify-end gap-3 pt-2">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => window.location.reload()}
              >
                Recharger
              </button>
              <button
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                onClick={() => setError(null)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading overlay */}
      {isFetching && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        </div>
      )}

      {gameOver ? (
        <div className="bg-indigo-900/70 backdrop-blur-xl p-10 rounded-xl shadow-2xl text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Game Over</h1>
          <p className="text-2xl text-white mb-8">
            Score final : <span className="text-yellow-400">{score}</span>
          </p>
          <button
            onClick={handleRestart}
            className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-8 py-3 rounded-full transition-all shadow-md"
          >
            Rejouer
          </button>
        </div>
      ) : question ? (
        <div className="max-w-5xl w-full bg-indigo-900/70 backdrop-blur-xl rounded-xl shadow-xl p-8 space-y-8">
          <h2 className="text-3xl font-semibold text-white text-center">
            Score : {score}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href={question.actorImage || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <ImageCard
                title={question.actor}
                imageUrl={question.actorImage}
                type="actor"
              />
            </a>

            <a
              href={question.movieImage || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <ImageCard
                title={question.movie}
                imageUrl={question.movieImage}
                type="movie"
              />
            </a>
          </div>

          <div className="flex gap-6 justify-center">
            {isSubmitting ? (
              <div className="animate-spin h-12 w-12 border-t-4 border-yellow-400 rounded-full"></div>
            ) : (
              <>
                <button
                  onClick={() => handleAnswer("yes")}
                  className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-8 py-3 rounded-full shadow-md transition-all"
                >
                  Oui
                </button>
                <button
                  onClick={() => handleAnswer("no")}
                  className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-8 py-3 rounded-full shadow-md transition-all"
                >
                  Non
                </button>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
