import { GetStaticPropsContext } from "next";
import { FaustPage, getNextStaticProps } from "@faustwp/core";
import { gql, useFragment } from "@/__generated__";
import {
  GetAuthorWithPostsQuery,
  NcgeneralSettingsFieldsFragmentFragment,
} from "@/__generated__/graphql";
import { GET_POSTS_FIRST_COMMON } from "@/contains/contants";
import React from "react";
import ArchiveFilterListBox from "@/components/ArchiveFilterListBox/ArchiveFilterListBox";
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2";
import SectionTrendingTopic from "@/components/SectionTrendingTopic";
import { FILTERS_OPTIONS } from "@/contains/contants";
import useHandleGetPostsArchivePage from "@/hooks/useHandleGetPostsArchivePage";
import { NC_USER_FULL_FIELDS_FRAGMENT } from "@/fragments";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import PageLayout from "@/container/PageLayout";
import { getImageDataFromImageFragment } from "@/utils/getImageDataFromImageFragment";
import { PostDataFragmentType } from "@/data/types";
import GridPostsArchive from "@/components/GridPostsArchive";
import useGetPostsNcmazMetaByIds from "@/hooks/useGetPostsNcmazMetaByIds";
import { TPostCard } from "@/components/Card2/Card2";
import { TCategoryCardFull } from "@/components/CardCategory1/CardCategory1";
import AuthorLayout from "@/container/AuthorPageLayout";
import Tab from "@/container/AuthorPageTab";

const FILTERS = FILTERS_OPTIONS;

const Page: FaustPage<GetAuthorWithPostsQuery> = (props) => {
  const { user } = props.data || {};

  const posts = user?.posts;
  const { databaseId, id, name, ncUserMeta } = useFragment(
    NC_USER_FULL_FIELDS_FRAGMENT,
    user || {}
  );
  const _top10Categories =
    (props.data?.categories?.nodes as TCategoryCardFull[]) || [];

  //
  const {} = useGetPostsNcmazMetaByIds({
    posts: (posts?.nodes || []) as TPostCard[],
  });
  //

  const {
    currentPosts,
    handleChangeFilterPosts,
    handleClickShowMore,
    hasNextPage,
    loading,
  } = useHandleGetPostsArchivePage({
    initPosts: (posts?.nodes as PostDataFragmentType[]) || [],
    initPostsPageInfo: posts?.pageInfo || null,
    authorDatabaseId: databaseId,
  });

  return (
    <>
      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={props.data?.footerMenuItems?.nodes || []}
        pageFeaturedImageUrl={
          getImageDataFromImageFragment(ncUserMeta?.featuredImage?.node)
            ?.sourceUrl || null
        }
        pageTitle={name}
        generalSettings={
          props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
        }
      >
        <AuthorLayout user={user || {}}>
          <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
            <main>
              {/* TABS FILTER */}
              <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row sm:border-b border-neutral-200 dark:border-neutral-600">
                <Tab currentTab="" />

                <div className="block mb-4 border-b w-full border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
                <div className="flex justify-end">
                  <ArchiveFilterListBox
                    lists={FILTERS}
                    onChange={handleChangeFilterPosts}
                  />
                </div>
              </div>

              <GridPostsArchive
                posts={currentPosts}
                loading={loading}
                showLoadmore={hasNextPage}
                onClickLoadmore={handleClickShowMore}
              />
            </main>

            {/* === SECTION 5 === */}
            <SectionTrendingTopic categories={_top10Categories} />

            {/* SUBCRIBES */}
            <SectionSubscribe2 />
          </div>
        </AuthorLayout>
      </PageLayout>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
export function getStaticProps(ctx: GetStaticPropsContext) {
  return getNextStaticProps(ctx, {
    Page,
    revalidate: 900,
  });
}

Page.variables = ({ params }) => {
  return {
    id: params?.slug,
    first: GET_POSTS_FIRST_COMMON,
    headerLocation: PRIMARY_LOCATION,
    footerLocation: FOOTER_LOCATION,
  };
};

Page.query = gql(`
  query GetAuthorWithPosts($id: ID!, $first: Int, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
    user(id: $id, idType: SLUG) {
      ...NcmazFcUserFullFields
      posts(first:  $first, where: {orderby: {field: DATE, order: DESC}}) {
        nodes {
          ...NcmazFcPostCardFields
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
    categories(first:10, where: { orderby: COUNT, order: DESC }) {
      nodes {
        ...NcmazFcCategoryFullFieldsFragment
      }
    }
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
    # end common query for all page
  }
`);

export default Page;
