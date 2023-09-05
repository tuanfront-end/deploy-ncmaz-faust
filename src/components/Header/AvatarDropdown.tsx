"use client";

import { Popover, Transition } from "@/app/headlessui";
import { FC, Fragment, useEffect } from "react";
import Avatar from "@/components/Avatar/Avatar";
import SwitchDarkMode2 from "@/components/SwitchDarkMode/SwitchDarkMode2";
import Link from "next/link";
import {
  BookmarkIcon,
  FingerPrintIcon,
  FireIcon,
  HeartIcon,
  LightBulbIcon,
  PowerIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { useAuth, useLogout } from "@faustwp/core";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useLoginModal } from "@/container/LoginModalProvider";
import { getImageDataFromImageFragment } from "@/utils/getImageDataFromImageFragment";
import { NC_SITE_SETTINGS } from "@/contains/site-settings";
import CircleLoading from "../Loading/CircleLoading";
import { useRouter } from "next/router";

interface Props {
  className?: string;
}
export default function AvatarDropdown({ className = "" }: Props) {
  const { isReady, isAuthenticated } = useAuth();
  const { logout } = useLogout();
  const { viewer } = useSelector((state: RootState) => state.viewer);
  const { openLoginModal } = useLoginModal();
  const router = useRouter();

  useEffect(() => {
    // mot so truong hop ngoai le, can phai reload lai trang
    if (isAuthenticated === false && !!viewer?.databaseId) {
      router.reload();
    }
  }, [isAuthenticated, viewer?.databaseId]);

  const renderAvatar = () => {
    if (!viewer?.databaseId) {
      return null;
    }
    return (
      <Link href={viewer.uri || ""} className="flex items-center">
        <Avatar
          imgUrl={
            getImageDataFromImageFragment(
              viewer?.ncUserMeta?.featuredImage?.node
            ).sourceUrl || ""
          }
          userName={viewer?.name || ""}
          sizeClass="w-12 h-12"
        />

        <div className="flex-grow ms-3">
          <h4 className="font-semibold capitalize">{viewer?.name}</h4>
          <p className="text-xs mt-0.5">{viewer?.email}</p>
        </div>
      </Link>
    );
  };

  const renderMenuEditProfile = () => {
    return (
      <Link
        href={"/dashboard/edit-profile/profile"}
        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
      >
        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
          <UserIcon className="w-6 h-6" />
        </div>
        <div className="ms-4">
          <p className="text-sm font-medium ">{"Edit profile"}</p>
        </div>
      </Link>
    );
  };

  const renderMenuMyPosts = () => {
    return (
      <Link
        href={"/dashboard/posts/published"}
        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
      >
        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
          <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none">
            <path
              d="M8 12.2H15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 16.2H12.38"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 6H14C16 6 16 5 16 4C16 2 15 2 14 2H10C9 2 8 2 8 4C8 6 9 6 10 6Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 4.02002C19.33 4.20002 21 5.43002 21 10V16C21 20 20 22 15 22H9C4 22 3 20 3 16V10C3 5.44002 4.67 4.20002 8 4.02002"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="ms-4">
          <p className="text-sm font-medium ">{"My Posts"}</p>
        </div>
      </Link>
    );
  };

  const renderMenuWishlist = () => {
    return (
      <Link
        href={`/author/${viewer?.slug}/favorites`}
        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
      >
        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
          <HeartIcon className="w-6 h-6" />
        </div>
        <div className="ms-4">
          <p className="text-sm font-medium ">{"Wishlist"}</p>
        </div>
      </Link>
    );
  };

  const renderMenuBookmark = () => {
    return (
      <Link
        href={"/readinglist"}
        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
      >
        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
          <BookmarkIcon className="w-6 h-6" />
        </div>
        <div className="ms-4">
          <span className="text-sm font-medium ">{"Reading list"}</span>
        </div>
      </Link>
    );
  };

  const renderSwitchDarkMode = () => {
    return (
      <div className="flex items-center justify-between p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
        <div className="flex items-center">
          <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
            <LightBulbIcon className="w-6 h-6" />
          </div>
          <div className="ms-4">
            <p className="text-sm font-medium ">{"Dark theme"}</p>
          </div>
        </div>
        <SwitchDarkMode2 />
      </div>
    );
  };

  const renderMenuHelp = () => {
    return (
      <Link
        href={NC_SITE_SETTINGS?.help_page.uri || ""}
        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
        onClick={() => close()}
      >
        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
          <FireIcon className="w-6 h-6" />
        </div>
        <div className="ms-4">
          <p className="text-sm font-medium ">{"Help"}</p>
        </div>
      </Link>
    );
  };

  const renderMenuSignUp = () => {
    return (
      <Link
        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
        href={"/sign-up"}
      >
        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
          <UserPlusIcon className="w-6 h-6" />
        </div>
        <div className="ms-4">
          <span className="text-sm font-medium ">Sign up</span>
        </div>
      </Link>
    );
  };
  const renderMenuLogIn = () => {
    return (
      <button
        type="button"
        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
        onClick={openLoginModal}
      >
        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
          <FingerPrintIcon className="w-6 h-6" />
        </div>
        <div className="ms-4">
          <p className="text-sm font-medium ">Log in</p>
        </div>
      </button>
    );
  };

  const renderMenuLogOut = () => {
    return (
      <button
        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
        onClick={() => logout("/")}
      >
        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
          <PowerIcon className="w-6 h-6" />
        </div>
        <div className="ms-4">
          <p className="text-sm font-medium ">{"Log out"}</p>
        </div>
      </button>
    );
  };

  return (
    <div className={`AvatarDropdown ${className}`}>
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center`}
            >
              <svg
                className=" w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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
              <Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4 mt-3.5 -end-2 sm:end-0 sm:px-0">
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-7 px-6">
                    {(!isReady || (isAuthenticated && !viewer?.databaseId)) && (
                      <div className="my-1 opacity-70">
                        <CircleLoading
                          childClassName="w-6 h-6"
                          className="text-neutral-500 dark:text-neutral-400"
                        />
                      </div>
                    )}

                    {isAuthenticated && renderAvatar()}

                    {isAuthenticated && (
                      <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />
                    )}

                    {/* ------------------ 0 --------------------- */}
                    {isReady && !isAuthenticated && renderMenuSignUp()}
                    {isReady && !isAuthenticated && renderMenuLogIn()}

                    {/* ------------------ 1 --------------------- */}
                    {isAuthenticated && renderMenuEditProfile()}

                    {/* ------------------ 2 --------------------- */}
                    {isAuthenticated && renderMenuMyPosts()}

                    {/* ------------------ 3 --------------------- */}
                    {isAuthenticated && renderMenuWishlist()}

                    {/* ------------------ 4 --------------------- */}
                    {renderMenuBookmark()}

                    <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

                    {/* ------------------ 5 --------------------- */}
                    {renderSwitchDarkMode()}

                    {/* ------------------ 6 --------------------- */}
                    {renderMenuHelp()}

                    {/* ------------------ 7 --------------------- */}
                    {isAuthenticated && renderMenuLogOut()}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
