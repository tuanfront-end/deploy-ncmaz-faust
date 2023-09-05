"use client";

import React, { FC } from "react";
import ButtonPlayMusicPlayer from "@/components/ButtonPlayMusicPlayer";
import { SingleType1Props } from "../single/single";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import MyImage from "@/components/MyImage";
import SingleHeader from "../SingleHeader";
import { PostDataFragmentType } from "@/data/types";

interface Props extends SingleType1Props {}

const SingleTypeAudio: FC<Props> = ({ post }) => {
  //
  const { title, featuredImage, postFormats } = getPostDataFromPostFragment(
    post || {}
  );
  const isAudio = postFormats === "audio";
  //

  const renderIcon = (playing: boolean) => {
    if (playing) {
      return (
        <MyImage
          className="w-7"
          src={"/images/icon-playing.gif"}
          alt="music playing"
          width={28}
          height={28}
        />
      );
    }

    return (
      <svg
        className="w-11 h-11 rtl:rotate-180"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
        ></path>
      </svg>
    );
  };

  const renderButtonPlay = (playing: boolean) => {
    return (
      <div
        className={`overflow-hidden z-10 shadow-2xl group ${
          isAudio
            ? `aspect-w-1 aspect-h-1 cursor-pointer rounded-full`
            : "rounded-3xl"
        }`}
      >
        {featuredImage?.sourceUrl && (
          <MyImage
            className={`transition-transform z-0 ${
              isAudio
                ? "w-full h-full object-cover rounded-full nc-animation-spin"
                : "rounded-3xl"
            } ${playing && isAudio ? "playing" : ""}`}
            alt={title}
            src={featuredImage?.sourceUrl || ""}
            fill={isAudio}
            width={
              isAudio ? undefined : featuredImage?.mediaDetails?.width || 1000
            }
            height={
              isAudio ? undefined : featuredImage?.mediaDetails?.height || 750
            }
            priority
          />
        )}

        {isAudio && (
          <>
            <div className="bg-neutral-900 bg-blend-multiply bg-opacity-75 rounded-full"></div>
            <div className="flex items-center justify-center">
              <div className="text-white bg-black bg-blend-multiply bg-opacity-50 w-20 h-20 border-2 border-neutral-300 rounded-full flex items-center justify-center ">
                {renderIcon(playing)}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <div className={`relative pt-8 lg:pt-16`}>
        {/* Overlay */}
        <div className="bg-primary-50 dark:bg-neutral-800 absolute top-0 inset-x-0 h-60 w-full"></div>

        {/* SINGLE_AUDIO HEADER */}
        <header className="relative lg:container">
          <div
            className={`bg-white dark:bg-neutral-900 shadow-2xl px-4 sm:px-5 py-7 lg:p-11 rounded-2xl md:rounded-[40px] flex flex-col md:flex-row gap-8 lg:gap-10 ${
              isAudio ? "items-center justify-center" : "items-start"
            }`}
          >
            <div
              className={`${
                isAudio ? "w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5" : "sm:max-w-xs"
              } flex-shrink-0`}
            >
              {isAudio ? (
                <ButtonPlayMusicPlayer
                  renderChildren={renderButtonPlay}
                  post={post as PostDataFragmentType}
                />
              ) : (
                renderButtonPlay(false)
              )}
            </div>
            <SingleHeader hiddenDesc className="flex-1" post={post} />
          </div>
        </header>
      </div>
    </>
  );
};

export default SingleTypeAudio;
