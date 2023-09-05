import React, { FC } from "react";
import Image from "next/image";
import { SingleType1Props } from "../single/single";
import SingleHeader from "../SingleHeader";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import MyImage from "@/components/MyImage";

interface Props extends SingleType1Props {}

const SingleType3: FC<Props> = ({ post }) => {
  //
  const { title, content, date, author, databaseId, excerpt, featuredImage } =
    getPostDataFromPostFragment(post || {});
  //

  return (
    <header className="relative pt-16 z-10 md:py-20 lg:py-28 bg-neutral-900 dark:bg-black">
      {/* SINGLE HEADER */}
      <div className="dark container relative z-10">
        <div
          className={`max-w-screen-md ${
            featuredImage?.sourceUrl ? "" : "mx-auto pb-6 md:pb-0"
          }`}
        >
          <SingleHeader post={post} hiddenDesc />
        </div>
      </div>

      {/* FEATURED IMAGE */}
      {featuredImage?.sourceUrl && (
        <div className="mt-8 md:mt-0 md:absolute md:top-0 md:end-0 md:bottom-0 md:w-1/2 lg:w-2/5 2xl:w-1/3">
          <MyImage
            className="block w-full h-full object-cover"
            src={featuredImage?.sourceUrl || ""}
            alt={title}
            priority
            sizes="(max-width: 1024px) 100vw, 1240px"
            fill
          />

          <div className="hidden md:block absolute top-0 start-0 bottom-0 w-1/5 from-neutral-900 dark:from-black bg-gradient-to-r rtl:bg-gradient-to-l"></div>
        </div>
      )}
    </header>
  );
};

export default SingleType3;
