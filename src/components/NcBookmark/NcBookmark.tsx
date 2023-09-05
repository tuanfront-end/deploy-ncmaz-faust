"use client";
import { useAuth } from "@faustwp/core";
import React, { FC, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { updateLocalPostsSavedList } from "@/stores/localPostSavedList/localPostsSavedListSlice";
import { useMutation } from "@apollo/client";
import { NC_MUTATION_UPDATE_USER_REACTION_POST_COUNT } from "@/fragments/mutations";
import {
  NcmazFcUserReactionPostActionEnum,
  NcmazFcUserReactionPostNumberUpdateEnum,
  NcmazFcUserReactionPostUpdateResuiltEnum,
} from "@/__generated__/graphql";
import { updateViewerAllReactionPosts } from "@/stores/viewer/viewerSlice";
import toast from "react-hot-toast";

export interface NcBookmarkProps {
  containerClassName?: string;
  postDatabseId: number;
}

const NcBookmark: FC<NcBookmarkProps> = ({
  containerClassName = "h-9 w-9 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700",
  postDatabseId,
}) => {
  const [handleUpdateReactionCount, { loading, error, data }] = useMutation(
    NC_MUTATION_UPDATE_USER_REACTION_POST_COUNT
  );
  //
  const { isReady, isAuthenticated } = useAuth();
  const { viewer, viewerReactionPosts } = useSelector(
    (state: RootState) => state.viewer
  );
  const localSavedPostsList = useSelector(
    (state: RootState) => state.localPostsSavedList.localSavedPosts
  );
  const dispatch = useDispatch();

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
        ...(viewerReactionPosts || []),
        {
          title: `${postDatabseId},SAVE`,
          id: String(new Date()),
        },
      ];
    }
    if (type === NcmazFcUserReactionPostUpdateResuiltEnum.Removed) {
      // neu type === Remove -> xoa khoi list binh thuong
      newViewerReactionPosts = (viewerReactionPosts || []).filter(
        (post) => !post.title?.includes(`${postDatabseId},SAVE`)
      );
    }
    if (type === NcmazFcUserReactionPostUpdateResuiltEnum.Error) {
      // neu type === Error -> kiem tra xem hanh dong nay la dang remove hay add,
      // vi la Error nen se phai thuc hien nguoc lai voi hanh dong truoc do, vi truoc do da thuc hien dispatch tam 1 lan len redux roi
      // neu la remove -> them lai vao list.
      if (number === NcmazFcUserReactionPostNumberUpdateEnum.Remove_1) {
        newViewerReactionPosts = [
          ...(viewerReactionPosts || []),
          {
            title: `${postDatabseId},SAVE`,
            id: String(new Date()),
          },
        ];
      }
      // Neu la add -> xoa khoi list
      if (number === NcmazFcUserReactionPostNumberUpdateEnum.Add_1) {
        newViewerReactionPosts = (viewerReactionPosts || []).filter(
          (post) => !post.title?.includes(`${postDatabseId},SAVE`)
        );
      }
    }

    dispatch(updateViewerAllReactionPosts(newViewerReactionPosts));
  };
  //

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

  // check is bookmarked
  const isBookmarked = useMemo(() => {
    if (!viewer?.databaseId || !viewerReactionPosts?.length) {
      return localSavedPostsList.includes(postDatabseId);
    }

    // for user logged in
    return viewerReactionPosts.some((post) =>
      post.title?.includes(`${postDatabseId},SAVE`)
    );
  }, [viewer, viewerReactionPosts, localSavedPostsList]);

  const handleClickSaveAction = () => {
    if (!isReady) {
      toast.error("Please wait a moment! We are preparing data for you.");
      return;
    }

    if (!viewer?.databaseId) {
      // if user not logged in => update local saved list
      dispatch(updateLocalPostsSavedList(postDatabseId));
      return;
    }

    // unSaved list for user logged in
    // if (isBookmarked) {
    //   dispatch(addViewerUnSavedPostsList(postDatabseId));
    // }

    // dispatch pre update viewer reaction posts -> when prepare update to server. Will have a update again when have result from server
    handleDispatchUpdateViewerReactionPosts(
      postDatabseId,
      isBookmarked
        ? NcmazFcUserReactionPostUpdateResuiltEnum.Removed
        : NcmazFcUserReactionPostUpdateResuiltEnum.Added
    );

    // update server
    handleUpdateReactionCount({
      variables: {
        post_id: postDatabseId,
        user_id: viewer.databaseId,
        reaction: NcmazFcUserReactionPostActionEnum.Save,
        number: isBookmarked
          ? NcmazFcUserReactionPostNumberUpdateEnum.Remove_1
          : NcmazFcUserReactionPostNumberUpdateEnum.Add_1,
      },
    });
  };

  return (
    <button
      className={`nc-NcBookmark relative rounded-full flex items-center justify-center ${containerClassName}`}
      title={isBookmarked ? "Remove from saved list" : "Save to reading list"}
      onClick={handleClickSaveAction}
    >
      <svg
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        fill={isBookmarked ? "currentColor" : "none"}
        stroke={"currentColor"}
        className="w-[18px] h-[18px] z-[1]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
        />
      </svg>

      <span
        className={`absolute inset-0 rounded-full ${
          isBookmarked ? "bg-neutral-100 dark:bg-neutral-800" : ""
        }`}
      ></span>
    </button>
  );
};

export default NcBookmark;
