"use client";

import React, { FC, useEffect } from "react";
import twFocusClass from "@/utils/twFocusClass";
import NcDropDown, { NcDropDownItem } from "@/components/NcDropDown/NcDropDown";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FragmentType, gql } from "@/__generated__";
import { NC_POST_CARD_FRAGMENT, NC_POST_FULL_FRAGMENT } from "@/fragments";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import { getApolloAuthClient } from "@faustwp/core";
import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { PostStatusEnum } from "@/__generated__/graphql";
import { IS_CHISNGHIAX_DEMO_SITE } from "@/contains/site-settings";
import errorHandling from "@/utils/errorHandling";

export type TPostActionId =
  | "copylink"
  | "commentThisPost"
  | "editPost"
  | "moveToTrash"
  | "publishPost"
  | "moveToPending";

export interface TPostActionitem extends NcDropDownItem<TPostActionId> {}

export const POST_MORE_ACTIONS: TPostActionitem[] = [
  {
    id: "copylink",
    name: "Copy link",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
  </svg>`,
  },
  {
    id: "commentThisPost",
    name: "Comment this post",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
  </svg>`,
  },
  {
    id: "editPost",
    name: "Edit post",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>`,
  },
  {
    id: "publishPost",
    name: "Publish post",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>`,
  },
  {
    id: "moveToPending",
    name: "Move to Pending",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
  </svg>
  `,
  },
  {
    id: "moveToTrash",
    name: "Move to trash",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>`,
  },
];

export interface Props {
  containerClassName?: string;
  iconClass?: string;
  dropdownPositon?: "up" | "down";
  post:
    | FragmentType<typeof NC_POST_FULL_FRAGMENT>
    | FragmentType<typeof NC_POST_CARD_FRAGMENT>;
  isSingle?: boolean;
}

const PostActionDropdown: FC<Props> = ({
  containerClassName = "h-8 w-8 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700",
  iconClass = "h-5 w-5",
  dropdownPositon = "down",
  post,
  isSingle = false,
}) => {
  const { databaseId, uri, author, status, commentStatus } =
    getPostDataFromPostFragment(post || {});
  //
  const router = useRouter();
  const client = getApolloAuthClient();
  const { viewer } = useSelector((state: RootState) => state.viewer);
  //

  const [
    mutationUpdatePostToPublishOrPendingOrTrash,
    { called, loading, data, error },
  ] = useMutation(
    gql(`mutation myMutationUpdatePostToPublishOrPending($id: ID = "", $status: PostStatusEnum ) {
      updatePost(input: {id: $id, status: $status}) {
        clientMutationId
      }
    }`),
    {
      client,
      onCompleted: (data) => {
        toast.dismiss();
        toast.success("Post updated");
        router.push("/");
      },
      onError: (error) => {
        toast.dismiss();
        errorHandling(error);
      },
    }
  );
  //
  useEffect(() => {
    if (loading) {
      toast.loading("Updating post...");
    }
  }, [loading]);

  //
  const IS_AUTHOR = viewer?.databaseId === author?.databaseId;
  let HAS_PERMISSION_EDIT =
    IS_AUTHOR && viewer?.capabilities?.includes("edit_posts");
  let HAS_PERMISSION_PUBLISH =
    IS_AUTHOR && viewer?.capabilities?.includes("publish_posts");
  let HAS_PERMISSION_DELETE =
    IS_AUTHOR && viewer?.capabilities?.includes("delete_posts");
  if (
    viewer?.roles?.edges?.some(
      (role) =>
        role?.node?.name === "administrator" || role?.node?.name === "editor"
    )
  ) {
    HAS_PERMISSION_EDIT = true;
    HAS_PERMISSION_PUBLISH = true;
    HAS_PERMISSION_DELETE = true;
  }

  let POST_MORE_ACTIONS_FACT: TPostActionitem[] = [...POST_MORE_ACTIONS];

  if (!isSingle) {
    POST_MORE_ACTIONS_FACT = POST_MORE_ACTIONS_FACT.map((item) => {
      if (item.id === "commentThisPost") {
        return { ...item, href: uri + "#comment" };
      }
      return item;
    });
  }

  if (commentStatus !== "open") {
    POST_MORE_ACTIONS_FACT = POST_MORE_ACTIONS_FACT.filter(
      (item) => item.id !== "commentThisPost"
    );
  }

  if (status === "pending") {
    POST_MORE_ACTIONS_FACT = POST_MORE_ACTIONS_FACT.filter(
      (item) => item.id !== "moveToPending"
    );
  }
  if (status === "publish") {
    POST_MORE_ACTIONS_FACT = POST_MORE_ACTIONS_FACT.filter(
      (item) => item.id !== "publishPost"
    );
  }
  if (status === "trash") {
    POST_MORE_ACTIONS_FACT = POST_MORE_ACTIONS_FACT.filter(
      (item) => item.id !== "moveToTrash"
    );
  }
  //
  if (!HAS_PERMISSION_EDIT) {
    POST_MORE_ACTIONS_FACT = POST_MORE_ACTIONS_FACT.filter(
      (item) => item.id !== "editPost" && item.id !== "moveToPending"
    );
  }
  if (!HAS_PERMISSION_PUBLISH) {
    POST_MORE_ACTIONS_FACT = POST_MORE_ACTIONS_FACT.filter(
      (item) => item.id !== "publishPost"
    );
  }
  if (!HAS_PERMISSION_DELETE) {
    POST_MORE_ACTIONS_FACT = POST_MORE_ACTIONS_FACT.filter(
      (item) => item.id !== "moveToTrash"
    );
  }

  //

  const hanldeClickDropDown = (item: TPostActionitem) => {
    if (item.id === "copylink") {
      navigator.clipboard.writeText(window.location.origin + uri || "");
      toast.success("Link copied to clipboard");
      return;
    }

    if (loading) {
      toast.loading("Updating post, please wait!");
      return;
    }
    //

    if (item.id === "commentThisPost") {
      if (isSingle) {
        document.getElementById("nc-single-comment")?.scrollIntoView();
      }
      return;
    }

    if (item.id === "editPost") {
      return;
    }

    if (item.id === "publishPost") {
      // for demo site, please remove this code on your site
      if (IS_CHISNGHIAX_DEMO_SITE) {
        toast.error("Sorry, this feature is disabled on the demo site!");
        return;
      }

      mutationUpdatePostToPublishOrPendingOrTrash({
        variables: {
          id: databaseId.toString(),
          status: PostStatusEnum.Publish,
        },
      });
      return;
    }

    if (item.id === "moveToPending") {
      // for demo site, please remove this code on your site
      if (IS_CHISNGHIAX_DEMO_SITE) {
        toast.error("Sorry, this feature is disabled on the demo site!");
        return;
      }

      mutationUpdatePostToPublishOrPendingOrTrash({
        variables: {
          id: databaseId.toString(),
          status: PostStatusEnum.Pending,
        },
      });
      return;
    }

    if (item.id === "moveToTrash") {
      // for demo site, please remove this code on your site
      if (IS_CHISNGHIAX_DEMO_SITE) {
        toast.error("Sorry, this feature is disabled on the demo site!");
        return;
      }

      mutationUpdatePostToPublishOrPendingOrTrash({
        variables: {
          id: databaseId.toString(),
          status: PostStatusEnum.Trash,
        },
      });
      return;
    }

    return;
  };

  const renderMenu = () => {
    return (
      <NcDropDown
        className={`text-neutral-500 dark:text-neutral-400 flex items-center justify-center rounded-full ${containerClassName} ${twFocusClass()}`}
        triggerIconClass={iconClass}
        data={POST_MORE_ACTIONS_FACT.map((item) =>
          item.id === "editPost"
            ? { ...item, href: "/edit/" + databaseId }
            : item
        )}
        panelMenusClass={
          dropdownPositon === "up" ? "origin-bottom-right -bottom-1" : undefined
        }
        onClick={hanldeClickDropDown}
      />
    );
  };

  return <div>{renderMenu()}</div>;
};

export default PostActionDropdown;
