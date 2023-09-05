import Badge from "@/components/Badge/Badge";
import Card18 from "@/components/Card18/Card18";
import { TwMainColor } from "@/data/types";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { FC } from "react";
import { SectionMagazine1Props } from "./SectionMagazine1";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import { TPostCard } from "../Card2/Card2";

export interface SectionMagazine11Props extends SectionMagazine1Props {}

const SectionMagazine11: FC<SectionMagazine11Props> = ({
  posts,
  className = "",
}) => {
  const getPostData = (post: TPostCard) => {
    return getPostDataFromPostFragment(post);
  };

  const renderListByCat = () => {
    const listPosts = posts.map(getPostData);
    const category = listPosts?.[0].categories?.nodes?.[0];

    return (
      <div className={`flex flex-col space-y-4`}>
        <div className="flex flex-wrap gap-1.5 items-center justify-between">
          <Badge
            className="uppercase tracking-wide rounded-lg px-4 py-1.5"
            name={category?.name || ""}
            color={(category?.ncTaxonomyMeta?.color?.[0] as TwMainColor) || ""}
          />
          <Link
            href={category?.uri || ""}
            className="flex items-center text-xs text-neutral-500"
          >
            <span>More Articles</span>
            <ArrowRightIcon className="ms-1.5 w-3 h-3" />
          </Link>
        </div>
        {posts[0] && (
          <Card18
            ratio="aspect-w-4 aspect-h-3"
            className="flex-shrink-0"
            post={posts[0]}
          />
        )}
        <ul className="space-y-3">
          {listPosts
            .filter((_, i) => i > 0)
            .map((post) => (
              <li key={post.databaseId}>
                <h2 className="nc-card-title flex items-start font-medium space-x-4 rtl:space-x-reverse">
                  <Badge
                    className="w-2.5 h-2.5 !p-0 rounded flex-shrink-0 mt-2"
                    name={""}
                    color={
                      post.categories?.nodes?.[0].ncTaxonomyMeta
                        ?.color?.[0] as TwMainColor
                    }
                  />
                  <Link
                    href={post.uri || ""}
                    title={post.title}
                    className="flex"
                  >
                    {post.title}
                  </Link>
                </h2>
              </li>
            ))}
        </ul>
      </div>
    );
  };

  return (
    <div className={`nc-SectionMagazine11 relative ${className}`}>
      <div className="grid gap-7 sm:gap-4 md:gap-7">{renderListByCat()}</div>
    </div>
  );
};

export default SectionMagazine11;
