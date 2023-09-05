import React, { FC } from "react";
import { NcDropDownItem } from "../NcDropDown/NcDropDown";

export interface SocialsShareProps {
  className?: string;
  itemClass?: string;
  link: string;
}

export type TSocialShareItem = "Facebook" | "Twitter" | "Linkedin";

interface SocialShareType extends NcDropDownItem<TSocialShareItem> {}

export const SOCIALS_DATA: SocialShareType[] = [
  {
    id: "Facebook",
    name: "Facebook",
    icon: `<svg class="w-5 h-5" fill="currentColor" height="1em" viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/></svg>
  `,
    href: "#",
    isTargetBlank: true,
  },
  {
    id: "Twitter",
    name: "Twitter",
    icon: `<svg class="w-5 h-5" fill="currentColor" height="1em" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
  `,
    href: "#",
    isTargetBlank: true,
  },
  {
    id: "Linkedin",
    name: "Linkedin",
    icon: `<svg class="w-5 h-5" fill="currentColor" height="1em" viewBox="0 0 448 512"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/></svg>
  `,
    href: "#",
    isTargetBlank: true,
  },
];

const SocialsShare: FC<SocialsShareProps> = ({
  className = "grid gap-[6px]",
  itemClass = "w-7 h-7 text-base hover:bg-neutral-100",
  link = "",
}) => {
  const actions = SOCIALS_DATA.map((item) => {
    if (item.id === "Facebook") {
      item.href = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
    } else if (item.id === "Twitter") {
      item.href = `https://twitter.com/intent/tweet?url=${link}`;
    } else if (item.id === "Linkedin") {
      item.href = `https://www.linkedin.com/shareArticle?mini=true&url=${link}`;
    }
    return item;
  });

  const renderItem = (item: SocialShareType, index: number) => {
    return (
      <a
        key={index}
        href={item.href}
        className={`rounded-full leading-none flex items-center justify-center text-neutral-600 ${itemClass} `}
        title={`Share on ${item.name}`}
      >
        <div dangerouslySetInnerHTML={{ __html: item.icon }}></div>
      </a>
    );
  };

  return (
    <div className={`nc-SocialsShare ${className}`}>
      {actions.map(renderItem)}
    </div>
  );
};

export default SocialsShare;
