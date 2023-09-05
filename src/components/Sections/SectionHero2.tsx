"use client";

import React, { FC, useState } from "react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import NcModal from "@/components/NcModal/NcModal";
import { PlayIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Button from "../Button/Button";
import MyImage from "../MyImage";

export interface SectionHero2Props {}
const SectionHero2: FC<SectionHero2Props> = ({}) => {
  const [showVideo, setShowVideo] = useState(false);

  const renderOpenModalVideo = () => {
    return (
      <Button pattern="white" onClick={() => setShowVideo(!showVideo)}>
        Play video
        <PlayIcon className="w-5 h-5 ms-2 rtl:rotate-180" />
      </Button>
    );
  };

  const renderVideoModalContent = () => {
    return (
      <div className="aspect-w-16 aspect-h-9 ">
        <iframe
          src={`https://www.youtube.com/embed/qTsXfGVjm1w?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="ncblog hero video"
        ></iframe>
      </div>
    );
  };

  return (
    <div className="SectionHero2 relative pb-20 md:py-32 lg:py-60 bg-black">
      <div className="flex w-full mb-10 md:w-1/2 xl:w-3/5 md:absolute md:end-0 md:top-0 md:bottom-0 md:mb-0">
        <div className="hidden md:block absolute z-[1] top-0 start-0 bottom-0 w-44 from-black bg-gradient-to-r rtl:bg-gradient-to-l"></div>
        <MyImage
          fill
          className="object-cover"
          src="https://images.pexels.com/photos/4666750/pexels-photo-4666750.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          sizes="1260px"
          alt="hero"
        />
      </div>
      <div className="container relative z-10 text-neutral-100">
        <div className="max-w-3xl">
          <h1 className="font-bold text-4xl md:text-5xl xl:text-6xl mt-3 md:!leading-[110%] ">
            The hidden world of whale culture
          </h1>
          <p className="mt-7 text-base lg:text-xl text-neutral-300 ">
            From singing competitions to food preferences, scientists are
            learning whales have cultural differences once thought to be unique
            to humans.
          </p>
          <div className="flex space-x-4 rtl:space-x-reverse mt-11">
            <ButtonPrimary href="/">Read more</ButtonPrimary>

            <NcModal
              isOpenProp={showVideo}
              onCloseModal={() => setShowVideo(false)}
              contentExtraClass="max-w-screen-lg 2xl:max-w-screen-xl"
              contentPaddingClass=""
              renderContent={renderVideoModalContent}
              renderTrigger={renderOpenModalVideo}
              modalTitle=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHero2;
