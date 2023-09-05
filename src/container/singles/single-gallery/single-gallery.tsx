"use client";

import React, { FC, useState } from "react";
import { Suspense } from "react";
import { SingleType1Props } from "../single/single";
import SingleHeader from "../SingleHeader";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import { NcmazFcImageHasDetailFieldsFragment } from "@/__generated__/graphql";
import ListingImageGallery from "./ListingImageGallery";
import MyImage from "@/components/MyImage";

interface Props extends SingleType1Props {}

const SingleTypeGallery: FC<Props> = ({ post }) => {
  //

  const [currentImageIndex, setcurrentImageIndex] = useState(-1);

  const { title, ncmazGalleryImgs, postFormats } = getPostDataFromPostFragment(
    post || {}
  );
  let IMAGES_GALLERY =
    ncmazGalleryImgs.filter((item) => !!item?.sourceUrl) || [];
  //

  const handleCloseModalImageGallery = () => {
    setcurrentImageIndex(-1);
  };

  const handleOpenModalImageGallery = (index: number) => {
    setcurrentImageIndex(index);
  };

  const renderImageItem = ({
    index,
    item,
  }: {
    item?: NcmazFcImageHasDetailFieldsFragment | null;
    index: number;
  }) => {
    return (
      <div
        className="absolute inset-0 rounded-xl z-10 cursor-pointer"
        onClick={() => handleOpenModalImageGallery(index)}
      >
        <MyImage
          alt={item?.altText || ""}
          priority
          className="object-cover w-full h-full rounded-xl"
          fill
          src={item?.sourceUrl || ""}
          sizes="(max-width: 320px) 50vw, (max-width: 1280px) 50vw, 750px"
        />
        <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
      </div>
    );
  };

  return (
    <Suspense fallback={<div />}>
      <div className={`pt-8 lg:pt-16`}>
        {/* SINGLE HEADER */}
        <header className="container rounded-xl">
          <SingleHeader hiddenDesc post={post} />
          <div className="my-10 overflow-hidden">
            {IMAGES_GALLERY[0] && postFormats === "gallery" && (
              <div className="relative min-h-[240px] sm:min-h-[300px] max-h-[60vh]">
                <div className="relative h-0 w-full pt-[50%]">
                  <div className="absolute inset-0 w-full h-full">
                    <div className="min-h-[240px] sm:min-h-[300px] max-h-[60vh] h-full w-full relative overflow-hidden">
                      {/* list images */}
                      <div className="relative grid grid-cols-4 gap-2 w-full h-full">
                        {/* large image */}
                        <div
                          className={`relative ${
                            IMAGES_GALLERY[1] ? "col-span-2" : "col-span-4"
                          }`}
                        >
                          {renderImageItem({
                            item: IMAGES_GALLERY[0],
                            index: 0,
                          })}
                        </div>

                        {/* list */}
                        {IMAGES_GALLERY[1] && (
                          <div
                            className={`flex gap-2  ${
                              IMAGES_GALLERY[3]
                                ? "flex-col col-span-2 sm:col-span-1"
                                : "flex-col sm:flex-row col-span-2"
                            }`}
                          >
                            {[IMAGES_GALLERY[1], IMAGES_GALLERY[2]].map(
                              (item, index) =>
                                item ? (
                                  <div
                                    key={
                                      index + "__ncmazfaust_" + item?.databaseId
                                    }
                                    className={`relative flex-1`}
                                  >
                                    {renderImageItem({
                                      item,
                                      index: index + 1,
                                    })}
                                  </div>
                                ) : null
                            )}
                          </div>
                        )}

                        {IMAGES_GALLERY[3] && (
                          <div className="hidden sm:flex flex-col gap-2">
                            {[IMAGES_GALLERY[3], IMAGES_GALLERY[4]].map(
                              (item, index) =>
                                item ? (
                                  <div
                                    key={
                                      index + "__ncmazfaust_" + item?.databaseId
                                    }
                                    className={`relative flex-1`}
                                  >
                                    {renderImageItem({
                                      item,
                                      index: index + 3,
                                    })}
                                  </div>
                                ) : null
                            )}
                          </div>
                        )}
                      </div>

                      {/* show more btn */}
                      <div
                        className="absolute flex items-center justify-center start-3 xl:start-auto xl:end-3 bottom-3 p-3 sm:px-4 sm:py-2 rounded-full bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
                        onClick={() => handleOpenModalImageGallery(0)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                          />
                        </svg>
                        <span className="hidden sm:block ms-2 text-neutral-800 text-xs md:text-sm font-medium">
                          Show all photos
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        <ListingImageGallery
          isShowModal={currentImageIndex > -1}
          onClose={handleCloseModalImageGallery}
          images={IMAGES_GALLERY as NcmazFcImageHasDetailFieldsFragment[]}
          defaultImageIdx={currentImageIndex}
        />
      </div>
    </Suspense>
  );
};

export default SingleTypeGallery;
