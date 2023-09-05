"use client";

import Image from "next/image";
import { FC, Fragment, useEffect, useState } from "react";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { NcmazFcImageHasDetailFieldsFragment } from "@/__generated__/graphql";
import NextBtn from "@/components/NextPrev/NextBtn";
import PrevBtn from "@/components/NextPrev/PrevBtn";
import { useWindowSize } from "react-use";
import SocialsShareDropdown from "@/components/SocialsShareDropdown/SocialsShareDropdown";
import MyImage from "@/components/MyImage";

interface Props {
  images?: NcmazFcImageHasDetailFieldsFragment[];
  onClose?: () => void;
  isShowModal: boolean;
  defaultImageIdx: number;
}

const ListingImageGallery: FC<Props> = ({
  images,
  onClose,
  isShowModal,
  defaultImageIdx = 0,
}) => {
  const [currentImageIndex, setcurrentImageIndex] = useState(defaultImageIdx);
  const currentImage = images?.[currentImageIndex];

  useEffect(() => {
    setcurrentImageIndex(defaultImageIdx);
  }, [defaultImageIdx]);

  const handleClose = () => {
    onClose && onClose();
  };

  const { width } = useWindowSize();
  const isMobile = width < 640;

  return (
    <>
      <Transition appear show={isShowModal} as={Fragment}>
        <Dialog
          as="div"
          className="z-40 dark bg-neutral-900 fixed inset-0 text-white"
          onClose={handleClose}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-900" />
          </Transition.Child>

          <div className="flex w-full h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-5"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-5"
            >
              <Dialog.Panel className="relative flex flex-col w-full h-full transform sm:px-4 md:px-6 lg:px-8 xl:px-10 transition-all">
                {/* head */}
                <div className="pt-4 sm:pt-6 lg:pt-10 pb-6 px-4 sm:px-0 flex-shrink-0 flex items-center justify-between ">
                  <button
                    className="focus:outline-none focus:ring-0 w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-800"
                    onClick={handleClose}
                  >
                    <ArrowSmallLeftIcon className="w-6 h-6" />
                  </button>

                  {!isMobile && (
                    <div className="">
                      {currentImageIndex + 1} / {images?.length || 0}
                    </div>
                  )}

                  <SocialsShareDropdown />
                </div>

                {/* next pre btn */}
                {!isMobile && (
                  <div>
                    <div className="absolute start-0 sm:start-4 xl:start-10 top-1/2 -translate-y-1/2 z-10">
                      {currentImageIndex > 0 && (
                        <PrevBtn
                          onClick={() => {
                            setcurrentImageIndex(currentImageIndex - 1);
                          }}
                          className="w-12 h-12 text-lg"
                        />
                      )}
                    </div>
                    <div className="absolute end-0 sm:end-4 xl:end-10 top-1/2 -translate-y-1/2 z-10">
                      {currentImageIndex < (images?.length || 1) - 1 && (
                        <NextBtn
                          onClick={() => {
                            setcurrentImageIndex(currentImageIndex + 1);
                          }}
                          className="w-12 h-12 text-lg"
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* content */}
                <div className="flex-1 relative select-none ">
                  <div className="absolute inset-0 select-none text-center  flex gap-x-2.5 snap-x snap-mandatory overflow-x-auto hiddenScrollbar">
                    {images?.map((image, index) => {
                      return (
                        <Transition
                          key={index + "_ncmazfaust__" + image.databaseId}
                          as={"div"}
                          show={isMobile ? true : index === currentImageIndex}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          className="w-full h-full snap-start shrink-0 align-bottom flex flex-col"
                        >
                          <>
                            <div className="relative flex-1 align-bottom">
                              <div className="absolute inset-0">
                                <MyImage
                                  alt={image?.altText || ""}
                                  className="w-full h-full transform rounded-lg object-contain align-bottom"
                                  fill={!isMobile}
                                  width={
                                    isMobile
                                      ? image?.mediaDetails?.width || 0
                                      : undefined
                                  }
                                  height={
                                    isMobile
                                      ? image?.mediaDetails?.height || 0
                                      : undefined
                                  }
                                  src={image?.sourceUrl || ""}
                                  sizes="(max-width: 640px) 100vw,  90vw"
                                />
                              </div>
                            </div>

                            {isMobile && (
                              <div
                                className="p-4 sm:px-0 sm:py-6 text-start text-sm text-neutral-300 flex gap-4"
                                dangerouslySetInnerHTML={{
                                  __html: `<div class="flex-shrink-0">${
                                    index + 1
                                  } / ${images.length}</div> ${
                                    image?.caption || ""
                                  }`,
                                }}
                              ></div>
                            )}
                          </>
                        </Transition>
                      );
                    })}
                  </div>
                </div>

                {/* caption */}
                {!isMobile && (
                  <div
                    className="py-4 sm:py-6 text-center text-sm text-neutral-300 max-w-xl mx-auto transition-opacity duration-200"
                    dangerouslySetInnerHTML={{
                      __html: currentImage?.caption || "",
                    }}
                  ></div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ListingImageGallery;
