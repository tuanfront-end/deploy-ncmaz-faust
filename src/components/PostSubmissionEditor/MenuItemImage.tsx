import React, { FC, useState } from "react";
import { EditorItemImageAttrs } from "./MenuBar";
import ModalUploadImage from "./ModalUploadImage";

interface MenuItemImageProps {
  action: ({ url, alt, title }: EditorItemImageAttrs) => void;
  children?: React.ReactNode;
}

const MenuItemImage: FC<MenuItemImageProps> = ({ action, children }) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleApply = ({ url, alt }: EditorItemImageAttrs) => {
    action({ url, alt });
    closeModal();
  };

  return (
    <>
      <div className="inline-flex" onClick={openModal}>
        {children}
      </div>
      <ModalUploadImage
        onClickApply={handleApply}
        open={isOpen}
        hanldeClose={closeModal}
      />
    </>
  );
};

export default MenuItemImage;
