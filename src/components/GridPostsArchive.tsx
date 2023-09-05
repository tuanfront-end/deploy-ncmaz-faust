import { NcmazFcPostFullFieldsFragment } from "@/__generated__/graphql";
import React, { FC } from "react";
import Empty from "./Empty";
import Card11Skeleton from "./Card11/Card11Skeleton";
import Card11 from "./Card11/Card11";
import ButtonPrimary from "./Button/ButtonPrimary";

interface Props {
  posts: NcmazFcPostFullFieldsFragment[] | null;
  className?: string;
  loading?: boolean;
  showLoadmore?: boolean;
  onClickLoadmore?: () => void;
}

const GridPostsArchive: FC<Props> = ({
  className = "",
  posts: currentPosts,
  loading,
  onClickLoadmore,
  showLoadmore,
}) => {
  return (
    <div className={` ${className}`}>
      {/* LOOP ITEMS */}
      {!currentPosts?.length && !loading ? (
        <Empty />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-y-8 md:gap-x-7 mt-8 lg:mt-12">
          {!currentPosts?.length && loading
            ? [1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => <Card11Skeleton key={i} />)
            : (currentPosts || []).map((post) => (
                <Card11 key={post.databaseId} post={post} />
              ))}
        </div>
      )}

      {/* PAGINATION */}
      {showLoadmore ? (
        <div className="mt-12 lg:mt-14 flex justify-center">
          <ButtonPrimary loading={loading} onClick={onClickLoadmore}>
            Show me more
          </ButtonPrimary>
        </div>
      ) : null}
    </div>
  );
};

export default GridPostsArchive;
