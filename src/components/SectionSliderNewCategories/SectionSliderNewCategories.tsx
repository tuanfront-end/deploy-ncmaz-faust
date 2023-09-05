"use client";

import React, { FC } from "react";
import CardCategory3 from "@/components/CardCategory3/CardCategory3";
import CardCategory4 from "@/components/CardCategory4/CardCategory4";
import CardCategory1, {
  TCategoryCardFull,
} from "@/components/CardCategory1/CardCategory1";
import CardCategory2 from "@/components/CardCategory2/CardCategory2";
import CardCategory5 from "@/components/CardCategory5/CardCategory5";
import MySlider from "../MySlider";

export interface SectionSliderNewCategoriesProps {
  className?: string;
  categories?: TCategoryCardFull[] | null;
  categoryCardType?: "card1" | "card2" | "card3" | "card4" | "card5";
  itemPerRow?: 4 | 5;
}

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
  className = "",
  categories,
  itemPerRow = 5,
  categoryCardType = "card3",
}) => {
  const renderCard = (item: TCategoryCardFull, index: number) => {
    const topIndex = index < 3 ? `#${index + 1}` : undefined;
    switch (categoryCardType) {
      case "card1":
        return <CardCategory1 key={index} term={item} />;
      case "card2":
        return <CardCategory2 key={index} index={topIndex} term={item} />;
      case "card3":
        return <CardCategory3 key={index} term={item} />;
      case "card4":
        return <CardCategory4 key={index} index={topIndex} term={item} />;
      case "card5":
        return <CardCategory5 key={index} term={item} />;
      default:
        return null;
    }
  };

  return (
    <div className={`nc-SectionSliderNewCategories ${className}`}>
      {!!categories ? (
        <MySlider
          data={categories}
          renderItem={renderCard}
          itemPerRow={itemPerRow}
        />
      ) : null}
    </div>
  );
};

export default SectionSliderNewCategories;
