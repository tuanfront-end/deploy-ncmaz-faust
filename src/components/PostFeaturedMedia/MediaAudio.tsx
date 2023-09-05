import React, { FC } from "react";
import { PostDataFragmentType } from "@/data/types";
import ButtonPlayMusicPlayer from "@/components/ButtonPlayMusicPlayer";

export interface MediaAudioProps {
  post: PostDataFragmentType;
}

const MediaAudio: FC<MediaAudioProps> = ({ post }) => {
  return (
    <>
      <ButtonPlayMusicPlayer
        className="absolute inset-0 bg-neutral-900/30 flex items-center justify-center"
        post={post}
      />
    </>
  );
};

export default MediaAudio;
