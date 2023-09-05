import React, { FC } from "react";
import Image, { StaticImageData } from "next/image";
import MyImage from "../MyImage";

export interface SectionAdsProps {
  className?: string;
  imgAds?: string | StaticImageData;
}

const SectionAds: FC<SectionAdsProps> = ({
  className = "",
  imgAds = "/images/ads.png",
}) => {
  return (
    <a
      href="/#"
      className={`nc-SectionAds block text-center mx-auto ${className}`}
    >
      <span className="text-xs text-neutral-500">- Advertisement -</span>
      <MyImage className="mx-auto" src={imgAds} alt="ads" />
    </a>
  );
};

export default SectionAds;
