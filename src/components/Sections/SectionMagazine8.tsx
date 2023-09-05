import Card16Podcast from "@/components/Card16Podcast/Card16Podcast";
import Card17Podcast from "@/components/Card17Podcast/Card17Podcast";
import React, { FC } from "react";
import { SectionMagazine1Props } from "./SectionMagazine1";

export interface SectionMagazine8Props extends SectionMagazine1Props {}

const SectionMagazine8: FC<SectionMagazine8Props> = ({
  posts,
  className = "",
}) => {
  return (
    <div className={`nc-SectionMagazine8 relative ${className}`}>
      <div className={`grid grid-cols-1 sm:grid-cols-6 gap-6`}>
        <Card16Podcast
          className="sm:col-span-3 lg:col-span-2"
          post={posts[0]}
        />
        <Card16Podcast
          className="sm:col-span-3 lg:col-span-2"
          post={posts[1]}
        />
        <div className="flex flex-col space-y-6 sm:col-span-6 lg:col-span-2">
          {posts
            .filter((_, i) => i > 1 && i < 6)
            .map((p, j) => (
              <Card17Podcast key={p.databaseId} post={p} />
            ))}
        </div>

        {posts
          .filter((_, i) => i >= 6)
          .map((p, j) => (
            <div className="sm:col-span-3 lg:col-span-2">
              <Card17Podcast key={p.databaseId} post={p} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SectionMagazine8;
