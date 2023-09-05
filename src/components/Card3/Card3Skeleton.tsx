import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import Link from "next/link";
import { CommonPostCardProps } from "../Card2/Card2";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import Skeleton from "react-loading-skeleton";
import PostCardLikeCommentSaveSkeleton from "../Skeleton/PostCardLikeCommentSaveSkeleton";

export interface Card3SkeletonProps {
  className?: string;
}

const Card3Skeleton: FC<Card3SkeletonProps> = ({ className = "h-full" }) => {
  return (
    <div
      className={`nc-Card3 relative flex flex-row items-center group ${className}`}
    >
      <div className="flex flex-col flex-grow">
        <div className="space-y-3.5">
          <Skeleton height={24} width={50} borderRadius={99} />
          <div className="block">
            <h2
              className={`nc-card-title block font-medium sm:font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base xl:text-lg`}
            >
              <Skeleton width="70%" />
            </h2>
            <div className="hidden sm:block sm:mt-2">
              <div className="text-neutral-500 dark:text-neutral-400 text-sm line-clamp-2">
                <Skeleton />
                <Skeleton width="90%" />
              </div>
            </div>
          </div>

          <div>
            <Skeleton width="40%" />
          </div>
        </div>
        <div className="mt-5">
          <PostCardLikeCommentSaveSkeleton />
        </div>
      </div>

      <div
        className={`block flex-shrink-0 w-24 sm:w-36 md:w-44 xl:w-56 ms-3 sm:ms-6 rounded-3xl overflow-hidden z-0 mb-5 sm:mb-0`}
      >
        <div className="block w-full h-0 aspect-h-1 aspect-w-1 relative">
          <Skeleton
            width="100%"
            height="100%"
            containerClassName="absolute inset-0 leading-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Card3Skeleton;
