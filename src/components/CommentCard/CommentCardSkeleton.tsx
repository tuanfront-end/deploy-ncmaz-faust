import React, { FC } from "react";
import twFocusClass from "@/utils/twFocusClass";
import Skeleton from "../Skeleton/Skeleton";

export interface Props {
  className?: string;
  size?: "large" | "normal";
}

const CommentCardSkeleton: FC<Props> = ({ className = "", size = "large" }) => {
  return (
    <>
      <div
        className={`nc-CommentCard flex gap-[6px] sm:gap-[12px] ${className}`}
      >
        <Skeleton circle width={30} height={30} />

        <div className="flex-1 overflow-hidden flex flex-col p-2 sm:p-4 text-sm border border-neutral-200 rounded-xl sm:text-base dark:border-neutral-700">
          {/* AUTHOR INFOR */}
          <div className="space-y-1">
            <div className="relative flex items-center">
              <div className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100">
                <Skeleton width={100} />
              </div>

              <span className="mx-2"></span>
              <span className="text-neutral-500 dark:text-neutral-400 line-clamp-1 text-xs sm:text-sm">
                <Skeleton width={50} />
              </span>
            </div>
          </div>

          {/* CONTENT */}
          <div className="block mt-2 mb-3 sm:mt-3 sm:mb-4 max-w-none">
            <Skeleton width={"95%"} />
            <Skeleton width={"70%"} />
          </div>

          <div className="flex space-x-2">
            <Skeleton width={80} height={30} borderRadius={99} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentCardSkeleton;
