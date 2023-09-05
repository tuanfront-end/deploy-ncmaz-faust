"use client";

import CardLarge1 from "@/components/CardLarge1/CardLarge1";
import React, { FC, useState } from "react";
import { SectionMagazine1Props } from "./SectionMagazine1";

export interface SectionLargeSliderProps extends SectionMagazine1Props {}

const SectionLargeSlider: FC<SectionLargeSliderProps> = ({
  posts,
  className = "",
}) => {
  const [indexActive, setIndexActive] = useState(0);

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= posts.length - 1) {
        return 0;
      }
      return state + 1;
    });
  };

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return posts.length - 1;
      }
      return state - 1;
    });
  };

  return (
    <div className={`nc-SectionLargeSlider relative ${className}`}>
      {posts.map((item, index) => {
        if (indexActive !== index) return null;
        return (
          <CardLarge1
            key={index}
            onClickNext={handleClickNext}
            onClickPrev={handleClickPrev}
            post={item}
          />
        );
      })}
    </div>
  );
};

export default SectionLargeSlider;
