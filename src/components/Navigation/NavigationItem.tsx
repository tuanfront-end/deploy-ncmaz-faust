"use client";

import { Popover, Transition } from "@/app/headlessui";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { FC, Fragment, useState } from "react";
import Link from "next/link";
import NcImage from "../NcImage/NcImage";
import { FragmentType, useFragment } from "@/__generated__";
import { NC_PRIMARY_MENU_QUERY_FRAGMENT } from "@/fragments/menu";
import {
  NcPrimaryMenuFieldsFragmentFragment,
  NcmazFcPostCardFieldsFragment,
} from "@/__generated__/graphql";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import ncFormatDate from "@/utils/formatDate";

export type NavItemType = NcPrimaryMenuFieldsFragmentFragment & {
  children?: NavItemType[];
};

export interface NavigationItemProps {
  menuItem: FragmentType<typeof NC_PRIMARY_MENU_QUERY_FRAGMENT>;
}

const NavigationItem: FC<NavigationItemProps> = ({
  menuItem: menuItemProp,
}) => {
  const menuItem = useFragment(NC_PRIMARY_MENU_QUERY_FRAGMENT, menuItemProp);

  const [menuCurrentHovers, setMenuCurrentHovers] = useState<string[]>([]);

  const onMouseEnterMenu = (id: string) => {
    setMenuCurrentHovers((state) => [...state, id]);
  };

  const onMouseLeaveMenu = (id: string) => {
    setMenuCurrentHovers((state) => {
      return state.filter((item, index) => {
        return item !== id && index < state.indexOf(id);
      });
    });
  };

  // ===================== MENU MEGAMENU =====================
  const renderMegaMenu = (menu: NavItemType) => {
    if (!menu.children?.length && !menu.ncmazfaustMenu?.posts?.nodes.length) {
      return null;
    }

    let rightSideClass = "w-[40%]";
    let postsColumns = 2;
    const colColumns = menu.ncmazfaustMenu?.numberOfMenuColumns || 0;

    if (colColumns === 0) {
      rightSideClass = "w-[100%]";
      postsColumns = 5;
    } else if (colColumns === 1) {
      rightSideClass = "w-[80%]";
      postsColumns = 4;
    } else if (colColumns === 2) {
      rightSideClass = "w-[60%]";
      postsColumns = 3;
    } else if (colColumns === 3 || colColumns === 4) {
      rightSideClass = "w-[40%]";
      postsColumns = 2;
    } else if (colColumns === 5) {
      rightSideClass = "w-[20%]";
      postsColumns = 1;
    } else if (colColumns >= 6) {
      rightSideClass = "w-[0%] hidden";
      postsColumns = 0;
    }

    return (
      <li
        className={`menu-item flex-shrink-0 menu-megamenu menu-megamenu--large ${menu.cssClasses?.join(
          " "
        )}`}
      >
        {renderMainItem(menu)}

        <div className="invisible sub-menu absolute top-full inset-x-0 transform z-50 max-h-[70vh] overflow-auto hiddenScrollbar">
          <div className="bg-white dark:bg-neutral-900 shadow-lg">
            <div className="container">
              <div className="flex gap-6 xl:gap-8 items-start text-sm border-t border-neutral-200 dark:border-neutral-700 py-14">
                <div
                  className={`flex-1 grid grid-cols-${colColumns} gap-6 ${
                    colColumns === 0 ? "hidden" : ""
                  }`}
                >
                  {menu.children?.map((item, index) => (
                    <div key={index} className={item.cssClasses?.join(" ")}>
                      <Link
                        href={item.uri || ""}
                        className="font-medium text-neutral-900 dark:text-neutral-200"
                      >
                        {item.label}
                      </Link>
                      <ul className="grid space-y-4 mt-4">
                        {item.children?.map(renderMegaMenuNavlink)}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className={rightSideClass}>
                  <div
                    className={`grid grid-cols-1 gap-10 sm:gap-8 lg:grid-cols-${postsColumns}`}
                  >
                    <h3 className="sr-only">Recent posts</h3>
                    {menu.ncmazfaustMenu?.posts?.nodes.map((p) => {
                      if (p.__typename !== "Post") return null;
                      const post = getPostDataFromPostFragment(
                        p as NcmazFcPostCardFieldsFragment
                      );

                      return (
                        <article
                          key={post.databaseId}
                          className="relative isolate flex max-w-2xl flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
                        >
                          <div className="relative flex-none">
                            <NcImage
                              containerClassName="aspect-[2/1] w-full rounded-xl bg-neutral-100 sm:aspect-[16/9] sm:h-32 lg:h-auto z-0"
                              fill
                              className="rounded-xl object-cover"
                              src={post.featuredImage?.sourceUrl || ""}
                              sizes="300px"
                              alt={post.title || ""}
                            />
                            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-neutral-900/10" />
                          </div>
                          <div>
                            <div className="flex items-center gap-x-4">
                              <time
                                dateTime={post.date}
                                className="text-sm leading-6 text-neutral-600"
                              >
                                {ncFormatDate(post.date)}
                              </time>
                              <Link
                                href={post.categories?.nodes?.[0].uri || ""}
                                className="relative z-10 rounded-full bg-neutral-50 py-1.5 px-3 text-xs font-medium text-neutral-600 hover:bg-neutral-100"
                              >
                                {post.categories?.nodes?.[0].name || ""}
                              </Link>
                            </div>
                            <h4 className="mt-2 text-sm font-semibold leading-6 text-neutral-900">
                              <Link href={post.uri}>
                                <span className="absolute inset-0" />
                                {post.title}
                              </Link>
                            </h4>
                            <div
                              dangerouslySetInnerHTML={{ __html: post.excerpt }}
                              className="mt-2 text-sm leading-6 text-neutral-600"
                            ></div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  };

  const renderMegaMenuNavlink = (item: NavItemType) => {
    return (
      <li key={item.id} className={`${item.cssClasses?.join(" ")}`}>
        <Link
          className="font-normal text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white "
          href={{
            pathname: item.uri || "",
          }}
        >
          {item.label}
        </Link>
      </li>
    );
  };

  // ===================== MENU DROPDOW =====================
  const renderDropdownMenu = (menuDropdown: NavItemType) => {
    const isHover = menuCurrentHovers.includes(menuDropdown.id);
    return (
      <Popover
        as="li"
        className={`menu-item menu-dropdown shrink-0 relative ${menuDropdown.cssClasses?.join(
          " "
        )}`}
        onMouseEnter={() => onMouseEnterMenu(menuDropdown.id)}
        onMouseLeave={() => onMouseLeaveMenu(menuDropdown.id)}
      >
        {() => (
          <>
            <Popover.Button as={Fragment}>
              {renderMainItem(menuDropdown)}
            </Popover.Button>
            <Transition
              as={Fragment}
              show={isHover && !!menuDropdown?.children?.length}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="sub-menu absolute transform z-10 w-56 top-full left-0"
              >
                <ul className="rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 text-sm relative bg-white dark:bg-neutral-900 py-3 grid space-y-1">
                  {menuDropdown.children?.map((i) => {
                    if (i.children?.length) {
                      return renderDropdownMenuNavlinkHasChild(i);
                    } else {
                      return (
                        <li
                          key={i.id}
                          className={`px-2 ${i.cssClasses?.join(" ")}`}
                        >
                          {renderDropdownMenuNavlink(i)}
                        </li>
                      );
                    }
                  })}
                </ul>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderDropdownMenuNavlinkHasChild = (item: NavItemType) => {
    const isHover = menuCurrentHovers.includes(item.id);
    return (
      <Popover
        as="li"
        key={item.id}
        className={`menu-item menu-dropdown relative px-2 ${item.cssClasses?.join(
          " "
        )}`}
        onMouseEnter={() => onMouseEnterMenu(item.id)}
        onMouseLeave={() => onMouseLeaveMenu(item.id)}
      >
        {() => (
          <>
            <Popover.Button as={Fragment}>
              {renderDropdownMenuNavlink(item)}
            </Popover.Button>
            <Transition
              as={Fragment}
              show={isHover && !!item.children?.length}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="sub-menu absolute z-10 w-56 left-full pl-2 top-0"
              >
                <ul className="rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 text-sm relative bg-white dark:bg-neutral-900 py-3 grid space-y-1">
                  {item.children?.map((i) => {
                    if (i.children?.length) {
                      return renderDropdownMenuNavlinkHasChild(i);
                    } else {
                      return (
                        <li
                          key={i.id}
                          className={`px-2 ${i.cssClasses?.join(" ")}`}
                        >
                          {renderDropdownMenuNavlink(i)}
                        </li>
                      );
                    }
                  })}
                </ul>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderDropdownMenuNavlink = (item: NavItemType) => {
    return (
      <Link
        className="flex items-center font-normal text-neutral-600 dark:text-neutral-400 py-2 px-4 rounded-md hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
        href={{
          pathname: item.uri || "",
        }}
      >
        {item.label}
        {item.children?.length ? (
          <ChevronDownIcon
            className="ms-2 h-4 w-4 text-neutral-500"
            aria-hidden="true"
          />
        ) : null}
      </Link>
    );
  };

  // ===================== MENU MAIN MENU =====================
  const renderMainItem = (item: NavItemType) => {
    return (
      <div className="nc-menu-lv1 h-20 flex-shrink-0 flex items-center">
        <Link
          className="relative inline-flex items-center text-sm 2xl:text-[15px] font-medium text-neutral-700 dark:text-neutral-300 py-2.5 px-4 xl:px-5 rounded-xl hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
          href={{
            pathname: item.uri || "",
          }}
        >
          {item.label}
          {item.children?.length ? (
            <ChevronDownIcon
              className="ms-1 -me-1 h-4 w-4 text-neutral-400"
              aria-hidden="true"
            />
          ) : null}
        </Link>
      </div>
    );
  };

  if (menuItem.ncmazfaustMenu?.isMegaMenu) {
    return renderMegaMenu(menuItem);
  }
  return renderDropdownMenu(menuItem);
};

export default NavigationItem;
