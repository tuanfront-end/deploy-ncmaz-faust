import React, { FC } from "react";
import Navigation from "@/components/Navigation/Navigation";
import MenuBar from "@/components/MenuBar/MenuBar";
import { NC_PRIMARY_MENU_QUERY_FRAGMENT } from "@/fragments/menu";
import { FragmentType } from "@/__generated__";
import LangDropdown from "./LangDropdown";
import AvatarDropdown from "./AvatarDropdown";
import Brand from "./Brand";
import SearchBtn from "./SearchBtn";
import CreateBtn from "./CreateBtn";

export interface MainNav1Props {
  menuItems: FragmentType<typeof NC_PRIMARY_MENU_QUERY_FRAGMENT>[];
  title?: string | null;
  description?: string | null;
}

const MainNav1: FC<MainNav1Props> = ({ menuItems, title, description }) => {
  return (
    <div className="nc-MainNav1 relative z-10 bg-white dark:bg-neutral-900 border-b border-neutral-200/70 dark:border-transparent">
      <div className="container">
        <div className="h-16 py-3 sm:h-20 sm:py-4 flex justify-between items-center">
          <div className="flex items-center lg:hidden flex-1">
            <MenuBar menuItems={menuItems} />
          </div>

          <div className="flex justify-center lg:justify-start flex-1 items-center space-x-4 sm:space-x-10 2xl:space-x-14 rtl:space-x-reverse">
            <Brand title={title} description={description} />

            <Navigation menuItems={menuItems} className="hidden lg:flex" />
          </div>

          <div className="flex-1 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1 rtl:space-x-reverse">
            <div className="hidden items-center lg:flex">
              <CreateBtn />
              <SearchBtn />
              <AvatarDropdown />
            </div>
            <div className="flex items-center lg:hidden">
              <SearchBtn />
              <AvatarDropdown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
