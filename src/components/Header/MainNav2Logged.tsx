"use client";

import React, { FC } from "react";
import MenuBar from "@/components/MenuBar/MenuBar";
import AvatarDropdown from "./AvatarDropdown";
import Navigation from "@/components/Navigation/Navigation";
import LangDropdown from "./LangDropdown";
import { MainNav2Props } from "./MainNav2";
import Brand from "./Brand";
import SearchBtn from "./SearchBtn";
import CreateBtn from "./CreateBtn";

export interface MainNav2LoggedProps extends MainNav2Props {}

const MainNav2Logged: FC<MainNav2LoggedProps> = ({
  menuItems,
  description,
  title,
}) => {
  const renderContent = () => {
    return (
      <div className="h-16 sm:h-20 flex justify-between">
        <div className="flex items-center lg:hidden flex-1">
          <MenuBar menuItems={menuItems} />
        </div>

        <div className="lg:flex-1 flex items-center">
          <Brand title={title} description={description} />
        </div>

        <div className="flex-[2] hidden lg:flex justify-center mx-4">
          <Navigation menuItems={menuItems} />
        </div>

        <div className="flex-1 flex items-center justify-end text-neutral-700 dark:text-neutral-100">
          <CreateBtn />
          <SearchBtn />
          <AvatarDropdown />
        </div>
      </div>
    );
  };

  return (
    <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-neutral-900 border-b border-neutral-200/70 dark:border-transparent">
      <div className="container ">{renderContent()}</div>
    </div>
  );
};

export default MainNav2Logged;
