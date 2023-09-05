import { FragmentType } from "@/__generated__";
import { NcmazFcUserFullFieldsFragment } from "@/__generated__/graphql";
import Avatar from "@/components/Avatar/Avatar";
import { NC_USER_FULL_FIELDS_FRAGMENT } from "@/fragments";
import { getImageDataFromImageFragment } from "@/utils/getImageDataFromImageFragment";
import { getUserDataFromUserCardFragment } from "@/utils/getUserDataFromUserCardFragment";
import Link from "next/link";
import React, { FC } from "react";

export interface SingleAuthorProps {
  author:
    | FragmentType<typeof NC_USER_FULL_FIELDS_FRAGMENT>
    | NcmazFcUserFullFieldsFragment;
}

const SingleAuthor: FC<SingleAuthorProps> = ({ author: authorProp }) => {
  const author = getUserDataFromUserCardFragment(
    authorProp as FragmentType<typeof NC_USER_FULL_FIELDS_FRAGMENT>
  );
  return (
    <div className="nc-SingleAuthor flex">
      <Link href={author?.uri || ""}>
        <Avatar
          imgUrl={
            getImageDataFromImageFragment(
              author?.ncUserMeta?.featuredImage?.node
            ).sourceUrl
          }
          userName={author?.name || "T"}
          sizeClass="h-12 w-12 text-lg sm:text-xl md:h-24 sm:w-24"
          radius="rounded-2xl sm:rounded-3xl"
        />
      </Link>
      <div className="flex flex-col ms-3 max-w-lg sm:ms-5">
        <span className="text-xs text-neutral-400 uppercase tracking-wider">
          WRITTEN BY
        </span>
        <h2 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          <Link href={author?.uri || ""}>{author?.name}</Link>
        </h2>
        <span className="block mt-1 text-sm text-neutral-500 sm:text-base dark:text-neutral-300">
          {author?.description || ""}
        </span>
      </div>
    </div>
  );
};

export default SingleAuthor;
