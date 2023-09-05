import React, { FC } from "react";
import { SectionMagazine1Props } from "./SectionMagazine1";
import Card2 from "@/components/Card2/Card2";
import Card9 from "@/components/Card9/Card9";
import Empty from "../Empty";

export interface SectionMagazine3Props extends SectionMagazine1Props {}

const SectionMagazine3: FC<SectionMagazine3Props> = ({
  posts,
  className = "",
}) => {
  return (
    <div className={`nc-SectionMagazine3 ${className}`}>
      {!posts.length ? (
        <Empty />
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {posts[0] && <Card2 size="large" post={posts[0]} />}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {posts
                .filter((_, i) => i < 5 && i >= 1)
                .map((item) => (
                  <Card9
                    ratio="aspect-w-3 aspect-h-3"
                    key={item.databaseId}
                    post={item}
                  />
                ))}
            </div>
          </div>
          {!!posts[5] && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
              {posts
                .filter((_, i) => i >= 5)
                .map((item) => (
                  <Card9
                    ratio="aspect-w-3 aspect-h-3"
                    key={item.databaseId}
                    post={item}
                  />
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SectionMagazine3;
