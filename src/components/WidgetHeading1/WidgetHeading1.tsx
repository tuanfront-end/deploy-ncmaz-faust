import Link from "next/link";
import React, { FC } from "react";

export interface WidgetHeading1Props {
  className?: string;
  title: string;
  viewAllLink?: string;
  viewAllLabel?: string;
  icon?: React.ReactNode;
}

const WidgetHeading1: FC<WidgetHeading1Props> = ({
  className = "",
  title,
  viewAllLink,
  viewAllLabel = "View all",
  icon,
}) => {
  return (
    <div
      className={`nc-WidgetHeading1 flex items-center justify-between p-4 border-b border-neutral-100 dark:border-neutral-700 ${className}`}
    >
      <h2 className="flex flex-wrap gap-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{title}</span>
      </h2>
      {!!viewAllLink && (
        <Link
          className="flex-shrink-0 block text-primary-700 dark:text-primary-500 font-semibold text-sm"
          href={viewAllLink}
        >
          {viewAllLabel}
        </Link>
      )}
    </div>
  );
};

export default WidgetHeading1;
