import React, { FC } from "react";
import LinkLib, { LinkProps } from "next/link";

interface Props extends LinkProps {
  children?: React.ReactNode;
  className?: string;
  dangerouslySetInnerHTML?: any;
  title?: string;
}

const Link: FC<Props> = ({ children, dangerouslySetInnerHTML, ...props }) => {
  return (
    <LinkLib {...props}>
      <a>
        {children || dangerouslySetInnerHTML?.html || (
          <span className="sr-only">a</span>
        )}
      </a>
    </LinkLib>
  );
};

export default Link;
