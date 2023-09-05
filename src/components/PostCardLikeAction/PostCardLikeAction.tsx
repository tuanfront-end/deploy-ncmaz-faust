"use client";

import React, { FC, useEffect, useMemo, useState } from "react";
import convertNumbThousand from "@/utils/convertNumbThousand";
import { useAuth } from "@faustwp/core";
import { useMutation } from "@apollo/client";
import { NC_MUTATION_UPDATE_USER_REACTION_POST_COUNT } from "@/fragments/mutations";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import {
  NcmazFcUserReactionPostActionEnum,
  NcmazFcUserReactionPostNumberUpdateEnum,
  NcmazFcUserReactionPostUpdateResuiltEnum,
} from "@/__generated__/graphql";
import { updateViewerAllReactionPosts } from "@/stores/viewer/viewerSlice";
import { useLoginModal } from "@/container/LoginModalProvider";
import toast from "react-hot-toast";

export interface PostCardLikeActionProps {
  className?: string;
  sizeClassName?: string;
  likeCount: number;
  postDatabseId: number;
}

const PostCardLikeAction: FC<PostCardLikeActionProps> = ({
  className = "",
  sizeClassName = "h-9 w-9 ",
  likeCount: likeCountProp = 34,
  postDatabseId,
}) => {
  const [likeCountState, setLikeCountState] = useState(likeCountProp);
  const { isAuthenticated, isReady } = useAuth();
  const { openLoginModal } = useLoginModal();
  //
  const [handleUpdateReactionCount, { loading, error, data, called }] =
    useMutation(NC_MUTATION_UPDATE_USER_REACTION_POST_COUNT);
  //
  const { viewer, viewerReactionPosts } = useSelector(
    (state: RootState) => state.viewer
  );
  const likesCountOkFromStore = useSelector(
    (state: RootState) =>
      state.postsNcmazMetaDataOk[postDatabseId]?.ncPostMetaData?.likesCount
  );
  const dispatch = useDispatch();
  //
  useEffect(() => {
    if (likesCountOkFromStore == undefined || likesCountOkFromStore == null) {
      return;
    }

    setLikeCountState(likesCountOkFromStore || 0);
  }, [likesCountOkFromStore]);

  // handle dispatch update viewer reaction posts
  const handleDispatchUpdateViewerReactionPosts = (
    postDatabseId: number,
    type?: NcmazFcUserReactionPostUpdateResuiltEnum | null,
    number?: NcmazFcUserReactionPostNumberUpdateEnum | null
  ) => {
    let newViewerReactionPosts = viewerReactionPosts;

    // neu type === Added -> them vao list binh thuong
    if (type === NcmazFcUserReactionPostUpdateResuiltEnum.Added) {
      newViewerReactionPosts = [
        ...(viewerReactionPosts || []).filter(
          (post) => !post.title?.includes(`${postDatabseId},LIKE`)
        ),
        {
          title: `${postDatabseId},LIKE`,
          id: String(new Date()),
          isNewAddedFromClient: true,
          newLikedCount: likeCountState + 1,
        },
      ];

      // update like count
      setLikeCountState(likeCountState + 1);
    }

    if (type === NcmazFcUserReactionPostUpdateResuiltEnum.Removed) {
      // neu type === Remove -> xoa khoi list binh thuong
      newViewerReactionPosts = (viewerReactionPosts || []).map((post) => {
        if (!post.title?.includes(`${postDatabseId},LIKE`)) {
          return post;
        } else {
          return {
            ...post,
            isNewAddedFromClient: false,
            isNewUnLikeFromClient: true,
            newLikedCount: likeCountState > 0 ? likeCountState - 1 : 0,
          };
        }
      });
      // update like count
      setLikeCountState(likeCountState > 0 ? likeCountState - 1 : 0);
    }

    if (type === NcmazFcUserReactionPostUpdateResuiltEnum.Error) {
      // neu type === Error -> kiem tra xem hanh dong nay la dang remove hay add,
      // vi la Error nen se phai thuc hien nguoc lai voi hanh dong truoc do, vi truoc do da thuc hien dispatch tam 1 lan len redux roi
      // neu la remove -> them lai vao list.
      if (number === NcmazFcUserReactionPostNumberUpdateEnum.Remove_1) {
        newViewerReactionPosts = [
          ...(viewerReactionPosts || []).filter(
            (p) => !p.title?.includes(`${postDatabseId},LIKE`)
          ),
          {
            title: `${postDatabseId},LIKE`,
            id: String(new Date()),
          },
        ];
        // update like count
        setLikeCountState(likeCountState + 1);
      }
      // Neu la add -> xoa khoi list
      if (number === NcmazFcUserReactionPostNumberUpdateEnum.Add_1) {
        newViewerReactionPosts = (viewerReactionPosts || []).filter(
          (post) => !post.title?.includes(`${postDatabseId},LIKE`)
        );

        // update like count
        setLikeCountState(likeCountState > 0 ? likeCountState - 1 : 0);
      }
    }

    dispatch(updateViewerAllReactionPosts(newViewerReactionPosts));
  };
  //

  // check is isLiked
  const isLiked = useMemo(() => {
    // for user logged in
    return viewerReactionPosts?.some(
      (post) =>
        post.title?.includes(`${postDatabseId},LIKE`) &&
        !post.isNewUnLikeFromClient
    );
  }, [viewer, viewerReactionPosts]);
  //

  // handle update viewerReactionPosts to redux store
  useEffect(() => {
    if (loading || !isReady) {
      return;
    }

    if (
      error ||
      data?.ncmazFaustUpdateUserReactionPostCount?.result ===
        NcmazFcUserReactionPostUpdateResuiltEnum.Error
    ) {
      console.log("___NcBookmark___error", { error, data });

      // dispatch update viewer reaction posts -> when update have error
      handleDispatchUpdateViewerReactionPosts(
        postDatabseId,
        NcmazFcUserReactionPostUpdateResuiltEnum.Error,
        data?.ncmazFaustUpdateUserReactionPostCount?.number
      );
      return;
    }
  }, [data, error, loading, isReady]);

  // handle click like action
  const handleClickAction = () => {
    if (!isReady) {
      toast.error("Please wait a moment! Data is being prepared.");
      return;
    }

    if (!viewer?.databaseId || !isAuthenticated) {
      openLoginModal();
      return;
    }

    // check isload like count from server
    const loadingDOM = document.querySelectorAll(
      ".getPostsNcmazMetaByIds_is_loading"
    );
    if (!!loadingDOM?.length) {
      toast.error("Please wait a moment! Data is being prepared.");
      return;
    }

    // dispatch pre update viewer reaction posts -> when prepare update to server. Will have a update again when have result from server
    handleDispatchUpdateViewerReactionPosts(
      postDatabseId,
      isLiked
        ? NcmazFcUserReactionPostUpdateResuiltEnum.Removed
        : NcmazFcUserReactionPostUpdateResuiltEnum.Added
    );

    //  update like count for database
    handleUpdateReactionCount({
      variables: {
        post_id: postDatabseId,
        user_id: viewer.databaseId,
        reaction: NcmazFcUserReactionPostActionEnum.Like,
        number: isLiked
          ? NcmazFcUserReactionPostNumberUpdateEnum.Remove_1
          : NcmazFcUserReactionPostNumberUpdateEnum.Add_1,
      },
    });
  };

  // handle update like count when have update from store
  const actualLikeCount = useMemo(() => {
    if (!viewerReactionPosts?.length) {
      return likeCountState;
    }
    const viewerReactionPost = viewerReactionPosts?.find((post) =>
      post.title?.includes(`${postDatabseId},LIKE`)
    );
    if (typeof viewerReactionPost?.newLikedCount === "number") {
      return viewerReactionPost?.newLikedCount;
    }
    return likeCountState;
  }, [likeCountState, viewerReactionPosts]);

  return (
    <button
      className={`nc-PostCardLikeAction relative flex items-center leading-none group/PostCardLikeAction transition-colors text-xs ${className} ${
        isLiked
          ? "text-rose-600 "
          : "text-neutral-700 dark:text-neutral-200  hover:text-rose-600 dark:hover:text-rose-500"
      } `}
      onClick={handleClickAction}
      title={isLiked ? "Unlike" : "Like this post"}
    >
      <div
        className={`${sizeClassName} transition-colors duration-75 flex-shrink-0 flex items-center justify-center rounded-full ${
          isLiked
            ? "bg-rose-50 dark:bg-rose-100"
            : "bg-neutral-50 dark:bg-neutral-800 group-hover/PostCardLikeAction:bg-rose-50 dark:group-hover/PostCardLikeAction:bg-rose-100"
        }`}
      >
        <svg
          width="24"
          height="24"
          fill={isLiked ? "currentColor" : "none"}
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M11.995 7.23319C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972C4.49599 8.14609 4.2403 10.6312 5.66654 12.3892L11.995 18.25L18.3235 12.3892C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972C15.8305 5.18899 13.4446 5.60999 11.995 7.23319Z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>

      <span
        className={`transition-colors duration-100 ms-2 text-start flex-shrink-0 min-w-[1.125rem] ${
          isLiked
            ? "text-rose-600 dark:text-rose-500"
            : "text-neutral-900 dark:text-neutral-200"
        }`}
      >
        {actualLikeCount ? convertNumbThousand(actualLikeCount) : 0}
      </span>
    </button>
  );
};

export default PostCardLikeAction;
