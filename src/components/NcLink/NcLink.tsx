import Link, { LinkProps } from "next/link";
import React, { FC, ReactNode } from "react";

export interface NcLinkProps extends LinkProps {
  colorClass?: string;
  className?: string;
  children?: ReactNode;
}

const NcLink: FC<NcLinkProps> = ({
  className = "font-medium underline underline-offset-2",
  colorClass = "text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-600",
  children,
  ...props
}) => {
  return (
    <Link className={`nc-NcLink ${colorClass} ${className}`} {...props}>
      {children}
    </Link>
  );
};

export default NcLink;
