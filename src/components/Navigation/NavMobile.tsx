"use client";

import React from "react";
import ButtonClose from "@/components/ButtonClose/ButtonClose";
import Logo from "@/components/Logo/Logo";
import { Disclosure } from "@/app/headlessui";
import { NavItemType } from "./NavigationItem";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { NC_SITE_SETTINGS } from "@/contains/site-settings";
import MyImage from "../MyImage";
import { FragmentType } from "@/__generated__";
import { NC_PRIMARY_MENU_QUERY_FRAGMENT } from "@/fragments/menu";
import { flatListToHierarchical } from "@faustwp/core";

export interface NavMobileProps {
  menuItems: FragmentType<typeof NC_PRIMARY_MENU_QUERY_FRAGMENT>[];
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({
  menuItems: menuItemsProp,
  onClickClose,
}) => {
  const menuItems = flatListToHierarchical(menuItemsProp, {
    idKey: "id",
    parentKey: "parentId",
    childrenKey: "children",
  });

  const _renderMenuChild = (
    item: NavItemType,
    itemClass = " ps-3 text-neutral-700 dark:text-neutral-300 font-medium "
  ) => {
    return (
      <ul className="nav-mobile-sub-menu relative ps-6 pb-1 text-base">
        <div className="absolute top-2 bottom-2 start-4 border-s border-neutral-100 dark:border-neutral-700" />
        {item.children?.map((i, index) => (
          <Disclosure key={index} as="li">
            <Link
              href={{
                pathname: i.uri || "",
              }}
              className={`flex text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-0.5 pe-4 ${itemClass}`}
            >
              <span
                className={`py-2.5 ${!i.children ? "block w-full" : ""}`}
                onClick={onClickClose}
              >
                {i.label}
              </span>
              {!!i.children?.length && (
                <span
                  className="flex items-center flex-grow"
                  onClick={(e) => e.preventDefault()}
                >
                  <Disclosure.Button
                    as="span"
                    className="flex justify-end flex-grow"
                  >
                    <ChevronDownIcon
                      className="ms-2 h-4 w-4 text-neutral-500"
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                </span>
              )}
            </Link>
            {!!i.children?.length && (
              <Disclosure.Panel>
                {_renderMenuChild(
                  i,
                  "ps-3 text-neutral-600 dark:text-neutral-400 "
                )}
              </Disclosure.Panel>
            )}
          </Disclosure>
        ))}
      </ul>
    );
  };

  const _renderItem = (item: NavItemType, index: number) => {
    return (
      <Disclosure
        key={index}
        as="li"
        className="text-neutral-900 dark:text-white"
        defaultOpen={!index}
      >
        <Link
          className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
          href={{
            pathname: item.uri || "",
          }}
        >
          <span
            className={!item.children ? "block w-full" : ""}
            onClick={onClickClose}
          >
            {item.label}
          </span>
          {!!item.children?.length && (
            <span
              className="block flex-grow"
              onClick={(e) => e.preventDefault()}
            >
              <Disclosure.Button
                as="span"
                className="flex justify-end flex-grow"
              >
                <ChevronDownIcon
                  className="ms-2 h-4 w-4 text-neutral-500"
                  aria-hidden="true"
                />
              </Disclosure.Button>
            </span>
          )}
        </Link>
        {!!item.children?.length && (
          <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
        )}
      </Disclosure>
    );
  };

  const renderMagnifyingGlassIcon = () => {
    return (
      <svg
        width={22}
        height={22}
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
    );
  };

  const renderSearchForm = () => {
    return (
      <form
        action=""
        method="POST"
        className="flex-1 text-neutral-900 dark:text-neutral-200"
      >
        <div className="bg-neutral-50 dark:bg-neutral-800 flex items-center space-x-1 rtl:space-x-reverse py-2 px-4 rounded-xl h-full">
          {renderMagnifyingGlassIcon()}
          <input
            type="search"
            placeholder="Type and press enter"
            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-sm "
          />
        </div>
        <input type="submit" hidden value="" />
      </form>
    );
  };

  return (
    <div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-black divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5">
        <span className="absolute end-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>

        <Logo />

        <div className="mt-5 text-neutral-600 dark:text-neutral-300 text-sm leading-6">
          {NC_SITE_SETTINGS.mobile_nav_sidebar.description}
        </div>

        <div className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
          {NC_SITE_SETTINGS.site_socials.map((item) => (
            <a
              key={item.name}
              href={item.url}
              className="block relative"
              target="_blank"
              rel="noreferrer"
            >
              <span className="sr-only">{item.name}</span>
              <span className="hidden dark:block absolute -inset-1 rounded-full bg-neutral-400 "></span>

              <MyImage
                width={22}
                height={22}
                className="opacity-60 max-h-[22px] hover:opacity-100"
                src={item.icon}
                alt={item.name}
              />
            </a>
          ))}
        </div>

        <div className="mt-7">{renderSearchForm()}</div>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1 rtl:space-x-reverse">
        {menuItems?.map((item, index) =>
          _renderItem(item as NavItemType, index)
        )}
      </ul>
    </div>
  );
};

export default NavMobile;
