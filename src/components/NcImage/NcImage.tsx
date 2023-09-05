import React, { FC } from "react";
import { ImageProps } from "next/image";
import MyImage, { Props as MyImageProps } from "../MyImage";

export interface NcImageProps extends MyImageProps {
  containerClassName?: string;
}

const NcImage: FC<NcImageProps> = ({
  containerClassName = "",
  alt = "nc-imgs",
  className = "object-cover w-full h-full",
  sizes = "(max-width: 600px) 480px, 800px",
  ...args
}) => {
  return (
    <div className={containerClassName}>
      <MyImage className={className} alt={alt} sizes={sizes} {...args} />
    </div>
  );
};

export default NcImage;
