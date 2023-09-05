import React, { FC } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Avatar from "@/components/Avatar/Avatar";
import Link from "next/link";
import { NC_USER_FULL_FIELDS_FRAGMENT } from "@/fragments";
import { FragmentType } from "@/__generated__";
import { getUserDataFromUserCardFragment } from "@/utils/getUserDataFromUserCardFragment";

export interface CardAuthorBoxProps {
  className?: string;
  author: FragmentType<typeof NC_USER_FULL_FIELDS_FRAGMENT>;
}

const CardAuthorBox: FC<CardAuthorBoxProps> = ({ className = "", author }) => {
  const { databaseId, featuredImageMeta, name, uri, ncUserMeta } =
    getUserDataFromUserCardFragment(author);
  return (
    <Link
      href={uri}
      className={`nc-CardAuthorBox flex flex-col items-center justify-center text-center px-3 py-5 sm:px-6 sm:py-7 rounded-3xl bg-neutral-100/70 dark:bg-neutral-900 ${className}`}
    >
      <Avatar
        sizeClass="w-20 h-20 text-xl"
        radius="rounded-full"
        imgUrl={featuredImageMeta?.sourceUrl || ""}
        userName={name}
      />
      <div className="mt-3">
        <h2 className={`text-sm sm:text-base font-medium`}>
          <span className="line-clamp-1">{name}</span>
        </h2>
        <span
          className={`block mt-1 text-sm text-neutral-500 dark:text-neutral-400`}
        >
          {ncUserMeta?.ncBio}
        </span>
      </div>
      <div className="py-2 px-4 mt-4 bg-neutral-200/70 dark:bg-neutral-800 rounded-full flex items-center justify-center leading-none text-xs font-medium">
        <ArrowRightIcon className="w-5 h-5 text-yellow-600" />
      </div>
    </Link>
  );
};

export default CardAuthorBox;
