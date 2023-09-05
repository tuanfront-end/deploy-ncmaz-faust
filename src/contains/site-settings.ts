// import from file json
import siteSettingsJson from "../../site-settings.json";

export const NC_SITE_SETTINGS = siteSettingsJson;

export const IS_DEV = process.env.NODE_ENV === "development";
export const IS_CHISNGHIAX_DEMO_SITE =
  process.env.NEXT_PUBLIC_IS_CHISNGHIAX_DEMO_SITE === "true";
