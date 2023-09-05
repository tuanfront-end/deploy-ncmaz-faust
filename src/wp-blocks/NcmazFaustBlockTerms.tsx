import { gql } from "@apollo/client";
import { NcmazFaustBlockTermsFragmentFragment } from "../__generated__/graphql";
import { WordPressBlock } from "@faustwp/blocks";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import Empty from "@/components/Empty";
import Error from "@/components/Error";
import { TCategoryCardFull } from "@/components/CardCategory1/CardCategory1";
import dynamic from "next/dynamic";

const DynamicSectionGridCategoryBox = dynamic(
  () => import("../components/SectionGridCategoryBox/SectionGridCategoryBox")
);

const DynamicSectionSliderNewCategories = dynamic(
  () =>
    import(
      "../components/SectionSliderNewCategories/SectionSliderNewCategories"
    )
);

const NcmazFaustBlockTerms: WordPressBlock<
  NcmazFaustBlockTermsFragmentFragment & {
    renderedHtml?: string;
    clientId?: string;
    parentClientId?: string;
  }
> = (props) => {
  const { blockVariation, hasBackground } = props.attributes || {};

  const renderLayoutType = () => {
    if (!props.renderedHtml) {
      return null;
    }

    const renderedHtmlNode = document.createElement("div");
    renderedHtmlNode.innerHTML = props.renderedHtml;

    const contentNode = renderedHtmlNode.querySelector(
      ".ncmazfc-block-content-common-class"
    );

    const dataInitTerms: TCategoryCardFull[] = JSON.parse(
      contentNode?.getAttribute("data-ncmazfc-init-terms") || "null"
    );
    const dataInitErrors = JSON.parse(
      contentNode?.getAttribute("data-ncmazfc-init-errors") || "null"
    );

    if (!!dataInitErrors && !!dataInitErrors?.errors) {
      return <Error error={dataInitErrors?.errors} />;
    }

    if (!dataInitTerms || !dataInitTerms?.length) {
      return <Empty />;
    }

    const dataLists = dataInitTerms;

    switch (blockVariation) {
      case "grid-1":
        return (
          <DynamicSectionGridCategoryBox
            categories={dataLists}
            categoryCardType="card1"
          />
        );
      case "grid-2":
        return (
          <DynamicSectionGridCategoryBox
            categories={dataLists}
            categoryCardType="card2"
          />
        );
      case "grid-3":
        return (
          <DynamicSectionGridCategoryBox
            categories={dataLists}
            categoryCardType="card3"
          />
        );
      case "grid-4":
        return (
          <DynamicSectionGridCategoryBox
            categories={dataLists}
            categoryCardType="card4"
          />
        );
      case "grid-5":
        return (
          <DynamicSectionGridCategoryBox
            categories={dataLists}
            categoryCardType="card5"
          />
        );
      //
      case "slider-1":
        return (
          <DynamicSectionSliderNewCategories
            categories={dataLists}
            categoryCardType="card1"
          />
        );
      case "slider-2":
        return (
          <DynamicSectionSliderNewCategories
            categories={dataLists}
            categoryCardType="card2"
          />
        );
      case "slider-3":
        return (
          <DynamicSectionSliderNewCategories
            categories={dataLists}
            categoryCardType="card3"
          />
        );
      case "slider-4":
        return (
          <DynamicSectionSliderNewCategories
            categories={dataLists}
            categoryCardType="card4"
          />
        );
      case "slider-5":
        return (
          <DynamicSectionSliderNewCategories
            categories={dataLists}
            categoryCardType="card5"
            itemPerRow={4}
          />
        );

      default:
        return (
          <DynamicSectionSliderNewCategories
            categoryCardType="card4"
            categories={dataLists}
          />
        );
    }
  };

  return (
    <div className={`relative not-prose ${hasBackground ? "py-16" : ""}`}>
      {hasBackground ? <BackgroundSection /> : null}
      {renderLayoutType()}
    </div>
  );
};

export const NcmazFaustBlockTermsFragments = {
  entry: gql`
    fragment NcmazFaustBlockTermsFragment on NcmazFaustBlockTerms {
      attributes {
        blockVariation
        hasBackground
      }
    }
  `,
  key: `NcmazFaustBlockTermsFragment`,
};

NcmazFaustBlockTerms.displayName = "NcmazFaustBlockTerms";
export default NcmazFaustBlockTerms;
