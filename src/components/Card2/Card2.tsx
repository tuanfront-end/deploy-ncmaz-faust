import React, { FC, useState } from "react";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import Link from "next/link";
import PostCardMeta from "../PostCardMeta/PostCardMeta";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import MyImage from "../MyImage";
import { PostDataFragmentType } from "@/data/types";
import PostFeaturedMedia from "../PostFeaturedMedia/PostFeaturedMedia";

export type TPostCard = PostDataFragmentType;
export interface CommonPostCardProps {
  className?: string;
  post: TPostCard;
}

export interface Card2Props extends CommonPostCardProps {
  size?: "normal" | "large";
}

const Card2: FC<Card2Props> = ({
  className = "h-full",
  size = "normal",
  post,
}) => {
  const [isHover, setIsHover] = useState(false);
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

  return (
    <div
      className={`nc-Card2 group relative flex flex-col ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link href={uri || ""} className="absolute inset-0" />
      <div className="block flex-shrink-0 flex-grow relative w-full h-0 pt-[75%] sm:pt-[55%]">
        <div className="absolute inset-0 rounded-3xl z-0 overflow-hidden">
          <PostFeaturedMedia post={post} isHover={isHover} />
        </div>

        <CategoryBadgeList
          className="flex flex-wrap space-x-2 absolute top-3 left-3"
          itemClass="relative"
          categories={categories?.nodes || []}
        />
      </div>

      <div className="mt-5 px-4 flex flex-col">
        <div className="space-y-3">
          <PostCardMeta
            className="relative text-sm"
            avatarSize="h-8 w-8 text-sm"
            meta={{ author, date }}
          />

          <h2
            className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 ${
              size === "large" ? "text-base sm:text-lg md:text-xl" : "text-base"
            }`}
          >
            <Link
              dangerouslySetInnerHTML={{ __html: title }}
              href={uri || ""}
              className="line-clamp-2"
              title={title || ""}
            />
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: excerpt || "" }}
            className="block text-neutral-500 dark:text-neutral-400 text-[15px] leading-6 "
          ></div>
        </div>
        <div className="my-5 border-t border-neutral-200 dark:border-neutral-700"></div>
        <div className="flex items-center justify-between">
          <PostCardLikeAndComment
            className="relative"
            commentCount={commentCount || 0}
            linkToPost={uri || ""}
            likeCount={ncPostMetaData?.likesCount || 0}
            postDatabseId={databaseId || 0}
          />
          <PostCardSaveAction
            className="relative"
            readingTime={ncPostMetaData?.readingTime || 1}
            postDatabseId={databaseId || 0}
          />
        </div>
      </div>
    </div>
  );
};

export default Card2;
