import React, { FC } from "react";
import Card12 from "@/components/Card12/Card12";
import Card13 from "@/components/Card13/Card13";
import { SectionMagazine1Props } from "./SectionMagazine1";
import Empty from "../Empty";

export interface SectionMagazine5Props extends SectionMagazine1Props {}

const SectionMagazine5: FC<SectionMagazine5Props> = ({ posts }) => {
  return (
    <div className="nc-SectionMagazine5">
      {!posts.length ? (
        <Empty />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7">
          {posts[0] && <Card12 post={posts[0]} />}
          <div className="flex flex-col gap-5 md:gap-7">
            {posts
              .filter((_, i) => i < 4 && i > 0)
              .map((item) => (
                <Card13 className="flex-1" key={item.databaseId} post={item} />
              ))}
          </div>

          {posts
            .filter((_, i) => i >= 5)
            .map((item) => (
              <Card13 className="flex-1" key={item.databaseId} post={item} />
            ))}
        </div>
      )}
    </div>
  );
};

export default SectionMagazine5;
