"use client";

import React, { FC } from "react";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
import Link from "next/link";
import ButtonPlayMusicPlayer from "../ButtonPlayMusicPlayer";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { CommonPostCardProps } from "../Card2/Card2";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import MyImage from "../MyImage";

export interface Card16PodcastProps extends CommonPostCardProps {
  ratio?: string;
}

const Card16Podcast: FC<Card16PodcastProps> = ({
  className = "h-full",
  post,
  ratio = "aspect-w-3 xl:aspect-w-4 aspect-h-3",
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
  } = getPostDataFromPostFragment(post);

  const IS_AUDIO = postFormats === "audio";

  const renderListenButtonDefault = (state?: "playing") => {
    return (
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-full bg-neutral-50 text-primary-500 cursor-pointer`}
      >
        {state === "playing" ? (
          <PauseIcon className="w-8 h-8" />
        ) : (
          <PlayIcon className="ms-0.5 w-8 h-8 rtl:rotate-180" />
        )}
      </div>
    );
  };

  return (
    <div className={`nc-Card16Podcast relative flex flex-col ${className}`}>
      <Link
        href={uri || ""}
        className={`block flex-shrink-0 relative w-full rounded-3xl overflow-hidden ${ratio}`}
      >
        <MyImage
          fill
          alt=""
          sizes="(max-width: 600px) 480px, 800px"
          src={featuredImage?.sourceUrl || ""}
          className="object-cover"
        />
        <span className="bg-neutral-900 bg-opacity-30"></span>
      </Link>

      {/* ABSOLUTE */}
      <Link href={uri || ""} className="absolute inset-0"></Link>
      <span className="absolute top-3 inset-x-3">
        <CategoryBadgeList categories={categories?.nodes || []} />
      </span>

      {/* MAIN CONTENT */}
      <div className="w-11/12 transform -mt-32 ">
        <div
          className={`px-5 flex items-center space-x-4 rtl:space-x-reverse ${
            !IS_AUDIO ? "relative opacity-0 z-[-1]" : ""
          }`}
        >
          <div className={`flex-grow `}>
            <MyImage
              src={"/images/musicWave.png"}
              width={200}
              height={30}
              alt="musicWave"
            />
          </div>
          <ButtonPlayMusicPlayer
            post={post}
            renderDefaultBtn={() => renderListenButtonDefault()}
            renderPlayingBtn={() => renderListenButtonDefault("playing")}
          />
        </div>
        <div className="p-5 mt-5 bg-white dark:bg-neutral-900 shadow-xl dark:shadow-2xl rounded-3xl rounded-ss-none flex flex-col flex-grow ">
          <h2 className="nc-card-title block sm:text-lg 2xl:text-xl font-semibold text-neutral-900 dark:text-neutral-100 ">
            <Link
              dangerouslySetInnerHTML={{ __html: title }}
              href={uri || ""}
              className="line-clamp-1"
              title={title || ""}
            ></Link>
          </h2>
          <div className="block text-sm text-neutral-500 dark:text-neutral-400 mt-3 mb-5">
            <div
              dangerouslySetInnerHTML={{ __html: excerpt || "" }}
              className="line-clamp-2"
            ></div>
          </div>
          <div className="flex items-end justify-between mt-auto">
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
    </div>
  );
};

export default Card16Podcast;
