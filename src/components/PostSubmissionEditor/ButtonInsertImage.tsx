import CircleLoading from "@/components/Loading/CircleLoading";
import React, { useState, FC, useEffect } from "react";
import toast from "react-hot-toast";
import { EditorItemImageAttrs } from "./MenuBar";
import ModalUploadImage from "./ModalUploadImage";
import isImageFromUrl from "@/utils/IsImageFromUrl";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

interface ButtonInsertImageProps {
  className?: string;
  contentClassName?: string;
  onChangeImage?: (image: ImageState) => void;
  defaultImage?: ImageState;
}

export interface ImageState {
  sourceUrl: string;
  databaseId?: number;
  id?: string;
  altText?: string;
}

const ButtonInsertImage: FC<ButtonInsertImageProps> = ({
  className = "flex-1",
  contentClassName = "px-6 py-9",
  onChangeImage = () => {},
  defaultImage = { sourceUrl: "" },
}) => {
  const [imageState, setImageState] = useState<ImageState>(defaultImage);
  let [isOpen, setIsOpen] = useState(false);
  let [isLoading, setisLoading] = useState(false);
  //
  function closeModal() {
    setIsOpen(false);
    setImageState(defaultImage);
  }
  function openModal() {
    setIsOpen(true);
  }

  const handleApply = ({ url, alt }: EditorItemImageAttrs) => {
    setisLoading(true);

    isImageFromUrl(url)
      .then((value) => {
        if (!value) {
          toast.error("The url is not an image, please try again.");
          return;
        }
        onChangeImage({ sourceUrl: url, altText: alt, id: "" });
        setImageState({ sourceUrl: url, altText: alt, id: "" });
        closeModal();
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`);
      })
      .finally(() => {
        setisLoading(false);
      });
  };
  //

  useEffect(() => {
    setImageState(defaultImage);
  }, [defaultImage.sourceUrl]);

  let LOADING = isLoading;

  return (
    <>
      <div className={className}>
        <div
          className={`block group ${
            LOADING ? "cursor-not-allowed animate-pulse" : "cursor-pointer"
          }`}
        >
          <div
            className={`relative mt-1 flex justify-center border-2 border-neutral-300 group-hover:border-neutral-400 dark:border-neutral-600 border-dashed rounded-xl transition-colors ${contentClassName}`}
          >
            {!!imageState.sourceUrl && (
              <div className="opacity-0 group-hover:opacity-100 absolute z-20 end-2.5 top-2.5 flex gap-1">
                <div
                  className=" p-1.5 bg-black dark:bg-neutral-700 text-white rounded-md cursor-pointer transition-opacity duration-300"
                  title="Edit image"
                  onClick={openModal}
                >
                  <PencilSquareIcon className="w-4 h-4" />
                </div>
                <div
                  className=" p-1.5 bg-black dark:bg-neutral-700 text-white rounded-md cursor-pointer transition-opacity duration-300"
                  title="Delete image"
                  onClick={() => {
                    setImageState({ sourceUrl: "" });
                  }}
                >
                  <TrashIcon className="w-4 h-4" />
                </div>
              </div>
            )}
            <div className="flex-1 space-y-1 text-center">
              {imageState.sourceUrl && (
                <div className="absolute inset-1" onClick={openModal}>
                  <img
                    src={imageState.sourceUrl}
                    className="rounded-lg object-cover shadow-lg w-full h-full"
                    sizes="(max-width: 475px) 100vw, 600px"
                    alt={imageState.altText || "image"}
                  />
                </div>
              )}
              <svg
                className="mx-auto h-12 w-12 text-neutral-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>

              <div className="flex justify-center text-sm text-neutral-600 dark:text-neutral-300">
                <div className=" flex-shrink-0 cursor-pointer  rounded-md font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                  {LOADING ? (
                    <CircleLoading
                      className="ml-3 text-blue-600 "
                      childClassName="w-5 h-5"
                    />
                  ) : (
                    <span>Upload a file</span>
                  )}
                </div>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                PNG, JPG, GIF, WEBP, SVG ...
              </p>
            </div>

            <div
              className="absolute inset-0 "
              aria-hidden="true"
              onClick={openModal}
            />
          </div>
        </div>
      </div>

      <ModalUploadImage
        onClickApply={handleApply}
        open={isOpen}
        hanldeClose={closeModal}
        isLoading={LOADING}
        defaultImage={{
          alt: imageState.altText,
          url: imageState.sourceUrl,
        }}
      />
    </>
  );
};

export default ButtonInsertImage;
