import Card15Podcast from "@/components/Card15Podcast/Card15Podcast";
import Card9 from "@/components/Card9/Card9";
import React, { FC } from "react";
import { SectionMagazine1Props } from "./SectionMagazine1";

export interface SectionMagazine9Props extends SectionMagazine1Props {
  gapClassName?: string;
}

const SectionMagazine9: FC<SectionMagazine9Props> = ({
  posts,
  className = "",
  gapClassName = "gap-6",
}) => {
  return (
    <div className={`nc-SectionMagazine9 relative ${className}`}>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${gapClassName}`}
      >
        {posts[0] && <Card9 ratio="aspect-w-4 aspect-h-3" post={posts[0]} />}
        {posts[1] && <Card9 ratio="aspect-w-4 aspect-h-3" post={posts[1]} />}
        {posts[2] && <Card9 ratio="aspect-w-4 aspect-h-3" post={posts[2]} />}
      </div>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${gapClassName} mt-8`}
      >
        {posts
          .filter((_, i) => i > 2)
          .map((p) => (
            <Card15Podcast key={p.databaseId} post={p} />
          ))}
      </div>
    </div>
  );
};

export default SectionMagazine9;
