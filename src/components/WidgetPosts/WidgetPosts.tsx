import Card3Small from "@/components/Card3Small/Card3Small";
import WidgetHeading1 from "@/components/WidgetHeading1/WidgetHeading1";
import React, { FC } from "react";
import { SectionMagazine1Props } from "../Sections/SectionMagazine1";
import Card3SmallSkeleton from "../Card3Small/Card3SmallSkeleton";

export interface WidgetPostsProps extends SectionMagazine1Props {
  className?: string;
  isLoading?: boolean;
}

const WidgetPosts: FC<WidgetPostsProps> = ({
  className = "rounded-3xl border border-neutral-100 dark:border-neutral-700",
  posts,
  isLoading,
}) => {
  return (
    <div className={`nc-WidgetPosts overflow-hidden ${className}`}>
      <WidgetHeading1 title="🎯 Latest Posts" />
      <div className="flex flex-col divide-y divide-neutral-100 dark:divide-neutral-700">
        {isLoading ? (
          <>
            <Card3SmallSkeleton className="p-4 xl:px-5 " />
            <Card3SmallSkeleton className="p-4 xl:px-5 " />
            <Card3SmallSkeleton className="p-4 xl:px-5 " />
            <Card3SmallSkeleton className="p-4 xl:px-5 " />
            <Card3SmallSkeleton className="p-4 xl:px-5 " />
          </>
        ) : (
          posts.map((post) => (
            <Card3Small
              className="p-4 xl:px-5 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              // @ts-ignore
              key={post.databaseId}
              post={post}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default WidgetPosts;
