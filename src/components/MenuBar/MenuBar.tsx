"use client";
import React, { useState, Fragment, useEffect } from "react";
import { Transition } from "@/app/headlessui";
import NavMobile from "@/components/Navigation/NavMobile";
import { usePathname } from "next/navigation";
import { FragmentType } from "@/__generated__";
import { NC_PRIMARY_MENU_QUERY_FRAGMENT } from "@/fragments/menu";

export interface MenuBarProps {
  menuItems: FragmentType<typeof NC_PRIMARY_MENU_QUERY_FRAGMENT>[];
}
const MenuBar: React.FC<MenuBarProps> = ({ menuItems }) => {
  const [isVisable, setIsVisable] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsVisable(false);
  }, [pathname]);

  const handleOpenMenu = () => setIsVisable(true);
  const handleCloseMenu = () => setIsVisable(false);

  const renderContent = () => {
    return (
      <Transition show={isVisable} as={Fragment}>
        <div className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter=" duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave=" duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-neutral-900 bg-opacity-50 "
              onClick={handleCloseMenu}
            />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition duration-100 transform"
            enterFrom="opacity-0 -translate-x-14 rtl:translate-x-14"
            enterTo="opacity-100 translate-x-0"
            leave="transition duration-150 transform"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 -translate-x-14 rtl:translate-x-14"
          >
            <div className="fixed inset-y-0 start-0 w-screen max-w-sm overflow-y-auto z-50">
              <div className="flex min-h-full">
                <div className="w-full max-w-sm overflow-hidden transition-all">
                  <NavMobile
                    menuItems={menuItems}
                    onClickClose={handleCloseMenu}
                  />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    );
  };

  return (
    <div>
      <button
        onClick={() => {
          setIsVisable(!isVisable);
        }}
        className="p-2.5 rounded-lg text-neutral-700 dark:text-neutral-300 focus:outline-none flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {renderContent()}
    </div>
  );
};

export default MenuBar;
