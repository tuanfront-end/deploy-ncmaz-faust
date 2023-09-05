import React, { FC } from "react";
import BackgroundSection from "./BackgroundSection/BackgroundSection";
import Heading from "./Heading/Heading";
import SectionGridCategoryBox from "./SectionGridCategoryBox/SectionGridCategoryBox";
import { NC_SITE_SETTINGS } from "@/contains/site-settings";
import { TCategoryCardFull } from "./CardCategory1/CardCategory1";

interface Props {
  categories: TCategoryCardFull[] | null;
}

const SectionTrendingTopic: FC<Props> = ({ categories }) => {
  const renderContent = () => {
    return <SectionGridCategoryBox categories={categories || []} />;
  };

  if (NC_SITE_SETTINGS.top_category_section.enable === false) {
    return null;
  }

  if (!categories?.length) {
    return null;
  }

  return (
    <div className="relative py-16">
      <BackgroundSection />
      <Heading
        desc={NC_SITE_SETTINGS.top_category_section.sub_title}
        isCenter={true}
      >
        {NC_SITE_SETTINGS.top_category_section.title}
      </Heading>
      <div className="relative">{renderContent()}</div>
    </div>
  );
};

export default SectionTrendingTopic;
