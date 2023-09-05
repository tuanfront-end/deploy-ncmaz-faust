"use client";

import React, { FC, useState } from "react";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import PostFeaturedMedia from "@/components/PostFeaturedMedia/PostFeaturedMedia";
import Link from "next/link";
import { CommonPostCardProps } from "../Card2/Card2";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";

export interface Card11Props extends CommonPostCardProps {
  ratio?: string;
  hiddenAuthor?: boolean;
}

const Card11: FC<Card11Props> = ({
  className = "h-full",
  post,
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
}) => {
  const {
    title,
    date,
    categories,
    author,
    ncPostMetaData,
    commentCount,
    uri,
    databaseId,
  } = getPostDataFromPostFragment(post);

  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`nc-Card11 relative flex flex-col group rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      //
    >
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-3xl overflow-hidden z-10 ${ratio}`}
      >
        <div>
          <PostFeaturedMedia post={post} isHover={isHover} />
        </div>
      </div>
      <Link href={uri || ""} className="absolute inset-0"></Link>
      <span className="absolute top-3 inset-x-3 z-10">
        <CategoryBadgeList categories={categories?.nodes || []} />
      </span>

      <div className="flex-1 rounded-b-3xl py-4 px-3.5 flex flex-col space-y-3 border border-neutral-100 dark:border-neutral-800 border-t-0">
        {!hiddenAuthor ? (
          <PostCardMeta meta={{ author, date }} />
        ) : (
          <span className="text-xs text-neutral-500">{date}</span>
        )}
        <h3 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100">
          <span
            dangerouslySetInnerHTML={{ __html: title }}
            className="line-clamp-2"
            title={title || ""}
          ></span>
        </h3>
        <div className="flex items-end justify-between mt-auto">
          <PostCardLikeAndComment
            commentCount={commentCount || 0}
            linkToPost={uri || ""}
            likeCount={ncPostMetaData?.likesCount || 0}
            postDatabseId={databaseId || 0}
            className="relative"
          />
          <PostCardSaveAction
            readingTime={ncPostMetaData?.readingTime || 1}
            postDatabseId={databaseId || 0}
            className="relative"
          />
        </div>
      </div>
    </div>
  );
};

export default Card11;
