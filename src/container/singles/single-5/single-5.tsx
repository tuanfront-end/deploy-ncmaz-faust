import NcImage from "@/components/NcImage/NcImage";
import React, { FC } from "react";
import { SingleType1Props } from "../single/single";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import SingleHeader from "../SingleHeader";

interface Props extends SingleType1Props {}

const SingleType5: FC<Props> = ({ post }) => {
  const { title, content, date, author, databaseId, excerpt, featuredImage } =
    getPostDataFromPostFragment(post || {});
  //

  return (
    <>
      {/* SINGLE HEADER */}
      <header className="container rounded-xl pt-10 lg:pt-16">
        <div className="max-w-screen-md mx-auto">
          <SingleHeader post={post} hiddenDesc />
        </div>

        {/* FEATURED IMAGE */}
        <NcImage
          alt={title || ""}
          containerClassName="my-10 sm:my-12"
          className="w-full rounded-3xl"
          src={featuredImage?.sourceUrl || ""}
          width={featuredImage?.mediaDetails?.width || 1000}
          height={featuredImage?.mediaDetails?.height || 750}
          sizes="(max-width: 1024px) 100vw, 1280px"
        />
      </header>
    </>
  );
};

export default SingleType5;
