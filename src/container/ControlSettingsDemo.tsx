import React, { FC, Fragment, useEffect, useState } from "react";
import {
  ShoppingBagIcon as ShoppingCartIcon,
  Cog8ToothIcon as CogIcon,
} from "@heroicons/react/24/outline";
import { Popover, Transition } from "@headlessui/react";
import SwitchDarkMode2 from "@/components/SwitchDarkMode/SwitchDarkMode2";
import { useRouter } from "next/router";
import Link from "next/link";

const ControlSettingsDemo = () => {
  // FOR OUR DEMO PAGE, use do not use this, you can delete it.
  const [themeDir, setThemeDIr] = useState<"rtl" | "ltr">("ltr");

  const router = useRouter();

  useEffect(() => {
    if (themeDir === "rtl") {
      document.querySelector("html")?.setAttribute("dir", "rtl");
    } else {
      document.querySelector("html")?.removeAttribute("dir");
    }
    return () => {
      document.querySelector("html")?.removeAttribute("dir");
    };
  }, [themeDir]);

  const renderRadioThemeDir = () => {
    return (
      <div>
        <span className="text-sm font-medium">Theme dir</span>
        <div className="mt-1.5 flex items-center space-x-2 rtl:space-x-reverse">
          {(["rtl", "ltr"] as ("rtl" | "ltr")[]).map((dir) => {
            return (
              <div
                key={dir}
                className={`py-1.5 px-3.5 flex items-center rounded-full font-medium text-xs cursor-pointer select-none uppercase ${
                  themeDir === dir
                    ? "bg-black dark:bg-neutral-200 text-white dark:text-black shadow-black/10 shadow-lg"
                    : "border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500"
                }`}
                onClick={() => setThemeDIr(dir)}
              >
                {dir}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderRadioHomePages = () => {
    return (
      <div>
        <span className="text-sm font-medium">Home demos</span>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {[
            { name: "Home 1", uri: "/" },
            { name: "Home 2", uri: "/home-2" },
            { name: "Home 3", uri: "/home-3-podcast" },
            { name: "Home 4", uri: "/home-4-video" },
            { name: "Home 5", uri: "/home-5-gallery" },
            { name: "Home 6", uri: "/home-6" },
          ].map((page) => {
            const isPage = router.asPath === page.uri;
            return (
              <Link
                href={page.uri}
                key={page.uri}
                className={`py-1.5 px-3.5 flex items-center rounded-full font-medium text-xs cursor-pointer select-none capitalize ${
                  isPage
                    ? "bg-black dark:bg-neutral-200 text-white dark:text-black shadow-black/10 shadow-lg"
                    : "border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500"
                }`}
              >
                {page.name}
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  const renderControlSelections = () => {
    return (
      <div className="ControlSelections relative z-50 hidden md:block">
        <div className="fixed end-3 top-1/4 z-50 flex items-center">
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={`p-2.5 bg-white hover:bg-neutral-100 dark:bg-primary-600 dark:hover:bg-primary-700 rounded-xl shadow-xl border border-neutral-200 dark:border-primary-600 z-10 focus:outline-none ${
                    open ? " focus:ring-2 ring-primary-500" : ""
                  }`}
                >
                  <CogIcon className="w-8 h-8" />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute end-0 z-10 mt-3 w-screen max-w-sm">
                    <div className="rounded-2xl bg-white dark:bg-neutral-950 overflow-hidden nc-custom-shadow-1">
                      <div className="relative p-6 space-y-3.5 xl:space-y-5">
                        <span className="text-xl font-semibold">Customize</span>
                        <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
                        {renderRadioThemeDir()}
                        <div className="flex space-x-2 xl:space-x-4 rtl:space-x-reverse">
                          <span className="text-sm font-medium">Dark mode</span>
                          <SwitchDarkMode2 />
                        </div>

                        {renderRadioHomePages()}
                      </div>
                      <div className="bg-gray-50 dark:bg-white/5 p-5">
                        <a
                          className="flex items-center justify-center w-full px-4 py-2 !rounded-xl text-sm font-medium bg-primary-600 text-white hover:bg-primary-700"
                          href={"#"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ShoppingCartIcon className="w-4 h-4" />
                          <span className="ms-2">Buy this template</span>
                        </a>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </div>
    );
  };

  return <>{renderControlSelections()}</>;
};

export default ControlSettingsDemo;
