import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import Link from "next/link";
import { CommonTermCardProps } from "../CardCategory1/CardCategory1";
import { getCatgoryDataFromCategoryFragment } from "@/utils/getCatgoryDataFromCategoryFragment";
import Skeleton from "../Skeleton/Skeleton";

export interface CardCategory6SkeletonProps {
  size?: "large" | "normal";
  className?: string;
}

const CardCategory6Skeleton: FC<CardCategory6SkeletonProps> = ({
  size = "normal",
  className = "",
}) => {
  return (
    <div className={`nc-CardCategory6Skeleton flex items-center ${className} `}>
      <div
        className={`relative flex-shrink-0 ${
          size === "large" ? "w-20 h-20" : "w-12 h-12"
        } rounded-lg me-4 overflow-hidden`}
      >
        <Skeleton width={48} height={48} className="absolute inset-0" />
      </div>

      <div className="flex-1">
        <h2
          className={`${
            size === "large" ? "text-lg" : "text-base"
          } nc-card-title text-neutral-900 dark:text-neutral-100 text-sm sm:text-base font-medium sm:font-semibold`}
        >
          <Skeleton width={"80%"} />
        </h2>
        <span
          className={`${
            size === "large" ? "text-sm" : "text-xs"
          } block mt-[2px] text-neutral-500 dark:text-neutral-400`}
        >
          <Skeleton width={110} />
        </span>
      </div>
    </div>
  );
};

export default CardCategory6Skeleton;
