import Link from "next/link";
import React, { FC } from "react";

export interface PostCardCommentBtnProps {
  className?: string;
  sizeClassName?: string;
  isATagOnSingle?: boolean;
  commentCount: number;
  linkToPost: string;
}

const PostCardCommentBtn: FC<PostCardCommentBtnProps> = ({
  className = "",
  sizeClassName = "w-9 h-9",
  isATagOnSingle = false,
  commentCount = 0,
  linkToPost = "",
}) => {
  const renderContent = () => {
    return (
      <>
        <div
          className={`flex-shrink-0 flex items-center justify-center rounded-full bg-neutral-50 transition-colors duration-75 dark:bg-neutral-800 group-hover/PostCardCommentBtn:bg-teal-50 dark:group-hover/PostCardCommentBtn:bg-teal-100 ${sizeClassName}`}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V14.25C19.25 15.3546 18.3546 16.25 17.25 16.25H14.625L12 19.25L9.375 16.25H6.75C5.64543 16.25 4.75 15.3546 4.75 14.25V6.75Z"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.5 11C9.5 11.2761 9.27614 11.5 9 11.5C8.72386 11.5 8.5 11.2761 8.5 11C8.5 10.7239 8.72386 10.5 9 10.5C9.27614 10.5 9.5 10.7239 9.5 11Z"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12.5 11C12.5 11.2761 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.2761 11.5 11C11.5 10.7239 11.7239 10.5 12 10.5C12.2761 10.5 12.5 10.7239 12.5 11Z"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.5 11C15.5 11.2761 15.2761 11.5 15 11.5C14.7239 11.5 14.5 11.2761 14.5 11C14.5 10.7239 14.7239 10.5 15 10.5C15.2761 10.5 15.5 10.7239 15.5 11Z"
            ></path>
          </svg>
        </div>

        <span className="ms-2 text-start flex-shrink-0 min-w-[1.125rem] text-neutral-900 dark:text-neutral-200 transition-colors duration-100">
          {commentCount}
        </span>
      </>
    );
  };

  const classess = `nc-PostCardCommentBtn group/PostCardCommentBtn relative flex items-center text-neutral-600 transition-colors dark:text-neutral-200 hover:text-teal-600 dark:hover:text-teal-500 ${className} text-xs`;

  if (isATagOnSingle) {
    return (
      <a href={"#comments"} className={classess} title="Comments">
        {renderContent()}
      </a>
    );
  }

  return (
    <Link href={`${linkToPost}#comments`} className={classess} title="Comments">
      {renderContent()}
    </Link>
  );
};

export default PostCardCommentBtn;
