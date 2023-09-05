"use client";

import React, { FC } from "react";
import GallerySlider from "./GallerySlider";
import MediaVideo from "./MediaVideo";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import MediaAudio from "./MediaAudio";
import Link from "next/link";
import { PostDataFragmentType } from "@/data/types";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import MyImage from "../MyImage";

export interface PostFeaturedMediaProps {
  className?: string;
  post: PostDataFragmentType;
  isHover?: boolean;
}

const PostFeaturedMedia: FC<PostFeaturedMediaProps> = ({
  className = "w-full h-full",
  post,
  isHover = false,
}) => {
  const {
    title,
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
    ncmazGalleryImgs,
    ncmazVideoUrl,
    ncmazAudioUrl,
  } = getPostDataFromPostFragment(post);

  const galleryImgs = [featuredImage, ...(ncmazGalleryImgs || [])]
    .map((img) => img?.sourceUrl)
    .filter((img) => !!img) as string[];

  const isPostMedia = () => postType === "video" || postType === "audio";

  const renderGallerySlider = () => {
    if (!galleryImgs || !galleryImgs.length) {
      return null;
    }

    return (
      <GallerySlider
        href={uri || ""}
        galleryImgs={galleryImgs.filter((img) => !!img) as string[]}
        className="absolute inset-0 z-10"
        galleryClass="absolute inset-0"
        ratioClass="absolute inset-0"
      />
    );
  };

  const renderContent = () => {
    // GALLERY
    if (postType === "gallery") {
      return renderGallerySlider();
    }

    // VIDEO
    if (postType === "video" && !!ncmazVideoUrl?.videoUrl && isHover) {
      return <MediaVideo isHover videoUrl={ncmazVideoUrl.videoUrl} />;
    }

    // AUDIO
    if (postType === "audio" && !!ncmazAudioUrl) {
      return <MediaAudio post={post} />;
    }

    // ICON
    return isPostMedia() ? (
      <span className="absolute inset-0 flex items-center justify-center ">
        <PostTypeFeaturedIcon
          className="hover:scale-105 transform cursor-pointer transition-transform"
          postType={postType}
        />
      </span>
    ) : null;
  };

  return (
    <div className={`nc-PostFeaturedMedia relative ${className}`}>
      {postType !== "gallery" && (
        <MyImage
          alt={title || "Post Featured Image"}
          fill
          className="object-cover"
          src={featuredImage?.sourceUrl || ""}
          sizes="(max-width: 600px) 480px, 800px"
        />
      )}
      {renderContent()}
      {postType !== "gallery" && (
        <Link
          href={uri || ""}
          className={`block absolute inset-0 ${
            !postType || postType === "standard"
              ? "bg-black/20 transition-opacity opacity-0 group-hover:opacity-100"
              : ""
          }`}
        />
      )}
    </div>
  );
};

export default PostFeaturedMedia;
