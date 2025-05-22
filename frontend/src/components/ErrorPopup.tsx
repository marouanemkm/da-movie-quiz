interface Props {
  message: string;
  onClose: () => void;
}

export default function ErrorPopup({ message, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="bg-white max-w-md w-full rounded-xl shadow-xl p-6 space-y-4 text-gray-800">
        <h2 className="text-xl font-semibold text-red-600">
          Une erreur est survenue
        </h2>
        <p>{message}</p>
        <ul className="list-disc list-inside text-sm">
          <li>
            Clé TMDB bien renseignée dans le fichier <code>.env</code> côté API
            ?
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
            onClick={onClose}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
