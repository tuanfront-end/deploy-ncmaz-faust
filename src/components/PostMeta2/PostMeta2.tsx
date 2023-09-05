import React, { FC } from "react";
import Avatar from "@/components/Avatar/Avatar";
import Link from "next/link";
import { NC_POST_CARD_FRAGMENT, NC_POST_FULL_FRAGMENT } from "@/fragments";
import { FragmentType } from "@/__generated__";
import { getImageDataFromImageFragment } from "@/utils/getImageDataFromImageFragment";
import ncFormatDate from "@/utils/formatDate";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";

export interface PostMeta2Props {
  className?: string;
  post:
    | FragmentType<typeof NC_POST_CARD_FRAGMENT>
    | FragmentType<typeof NC_POST_FULL_FRAGMENT>;
  hiddenCategories?: boolean;
  size?: "large" | "normal";
  avatarRounded?: string;
}

const PostMeta2: FC<PostMeta2Props> = ({
  className = "leading-none",
  post,
  hiddenCategories = false,
  size = "normal",
  avatarRounded,
}) => {
  const { date, categories, author, ncPostMetaData } =
    getPostDataFromPostFragment(post);

  return (
    <div
      className={`nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 ${
        size === "normal" ? "text-xs" : "text-base"
      } ${className}`}
    >
      <Link
        href={author?.uri || ""}
        className="flex items-center space-x-2 rtl:space-x-reverse"
      >
        <Avatar
          radius={avatarRounded}
          sizeClass={
            size === "normal"
              ? "h-6 w-6 text-sm"
              : "h-10 w-10 sm:h-11 sm:w-11 text-xl"
          }
          imgUrl={
            getImageDataFromImageFragment(
              author?.ncUserMeta?.featuredImage?.node
            ).sourceUrl || ""
          }
          userName={author?.name || "R"}
        />
      </Link>
      <div className="ms-3">
        <div className="flex items-center">
          <Link href={author?.uri || ""} className="block font-semibold">
            {author?.name || "R"}
          </Link>

          {!hiddenCategories && (
            <>
              <span className="mx-2 font-semibold">·</span>
              <div className="ms-0">
                <span className="text-xs">🏷 </span>
                {categories?.nodes?.map((cat, index, arr) => (
                  <Link
                    key={cat.databaseId}
                    href={cat.uri || ""}
                    className="font-semibold"
                  >
                    {cat.name}
                    {index < arr.length - 1 && <span>, </span>}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="text-xs mt-[6px]">
          <span className="text-neutral-700 dark:text-neutral-300">
            {ncFormatDate(date || "")}
          </span>
          <span className="mx-2 font-semibold">·</span>
          <span className="text-neutral-700 dark:text-neutral-300">
            {ncPostMetaData?.readingTime} min read
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostMeta2;
