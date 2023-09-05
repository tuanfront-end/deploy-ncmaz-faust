import { Tab } from "@headlessui/react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import ButtonThird from "@/components/Button/ButtonThird";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import NcModal from "@/components/NcModal/NcModal";
import React, { FC, useEffect, useState } from "react";
import { EditorItemImageAttrs } from "./MenuBar";
import Alert from "../Alert";

interface MenuItemImageProps {
  onClickApply: ({ url, alt, title }: EditorItemImageAttrs) => void;
  open?: boolean;
  hanldeClose?: () => void;
  isLoading?: boolean;
  defaultImage?: EditorItemImageAttrs;
}

const ModalUploadImage: FC<MenuItemImageProps> = ({
  onClickApply,
  open = false,
  hanldeClose,
  isLoading,
  defaultImage,
}) => {
  let [catImages] = useState(["Insert from URL", "Upload"]);

  const [urlState, setUrlState] = useState(defaultImage?.url || "");
  const [altState, setAltState] = useState(defaultImage?.alt || "");

  useEffect(() => {
    setUrlState(defaultImage?.url || "");
    setAltState(defaultImage?.alt || "");
  }, [open]);

  //
  function closeModal() {
    hanldeClose && hanldeClose();
  }

  const handleApply = () => {
    onClickApply({ url: urlState, alt: altState });
  };

  const renderContent = () => {
    return (
      <div>
        <div className="relative flex flex-col px-5 py-6 space-y-5">
          {renderTabsAddImages()}
        </div>
      </div>
    );
  };

  const renderInsertFromUrl = () => {
    return (
      <>
        <form
          className="block space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            handleApply();
          }}
        >
          <div>
            <Label>Image URL</Label>
            <Input
              className="mt-1"
              rounded="rounded-xl"
              type={"url"}
              placeholder="Paste or type URL"
              onChange={(e) => setUrlState(e.target.value)}
              defaultValue={urlState}
              name="url"
            />
          </div>
          <div>
            <Label>Alt text (alternative text)</Label>
            <Input
              className="mt-1"
              rounded="rounded-xl"
              type={"text"}
              onChange={(e) => setAltState(e.target.value)}
              defaultValue={altState}
              name="alt"
            />
          </div>
        </form>
      </>
    );
  };

  const renderInsertFromUpload = () => {
    return (
      <div>
        <div className="py-5">
          <Alert type="info">
            Sorry this feature is not available yet. Please use the URL option.
          </Alert>
        </div>
        {/* OLD */}
      </div>
    );
  };

  const renderTabsAddImages = () => {
    return (
      <div>
        <Tab.Group>
          <Tab.List className="flex p-1 space-x-1 bg-primary-900/10 dark:bg-primary-100/10 rounded-xl">
            {catImages.map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  `w-full py-2.5 text-sm leading-5 font-medium rounded-lg focus:outline-none focus:ring-2 ring-offset-2 
                  ring-offset-blue-400 ring-white/60 dark:ring-black/0 ${
                    selected
                      ? "bg-white dark:bg-neutral-900/80 text-primary-700 dark:text-primary-100 shadow"
                      : " hover:bg-white/30 dark:hover:bg-black/[0.15] text-neutral-600 dark:text-primary-200 "
                  }`
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {catImages.map((posts, idx) => {
              return (
                <Tab.Panel
                  key={idx}
                  className={`bg-neutral-50 dark:bg-black/10 rounded-xl p-4 space-y-5 focus:outline-none 
                  focus:ring-0`}
                >
                  {!idx ? renderInsertFromUrl() : renderInsertFromUpload()}
                </Tab.Panel>
              );
            })}
          </Tab.Panels>
        </Tab.Group>
      </div>
    );
  };

  return (
    <>
      <NcModal
        contentPaddingClass=""
        isOpenProp={open}
        onCloseModal={closeModal}
        contentExtraClass="max-w-screen-md"
        renderContent={renderContent}
        renderTrigger={() => null}
        modalTitle="Add Image"
        renderFooter={(closeModal) => {
          return (
            <div className="flex items-center justify-between">
              <ButtonThird onClick={closeModal}>Cancel</ButtonThird>
              <ButtonPrimary
                loading={isLoading}
                onClick={() => {
                  urlState ? handleApply() : closeModal();
                }}
              >
                Apply
              </ButtonPrimary>
            </div>
          );
        }}
      />
    </>
  );
};

export default ModalUploadImage;
