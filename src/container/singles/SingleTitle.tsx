import React, { FC } from "react";

export interface SingleTitleProps {
  title: string;
  className?: string;
  mainClass?: string;
}

const SingleTitle: FC<SingleTitleProps> = ({
  mainClass = "text-neutral-900 font-semibold text-2xl sm:text-3xl lg:text-4xl xl:leading-[115%] xl:text-[2.75rem] dark:text-neutral-100",
  className = "",
  title,
}) => {
  return (
    <h1
      className={className + " " + mainClass + " max-w-4xl "}
      title={title}
      dangerouslySetInnerHTML={{ __html: title || "" }}
    ></h1>
  );
};

export default SingleTitle;
