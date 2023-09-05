import { gql } from "@/__generated__";

export const NC_GENERAL_SETTINGS_FIELDS_FRAGMENT = gql(`
	fragment NcgeneralSettingsFieldsFragment on GeneralSettings {
      __typename
      description
      title
	}
`);
