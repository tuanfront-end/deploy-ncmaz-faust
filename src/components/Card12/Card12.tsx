import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import Link from "next/link";
import { CommonPostCardProps } from "../Card2/Card2";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";

export interface Card12Props extends CommonPostCardProps {}

const Card12: FC<Card12Props> = ({ className = "h-full", post }) => {
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
    <div className={`nc-Card12 group relative flex flex-col ${className}`}>
      <Link
        href={uri || ""}
        className="block flex-shrink-0 flex-grow relative w-full h-0 aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden"
      >
        <NcImage
          containerClassName="absolute inset-0"
          src={featuredImage?.sourceUrl || ""}
          alt={title || "Card Image"}
          fill
        />
        <span>
          <PostTypeFeaturedIcon
            className="absolute bottom-2 start-2"
            postType={postFormats || ""}
            wrapSize="w-8 h-8"
            iconSize="w-4 h-4"
          />
        </span>
      </Link>

      <div className="mt-5 sm:mt-8 pe-10 flex flex-col">
        <h2
          className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 transition-colors sm:text-lg lg:text-2xl`}
        >
          <Link
            dangerouslySetInnerHTML={{ __html: title }}
            href={uri || ""}
            className="line-clamp-2"
            title={title || ""}
          ></Link>
        </h2>
        <div
          dangerouslySetInnerHTML={{ __html: excerpt || "" }}
          className="hidden sm:block mt-4 text-neutral-500 dark:text-neutral-400"
        ></div>
        <PostCardMeta className="mt-5 text-sm" meta={{ author, date }} />
      </div>
    </div>
  );
};

export default Card12;
