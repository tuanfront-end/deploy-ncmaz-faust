import ButtonSecondary from "@/components/Button/ButtonSecondary";
import NcModal from "@/components/NcModal/NcModal";
import React, { FC } from "react";
import ButtonPrimary from "../Button/ButtonPrimary";

interface Props {
  show: boolean;
  onCloseModal: () => void;
  onSubmit: () => void;
}

const ModalDraftPost: FC<Props> = ({ show, onCloseModal, onSubmit }) => {
  const handleClickSubmitForm = () => {
    onSubmit();
  };

  const renderContent = () => {
    return (
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Draft this post
        </h3>
        <span className="text-sm">
          Post will be changed to draft. You can publish it later.
        </span>
        <div className="mt-4 space-x-3">
          <ButtonPrimary onClick={handleClickSubmitForm} type="submit">
            Draft this post
          </ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModal}>
            Cancel
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  return (
    <NcModal
      renderTrigger={() => null}
      isOpenProp={show}
      renderContent={renderContent}
      onCloseModal={onCloseModal}
      contentExtraClass="max-w-screen-sm"
      modalTitle=""
    />
  );
};

export default ModalDraftPost;
