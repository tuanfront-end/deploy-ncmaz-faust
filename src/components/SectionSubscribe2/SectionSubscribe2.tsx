import React, { FC } from "react";
import Badge from "@/components/Badge/Badge";
import MyImage from "../MyImage";
import { NC_SITE_SETTINGS } from "@/contains/site-settings";
import AddSubscriberForm from "../AddSubscriberForm";

export interface SectionSubscribe2Props {
  className?: string;
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {
  if (NC_SITE_SETTINGS.newsletter_section.enable === false) {
    return null;
  }

  return (
    <div
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row items-center ${className}`}
    >
      <div className="flex-shrink-0 mb-14 lg:mb-0 lg:me-10 lg:w-2/5">
        <h2 className="font-semibold text-4xl">
          {NC_SITE_SETTINGS.newsletter_section.title}
        </h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400">
          {NC_SITE_SETTINGS.newsletter_section.description}
        </span>
        <ul className="space-y-5 mt-10">
          {NC_SITE_SETTINGS.newsletter_section.features_list.map(
            (item, index) => (
              <li
                key={index}
                className="flex items-center space-x-4 rtl:space-x-reverse"
              >
                <Badge
                  name={"0" + (index + 1)}
                  color={!index ? "red" : index == 1 ? "indigo" : "green"}
                />
                <span className="font-medium text-neutral-700 dark:text-neutral-300">
                  {item}
                </span>
              </li>
            )
          )}
        </ul>
        <AddSubscriberForm className="mt-10 relative max-w-sm" />
      </div>
      <div className="flex-grow">
        <MyImage
          alt="subsc"
          sizes="(max-width: 768px) 100vw, 50vw"
          src={NC_SITE_SETTINGS.newsletter_section.right_image}
          width={1450}
          height={638}
        />
      </div>
    </div>
  );
};

export default SectionSubscribe2;
