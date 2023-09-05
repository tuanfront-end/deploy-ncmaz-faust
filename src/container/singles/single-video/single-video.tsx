"use client";

import React, { FC, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostMeta2 from "@/components/PostMeta2/PostMeta2";
import { SingleType1Props } from "../single/single";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import SingleTitle from "../SingleTitle";
import SingleMetaAction2 from "../SingleMetaAction2";
import MyImage from "@/components/MyImage";

interface Props extends SingleType1Props {}

const SingleTypeVideo: FC<Props> = ({ post }) => {
  const {
    title,
    featuredImage,
    categories,
    excerpt,
    ncmazVideoUrl,
    postFormats,
  } = getPostDataFromPostFragment(post || {});

  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  const renderMainVideo = () => {
    if (ncmazVideoUrl?.videoUrl && postFormats === "video") {
      return isRendered ? (
        <ReactPlayer
          url={ncmazVideoUrl?.videoUrl || ""}
          className="absolute inset-0 w-full h-full"
          playing={true}
          muted={true}
          width="100%"
          height="100%"
          controls
        />
      ) : null;
    }

    if (featuredImage?.sourceUrl) {
      return (
        <MyImage
          className="block w-full h-full object-cover"
          src={featuredImage?.sourceUrl || ""}
          alt={title}
          priority
          sizes="(max-width: 1024px) 100vw, 1240px"
          fill
        />
      );
    }
    return null;
  };

  const renderHeader = () => {
    return (
      <div className={`nc-SingleHeaderVideo`}>
        <div className="space-y-4 md:space-y-5 dark text-neutral-100">
          <CategoryBadgeList
            itemClass="!px-3"
            categories={categories?.nodes || []}
          />
          <SingleTitle
            mainClass="text-neutral-900 font-semibold text-2xl sm:text-3xl md:!leading-[120%] dark:text-neutral-100"
            title={title || ""}
          />

          <div className="text-sm text-neutral-500 lg:text-lg dark:text-neutral-400 pb-1 max-w-screen-sm">
            <span
              className="line-clamp-2"
              dangerouslySetInnerHTML={{ __html: excerpt }}
            ></span>
          </div>

          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <PostMeta2
              size="large"
              className="leading-none flex-shrink-0"
              hiddenCategories
              avatarRounded="rounded-full shadow-inner"
              post={{ ...post }}
            />
            <SingleMetaAction2 post={{ ...post }} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <header className="container relative py-14 xl:py-20 flex flex-col xl:flex-row xl:items-center">
        {/*  */}
        <div className="nc-PageSingleVideo__headerWrap absolute inset-y-0 transform translate-x-1/2 end-1/2 w-screen xl:translate-x-0 xl:w-[calc(100vw/2)] bg-neutral-900 dark:bg-black dark:bg-opacity-50 xl:rounded-e-[40px]"></div>
        {/*  */}

        <div className="pb-10 xl:pb-0 xl:pr-10 relative">{renderHeader()}</div>
        <div className="relative xl:w-8/12 flex-shrink-0">
          <div className="aspect-w-16 aspect-h-16 sm:aspect-h-9 border-4 border-neutral-300 dark:border-neutral-800 shadow-2xl bg-neutral-800 rounded-3xl overflow-hidden z-0">
            {renderMainVideo()}
          </div>
        </div>
      </header>
    </>
  );
};

export default SingleTypeVideo;
