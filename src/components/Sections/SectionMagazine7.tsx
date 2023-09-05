import Card10 from "@/components/Card10/Card10";
import Card10V3 from "@/components/Card10/Card10V3";
import React, { FC } from "react";
import { SectionMagazine1Props } from "./SectionMagazine1";

export interface SectionMagazine7Props extends SectionMagazine1Props {}

const SectionMagazine7: FC<SectionMagazine7Props> = ({
  posts,
  className = "",
}) => {
  return (
    <div className={`nc-SectionMagazine7 relative ${className}`}>
      <div className={`grid grid-cols-1 gap-6 md:gap-7`}>
        <div className={`grid gap-6 md:gap-8 lg:grid-cols-2`}>
          <Card10V3 post={posts[0]} />
          <Card10V3 galleryType={2} post={posts[1]} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-7 mt-3">
          {posts
            .filter((_, i) => i >= 2)
            .map((item) => (
              <Card10 post={item} key={item.databaseId} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SectionMagazine7;
