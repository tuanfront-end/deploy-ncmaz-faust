"use client";

import React, { FC } from "react";
import NcModal from "@/components/NcModal/NcModal";
import SingleCommentForm from "@/container/singles/SingleCommentForm";
import { TCommentHasChild } from "@/components/CommentCard/CommentCard";

export interface ModalEditCommentProps {
  show: boolean;
  onCloseModalEditComment: () => void;
  comment?: TCommentHasChild;
  onSubmitModalEditComment: (data: {
    newContent: string;
    comment: TCommentHasChild;
  }) => void;
}

const ModalEditComment: FC<ModalEditCommentProps> = ({
  show,
  onCloseModalEditComment,
  comment,
  onSubmitModalEditComment,
}) => {
  const renderContent = () => {
    return (
      <SingleCommentForm
        className="mt-0"
        onClickCancel={onCloseModalEditComment}
        onClickSubmit={(data) => {
          comment &&
            onSubmitModalEditComment({ newContent: data, comment: comment });
        }}
        isAutoFocus
        isEditingComment
        defaultValue={comment?.content || ""}
        rows={8}
      />
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalEditComment}
      contentExtraClass="max-w-screen-md"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle="Editing comment"
      leaveAnimationClass=""
    />
  );
};

export default ModalEditComment;
