import { gql } from "@/__generated__";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { addViewerReactionPosts } from "@/stores/viewer/viewerSlice";
import { GET_USER_REACTION_POSTS_FIRST_COMMON } from "@/contains/contants";
import { getApolloAuthClient, useAuth } from "@faustwp/core";
import { useState } from "react";
import errorHandling from "@/utils/errorHandling";
//

export const GET_ALL_REACTION_POSTS_BY_USER_AND_REACTION = gql(/* GraphQL */ `
  query QueryGetAllReactionPostsByUserAndReaction(
    $search: String = ""
    $first: Int = 400
  ) {
    viewer {
      userReactionPosts(where: { search: $search }, first: $first) {
        nodes {
          id
          title
        }
      }
    }
  }
`);
//

export default function useInitGetAndUpdateViewerReactionPosts() {
  const dispatch = useDispatch();
  const client = getApolloAuthClient();
  const { isAuthenticated } = useAuth();

  const [refetchSavedTimes, setRefetchSavedTimes] = useState(0);
  const [refetchLikedTimes, setRefetchLikedTimes] = useState(0);

  // useLazyQuery get reaction posts of current viewer
  const getSaved = useQuery(GET_ALL_REACTION_POSTS_BY_USER_AND_REACTION, {
    client,
    context: { fetchOptions: { method: "GET" } },
    variables: {
      search: "SAVE",
      first: GET_USER_REACTION_POSTS_FIRST_COMMON,
    },
    skip: !isAuthenticated,
    onCompleted: (data) => {
      const nodes = data?.viewer?.userReactionPosts?.nodes || [];
      dispatch(addViewerReactionPosts(nodes));
    },
    onError: (error) => {
      console.log(1, "🎈 __________get_viewer_saved_error____", error);

      if (refetchSavedTimes > 3) {
        errorHandling(error);
        return;
      }
      setRefetchSavedTimes(refetchSavedTimes + 1);
      getSaved.refetch();
    },
  });

  const getLiked = useQuery(GET_ALL_REACTION_POSTS_BY_USER_AND_REACTION, {
    client,
    context: { fetchOptions: { method: "GET" } },
    variables: {
      search: "LIKE",
      first: GET_USER_REACTION_POSTS_FIRST_COMMON,
    },
    skip: !isAuthenticated,
    onCompleted: (data) => {
      const nodes = data?.viewer?.userReactionPosts?.nodes || [];
      dispatch(addViewerReactionPosts(nodes));
    },
    onError: (error) => {
      console.log(1, "🎈 __________get_viewer_liked_error____", error);
      if (refetchLikedTimes > 3) {
        errorHandling(error);
        return;
      }
      setRefetchLikedTimes(refetchLikedTimes + 1);
      getLiked.refetch();
    },
  });

  return {};
}
