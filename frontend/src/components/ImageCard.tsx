import React from "react";

type ImageCardProps = {
  title: string;
  imageUrl: string;
};

const ImageCard: React.FC<ImageCardProps> = ({ title, imageUrl }) => {
  return (
    <div className="w-40 md:w-52 rounded-2xl overflow-hidden shadow-lg border bg-white">
      <img src={imageUrl} alt={title} className="w-full h-60 object-cover" />
      <div className="p-2 text-center text-sm font-semibold truncate">
        {title}
      </div>
    </div>
  );
};

export default ImageCard;
