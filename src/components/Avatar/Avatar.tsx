"use client";

import { avatarColors } from "@/contains/contants";
import { StaticImageData } from "next/image";
import React, { FC } from "react";
import MyImage from "../MyImage";

export interface AvatarProps {
  containerClassName?: string;
  sizeClass?: string;
  radius?: string;
  imgUrl?: string | StaticImageData;
  userName?: string;
  sizes?: string;
  priority?: boolean;
}

const _setBgColor = (name: string) => {
  const backgroundIndex = Math.floor(name.charCodeAt(0) % avatarColors.length);
  return avatarColors[backgroundIndex];
};

const Avatar: FC<AvatarProps> = ({
  containerClassName = "ring-1 ring-white dark:ring-neutral-900",
  sizeClass = "h-6 w-6 text-sm",
  radius = "rounded-full",
  imgUrl,
  userName,
  sizes = "100px",
  priority = false,
}) => {
  const name = userName || "John Doe";
  let url = imgUrl;

  if (typeof url === "string" && url.includes(".gravatar.com")) {
    url = "";
  }

  return (
    <div
      className={`wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner ${radius} ${sizeClass} ${containerClassName}`}
      style={{ backgroundColor: url ? undefined : _setBgColor(name) }}
    >
      {url && (
        <MyImage
          fill
          sizes={sizes}
          className="absolute inset-0 w-full h-full object-cover"
          src={url}
          alt={name}
          priority={priority}
        />
      )}
      <span className="wil-avatar__name">{name[0]}</span>
    </div>
  );
};

export default Avatar;
