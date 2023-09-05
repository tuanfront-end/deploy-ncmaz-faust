import React, { FC } from "react";
import Logo from "../Logo/Logo";
import Link from "next/link";
import { NC_SITE_SETTINGS } from "@/contains/site-settings";

interface Props {
  className?: string;
  title?: string | null;
  description?: string | null;
}

const Brand: FC<Props> = ({
  description,
  title,
  className = "flex-shrink-0",
}) => {
  if (!!NC_SITE_SETTINGS.site_info.site_logo) {
    return (
      <div className={className}>
        <Logo />
        <div>
          <span className="sr-only">{title}</span>
          {description && <span className="sr-only">{description}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <Link href="/">{title}</Link>
      {description && <p>{description}</p>}
    </div>
  );
};

export default Brand;
