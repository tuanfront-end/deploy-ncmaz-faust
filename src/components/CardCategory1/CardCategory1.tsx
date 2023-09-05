import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import Link from "next/link";
import { getCatgoryDataFromCategoryFragment } from "@/utils/getCatgoryDataFromCategoryFragment";
import { NcmazFcCategoryFullFieldsFragmentFragment } from "@/__generated__/graphql";

export interface TCategoryCardFull
  extends NcmazFcCategoryFullFieldsFragmentFragment {}
export interface CommonTermCardProps {
  className?: string;
  term: TCategoryCardFull;
}

export interface CardCategory1Props extends CommonTermCardProps {
  size?: "large" | "normal";
}

const CardCategory1: FC<CardCategory1Props> = ({
  className = "",
  size = "normal",
  term,
}) => {
  const { count, databaseId, name, uri, featuredImageMeta } =
    getCatgoryDataFromCategoryFragment(term);

  return (
    <Link
      href={uri}
      className={`nc-CardCategory1  flex items-center ${className}`}
    >
      <NcImage
        alt={name}
        containerClassName={`relative flex-shrink-0 ${
          size === "large" ? "w-20 h-20" : "w-12 h-12"
        } rounded-xl me-4 overflow-hidden`}
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
          {count} Articles
        </span>
      </div>
    </Link>
  );
};

export default CardCategory1;
