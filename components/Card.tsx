import React from "react";
import Image from "next/image";

type CardProps = {
  icon: string;
  title: string;
  description: string;
  titleStyle?: string;
  descriptionStyle?: string;
  imageStyle?: string;
  containerStyle?: string;
};

function Card({
  icon,
  title,
  description,
  titleStyle,
  descriptionStyle,
  imageStyle,
  containerStyle,
}: CardProps) {
  return (
    <div
      className={`bg-white p-1 flex flex-col 
rounded-lg border-[1px] border-gray-200 py-4 px-5 shadow-md
items-center justify-center ${containerStyle}`}
    >
      <Image src={icon} alt={title} className={imageStyle} />
      <p className={`text-lg font-bold ${titleStyle}`}>{title}</p>
      <p className={`text-sm text-gray-500 ${descriptionStyle}`}>
        {description}
      </p>
    </div>
  );
}

export default Card;
