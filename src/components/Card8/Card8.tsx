import React, { FC } from "react";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import Link from "next/link";
import Image from "next/image";
import { CommonPostCardProps } from "../Card2/Card2";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import MyImage from "../MyImage";

export interface Card8Props extends CommonPostCardProps {}

const Card8: FC<Card8Props> = ({ className = "h-full", post }) => {
  const {
    title,
    link,
    date,
    categories,
    excerpt,
    author,
    postFormats: postType,
    featuredImage,
    ncPostMetaData,
    commentCount,
    uri,
    databaseId,
  } = getPostDataFromPostFragment(post);

  return (
    <div
      className={`nc-Card8 group relative rounded-3xl overflow-hidden z-0 ${className}`}
    >
      <Link
        href={uri || ""}
        className="block w-full h-0 pt-[100%] sm:pt-[55%] rounded-xl overflow-hidden z-0"
      >
        <MyImage
          className="object-cover"
          src={featuredImage?.sourceUrl || ""}
          alt={title || ""}
          fill
          sizes="(max-width: 600px) 480px, 800px"
        />
        <PostTypeFeaturedIcon
          className="absolute top-4 left-4"
          postType={postType}
          wrapSize="w-8 h-8"
          iconSize="w-4 h-4"
        />
      </Link>
      <Link
        href={uri || ""}
        className="absolute inset-x-0 bottom-0 top-1/3 hover:top-5 bg-gradient-to-t from-black opacity-60 group-hover:opacity-70 transition-opacity"
      ></Link>
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex flex-col">
        <Link href={uri || ""} className="absolute inset-0" />
        <CategoryBadgeList categories={categories?.nodes || []} />
        <h2
          className={`mt-3 relative block font-semibold text-neutral-50 text-lg sm:text-2xl`}
        >
          <Link
            dangerouslySetInnerHTML={{ __html: title }}
            href={uri || ""}
            className="line-clamp-3"
            title={title || ""}
          ></Link>
        </h2>
        <div className="hidden sm:block mt-2">
          <div
            className="text-neutral-300 text-sm"
            dangerouslySetInnerHTML={{ __html: excerpt || "" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Card8;
