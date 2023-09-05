import Link from "next/link";
import React, { FC } from "react";

export interface TagProps {
  className?: string;
  hideCount?: boolean;
  name: string;
  count?: number;
  uri: string;
}

const Tag: FC<TagProps> = ({
  className = "",
  count,
  name,
  uri,
  hideCount = true,
}) => {
  return (
    <Link
      className={`nc-Tag inline-block bg-white hover:bg-neutral-50 text-sm text-neutral-600 dark:text-neutral-300 py-2 px-3 rounded-lg md:py-2.5 md:px-4 dark:bg-neutral-900 ${className}`}
      href={uri}
    >
      {`${name}`}
      {!hideCount && count && (
        <span className="text-xs font-normal"> ({count})</span>
      )}
    </Link>
  );
};

export default Tag;
