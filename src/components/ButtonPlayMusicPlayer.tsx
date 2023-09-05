// ** Tat ca cac component nao goi truc tiep ButtonPlayMusicPlayer thi can phai co use client
import React, { FC, ReactNode } from "react";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import Image from "next/image";
import { PostDataFragmentType } from "@/data/types";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import MyImage from "./MyImage";

export interface ButtonPlayMusicPlayerProps {
  className?: string;
  post: PostDataFragmentType;
  renderChildren?: (playing: boolean) => ReactNode;
  renderDefaultBtn?: () => ReactNode;
  renderPlayingBtn?: () => ReactNode;
}

// ** Tat ca cac component nao goi truc tiep ButtonPlayMusicPlayer thi can phai co use client **

const ButtonPlayMusicPlayer: FC<ButtonPlayMusicPlayerProps> = ({
  className = "",
  post,
  renderChildren,
  renderDefaultBtn,
  renderPlayingBtn,
}) => {
  const {
    postData: currentPostData,
    setPostData,
    setPlaying,
    playing: currentPlayingAnyPost,
  } = useMusicPlayer();

  const playing =
    currentPlayingAnyPost && currentPostData?.databaseId === post?.databaseId;

  const { databaseId, ncmazAudioUrl } = getPostDataFromPostFragment(post);

  const currentMediaPostData = getPostDataFromPostFragment(
    currentPostData || {}
  );

  // STATE
  const handleClickNewAudio = () => {
    setPostData(post);
    setPlaying(true);
  };

  const handleClickButton = () => {
    // IF NOT EXIST MEDIA
    if (
      !currentMediaPostData ||
      currentMediaPostData.databaseId !== databaseId ||
      currentMediaPostData.ncmazAudioUrl?.audioUrl !== ncmazAudioUrl?.audioUrl
    ) {
      return handleClickNewAudio();
    }

    setPlaying(!playing);
  };

  const _renderDefaultBtn = () => {
    if (renderDefaultBtn) {
      return renderDefaultBtn();
    }
    return (
      <PostTypeFeaturedIcon
        className="z-20 hover:scale-105 transform cursor-pointer transition-transform"
        postType="audio"
      />
    );
  };

  const _renderPlayingBtn = () => {
    // RENDER DEFAULT IF IT NOT CURRENT
    if (currentMediaPostData?.databaseId !== databaseId) {
      return _renderDefaultBtn();
    }

    // RENDER WHEN IS CURRENT
    if (renderPlayingBtn) {
      return renderPlayingBtn();
    }

    return (
      <span className="z-10 bg-neutral-900 bg-opacity-60 rounded-full flex  items-center justify-center text-xl text-white border border-white w-11 h-11 cursor-pointer">
        <MyImage
          className="w-5"
          src={"/images/icon-playing.gif"}
          alt="paused"
          width={20}
          height={20}
        />
      </span>
    );
  };

  return (
    <div
      className={`nc-ButtonPlayMusicPlayer select-none ${className}`}
      onClick={handleClickButton}
    >
      {renderChildren ? (
        renderChildren(playing)
      ) : (
        <>{playing ? _renderPlayingBtn() : _renderDefaultBtn()}</>
      )}
    </div>
  );
};

export default ButtonPlayMusicPlayer;
