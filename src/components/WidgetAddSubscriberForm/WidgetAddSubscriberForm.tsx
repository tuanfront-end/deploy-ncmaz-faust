import React, { FC } from "react";
import AddSubscriberForm from "../AddSubscriberForm";
import WidgetHeading1 from "../WidgetHeading1/WidgetHeading1";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { NC_SITE_SETTINGS } from "@/contains/site-settings";

interface Props {
  className?: string;
}

const WidgetAddSubscriberForm: FC<Props> = ({
  className = "rounded-3xl border border-neutral-100 dark:border-neutral-700",
}) => {
  if (NC_SITE_SETTINGS.subcription_widget.enable === false) {
    return null;
  }

  return (
    <div className={`nc-WidgetAddSubscriberForm overflow-hidden ${className}`}>
      <WidgetHeading1
        title={NC_SITE_SETTINGS.subcription_widget.title}
        icon={<EnvelopeIcon className="h-6 w-6 flex-none" />}
      />
      <div className="p-4 xl:p-5">
        <span className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
          {NC_SITE_SETTINGS.subcription_widget.description}
        </span>
        <div className="mt-4">
          <AddSubscriberForm />
        </div>
      </div>
    </div>
  );
};

export default WidgetAddSubscriberForm;
