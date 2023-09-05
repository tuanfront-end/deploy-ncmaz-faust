import React, { FC, useContext, useEffect } from "react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Textarea from "@/components/Textarea/Textarea";
import Button from "@/components/Button/Button";
import { CommentWrapContext } from "./SingleCommentWrap";
import { useLoginModal } from "../LoginModalProvider";
import { useAuth } from "@faustwp/core";

export interface SingleCommentFormProps {
  className?: string;
  onClickSubmit?: (data: string) => void;
  onClickCancel?: () => void;
  defaultValue?: string;
  rows?: number;
  isAutoFocus?: boolean;
  isReplyingComment?: boolean;
  isEditingComment?: boolean;
  isSuccessfulCreatedComment?: boolean;
}

const SingleCommentForm: FC<SingleCommentFormProps> = ({
  className = "mt-5",
  onClickSubmit,
  onClickCancel,
  defaultValue = "",
  rows = 4,
  isAutoFocus,
  isReplyingComment,
  isEditingComment,
  isSuccessfulCreatedComment,
}) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  //
  const { isLoginModalOpen, openLoginModal } = useLoginModal();
  const { isReady, isAuthenticated } = useAuth();
  let {
    isCreateNewCommentLoading,
    isCreateNewReplyCommentLoading,
    isUpdateCommentByIdLoading,
  } = useContext(CommentWrapContext);
  //
  useEffect(() => {
    isAutoFocus && textareaRef.current?.focus();
  }, [textareaRef, isAutoFocus]);

  // remove text on textarea when submit success
  useEffect(() => {
    if (
      isReplyingComment ||
      isEditingComment ||
      isCreateNewCommentLoading ||
      isSuccessfulCreatedComment
    ) {
      return;
    }

    textareaRef.current && (textareaRef.current.value = "");
  }, [
    isCreateNewCommentLoading,
    textareaRef,
    isEditingComment,
    isReplyingComment,
    isSuccessfulCreatedComment,
  ]);

  // open login modal when click textarea/submit if not login
  const handleClickWhenNotLogin = () => {
    if (!isReady || isLoginModalOpen) {
      return;
    }
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }
  };

  let isLoading = false;
  if (isReplyingComment) {
    isLoading = !!isCreateNewReplyCommentLoading;
  } else if (isEditingComment) {
    isLoading = !!isUpdateCommentByIdLoading;
  } else {
    isLoading = !!isCreateNewCommentLoading;
  }

  return (
    <form
      action="#"
      onSubmit={(e) => {
        e.preventDefault();
        if (isLoading || !isReady) {
          return;
        }
        if (!isAuthenticated) {
          handleClickWhenNotLogin();
          return;
        }
        onClickSubmit && onClickSubmit(textareaRef?.current?.value || "");
      }}
      className={`nc-SingleCommentForm ${className}`}
    >
      <Textarea
        placeholder="Add to discussion"
        ref={textareaRef}
        required={true}
        defaultValue={defaultValue}
        rows={rows}
        onClick={handleClickWhenNotLogin}
      />
      <div className="mt-2.5 flex flex-wrap gap-2">
        <ButtonPrimary
          onClick={handleClickWhenNotLogin}
          loading={isLoading}
          type="submit"
        >
          Submit
        </ButtonPrimary>
        <Button
          type="button"
          disabled={isLoading}
          pattern="link"
          onClick={() => {
            onClickCancel && onClickCancel();
            if (textareaRef.current) {
              textareaRef.current.value = "";
            }
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default SingleCommentForm;
