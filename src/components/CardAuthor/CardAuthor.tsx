import React, { FC } from "react";

import Avatar from "@/components/Avatar/Avatar";
import Link from "next/link";
import { NcmazFcUserFullFieldsFragment } from "@/__generated__/graphql";
import { getImageDataFromImageFragment } from "@/utils/getImageDataFromImageFragment";

export interface CardAuthorProps {
  className?: string;
  author: NcmazFcUserFullFieldsFragment;
}

const CardAuthor: FC<CardAuthorProps> = ({ className = "", author }) => {
  const { databaseId, name, ncUserMeta, uri } = author;
  return (
    <Link
      href={uri || ""}
      className={`nc-CardAuthor flex items-center ${className}`}
    >
      <Avatar
        sizeClass="h-10 w-10 text-base"
        containerClassName="flex-shrink-0 me-4"
        radius="rounded-full"
        imgUrl={
          getImageDataFromImageFragment(ncUserMeta?.featuredImage?.node)
            .sourceUrl
        }
        userName={name || "T"}
      />
      <div>
        <h2
          className={`text-sm sm:text-base text-neutral-900 dark:text-neutral-100 font-medium sm:font-semibold capitalize`}
        >
          {name}
        </h2>
        <span
          className={`block mt-[2px] text-xs text-neutral-500 dark:text-neutral-400`}
        >
          {ncUserMeta?.ncBio}
        </span>
      </div>
    </Link>
  );
};

export default CardAuthor;
