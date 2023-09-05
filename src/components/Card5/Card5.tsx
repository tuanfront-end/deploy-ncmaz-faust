import React, { FC } from "react";
import CardAuthor2 from "@/components/CardAuthor2/CardAuthor2";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import Link from "next/link";
import { CommonPostCardProps } from "../Card2/Card2";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";

export interface Card5Props extends CommonPostCardProps {}

const Card5: FC<Card5Props> = ({ className = "", post }) => {
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
      className={`nc-Card5 relative p-5 group border border-neutral-200 hover:shadow-lg transition-shadow dark:border-neutral-700 rounded-3xl bg-white dark:bg-neutral-900 ${className}`}
    >
      <Link href={uri} className="absolute inset-0 rounded-lg"></Link>

      <div className="flex flex-col">
        <CategoryBadgeList categories={categories?.nodes || []} />
        <h2
          className="block text-base font-semibold text-neutral-800 dark:text-neutral-300 my-4"
          title={title}
        >
          <Link
            dangerouslySetInnerHTML={{ __html: title }}
            href={uri}
            className="line-clamp-2"
            title={title}
          ></Link>
        </h2>
        <CardAuthor2
          className="relative mt-auto"
          readingTime={ncPostMetaData?.readingTime || 1}
          author={author}
          date={date}
        />
      </div>
    </div>
  );
};

export default Card5;
