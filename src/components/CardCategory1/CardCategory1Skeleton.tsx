import React, { FC } from "react";
import Skeleton from "../Skeleton/Skeleton";

export interface CardCategory1SkeletonProps {
  className?: string;
  size?: "large" | "normal";
}

const CardCategory1Skeleton: FC<CardCategory1SkeletonProps> = ({
  className = "",
  size = "normal",
}) => {
  return (
    <div
      className={`nc-CardCategory1Skeleton p-2.5 pr-3 rounded-2xl flex items-center border border-neutral-100 dark:border-neutral-700 ${className}`}
    >
      <div
        className={`relative flex-shrink-0 ${
          size === "large" ? "w-20 h-20" : "w-12 h-12"
        } rounded-xl me-4 overflow-hidden`}
      >
        <Skeleton
          containerClassName="absolute inset-0 leading-none"
          width="100%"
          height="100%"
        />
      </div>

      <div className="flex-1">
        <h2
          className={`${
            size === "large" ? "text-lg" : "text-base"
          } nc-card-title text-neutral-900 dark:text-neutral-100 text-sm sm:text-base font-medium sm:font-semibold`}
        >
          <Skeleton width="90%" />
        </h2>
        <span
          className={`${
            size === "large" ? "text-sm" : "text-xs"
          } block mt-[2px] text-neutral-500 dark:text-neutral-400`}
        >
          <Skeleton width="60%" />
        </span>
      </div>
    </div>
  );
};

export default CardCategory1Skeleton;
