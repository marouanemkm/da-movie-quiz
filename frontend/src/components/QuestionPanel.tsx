import ImageCard from "./ImageCard";

interface Props {
  actor: string;
  actorImage: string | null;
  movie: string;
  movieImage: string | null;
  onAnswer: (answer: "yes" | "no") => void;
  isSubmitting: boolean;
  score: number;
}

export default function QuestionPanel({
  actor,
  actorImage,
  movie,
  movieImage,
  onAnswer,
  isSubmitting,
  score,
}: Props) {
  return (
    <div className="max-w-5xl w-full bg-indigo-900/70 backdrop-blur-xl rounded-xl shadow-xl p-8 space-y-8">
      <h2 className="text-3xl font-semibold text-white text-center">
        Score : {score}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a
          href={actorImage || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-105"
        >
          <ImageCard title={actor} imageUrl={actorImage} type="actor" />
        </a>

        <a
          href={movieImage || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-105"
        >
          <ImageCard title={movie} imageUrl={movieImage} type="movie" />
        </a>
      </div>

      <div className="flex gap-6 justify-center">
        {isSubmitting ? (
          <div className="animate-spin h-12 w-12 border-t-4 border-yellow-400 rounded-full" />
        ) : (
          <>
            <button
              onClick={() => onAnswer("yes")}
              className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-8 py-3 rounded-full shadow-md transition-all"
            >
              Oui
            </button>
            <button
              onClick={() => onAnswer("no")}
              className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-8 py-3 rounded-full shadow-md transition-all"
            >
              Non
            </button>
          </>
        )}
      </div>
    </div>
  );
}
