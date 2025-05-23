type Props = {
  onStart: () => void;
};

export default function StartGame({ onStart }: Props) {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-4xl font-bold text-white">🎬 Movie Cast Game</h1>
      <p className="text-lg text-white/80">
        Sauras-tu deviner si cet acteur a joué dans ce film ?
      </p>
      <button
        onClick={onStart}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-md transition"
      >
        Commencer la partie
      </button>
    </div>
  );
}
