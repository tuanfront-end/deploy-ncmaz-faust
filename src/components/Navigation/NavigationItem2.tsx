"use client";

import { Popover, Transition } from "@/app/headlessui";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { FC, Fragment } from "react";
import Link from "next/link";
import NcImage from "../NcImage/NcImage";
import { useFragment } from "@/__generated__";
import { NC_PRIMARY_MENU_QUERY_FRAGMENT } from "@/fragments/menu";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import ncFormatDate from "@/utils/formatDate";
import { NavItemType, NavigationItemProps } from "./NavigationItem";
import { NcmazFcPostCardFieldsFragment } from "@/__generated__/graphql";

export interface Props extends NavigationItemProps {}

const NavigationItem2: FC<Props> = ({ menuItem: menuItemProp }) => {
  const menuItem = useFragment(NC_PRIMARY_MENU_QUERY_FRAGMENT, menuItemProp);

  // ===================== MENU MEGAMENU =====================
  const renderMegaMenu = (menu: NavItemType) => {
    if (!menu.children?.length && !menu.ncmazfaustMenu?.posts?.nodes.length) {
      return null;
    }

    let rightSideClass = "";
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
      rightSideClass = "w-[44%]";
      postsColumns = 2;
    } else if (colColumns === 5) {
      rightSideClass = "w-[20%]";
      postsColumns = 1;
    } else if (colColumns >= 6) {
      rightSideClass = "w-[0%] hidden";
      postsColumns = 0;
    }

    return (
      <Popover className="">
        {({ open, close }) => {
          return (
            <div className={menu.cssClasses?.join(" ")}>
              <>{renderPopoverButtonCommon(menu, open)}</>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -z-10 w-full top-0 pt-16 sm:pt-20 inset-x-0 ">
                  <div className="bg-white dark:bg-neutral-900 shadow-lg max-h-[80vh] overflow-auto hiddenScrollbar">
                    <div className="container">
                      <div className="flex gap-6 items-start text-sm border-t border-neutral-200 dark:border-neutral-700 py-14">
                        <div
                          className={`flex-1 grid grid-cols-${colColumns} gap-6 ${
                            colColumns === 0 ? "hidden" : ""
                          }`}
                        >
                          {menu.children?.map((item, index) => (
                            <div
                              key={index}
                              className={item.cssClasses?.join(" ")}
                            >
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
                            className={`grid grid-cols-1 gap-8 sm:gap-6 lg:grid-cols-${postsColumns}`}
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
                                        className="text-sm leading-6 text-neutral-500 dark:text-neutral-400"
                                      >
                                        {ncFormatDate(post.date)}
                                      </time>
                                      <Link
                                        href={
                                          post.categories?.nodes?.[0]?.uri || ""
                                        }
                                        className="relative z-10 rounded-full bg-neutral-50 py-1.5 px-3 text-xs font-medium text-neutral-600 dark:text-neutral-400 dark:bg-neutral-800 dark:hover:bg-neutral-800/80 hover:bg-neutral-100"
                                      >
                                        {post.categories?.nodes?.[0]?.name ||
                                          ""}
                                      </Link>
                                    </div>
                                    <h4 className="mt-2 text-sm font-medium leading-6 text-neutral-900 dark:text-neutral-300">
                                      <Link href={post.uri}>
                                        <span className="absolute inset-0" />
                                        {post.title}
                                      </Link>
                                    </h4>
                                    <div className="mt-2 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                                      <span
                                        className="line-clamp-3"
                                        dangerouslySetInnerHTML={{
                                          __html: post.excerpt,
                                        }}
                                      ></span>
                                    </div>
                                  </div>
                                </article>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </div>
          );
        }}
      </Popover>
    );
  };

  const renderMegaMenuNavlink = (item: NavItemType) => {
    return (
      <li key={item.id} className={item.cssClasses?.join(" ")}>
        <Link
          className="font-normal text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white focus:outline-none focus:ring-0"
          href={{
            pathname: item.uri || "/",
          }}
        >
          {item.label}
        </Link>
      </li>
    );
  };

  // ===================== MENU DROPDOW =====================
  const renderDropdownMenu = (menuDropdown: NavItemType) => {
    return (
      <Popover
        as="li"
        className={`relative focus:outline-none focus:ring-0 ${menuDropdown.cssClasses?.join(
          " "
        )}`}
      >
        {({ close, open }) => (
          <>
            <>{renderPopoverButtonCommon(menuDropdown, open)}</>
            {!!menuDropdown.children?.length && (
              <Transition
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="w-56 top-full absolute z-20 mt-3.5 end-0">
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
            )}
          </>
        )}
      </Popover>
    );
  };

  const renderDropdownMenuNavlinkHasChild = (item: NavItemType) => {
    return (
      <Popover
        as="li"
        className={`relative px-2 ${item.cssClasses?.join(" ")}`}
        key={item.id}
      >
        {() => (
          <>
            <Popover.Button as={Fragment}>
              {renderDropdownMenuNavlink(item)}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-56 left-full pl-2 top-0">
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
        className="flex items-center font-normal text-neutral-600 dark:text-neutral-400 py-2 px-4 rounded-md hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 focus:outline-none focus:ring-0"
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
  const renderPopoverButtonCommon = (menu: NavItemType, open: boolean) => {
    const isNotPopover =
      !menu.children?.length && !menu.ncmazfaustMenu?.isMegaMenu;

    return (
      <Popover.Button
        className={`
      ${open ? "" : "text-opacity-80"} nc-menu-lv1 relative
      group h-10 sm:h-12 px-3 py-1.5 inline-flex items-center text-sm text-neutral-800 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-0`}
        as={isNotPopover ? Link : undefined}
        href={isNotPopover ? menu.uri || "" : ""}
      >
        <span className="">{menu.label}</span>
        {!isNotPopover && (
          <ChevronDownIcon
            className={`${open ? "-rotate-180" : ""}
        ms-1 h-4 w-4 transition ease-in-out duration-150 `}
            aria-hidden="true"
          />
        )}
      </Popover.Button>
    );
  };

  if (menuItem.ncmazfaustMenu?.isMegaMenu) {
    return renderMegaMenu(menuItem);
  }
  return renderDropdownMenu(menuItem);
};

export default NavigationItem2;
