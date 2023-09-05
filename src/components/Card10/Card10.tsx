"use client";

import React, { FC, useState } from "react";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostFeaturedMedia from "@/components/PostFeaturedMedia/PostFeaturedMedia";
import PostCardMetaV2 from "@/components/PostCardMeta/PostCardMetaV2";
import Link from "next/link";
import { CommonPostCardProps } from "../Card2/Card2";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";

export interface Card10Props extends CommonPostCardProps {}

const Card10: FC<Card10Props> = ({ className = "h-full", post }) => {
  const {
    title,
    link,
    date,
    categories,
    excerpt,
    author,
    postFormats,
    featuredImage,
    ncPostMetaData,
    commentCount,
    uri,
    databaseId,
  } = getPostDataFromPostFragment(post);

  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`nc-Card10 relative flex flex-col ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link href={uri || ""} className="absolute inset-0" />
      <div className="block group rounded-3xl flex-shrink-0 relative w-full aspect-w-9 aspect-h-7 sm:aspect-h-9 overflow-hidden z-0">
        <div>
          <PostFeaturedMedia post={post} isHover={isHover} />
        </div>

        <Link
          href={uri || ""}
          className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity"
        ></Link>
      </div>
      <div className="absolute top-3 inset-x-3 flex justify-between items-start space-x-4 rtl:space-x-reverse z-10">
        <CategoryBadgeList categories={categories?.nodes || []} />
        <PostCardSaveAction
          hidenReadingTime
          postDatabseId={databaseId}
          readingTime={ncPostMetaData?.readingTime || 1}
        />
      </div>

      <div className="space-y-2.5 rtl:space-x-reverse mt-4">
        <PostCardMetaV2 meta={{ author, date, title, uri }} />
      </div>
    </div>
  );
};

export default Card10;
