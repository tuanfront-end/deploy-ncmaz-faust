"use client";

import { FragmentType, useFragment } from "@/__generated__";
import AccountActionDropdown from "@/components/AccountActionDropdown/AccountActionDropdown";
import Avatar from "@/components/Avatar/Avatar";
import NcImage from "@/components/NcImage/NcImage";
import SocialsList, {
  TSocialsItem,
} from "@/components/SocialsList/SocialsList";
import SocialsShareDropdown from "@/components/SocialsShareDropdown/SocialsShareDropdown";
import { NC_USER_FULL_FIELDS_FRAGMENT } from "@/fragments";
import { getImageDataFromImageFragment } from "@/utils/getImageDataFromImageFragment";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { FC } from "react";

interface Props {
  className?: string;
  children?: React.ReactNode;
  user: FragmentType<typeof NC_USER_FULL_FIELDS_FRAGMENT>;
}

const AuthorLayout: FC<Props> = ({ className = "", children, user }) => {
  const { databaseId, description, name, ncUserMeta } = useFragment(
    NC_USER_FULL_FIELDS_FRAGMENT,
    user || {}
  );
  const router = useRouter();
  const authorSlug = router.query.slug as string;

  const {
    buymeacoffeUrl,
    facebookUrl,
    githubUrl,
    instagramUrl,
    linkedinUrl,
    mediumUrl,
    pinterestUrl,
    tiktokUrl,
    twitchUrl,
    twitterUrl,
    vimeoUrl,
    youtubeUrl,
  } = ncUserMeta || {};

  let userSocials: TSocialsItem[] = [
    {
      name: "Facebook",
      href: ncUserMeta?.facebookUrl || "",
      icon: (
        <svg
          fill="currentColor"
          className="w-5 h-5"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: ncUserMeta?.twitterUrl || "",
      icon: (
        <svg
          fill="currentColor"
          className="w-5 h-5"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: ncUserMeta?.instagramUrl || "",
      icon: (
        <svg
          fill="currentColor"
          className="w-5 h-5"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
        </svg>
      ),
    },
    {
      name: "Youtube",
      href: ncUserMeta?.youtubeUrl || "",
      icon: (
        <svg
          fill="currentColor"
          className="w-5 h-5"
          height="1em"
          viewBox="0 0 576 512"
        >
          <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
        </svg>
      ),
    },
    {
      name: "Linkedin",
      href: ncUserMeta?.linkedinUrl || "",
      icon: (
        <svg
          fill="currentColor"
          className="w-5 h-5"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
        </svg>
      ),
    },
    {
      name: "Tiktok",
      href: ncUserMeta?.tiktokUrl || "",
      icon: (
        <svg
          fill="currentColor"
          className="w-5 h-5"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
        </svg>
      ),
    },
    {
      name: "Twitch",
      href: ncUserMeta?.twitchUrl || "",
      icon: (
        <svg
          fill="currentColor"
          className="w-5 h-5"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M391.17,103.47H352.54v109.7h38.63ZM285,103H246.37V212.75H285ZM120.83,0,24.31,91.42V420.58H140.14V512l96.53-91.42h77.25L487.69,256V0ZM449.07,237.75l-77.22,73.12H294.61l-67.6,64v-64H140.14V36.58H449.07Z" />
        </svg>
      ),
    },
    {
      name: "Vimeo",
      href: ncUserMeta?.vimeoUrl || "",
      icon: (
        <svg
          fill="currentColor"
          className="w-5 h-5"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M447.8 153.6c-2 43.6-32.4 103.3-91.4 179.1-60.9 79.2-112.4 118.8-154.6 118.8-26.1 0-48.2-24.1-66.3-72.3C100.3 250 85.3 174.3 56.2 174.3c-3.4 0-15.1 7.1-35.2 21.1L0 168.2c51.6-45.3 100.9-95.7 131.8-98.5 34.9-3.4 56.3 20.5 64.4 71.5 28.7 181.5 41.4 208.9 93.6 126.7 18.7-29.6 28.8-52.1 30.2-67.6 4.8-45.9-35.8-42.8-63.3-31 22-72.1 64.1-107.1 126.2-105.1 45.8 1.2 67.5 31.1 64.9 89.4z" />
        </svg>
      ),
    },
    {
      name: "Pinterest",
      href: ncUserMeta?.pinterestUrl || "",
      icon: (
        <svg
          fill="currentColor"
          className="w-5 h-5"
          height="1em"
          viewBox="0 0 496 512"
        >
          <path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z" />
        </svg>
      ),
    },
    {
      name: "Medium",
      href: ncUserMeta?.mediumUrl || "",
      icon: (
        <svg
          fill="currentColor"
          className="w-5 h-5"
          height="1em"
          viewBox="0 0 640 512"
        >
          <path d="M180.5,74.262C80.813,74.262,0,155.633,0,256S80.819,437.738,180.5,437.738,361,356.373,361,256,280.191,74.262,180.5,74.262Zm288.25,10.646c-49.845,0-90.245,76.619-90.245,171.095s40.406,171.1,90.251,171.1,90.251-76.619,90.251-171.1H559C559,161.5,518.6,84.908,468.752,84.908Zm139.506,17.821c-17.526,0-31.735,68.628-31.735,153.274s14.2,153.274,31.735,153.274S640,340.631,640,256C640,171.351,625.785,102.729,608.258,102.729Z" />
        </svg>
      ),
    },
    {
      name: "Github",
      href: ncUserMeta?.githubUrl || "",
      icon: (
        <svg
          fill="currentColor"
          className="w-5 h-5"
          height="1em"
          viewBox="0 0 496 512"
        >
          <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
        </svg>
      ),
    },
  ];

  userSocials = userSocials.filter((item) => !!item.href);

  return (
    <div className="">
      {/* HEADER */}
      <div className="w-full">
        <div className="relative w-full h-40 md:h-60 2xl:h-72">
          {ncUserMeta?.backgroundImage?.node ? (
            <NcImage
              alt={
                getImageDataFromImageFragment(ncUserMeta?.backgroundImage?.node)
                  .altText || ""
              }
              containerClassName="absolute inset-0"
              sizes="(max-width: 1280px) 100vw, 1536px"
              src={
                getImageDataFromImageFragment(ncUserMeta?.backgroundImage?.node)
                  .sourceUrl
              }
              className="object-cover w-full h-full"
              fill
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-200/70 dark:bg-black/40" />
          )}
        </div>
        <div className="container -mt-10 lg:-mt-16">
          <div className="relative bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-3xl md:rounded-[40px] shadow-xl flex flex-col md:flex-row gap-2 sm:gap-5 md:gap-8 lg:gap-10 xl:gap-12">
            <Avatar
              userName={name || "t"}
              imgUrl={
                getImageDataFromImageFragment(ncUserMeta?.featuredImage?.node)
                  .sourceUrl
              }
              sizeClass="w-20 h-20 text-xl sm:text-3xl lg:text-4xl lg:w-36 lg:h-36 ring-4 ring-white dark:ring-0 shadow-2xl z-0"
              priority
              sizes="150px"
            />

            {/*  */}
            <div className="flex-grow">
              <div className="max-w-screen-sm space-y-3.5 ">
                <h2 className="inline-flex items-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
                  <span>{name}</span>
                </h2>
                <span className="block text-sm text-neutral-500 dark:text-neutral-400">
                  {description}
                </span>
                {!!ncUserMeta?.websiteUrl && (
                  <a
                    href={ncUserMeta?.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-xs font-medium space-x-2.5 rtl:space-x-reverse cursor-pointer text-neutral-500 dark:text-neutral-400 truncate"
                  >
                    <GlobeAltIcon className="flex-shrink-0 w-4 h-4" />
                    <span className="text-neutral-700 dark:text-neutral-300 truncate">
                      {ncUserMeta?.websiteUrl}
                    </span>
                  </a>
                )}
                <SocialsList socials={userSocials} />
              </div>
            </div>

            {/*  */}
            <div className="absolute start-auto top-5 end-5 flex justify-end gap-2">
              <SocialsShareDropdown sizeClass="w-10 h-10" />

              <AccountActionDropdown
                authorSlug={authorSlug}
                containerClassName="h-10 w-10 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                userDatabaseId={databaseId}
              />
            </div>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      {children}
    </div>
  );
};

export default AuthorLayout;
