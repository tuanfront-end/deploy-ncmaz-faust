"use client";
import React, { FC, useState } from "react";
import NcImage from "@/components/NcImage/NcImage";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostFeaturedMedia from "@/components/PostFeaturedMedia/PostFeaturedMedia";
import CardAuthor2 from "@/components/CardAuthor2/CardAuthor2";
import Link from "next/link";
import { CommonPostCardProps } from "../Card2/Card2";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";

export interface Card10V3Props extends CommonPostCardProps {
  galleryType?: 1 | 2;
}

const Card10V3: FC<Card10V3Props> = ({
  className = "h-full",
  post,
  galleryType = 1,
}) => {
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
    ncmazGalleryImgs: galleryImgs,
  } = getPostDataFromPostFragment(post);

  const [isHover, setIsHover] = useState(false);

  const renderGallery2 = () => {
    if (!galleryImgs || !galleryImgs.length) return null;
    return (
      <div className="w-full h-full grid grid-rows-2 gap-2">
        <div className="grid grid-cols-3 gap-2 ">
          <NcImage
            alt={title || ""}
            fill
            containerClassName="relative col-span-2"
            className="absolute inset-0 object-cover w-full h-full"
            src={galleryImgs[0]?.sourceUrl || ""}
          />
          <NcImage
            alt=""
            fill
            containerClassName="relative"
            className="absolute inset-0 object-cover w-full h-full"
            src={galleryImgs[1]?.sourceUrl || ""}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 ">
          <NcImage
            alt=""
            fill
            containerClassName="relative"
            className="absolute inset-0 object-cover w-full h-full"
            src={galleryImgs[2]?.sourceUrl || ""}
          />
          <NcImage
            alt=""
            fill
            containerClassName="relative col-span-2"
            className="absolute inset-0 object-cover w-full h-full"
            src={galleryImgs[3]?.sourceUrl || ""}
          />
        </div>
      </div>
    );
  };

  const renderGallery = () => {
    if (!galleryImgs || !galleryImgs.length) return null;
    return (
      <div className="w-full h-full grid grid-cols-3 gap-2">
        <div className="grid ">
          <NcImage
            alt=""
            fill
            containerClassName="relative"
            className="absolute inset-0 object-cover w-full h-full"
            src={galleryImgs[0]?.sourceUrl || ""}
          />
        </div>
        <div className="grid grid-rows-2 gap-2">
          <NcImage
            alt=""
            fill
            containerClassName="relative"
            className="absolute inset-0 object-cover w-full h-full"
            src={galleryImgs[1]?.sourceUrl || ""}
          />
          <NcImage
            alt=""
            fill
            containerClassName="relative"
            className="absolute inset-0 object-cover w-full h-full"
            src={galleryImgs[2]?.sourceUrl || ""}
          />
        </div>
        <div className="grid ">
          <NcImage
            alt=""
            fill
            containerClassName="relative"
            className="absolute inset-0 object-cover w-full h-full"
            src={galleryImgs[3]?.sourceUrl || ""}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-Card10V3 group relative flex flex-col ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="block group rounded-3xl flex-shrink-0 relative w-full aspect-w-16 aspect-h-16 sm:aspect-h-9 overflow-hidden z-0">
        <div>
          {postFormats !== "gallery" && !!galleryImgs?.length ? (
            <PostFeaturedMedia post={post} isHover={isHover} />
          ) : galleryType === 1 ? (
            renderGallery()
          ) : (
            renderGallery2()
          )}
        </div>

        <Link
          href={uri || ""}
          className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity"
        ></Link>
      </div>
      <div className="absolute top-3 inset-x-3 flex justify-between items-start space-x-4 rtl:space-x-reverse">
        <CategoryBadgeList categories={categories?.nodes || []} />
        <PostCardSaveAction
          hidenReadingTime
          readingTime={ncPostMetaData?.readingTime || 1}
          postDatabseId={databaseId || 0}
        />
      </div>

      <div className="space-y-2.5 mt-4 px-4">
        <h2 className="nc-card-title block sm:text-lg font-semibold text-neutral-900 dark:text-neutral-100 ">
          <Link
            dangerouslySetInnerHTML={{ __html: title }}
            href={uri || ""}
            className="line-clamp-1"
            title={title || ""}
          ></Link>
        </h2>
        <CardAuthor2
          className="mt-3"
          author={author}
          hoverReadingTime={false}
          date={date}
          readingTime={ncPostMetaData?.readingTime || 1}
        />
      </div>
    </div>
  );
};

export default Card10V3;
