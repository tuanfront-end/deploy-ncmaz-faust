"use client";

import React, { FC } from "react";
import AvatarDropdown from "./AvatarDropdown";
import SwitchDarkMode from "../SwitchDarkMode/SwitchDarkMode";
import Input from "../Input/Input";
import Navigation from "../Navigation/Navigation";
import { MainNav1Props } from "./MainNav1";
import Brand from "./Brand";
import { useRouter } from "next/router";
import CreateBtn from "./CreateBtn";
import dynamic from "next/dynamic";

const DynamicMenuBar = dynamic(() => import("@/components/MenuBar/MenuBar"), {
  ssr: false,
});

export interface MainNav2Props extends MainNav1Props {}

const MainNav2: FC<MainNav2Props> = ({ menuItems, description, title }) => {
  const router = useRouter();

  const renderSearchForm = () => {
    return (
      <form
        className="relative group"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/search/posts/" + e.currentTarget.search.value || "");
        }}
      >
        <Input
          type="search"
          placeholder="Type to search..."
          className="pr-5 md:pr-10 !w-40 md:!w-full group-hover:border-neutral-300 dark:group-hover:border-neutral-400 dark:placeholder:text-neutral-400"
          sizeClass="h-[42px] pl-4 py-3"
          name="search"
          id="search"
          rounded="rounded-full"
        />
        <button
          type="submit"
          className="absolute top-1/2 -translate-y-1/2 right-3 text-neutral-500 dark:text-neutral-400"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 22L20 20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    );
  };

  return (
    <div className="nc-MainNav2 relative z-10 bg-white dark:bg-neutral-900 border-b border-neutral-200/70 dark:border-transparent">
      <div className="container">
        <div className="h-16 sm:h-20 flex justify-between">
          <div className="flex items-center lg:hidden flex-1">
            <DynamicMenuBar menuItems={menuItems} />
          </div>

          <div className="hidden lg:flex lg:flex-1 items-center gap-x-3 sm:gap-x-8">
            <Brand title={title} description={description} />

            <div className="hidden md:block h-8 border-s border-neutral-200 dark:border-neutral-700"></div>

            <div className="hidden sm:block flex-grow max-w-xs">
              {renderSearchForm()}
            </div>
          </div>

          <div className="flex-1 flex justify-end">
            <Navigation
              maxItemsToShow={3}
              menuItems={menuItems}
              variation="nav2"
              className="hidden lg:flex"
            />
            <div className="hidden md:block border-l border-neutral-200 dark:border-neutral-700 self-center h-8 mx-2"></div>
            <CreateBtn className="self-center" />
            <SwitchDarkMode className="self-center" />
            <AvatarDropdown className="self-center" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav2;
