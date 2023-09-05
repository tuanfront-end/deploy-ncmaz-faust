import { GetStaticPaths, GetStaticPropsContext } from "next";
import {
  FaustPage,
  getApolloAuthClient,
  getNextStaticProps,
  useAuth,
} from "@faustwp/core";
import { gql } from "@/__generated__";
import { PostStatusEnum } from "@/__generated__/graphql";
import { GET_POSTS_FIRST_COMMON_FOR_DASHBOARD } from "@/contains/contants";
import React, { useEffect } from "react";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import MyImage from "@/components/MyImage";
import ncFormatDate from "@/utils/formatDate";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostActionDropdown from "@/components/PostActionDropdown/PostActionDropdown";
import Badge from "@/components/Badge/Badge";
import CircleLoading from "@/components/Loading/CircleLoading";
import Link from "next/link";
import Empty from "@/components/Empty";
import Error from "@/components/Error";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import errorHandling from "@/utils/errorHandling";
import DashboardLayout, {
  TDashBoardPostTab,
} from "@/container/DashboardLayout";

const Page: FaustPage<{}> = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const client = getApolloAuthClient();
  const currentTab: TDashBoardPostTab =
    (router.query.tab as TDashBoardPostTab) || "published";

  const [refetchTimes, setRefetchTimes] = React.useState(0);

  const [queryGetPostsOfViewer, getPostsOfViewerResult] = useLazyQuery(
    gql(` query ProfilePageGetViewerPostsByStatus($first: Int, $status: PostStatusEnum, $after: String) {
      viewer {
        posts(first:  $first, after:$after, where: {status: $status,orderby: {field: DATE, order: DESC}}) {
          nodes {
            ...NcmazFcPostCardFields
            ncPostMetaData {
              ...NcmazFcPostMetaFullFields
            }
            commentCount
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
  }   
`),
    {
      client,
      variables: {
        first: GET_POSTS_FIRST_COMMON_FOR_DASHBOARD,
      },
      notifyOnNetworkStatusChange: true,
      context: { fetchOptions: { method: "GET" } },
      onError: (error) => {
        if (refetchTimes > 3) {
          errorHandling(error);
        }
        setRefetchTimes(refetchTimes + 1);
        getPostsOfViewerResult.refetch();
      },
    }
  );

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated || !currentTab) {
      return;
    }

    let status: PostStatusEnum = PostStatusEnum.Publish;
    if (currentTab === "published") {
      status = PostStatusEnum.Publish;
    }
    if (currentTab === "draft") {
      status = PostStatusEnum.Draft;
    }
    if (currentTab === "pending") {
      status = PostStatusEnum.Pending;
    }
    if (currentTab === "trash") {
      status = PostStatusEnum.Trash;
    }

    if (currentTab === "schedule") {
      status = PostStatusEnum.Future;
    }

    queryGetPostsOfViewer({
      variables: {
        first: GET_POSTS_FIRST_COMMON_FOR_DASHBOARD,
        status,
      },
    });
  }, [isAuthenticated, currentTab]);
  //
  //

  const handleClickLoadmore = () => {
    getPostsOfViewerResult.fetchMore({
      variables: {
        first: GET_POSTS_FIRST_COMMON_FOR_DASHBOARD,
        after: getPostsOfViewerResult.data?.viewer?.posts?.pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !fetchMoreResult?.viewer?.posts) {
          return prev;
        }

        return {
          ...prev,
          ...fetchMoreResult,
          viewer: {
            ...(prev.viewer || {}),
            ...(fetchMoreResult.viewer || {}),
            posts: {
              ...(prev.viewer?.posts || {}),
              ...(fetchMoreResult.viewer?.posts || {}),
              nodes: [
                ...(prev.viewer?.posts?.nodes || []),
                ...(fetchMoreResult.viewer.posts.nodes || []),
              ],
              pageInfo: fetchMoreResult.viewer.posts.pageInfo,
            },
          },
        };
      },
    });
  };

  const posts = getPostsOfViewerResult.data?.viewer?.posts?.nodes || [];

  const renderContent = () => {
    if (
      (getPostsOfViewerResult.loading && !posts.length) ||
      !getPostsOfViewerResult.called
    ) {
      return <CircleLoading />;
    }

    if (getPostsOfViewerResult.error) {
      return <Error error={getPostsOfViewerResult.error.message} />;
    }

    if (!posts.length) {
      return (
        <Empty className="text-center p-5 ring-1 ring-primary-600/20 rounded-lg" />
      );
    }

    return (
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-neutral-600">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-start text-sm font-normal text-neutral-600 dark:text-neutral-400 sm:pl-0 capitalize"
                >
                  Post
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-start text-sm font-normal text-neutral-600 dark:text-neutral-400"
                >
                  Likes
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-start text-sm font-normal text-neutral-600 dark:text-neutral-400"
                >
                  Categories
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-start text-sm font-normal text-neutral-600 dark:text-neutral-400"
                >
                  Views
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-start text-sm font-normal text-neutral-600 dark:text-neutral-400"
                >
                  Saveds
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-start text-sm font-normal text-neutral-600 dark:text-neutral-400"
                >
                  Comments
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-600">
              {posts.map((item) => {
                const post = getPostDataFromPostFragment(item);
                return (
                  <tr key={post.databaseId}>
                    <td className="whitespace-nowrap py-4 sm:py-5 ps-4 pe-3 text-sm sm:ps-0">
                      <Link href={post.uri} className="flex items-center">
                        <div className="h-12 w-12 sm:h-16 sm:w-16 relative flex-shrink-0">
                          <MyImage
                            src={post.featuredImage?.sourceUrl || ""}
                            alt={post.featuredImage?.altText || ""}
                            className="rounded-md object-cover w-full h-full"
                            fill
                          />
                        </div>
                        <div className="ms-4">
                          <div className="font-medium text-gray-900 dark:text-neutral-200 w-96 max-w-sm flex whitespace-normal">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: post.title || "",
                              }}
                            ></span>
                          </div>
                          <div className="mt-1 text-gray-500">
                            {currentTab === "schedule" ? "Scheduled for " : ""}
                            {ncFormatDate(post.date)}
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <Badge
                        name={post.ncPostMetaData?.likesCount || 0}
                        color="rose"
                        roundedClassName="rounded-md"
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <CategoryBadgeList
                        categories={(post.categories.nodes || []).slice(0, 2)}
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <Badge
                        name={post.ncPostMetaData?.viewsCount || 0}
                        color="slate"
                        roundedClassName="rounded-md"
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <Badge
                        name={post.ncPostMetaData?.savedsCount || 0}
                        color="blue"
                        roundedClassName="rounded-md"
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <Badge
                        name={post.commentCount || 0}
                        color="blue"
                        roundedClassName="rounded-md"
                      />
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <PostActionDropdown
                        containerClassName="h-8 w-8 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-xl"
                        iconClass="h-5 w-5"
                        post={item}
                      />
                    </td>
                  </tr>
                );
              })}

              <tr>
                {getPostsOfViewerResult.data?.viewer?.posts?.pageInfo
                  .hasNextPage && (
                  <td
                    colSpan={7}
                    className="px-3 py-5 text-sm font-medium text-center text-primary-600 dark:text-primary-400"
                  >
                    <ButtonPrimary
                      loading={getPostsOfViewerResult.loading}
                      onClick={handleClickLoadmore}
                    >
                      Load more
                    </ButtonPrimary>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      <DashboardLayout>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-neutral-200 capitalize">
                {currentTab} Posts
              </h1>
              <p className="mt-2 text-sm text-gray-700 dark:text-neutral-400">
                A list of all your posts. Let’s get you some views! 🚀
              </p>
            </div>
          </div>
          <div className="mt-8 flow-root">{renderContent()}</div>
        </div>
      </DashboardLayout>
    </>
  );
};

export function getStaticProps(ctx: GetStaticPropsContext) {
  return getNextStaticProps(ctx, {
    Page,
    revalidate: false,
  });
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      "/dashboard/posts/published",
      "/dashboard/posts/draft",
      "/dashboard/posts/pending",
      "/dashboard/posts/trash",
      "/dashboard/posts/schedule",
    ],
    fallback: "blocking",
  };
};

export default Page;
