interface Props {
  score: number;
  onRestart: () => void;
}

export default function GameOverScreen({ score, onRestart }: Props) {
  return (
    <div className="bg-indigo-900/70 backdrop-blur-xl p-10 rounded-xl shadow-2xl text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Game Over</h1>
      <p className="text-2xl text-white mb-8">
        Score final : <span className="text-yellow-400">{score}</span>
      </p>
      <button
        onClick={onRestart}
        className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-8 py-3 rounded-full transition-all shadow-md"
      >
        Rejouer
      </button>
    </div>
  );
}
