import { gql, useLazyQuery } from "@apollo/client";
import { NcmazFaustBlockMagazineFragmentFragment } from "../__generated__/graphql";
import { WordPressBlock } from "@faustwp/blocks";
import { FragmentType } from "@/__generated__";
import { NC_POST_CARD_FRAGMENT } from "@/fragments";
import Alert from "@/components/Alert";
import Empty from "@/components/Empty";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import { QUERY_GET_POSTS_BY } from "@/fragments/queries";
import updatePostFromUpdateQuery from "@/utils/updatePostFromUpdateQuery";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import { TPostCard } from "@/components/Card2/Card2";
import SectionHero3 from "@/components/Sections/SectionHero3";
import dynamic from "next/dynamic";
import useGetPostsNcmazMetaByIds from "@/hooks/useGetPostsNcmazMetaByIds";
import SectionMagazine5 from "../components/Sections/SectionMagazine5";
import SectionMagazine8 from "../components/Sections/SectionMagazine8";
import SectionMagazine2 from "../components/Sections/SectionMagazine2";
import SectionMagazine6 from "../components/Sections/SectionMagazine6";
import errorHandling from "@/utils/errorHandling";

const DynamicSectionMagazine1 = dynamic(
  () => import("../components/Sections/SectionMagazine1")
);
const DynamicSectionMagazine3 = dynamic(
  () => import("../components/Sections/SectionMagazine3")
);
const DynamicSectionMagazine4 = dynamic(
  () => import("../components/Sections/SectionMagazine4")
);
const DynamicSectionMagazine7 = dynamic(
  () => import("../components/Sections/SectionMagazine7")
);
const DynamicSectionMagazine8 = dynamic(
  () => import("../components/Sections/SectionMagazine8")
);
const DynamicSectionMagazine9 = dynamic(
  () => import("../components/Sections/SectionMagazine9")
);
const DynamicSectionMagazine10 = dynamic(
  () => import("../components/Sections/SectionMagazine10")
);
const DynamicSectionMagazine11 = dynamic(
  () => import("../components/Sections/SectionMagazine11")
);
const DynamicSectionGridPosts = dynamic(
  () => import("../components/Sections/SectionGridPosts")
);
const DynamicSectionSliderPosts = dynamic(
  () => import("../components/Sections/SectionSliderPosts")
);
const DynamicSectionLargeSlider = dynamic(
  () => import("../components/Sections/SectionLargeSlider")
);
//

const NcmazFaustBlockMagazine: WordPressBlock<
  NcmazFaustBlockMagazineFragmentFragment & {
    renderedHtml?: string;
    clientId?: string;
    parentClientId?: string;
  }
> = (props) => {
  const { blockVariation, hasBackground } = props.attributes || {};

  const [queryGetPostByVariablesFromSSR, getPostByVariablesFromSSRResult] =
    useLazyQuery(QUERY_GET_POSTS_BY, {
      notifyOnNetworkStatusChange: true,
      context: { fetchOptions: { method: "GET" } },
      onError: (error) => {
        errorHandling(error);
      },
    });

  if (!props.renderedHtml) {
    return null;
  }

  const renderedHtmlNode = document.createElement("div");
  renderedHtmlNode.innerHTML = props.renderedHtml;

  const contentNode = renderedHtmlNode.querySelector(
    ".ncmazfc-block-content-common-class"
  );

  const dataInitPosts: FragmentType<typeof NC_POST_CARD_FRAGMENT>[] =
    JSON.parse(contentNode?.getAttribute("data-ncmazfc-init-posts") || "null");
  const dataInitErrors = JSON.parse(
    contentNode?.getAttribute("data-ncmazfc-init-errors") || "null"
  );
  const dataInitQueryVariable = JSON.parse(
    contentNode?.getAttribute("data-ncmazfc-init-query-variables") || "null"
  );
  const dataInitPageInfo: {
    endCursor: string;
    hasNextPage: boolean;
  } | null = JSON.parse(
    contentNode?.getAttribute("data-ncmazfc-init-data-page-info") || "null"
  );

  //
  const {} = useGetPostsNcmazMetaByIds({
    posts: dataInitPosts as TPostCard[],
  });
  //

  const handleClickLoadmore = () => {
    if (dataInitPageInfo?.hasNextPage !== true) {
      return;
    }

    if (!getPostByVariablesFromSSRResult.called) {
      queryGetPostByVariablesFromSSR({
        variables: {
          ...(dataInitQueryVariable || {}),
          after: dataInitPageInfo?.endCursor,
        },
      });
      return;
    }

    getPostByVariablesFromSSRResult.fetchMore({
      variables: {
        ...(dataInitQueryVariable || {}),
        after: getPostByVariablesFromSSRResult.data?.posts?.pageInfo?.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        return updatePostFromUpdateQuery(prev, fetchMoreResult);
      },
    });
  };

  const renderLayoutType = () => {
    if (!!dataInitErrors && !!dataInitErrors.length) {
      return (
        <Alert type="error">
          {JSON.stringify(
            dataInitErrors?.[0]?.debugMessage || dataInitErrors?.[0]?.message
          )}
        </Alert>
      );
    }

    if (!dataInitPosts || !dataInitPosts?.length) {
      return <Empty />;
    }

    let dataLists = [
      ...dataInitPosts,
      ...(getPostByVariablesFromSSRResult.data?.posts?.nodes || []),
    ] as TPostCard[];

    switch (blockVariation) {
      case "magazine-1":
        return <DynamicSectionMagazine1 posts={dataLists} />;
      case "magazine-2":
        return <SectionMagazine2 posts={dataLists} />;
      case "magazine-3":
        return <DynamicSectionMagazine3 posts={dataLists} />;
      case "magazine-4":
        return <DynamicSectionMagazine4 posts={dataLists} />;
      case "magazine-5":
        return <SectionMagazine5 posts={dataLists} />;
      case "magazine-6":
        return <SectionMagazine6 posts={dataLists} />;
      case "magazine-7":
        return <DynamicSectionMagazine7 posts={dataLists} />;
      case "magazine-8":
        return <SectionMagazine8 posts={dataLists} />;
      case "magazine-9":
        return <DynamicSectionMagazine9 posts={dataLists} />;
      case "magazine-10":
        return <DynamicSectionMagazine10 posts={dataLists} />;
      case "magazine-11":
        return <DynamicSectionMagazine11 posts={dataLists} />;
      case "magazine-12":
        return <DynamicSectionLargeSlider posts={dataLists} />;
      case "magazine-13":
        return <SectionHero3 posts={dataLists} />;

      // Grids
      case "grid-1":
        return (
          <DynamicSectionGridPosts
            gridClass="sm:grid-cols-2 md:gap-8 lg:gap-10"
            posts={dataLists}
            postCardName="card3"
          />
        );
      case "grid-2":
        return (
          <DynamicSectionGridPosts posts={dataLists} postCardName="card4" />
        );
      case "grid-3":
        return (
          <DynamicSectionGridPosts posts={dataLists} postCardName="card7" />
        );
      case "grid-4":
        return (
          <DynamicSectionGridPosts posts={dataLists} postCardName="card9" />
        );
      case "grid-5":
        return (
          <DynamicSectionGridPosts posts={dataLists} postCardName="card10" />
        );
      case "grid-6":
        return (
          <DynamicSectionGridPosts
            gridClass="md:grid-cols-2 lg:grid-cols-3"
            posts={dataLists}
            postCardName="card10V2"
          />
        );
      case "grid-7":
        return (
          <DynamicSectionGridPosts posts={dataLists} postCardName="card11" />
        );
      case "grid-8":
        return (
          <DynamicSectionGridPosts
            gridClass="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:!gap-6"
            posts={dataLists}
            postCardName="card14"
          />
        );
      case "grid-9":
        return (
          <DynamicSectionGridPosts
            gridClass="md:grid-cols-2 xl:grid-cols-3 !gap-6"
            posts={dataLists}
            postCardName="card15Podcast"
          />
        );

      // Slider
      case "slider-1":
        return (
          <DynamicSectionSliderPosts posts={dataLists} postCardName="card4" />
        );
      case "slider-2":
        return (
          <DynamicSectionSliderPosts posts={dataLists} postCardName="card7" />
        );
      case "slider-3":
        return (
          <DynamicSectionSliderPosts posts={dataLists} postCardName="card9" />
        );
      case "slider-4":
        return (
          <DynamicSectionSliderPosts posts={dataLists} postCardName="card10" />
        );
      case "slider-5":
        return (
          <DynamicSectionSliderPosts
            perView={3}
            posts={dataLists}
            postCardName="card10V2"
          />
        );
      case "slider-6":
        return (
          <DynamicSectionSliderPosts posts={dataLists} postCardName="card11" />
        );

      default:
        return <DynamicSectionMagazine9 posts={dataLists} />;
    }
  };

  return (
    <div className={`relative not-prose ${hasBackground ? "py-16" : ""}`}>
      {hasBackground ? <BackgroundSection /> : null}
      {renderLayoutType()}
      {dataInitPageInfo?.hasNextPage === true && (
        <div className="flex mt-12 sm:mt-16 2xl:mt-20 justify-center items-center">
          <ButtonPrimary
            loading={getPostByVariablesFromSSRResult.loading}
            onClick={handleClickLoadmore}
          >
            Show me more
          </ButtonPrimary>
        </div>
      )}
    </div>
  );
};

export const NcmazFaustBlockMagazineFragments = {
  entry: gql`
    fragment NcmazFaustBlockMagazineFragment on NcmazFaustBlockMagazine {
      attributes {
        blockVariation
        className
        hasBackground
      }
    }
  `,
  key: `NcmazFaustBlockMagazineFragment`,
};

NcmazFaustBlockMagazine.displayName = "NcmazFaustBlockMagazine";
export default NcmazFaustBlockMagazine;
