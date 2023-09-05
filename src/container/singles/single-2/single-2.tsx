import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import SingleHeader from "../SingleHeader";
import { SingleType1Props } from "../single/single";
interface Props extends SingleType1Props {}

const SingleType2: FC<Props> = ({ post }) => {
  //
  const { title, content, date, author, databaseId, excerpt, featuredImage } =
    getPostDataFromPostFragment(post || {});
  //

  return (
    <div className={`pt-8 lg:pt-16`}>
      {/* SINGLE HEADER */}
      <header className="container rounded-xl">
        <div className="max-w-screen-md mx-auto">
          <SingleHeader post={{ ...post }} hiddenDesc />
          {!featuredImage?.sourceUrl && (
            <div className="my-5 border-b border-neutral-200 dark:border-neutral-800 "></div>
          )}
        </div>
      </header>

      {/* FEATURED IMAGE */}
      {featuredImage?.sourceUrl && (
        <NcImage
          alt={title}
          containerClassName="container my-10 sm:my-12"
          className="w-full rounded-xl"
          src={featuredImage?.sourceUrl || ""}
          width={featuredImage?.mediaDetails?.width || 1000}
          height={featuredImage?.mediaDetails?.height || 750}
          sizes={"(max-width: 1024px) 100vw, 1280px"}
          priority
        />
      )}
    </div>
  );
};

export default SingleType2;
