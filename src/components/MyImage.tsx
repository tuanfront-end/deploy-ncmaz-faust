import Image, { ImageProps } from "next/image";
import React, { FC } from "react";

export interface Props extends ImageProps {}

const MyImage: FC<Props> = (props) => {
  return (
    <Image
      {...props}
      className={`${props.className} ${
        props.src ? "" : "dark:filter dark:brightness-75"
      }`}
      src={props.src || "/images/placeholder.png"}
    />
  );
};

export default MyImage;
