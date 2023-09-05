import React, { FC } from "react";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import SingleTitle from "./SingleTitle";
import PostMeta2 from "@/components/PostMeta2/PostMeta2";
import SingleMetaAction2 from "./SingleMetaAction2";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import { NC_POST_FULL_FRAGMENT } from "@/fragments";
import { FragmentType } from "@/__generated__";

export interface SingleHeaderProps {
  hiddenDesc?: boolean;
  titleMainClass?: string;
  className?: string;
  post: FragmentType<typeof NC_POST_FULL_FRAGMENT>;
}

const SingleHeader: FC<SingleHeaderProps> = ({
  titleMainClass,
  hiddenDesc = false,
  className = "",
  post,
}) => {
  const {
    title,
    excerpt,
    ncPostMetaData,
    categories,
    commentCount,
    databaseId,
    uri,
  } = getPostDataFromPostFragment(post || {});

  return (
    <>
      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-4 lg:space-y-5">
          <CategoryBadgeList
            itemClass="!px-3"
            categories={categories?.nodes || []}
          />
          <SingleTitle mainClass={titleMainClass} title={title || ""} />
          {!hiddenDesc && (
            <div
              dangerouslySetInnerHTML={{ __html: excerpt }}
              className="text-base text-neutral-500 lg:text-lg dark:text-neutral-400 pb-1 max-w-screen-md"
            ></div>
          )}
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex flex-wrap justify-between sm:items-end gap-5 ">
            <PostMeta2
              size="large"
              className="leading-none flex-shrink-0"
              hiddenCategories
              avatarRounded="rounded-full shadow-inner"
              post={{ ...post }}
            />
            <SingleMetaAction2 post={post} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleHeader;
