import React, { FC } from "react";
import Skeleton from "../Skeleton/Skeleton";

export interface Props {
  className?: string;
}

const Card3SmallSkeleton: FC<Props> = ({ className = "h-full" }) => {
  return (
    <div
      className={`nc-Card3Small relative flex flex-row justify-between items-center ${className}`}
    >
      <div className="flex-1 relative space-y-2">
        <Skeleton width={150} />
        <h2 className="nc-card-title block text-sm sm:text-base font-medium sm:font-semibold text-neutral-900 dark:text-neutral-100">
          <Skeleton width={"80%"} />
        </h2>
      </div>

      <div
        className={`flex-shrink-0 w-20 relative rounded-lg overflow-hidden z-0 ms-4 group`}
      >
        <div className={`w-full h-0 aspect-w-1 aspect-h-1`}>
          <Skeleton
            width={"100%"}
            height={"100%"}
            className="absolute inset-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Card3SmallSkeleton;
