import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import Link from "next/link";
import { CommonPostCardProps } from "../Card2/Card2";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";

export interface Card3Props extends CommonPostCardProps {}

const Card3: FC<Card3Props> = ({ className = "h-full", post }) => {
  const {
    title,
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
      className={`nc-Card3 relative flex flex-row items-center group ${className}`}
    >
      <div className="flex flex-col flex-grow">
        <div className="space-y-3.5">
          <CategoryBadgeList categories={categories?.nodes || []} />
          <Link href={uri || ""} className="block">
            <h2
              className={`nc-card-title block font-medium sm:font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base xl:text-lg`}
            >
              <span
                dangerouslySetInnerHTML={{ __html: title }}
                className="line-clamp-2"
                title={title || ""}
              ></span>
            </h2>
            <div className="hidden sm:block sm:mt-2">
              <div
                dangerouslySetInnerHTML={{ __html: excerpt || "" }}
                className="text-neutral-500 dark:text-neutral-400 text-sm line-clamp-2"
              ></div>
            </div>
          </Link>

          <PostCardMeta meta={{ author, date }} />
        </div>
        <div className="mt-5 flex items-center flex-wrap justify-between">
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

      <div
        className={`block flex-shrink-0 w-24 sm:w-36 md:w-44 xl:w-56 ms-3 sm:ms-6 rounded-3xl overflow-hidden z-0 mb-5 sm:mb-0`}
      >
        <Link
          href={uri || ""}
          className="block w-full h-0 aspect-h-1 aspect-w-1 relative"
        >
          <NcImage
            containerClassName="absolute inset-0"
            src={featuredImage?.sourceUrl || ""}
            fill
            alt={title || ""}
            className="object-cover w-full h-full rounded-3xl group-hover:scale-105 transition-transform duration-500"
          />
          <span>
            <PostTypeFeaturedIcon
              className="absolute left-2 bottom-2"
              postType={postFormats}
              wrapSize="w-8 h-8"
              iconSize="w-4 h-4"
            />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Card3;
