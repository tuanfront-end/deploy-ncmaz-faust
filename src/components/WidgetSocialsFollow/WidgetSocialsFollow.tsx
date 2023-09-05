import React, { FC } from "react";
import MyImage from "../MyImage";
import WidgetHeading1 from "../WidgetHeading1/WidgetHeading1";
import { NC_SITE_SETTINGS } from "@/contains/site-settings";

const socials = NC_SITE_SETTINGS.site_socials;

interface WidgetSocialsFollowProps {
  className?: string;
}

const WidgetSocialsFollow: FC<WidgetSocialsFollowProps> = ({
  className = "rounded-3xl border border-neutral-100 dark:border-neutral-700",
}) => {
  return (
    <div className={`nc-WidgetSocialsFollow overflow-hidden ${className}`}>
      <WidgetHeading1 title="🧬 We are on socials" />
      <div className="grid grid-cols-2">
        {socials.map((social, idex) => (
          <a
            key={idex}
            className="flex gap-3 items-center p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="relative mt-1 flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full shadow-lg shadow-neutral-800/5 ring-1 ring-neutral-900/5 dark:border dark:border-neutral-700/50 dark:bg-neutral-400 dark:ring-0">
              <MyImage
                src={social.icon}
                alt={social.name}
                width={
                  social.name === "twitter" || social.name === "tiktok"
                    ? 30
                    : 36
                }
                height={
                  social.name === "twitter" || social.name === "tiktok"
                    ? 30
                    : 36
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="w-full flex-none text-sm font-medium text-neutral-900 dark:text-neutral-100 capitalize">
                {social.name}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                <span className="line-clamp-1"> {social.description}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default WidgetSocialsFollow;
