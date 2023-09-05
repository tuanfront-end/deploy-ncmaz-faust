import React, { FC } from "react";
import SingleHeader4 from "../SingleHeader4";
import { SingleType1Props } from "../single/single";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";

interface Props extends SingleType1Props {}

const SingleType4: FC<Props> = ({ post }) => {
  const { title, content, date, author, databaseId, excerpt, featuredImage } =
    getPostDataFromPostFragment(post || {});
  //

  return (
    <>
      <div className="absolute top-0 inset-x-0 bg-neutral-900 dark:bg-black/30 h-[480px] md:h-[600px] lg:h-[700px] xl:h-[95vh]"></div>

      <header className="container pt-10 lg:pt-16 rounded-xl relative z-10">
        <SingleHeader4 post={post} />
      </header>
    </>
  );
};

export default SingleType4;
