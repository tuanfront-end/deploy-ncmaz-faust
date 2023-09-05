import React, { FC, ReactNode } from "react";

export interface TSocialsItem {
  name: string;
  href: string;
  icon: ReactNode;
}

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  socials?: TSocialsItem[];
}

const socialsDemo: TSocialsItem[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    icon: <div></div>,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/",
    icon: <div></div>,
  },
];

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block",
  socials = socialsDemo,
}) => {
  return (
    <div
      className={`nc-SocialsList flex flex-wrap gap-4 text-neutral-600 dark:text-neutral-300 ${className}`}
    >
      {socials.map((item, i) =>
        item.href ? (
          <a
            key={i}
            className={`${itemClass}`}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name}
          >
            {item.icon}
          </a>
        ) : null
      )}
    </div>
  );
};

export default SocialsList;
