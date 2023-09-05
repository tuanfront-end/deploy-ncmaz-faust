import { GetStaticPropsContext } from "next";
import { FaustPage, getNextStaticProps } from "@faustwp/core";
import { gql } from "@/__generated__";
import {
  NcgeneralSettingsFieldsFragmentFragment,
  NcmazFcCategoryFullFieldsFragmentFragment,
  SearchPageQueryGetCategoriesBySearchQuery,
} from "@/__generated__/graphql";
import { GET_CATEGORIES_FIRST_COMMON } from "@/contains/contants";
import React from "react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Empty from "@/components/Empty";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import CardCategory4 from "@/components/CardCategory4/CardCategory4";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import PageLayout from "@/container/PageLayout";
import errorHandling from "@/utils/errorHandling";
import SearchPageLayout from "@/container/SearchPageLayout";

const Page: FaustPage<SearchPageQueryGetCategoriesBySearchQuery> = (props) => {
  const router = useRouter();
  const initCategories = props.data?.categories?.nodes;
  const initPageInfo = props.data?.categories?.pageInfo;
  const search = router.query.search?.[0] || "";

  const [getCategoriesBySearch, getCategoriesBySearchResult] = useLazyQuery(
    gql(` 
      query queryGetCategoriesBySearchOnSearchPage(
        $first: Int
        $search: String = ""
        $after: String
      ) {
        categories(first: $first, after: $after, where: { search: $search}) {
          nodes {
            ...NcmazFcCategoryFullFieldsFragment
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `),
    {
      notifyOnNetworkStatusChange: true,
      context: { fetchOptions: { method: "GET" } },
      variables: {
        search,
        first: GET_CATEGORIES_FIRST_COMMON,
      },
      onError: (error) => {
        errorHandling(error);
      },
    }
  );

  const handleClickShowMore = () => {
    if (!getCategoriesBySearchResult.called) {
      return getCategoriesBySearch({
        variables: {
          search,
          after: initPageInfo?.endCursor,
        },
      });
    }

    getCategoriesBySearchResult.fetchMore({
      variables: {
        search,
        after: getCategoriesBySearchResult.data?.categories?.pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !fetchMoreResult.categories?.nodes) {
          return prev;
        }
        return {
          ...prev,
          categories: {
            ...prev.categories,
            nodes: [
              ...(prev.categories?.nodes || []),
              ...(fetchMoreResult.categories?.nodes || []),
            ],
            pageInfo: fetchMoreResult.categories?.pageInfo,
          },
        };
      },
    });
  };

  // data for render
  let currentCats = (initCategories ||
    []) as NcmazFcCategoryFullFieldsFragmentFragment[];
  let hasNextPage = initPageInfo?.hasNextPage;
  let loading = false;

  if (getCategoriesBySearchResult.called) {
    currentCats = [
      ...(initCategories || []),
      ...(getCategoriesBySearchResult.data?.categories?.nodes || []),
    ] as NcmazFcCategoryFullFieldsFragmentFragment[];

    hasNextPage =
      getCategoriesBySearchResult.loading ||
      getCategoriesBySearchResult.data?.categories?.pageInfo.hasNextPage ||
      false;
    loading = getCategoriesBySearchResult.loading;
  }

  return (
    <PageLayout
      headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
      footerMenuItems={props.data?.footerMenuItems?.nodes || []}
      pageFeaturedImageUrl={null}
      pageTitle={"Search"}
      generalSettings={
        props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
      }
    >
      <SearchPageLayout top10Categories={[]}>
        {/* LOOP ITEMS */}
        {!currentCats.length && !loading ? (
          <Empty />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8 mt-8 lg:mt-12">
            {(currentCats || []).map((cat) => (
              <CardCategory4 key={cat?.databaseId} term={cat || {}} />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {hasNextPage ? (
          <div className="mt-12 lg:mt-14 flex justify-center">
            <ButtonPrimary
              disabled={loading || !currentCats?.length}
              loading={loading}
              onClick={handleClickShowMore}
            >
              Show me more
            </ButtonPrimary>
          </div>
        ) : null}
      </SearchPageLayout>
    </PageLayout>
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
    search: params?.search?.[0] || "",
    first: GET_CATEGORIES_FIRST_COMMON,
    headerLocation: PRIMARY_LOCATION,
    footerLocation: FOOTER_LOCATION,
  };
};

Page.query = gql(`
  query SearchPageQueryGetCategoriesBySearch ( $first: Int,  $search: String = "", $after: String, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum! )  {
    categories (first: $first, after: $after, where: {search: $search, }) {
        nodes {
             ...NcmazFcCategoryFullFieldsFragment
        }
        pageInfo {
          endCursor
          hasNextPage
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
    # end common query
  }
`);

export default Page;
