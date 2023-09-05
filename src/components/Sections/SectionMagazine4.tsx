import React, { FC } from "react";
import Card8 from "@/components/Card8/Card8";
import { SectionMagazine1Props } from "./SectionMagazine1";
import Card9 from "@/components/Card9/Card9";
import Empty from "../Empty";

export interface SectionMagazine4Props extends SectionMagazine1Props {}

const SectionMagazine4: FC<SectionMagazine4Props> = ({
  posts,
  className = "",
}) => {
  return (
    <div className={`nc-SectionMagazine4 ${className}`}>
      {!posts.length ? (
        <Empty />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts[0] && <Card8 className="sm:col-span-2" post={posts[0]} />}
          {posts
            .filter((_, i) => i < 3 && i >= 1)
            .map((item) => (
              <Card9 key={item.databaseId} post={item} />
            ))}
          {posts
            .filter((_, i) => i < 5 && i >= 3)
            .map((item) => (
              <Card9 key={item.databaseId} post={item} />
            ))}
          {posts[5] && <Card8 className="sm:col-span-2" post={posts[5]} />}

          {posts
            .filter((_, i) => i >= 6)
            .map((item) => (
              <Card9 key={item.databaseId} post={item} />
            ))}
        </div>
      )}
    </div>
  );
};

export default SectionMagazine4;
