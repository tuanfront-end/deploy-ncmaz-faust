"use client";

import React, { FC } from "react";
import Link from "next/link";
import ButtonPlayMusicPlayer from "../ButtonPlayMusicPlayer";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { CommonPostCardProps } from "../Card2/Card2";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import MyImage from "../MyImage";
import ncFormatDate from "@/utils/formatDate";

export interface Card15PodcastProps extends CommonPostCardProps {}

const Card15Podcast: FC<Card15PodcastProps> = ({
  className = "h-full",
  post,
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

  const renderDefaultBtnListen = (state?: "playing") => {
    return (
      <div className="inline-flex items-center mt-3 pe-4 py-0.5 hover:ps-0.5 cursor-pointer rounded-full transition-all hover:bg-primary-50 dark:hover:bg-neutral-900">
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-50 dark:bg-neutral-800 text-primary-600 dark:text-primary-200">
          {state === "playing" ? (
            <PauseIcon className="w-5 h-5" />
          ) : (
            <PlayIcon className="w-5 h-5 rtl:rotate-180" />
          )}
        </span>

        <span className="ms-3 text-xs sm:text-sm font-medium">
          {state === "playing" ? "Now playing" : "Listen now"}
        </span>
      </div>
    );
  };

  return (
    <div
      className={`nc-Card15Podcast relative flex group items-center p-3 rounded-3xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 ${className}`}
    >
      <div className="w-1/4 flex-shrink-0">
        <Link
          href={uri || ""}
          className="block h-0 aspect-w-1 aspect-h-1 relative rounded-full overflow-hidden shadow-lg"
        >
          <MyImage
            className="object-cover w-full h-full"
            src={featuredImage?.sourceUrl || ""}
            fill
            alt={title || ""}
            sizes="100px"
          />
        </Link>
      </div>

      <div className="flex flex-col flex-grow ms-4">
        <h2
          className={`nc-card-title block font-semibold text-sm sm:text-base 2xl:text-lg`}
        >
          <Link
            href={uri || ""}
            className={IS_AUDIO ? `line-clamp-1` : "line-clamp-2"}
            title={title || ""}
            dangerouslySetInnerHTML={{ __html: title }}
          ></Link>
        </h2>
        <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 ">
          {/* {IS_AUDIO ? ` 40 Episode · 110 minutes` : date} */}
          {ncFormatDate(date || "")}
        </span>

        {IS_AUDIO && (
          <ButtonPlayMusicPlayer
            post={post}
            renderDefaultBtn={() => renderDefaultBtnListen()}
            renderPlayingBtn={() => renderDefaultBtnListen("playing")}
          />
        )}
      </div>
    </div>
  );
};

export default Card15Podcast;
