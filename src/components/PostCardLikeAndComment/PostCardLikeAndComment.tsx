import React, { FC } from "react";
import PostCardCommentBtn, {
  PostCardCommentBtnProps,
} from "@/components/PostCardCommentBtn/PostCardCommentBtn";
import PostCardLikeAction, {
  PostCardLikeActionProps,
} from "@/components/PostCardLikeAction/PostCardLikeAction";

export interface PostCardLikeAndCommentProps
  extends Omit<PostCardLikeActionProps, "">,
    Omit<PostCardCommentBtnProps, "isATagOnSingle"> {
  className?: string;
  itemClass?: string;
  hiddenCommentOnMobile?: boolean;
  useOnSinglePage?: boolean;
}

const PostCardLikeAndComment: FC<PostCardLikeAndCommentProps> = ({
  className = "",
  itemClass,
  hiddenCommentOnMobile = true,
  useOnSinglePage = false,
  likeCount,
  commentCount,
  linkToPost,
  postDatabseId,
}) => {
  return (
    <div
      className={`nc-PostCardLikeAndComment flex items-center space-x-2 sm:space-x-2.5 rtl:space-x-reverse ${className}`}
    >
      <PostCardLikeAction
        className={itemClass}
        likeCount={likeCount}
        postDatabseId={postDatabseId}
      />
      <PostCardCommentBtn
        className={`${
          hiddenCommentOnMobile ? "hidden sm:flex" : "flex"
        }  ${itemClass}`}
        isATagOnSingle={useOnSinglePage}
        linkToPost={linkToPost}
        commentCount={commentCount}
      />
    </div>
  );
};

export default PostCardLikeAndComment;
