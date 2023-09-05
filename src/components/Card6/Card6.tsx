import React, { FC } from "react";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import Link from "next/link";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import MyImage from "../MyImage";
import { CommonPostCardProps } from "../Card2/Card2";

export interface Card6Props extends CommonPostCardProps {}

const Card6: FC<Card6Props> = ({ className = "h-full", post }) => {
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
      className={`nc-Card6 relative flex group flex-row items-center sm:p-4 sm:rounded-3xl sm:bg-white sm:dark:bg-neutral-900 sm:border border-neutral-200 dark:border-neutral-700 ${className}`}
    >
      <Link href={uri || ""} className="absolute inset-0 z-0"></Link>
      <div className="flex flex-col flex-grow">
        <div className="space-y-3 mb-4">
          <CategoryBadgeList categories={categories?.nodes || []} />
          <h2 className={`block font-semibold text-sm sm:text-base`}>
            <Link
              dangerouslySetInnerHTML={{ __html: title }}
              href={uri || ""}
              className="line-clamp-2"
              title={title || ""}
            ></Link>
          </h2>
          <PostCardMeta meta={{ author, date }} />
        </div>
        <div className="flex items-center flex-wrap justify-between mt-auto">
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

      <Link
        href={uri || ""}
        className={`block relative flex-shrink-0 w-24 h-24 sm:w-40 sm:h-full ms-3 sm:ms-5 rounded-2xl overflow-hidden z-0`}
      >
        <MyImage
          sizes="(max-width: 600px) 180px, 400px"
          className="object-cover w-full h-full"
          fill
          src={featuredImage?.sourceUrl || ""}
          alt={title || "Card Image"}
        />
        <span className="absolute bottom-1 start-1">
          <PostTypeFeaturedIcon
            wrapSize="h-7 w-7"
            iconSize="h-4 w-4"
            postType={postFormats || ""}
          />
        </span>
      </Link>
    </div>
  );
};

export default Card6;
