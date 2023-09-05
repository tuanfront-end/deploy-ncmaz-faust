import React, { FC } from "react";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import Link from "next/link";
import Image from "next/image";
import { CommonPostCardProps } from "../Card2/Card2";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import MyImage from "../MyImage";

export interface Card3SmallProps extends CommonPostCardProps {}

const Card3Small: FC<Card3SmallProps> = ({ className = "h-full", post }) => {
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
      className={`nc-Card3Small relative flex flex-row justify-between items-center ${className}`}
    >
      <Link
        href={uri || ""}
        className="absolute inset-0"
        title={title || ""}
      ></Link>
      <div className="relative space-y-2">
        <PostCardMeta meta={{ author, date }} />
        <h2 className="nc-card-title block text-sm sm:text-base font-medium sm:font-semibold text-neutral-900 dark:text-neutral-100">
          <Link
            dangerouslySetInnerHTML={{ __html: title }}
            href={uri || ""}
            className="line-clamp-2"
            title={title || ""}
          ></Link>
        </h2>
      </div>

      <Link
        href={uri}
        title={title}
        className={`block w-20 flex-shrink-0 relative rounded-lg overflow-hidden z-0 ms-4 group`}
      >
        <div className={`w-full h-0 aspect-w-1 aspect-h-1`}>
          <MyImage
            alt="featured"
            sizes="100px"
            className="object-cover w-full h-full group-hover:scale-110 transform transition-transform duration-300"
            src={featuredImage?.sourceUrl || ""}
            fill
            title={title}
          />
        </div>
      </Link>
    </div>
  );
};

export default Card3Small;
