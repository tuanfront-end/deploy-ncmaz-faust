"use client";

import React, { FC } from "react";
import Link from "next/link";
import ButtonPlayMusicPlayer from "../ButtonPlayMusicPlayer";
import { PauseIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import { CommonPostCardProps } from "../Card2/Card2";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import MyImage from "../MyImage";
import ncFormatDate from "@/utils/formatDate";

export interface Card17PodcastProps extends CommonPostCardProps {}

const Card17Podcast: FC<Card17PodcastProps> = ({ className = "", post }) => {
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

  const renderDefaultBtnListen = (state?: "playing") => {
    return (
      <span className="w-11 h-11 flex items-center justify-center rounded-full bg-white dark:bg-neutral-800 text-primary-600 dark:text-primary-200 shadow-lg cursor-pointer">
        {state === "playing" ? (
          <PauseIcon className="w-6 h-6" />
        ) : (
          <PlayIcon className="w-6 h-6" />
        )}
      </span>
    );
  };

  return (
    <div
      className={`nc-Card17Podcast relative flex items-center justify-between p-2.5 space-x-5 rounded-full bg-neutral-100 dark:bg-neutral-800/30 hover:shadow-lg transition-shadow ${className}`}
    >
      <Link href={uri || ""} className="flex items-center space-x-4">
        <div className="block flex-shrink-0 w-11 h-11 sm:w-16 sm:h-16 relative rounded-full overflow-hidden shadow-lg">
          <MyImage
            sizes="(max-width: 600px) 480px, 800px"
            className="object-cover"
            src={featuredImage?.sourceUrl || ""}
            fill
            alt={title || ""}
          />
        </div>
        <div className="flex flex-col flex-grow">
          <h2 className={`block font-medium sm:font-semibold 2xl:text-lg`}>
            <span
              dangerouslySetInnerHTML={{ __html: title }}
              className="line-clamp-1"
              title={title || ""}
            ></span>
          </h2>
          <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            {/* {IS_AUDIO ? `  40 Episode · 110 minutes` : date} */}
            {ncFormatDate(date || "")}
          </span>
        </div>
      </Link>

      {IS_AUDIO && (
        <ButtonPlayMusicPlayer
          post={post}
          renderDefaultBtn={() => renderDefaultBtnListen()}
          renderPlayingBtn={() => renderDefaultBtnListen("playing")}
        />
      )}
    </div>
  );
};

export default Card17Podcast;
