import {
  OrderEnum,
  PostObjectsConnectionOrderbyEnum,
} from "@/__generated__/graphql";
import { FILTERS_OPTIONS, GET_POSTS_FIRST_COMMON } from "@/contains/contants";
import { PostDataFragmentType } from "@/data/types";
import { QUERY_GET_POSTS_BY } from "@/fragments/queries";
import errorHandling from "@/utils/errorHandling";
import updatePostFromUpdateQuery from "@/utils/updatePostFromUpdateQuery";
import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

interface Props {
  initPosts?: PostDataFragmentType[] | null;
  initPostsPageInfo?: {
    endCursor?: string | null | undefined;
    hasNextPage: boolean;
  } | null;
  tagDatabaseId?: number | null;
  categoryDatabaseId?: number | null;
  authorDatabaseId?: number | null;
  categorySlug?: string | null;
  search?: string | null;
}

export default function useHandleGetPostsArchivePage(props: Props) {
  const {
    categoryDatabaseId,
    initPosts: posts,
    initPostsPageInfo,
    tagDatabaseId,
    authorDatabaseId,
    categorySlug,
    search,
  } = props;

  const [filterParam, setfilterParam] =
    useState<`${PostObjectsConnectionOrderbyEnum}/${OrderEnum}`>();

  const [refetchTimes, setRefetchTimes] = useState(0);

  const routerQueryFilter = filterParam;
  const [queryGetPostsByCategoryId, postsByCategoryIdResult] = useLazyQuery(
    QUERY_GET_POSTS_BY,
    {
      variables: {
        categoryId: categoryDatabaseId,
        categoryName: categorySlug,
        tagId: tagDatabaseId?.toString(),
        author: authorDatabaseId,
        search,
        first: GET_POSTS_FIRST_COMMON,
      },
      notifyOnNetworkStatusChange: true,
      context: { fetchOptions: { method: "GET" } },
      onError: (error) => {
        if (refetchTimes > 3) {
          errorHandling(error);
          return;
        }
        setRefetchTimes(refetchTimes + 1);
        postsByCategoryIdResult.refetch();
      },
    }
  );

  function checkRouterQueryFilter() {
    // tra ve false neu khong co filter/ lan dau tien vao trang  / khi chua click vao filter nao
    if (!routerQueryFilter) {
      return false;
    }

    const [field, order] = routerQueryFilter?.split("/");
    return {
      field: field as PostObjectsConnectionOrderbyEnum,
      order: order as OrderEnum,
    };
  }

  // get posts by category id  and by filter
  useEffect(() => {
    if (!routerQueryFilter) {
      return;
    }
    const fiterValue = checkRouterQueryFilter();
    if (!fiterValue) {
      return;
    }

    queryGetPostsByCategoryId({
      variables: {
        first: GET_POSTS_FIRST_COMMON,
        after: "",
        field: fiterValue.field,
        order: fiterValue.order,
      },
    });
  }, [routerQueryFilter]);

  const handleClickShowMore = () => {
    // Articles tab
    if (!postsByCategoryIdResult.called) {
      queryGetPostsByCategoryId({
        variables: {
          after: initPostsPageInfo?.endCursor,
          first: GET_POSTS_FIRST_COMMON,
        },
      });
    } else {
      postsByCategoryIdResult.fetchMore({
        variables: {
          after: postsByCategoryIdResult.data?.posts?.pageInfo?.endCursor,
          first: GET_POSTS_FIRST_COMMON,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          return updatePostFromUpdateQuery(prev, fetchMoreResult);
        },
      });
    }
  };

  const handleChangeFilterPosts = (item: (typeof FILTERS_OPTIONS)[number]) => {
    setfilterParam(item.value);
  };

  //  data for render
  let loading = postsByCategoryIdResult.loading;
  let currentPosts = posts || [];
  let hasNextPage = !!initPostsPageInfo?.hasNextPage;
  currentPosts = [
    ...(!checkRouterQueryFilter() ? posts || [] : []),
    ...((postsByCategoryIdResult.data?.posts
      ?.nodes as PostDataFragmentType[]) || []),
  ];

  // hien thi init posts khi lan dau tien click vao filter mac dinh la DATE/DESC
  if (!currentPosts.length && loading && filterParam === "DATE/DESC") {
    currentPosts = posts || [];
  }

  if (postsByCategoryIdResult.called) {
    hasNextPage =
      !!postsByCategoryIdResult.data?.posts?.pageInfo?.hasNextPage ||
      postsByCategoryIdResult.loading;
  }

  return {
    loading,
    currentPosts,
    hasNextPage,
    handleClickShowMore,
    handleChangeFilterPosts,
  };
}
