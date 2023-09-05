import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import React, { FC } from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const RefetchBtn: FC<Props> = ({
  className,
  loading,
  children,
  ...props
}) => {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded bg-indigo-50 dark:bg-indigo-200 px-2.5 py-1 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-100 dark:hover:bg-indigo-100 ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      <ArrowsRightLeftIcon
        className="-ml-0.5 mr-1.5 h-4 w-4"
        aria-hidden="true"
      />
      {loading ? "Loading ..." : `Refetch`}
    </button>
  );
};
