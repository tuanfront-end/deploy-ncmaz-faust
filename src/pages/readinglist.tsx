import { gql } from "@/__generated__";
import {
  GetReadingListPageQuery,
  NcgeneralSettingsFieldsFragmentFragment,
} from "../__generated__/graphql";
import { FaustPage, getNextStaticProps, useAuth } from "@faustwp/core";
import { GetStaticPropsContext } from "next";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Empty from "@/components/Empty";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Card3 from "@/components/Card3/Card3";
import updatePostFromUpdateQuery from "@/utils/updatePostFromUpdateQuery";
import Card3Skeleton from "@/components/Card3/Card3Skeleton";
import { QUERY_GET_POSTS_BY } from "@/fragments/queries";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import PageLayout from "@/container/PageLayout";
import Heading from "@/components/Heading/Heading";
import { PostDataFragmentType } from "@/data/types";
import errorHandling from "@/utils/errorHandling";
import GraphqlError from "@/components/GraphqlError";

//

const Page: FaustPage<GetReadingListPageQuery> = (props) => {
  // START ----------
  const { isAuthenticated, isReady } = useAuth();
  const [refetchTimes, setRefetchTimes] = useState(0);

  // useLazyQuery get reading list posts
  const [queryGetPostsByPostIn, getPostsByPostInResult] = useLazyQuery(
    QUERY_GET_POSTS_BY,
    {
      notifyOnNetworkStatusChange: true,
      context: { fetchOptions: { method: "GET" } },
      variables: {
        first: 20,
      },
      onError: (error) => {
        if (refetchTimes > 3) {
          errorHandling(error);
          return;
        }
        setRefetchTimes(refetchTimes + 1);
        getPostsByPostInResult.refetch();
      },
    }
  );

  const { viewer, viewerReactionPosts } = useSelector(
    (state: RootState) => state.viewer
  );
  const localSavedPostsList = useSelector(
    (state: RootState) => state.localPostsSavedList.localSavedPosts
  );

  // goi 1 lan duy nhat -
  useEffect(() => {
    if (getPostsByPostInResult.called || !isReady) {
      return;
    }

    // user da dang nhap nhung chua co reaction posts
    if (isAuthenticated && !viewerReactionPosts?.length) {
      return;
    }

    // user chua dang nhap va chua co localSavedPostsList
    if (isAuthenticated === false && !localSavedPostsList?.length) {
      return;
    }

    let ids: string[] | number[] = [];

    // phan nay danh cho user da dang nhap
    if (viewerReactionPosts?.length) {
      ids = viewerReactionPosts.map((item) =>
        (item.title || "").split(",")[0].trim()
      );
    }

    // phan nay danh cho user chua dang nhap
    if (isAuthenticated === false && !!localSavedPostsList?.length) {
      ids = localSavedPostsList;
    }

    if (!ids.length) {
      return;
    }

    queryGetPostsByPostIn({
      variables: {
        in: ids.map((id) => String(id)),
        after: null,
      },
    });
  }, [
    localSavedPostsList,
    viewer?.databaseId,
    getPostsByPostInResult.called,
    viewerReactionPosts,
    isReady,
    isAuthenticated,
  ]);

  //
  const handleClickLoadmore = () => {
    getPostsByPostInResult.fetchMore({
      variables: {
        after: getPostsByPostInResult.data?.posts?.pageInfo?.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        return updatePostFromUpdateQuery(prev, fetchMoreResult);
      },
    });
  };

  // posts and render
  let hasNextPage = false;
  let loading = false;
  let currentPosts: PostDataFragmentType[] = [];

  loading =
    getPostsByPostInResult.loading ||
    !isReady ||
    (!!isAuthenticated && !viewer?.databaseId);

  hasNextPage = !!getPostsByPostInResult.data?.posts?.pageInfo?.hasNextPage;
  currentPosts =
    (getPostsByPostInResult.data?.posts?.nodes as PostDataFragmentType[]) || [];

  // phan nay danh cho user da dang nhap
  if (!!isAuthenticated) {
    currentPosts = currentPosts.filter((post) => {
      return viewerReactionPosts?.some((item) => {
        return item.title?.includes(post.databaseId + ",SAVE");
      });
    });
  }

  // phan nay danh cho user chua dang nhap
  if (isAuthenticated === false) {
    currentPosts = currentPosts.filter((post) => {
      return localSavedPostsList?.some((item) => {
        return item === post.databaseId;
      });
    });
  }

  const renderContent = () => {
    if (!currentPosts.length) {
      // fisrt time skeleton loading
      if (loading) {
        return (
          <div className="grid sm:grid-cols-1 gap-6 md:gap-8 mt-8 lg:mt-10">
            {[1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
              <Card3Skeleton key={i} />
            ))}
          </div>
        );
      }

      // loading done and not have any posts
      return <Empty />;
    }

    // render posts
    return (
      <div className="grid sm:grid-cols-1 gap-6 md:gap-8 mt-8 lg:mt-10">
        {currentPosts.map((post) => (
          <Card3 key={post.databaseId} post={post} />
        ))}
      </div>
    );
  };

  return (
    <>
      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={props.data?.footerMenuItems?.nodes || []}
        pageFeaturedImageUrl={null}
        pageTitle={"Reading list"}
        generalSettings={
          props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
        }
      >
        <div className="container py-20">
          <main className="mx-auto max-w-4xl">
            <Heading desc="Let's read and save your favorite articles here ! 📚">
              Reading list
            </Heading>
            <div className="my-10 border-t border-neutral-100 dark:border-neutral-700"></div>

            {/* ERRR */}
            {!!getPostsByPostInResult.error && (
              <GraphqlError
                error={getPostsByPostInResult.error}
                hasRefetchBtn
                refetch={getPostsByPostInResult.refetch}
                loading={loading}
              />
            )}

            {/* CONTENT */}
            {renderContent()}

            {/* PAGINATION */}
            {hasNextPage ? (
              <div className="mt-12 lg:mt-16 flex justify-center">
                <ButtonPrimary loading={loading} onClick={handleClickLoadmore}>
                  Show me more
                </ButtonPrimary>
              </div>
            ) : null}
          </main>
        </div>
      </PageLayout>
    </>
  );
};

Page.variables = () => {
  return {
    headerLocation: PRIMARY_LOCATION,
    footerLocation: FOOTER_LOCATION,
  };
};

// Note***: tat ca cac query trong cac page deu phai co generalSettings, no duoc su dung o compoent Wrap
Page.query = gql(`
  query GetReadingListPage($headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
    # common query for all page 
    generalSettings {
      ...NcgeneralSettingsFieldsFragment
    }
    primaryMenuItems: menuItems(where: { location:  $headerLocation  }, first: 80) {
      nodes {
        ...NcPrimaryMenuFieldsFragment
      }
    }
    footerMenuItems: menuItems(where: { location:  $footerLocation  }, first: 50) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
  }
`);

export function getStaticProps(ctx: GetStaticPropsContext) {
  return getNextStaticProps(ctx, {
    Page,
    revalidate: 900,
  });
}

export default Page;
