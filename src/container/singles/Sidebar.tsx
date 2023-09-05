import { TCategoryCardFull } from "@/components/CardCategory1/CardCategory1";
import WidgetAddSubscriberForm from "@/components/WidgetAddSubscriberForm/WidgetAddSubscriberForm";
import WidgetCategories from "@/components/WidgetCategories/WidgetCategories";
import WidgetSocialsFollow from "@/components/WidgetSocialsFollow/WidgetSocialsFollow";
import React, { FC } from "react";

export interface SidebarProps {
  className?: string;
  categories: TCategoryCardFull[] | null;
}

export const Sidebar: FC<SidebarProps> = ({
  className = "space-y-6 ",
  categories,
}) => {
  return (
    <div className={`nc-SingleSidebar ${className}`}>
      <WidgetAddSubscriberForm />

      <WidgetSocialsFollow />

      <WidgetCategories categories={categories || []} />
    </div>
  );
};
