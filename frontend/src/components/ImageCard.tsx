import React from "react";

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
      <div className="w-full h-[450px] rounded-2xl overflow-hidden shadow-lg">
        <img
          src={finalUrl}
          alt={title}
          className="w-full h-full object-cover object-top"
        />
      </div>
      <p className="mt-3 text-white text-center text-lg font-semibold truncate max-w-full">
        {title}
      </p>
    </div>
  );
}
