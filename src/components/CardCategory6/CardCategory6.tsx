import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import Link from "next/link";
import { CommonTermCardProps } from "../CardCategory1/CardCategory1";
import { getCatgoryDataFromCategoryFragment } from "@/utils/getCatgoryDataFromCategoryFragment";

export interface CardCategory6Props extends CommonTermCardProps {
  size?: "large" | "normal";
}

const CardCategory6: FC<CardCategory6Props> = ({
  className = "",
  size = "normal",
  term,
}) => {
  const { count, databaseId, name, uri, featuredImageMeta } =
    getCatgoryDataFromCategoryFragment(term);

  return (
    <Link
      href={uri}
      className={`nc-CardCategory6 flex items-center ${className}`}
    >
      <NcImage
        alt=""
        containerClassName={`relative flex-shrink-0 ${
          size === "large" ? "w-20 h-20" : "w-12 h-12"
        } rounded-lg me-4 overflow-hidden`}
        src={featuredImageMeta?.sourceUrl || ""}
        fill
        className="object-cover"
        sizes="80px"
      />
      <div>
        <h2
          className={`${
            size === "large" ? "text-lg" : "text-base"
          } nc-card-title text-neutral-900 dark:text-neutral-100 text-sm sm:text-base font-medium sm:font-semibold`}
        >
          {name}
        </h2>
        <span
          className={`${
            size === "large" ? "text-sm" : "text-xs"
          } block mt-[2px] text-neutral-500 dark:text-neutral-400`}
        >
          {count || 0} Articles
        </span>
      </div>
    </Link>
  );
};

export default CardCategory6;
