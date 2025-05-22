interface Props {
  title: string;
  imageUrl: string | null;
  type: "actor" | "movie";
  className?: string;
}

export default function ImageCard({
  title,
  imageUrl,
  type,
  className = "",
}: Props) {
  const placeholder =
    type === "actor" ? "/profil-placeholder.png" : "/movie-placeholder.jpg.png";
  const finalUrl = imageUrl || placeholder;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="w-full h-[450px] bg-black rounded-2xl overflow-hidden shadow-lg flex items-center justify-center">
        <img
          src={finalUrl}
          alt={title}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <p className="mt-3 text-white text-center text-lg font-semibold truncate max-w-full">
        {title}
      </p>
    </div>
  );
}
