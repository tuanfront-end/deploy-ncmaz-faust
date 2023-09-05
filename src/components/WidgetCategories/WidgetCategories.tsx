import WidgetHeading1 from "@/components/WidgetHeading1/WidgetHeading1";
import React, { FC } from "react";
import CardCategory6Skeleton from "../CardCategory6/CardCategory6Skeleton";
import CardCategory6 from "../CardCategory6/CardCategory6";
import { TCategoryCardFull } from "../CardCategory1/CardCategory1";

export interface WidgetCategoriesProps {
  className?: string;
  categories?: TCategoryCardFull[] | null;
  isLoading?: boolean;
}

const WidgetCategories: FC<WidgetCategoriesProps> = ({
  className = "rounded-3xl border border-neutral-100 dark:border-neutral-700",
  categories,
  isLoading,
}) => {
  return (
    <div className={`nc-WidgetCategories overflow-hidden ${className}`}>
      <WidgetHeading1 title="✨ Top 10 categories" />
      <div className="flow-root">
        <div className="flex flex-col divide-y divide-neutral-100 dark:divide-neutral-700">
          {isLoading ? (
            <>
              <CardCategory6Skeleton className="p-4 xl:p-5" />
              <CardCategory6Skeleton className="p-4 xl:p-5" />
              <CardCategory6Skeleton className="p-4 xl:p-5" />
              <CardCategory6Skeleton className="p-4 xl:p-5" />
              <CardCategory6Skeleton className="p-4 xl:p-5" />
            </>
          ) : (
            categories?.map((category) => (
              <CardCategory6
                className="p-4 xl:p-5 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                key={category.databaseId}
                term={category}
                size="normal"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WidgetCategories;
