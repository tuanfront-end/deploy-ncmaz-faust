import {
  NcmazFcTagFullFieldsFragmentFragment,
  NcmazFcTagShortFieldsFragmentFragment,
} from "@/__generated__/graphql";
import { FragmentType, useFragment } from "../__generated__";
import {
  NC_TAG_FULL_FIELDS_FRAGMENT,
  NC_TAG_SHORT_FIELDS_FRAGMENT,
} from "../fragments";

export function getTagDataFromTagFragment(
  tag:
    | FragmentType<typeof NC_TAG_FULL_FIELDS_FRAGMENT>
    | FragmentType<typeof NC_TAG_SHORT_FIELDS_FRAGMENT>
) {
  let fullquery = useFragment(
    NC_TAG_FULL_FIELDS_FRAGMENT,
    tag as FragmentType<typeof NC_TAG_FULL_FIELDS_FRAGMENT>
  );
  let shortquery = useFragment(
    NC_TAG_SHORT_FIELDS_FRAGMENT,
    tag as FragmentType<typeof NC_TAG_SHORT_FIELDS_FRAGMENT>
  );

  const data: NcmazFcTagFullFieldsFragmentFragment &
    NcmazFcTagShortFieldsFragmentFragment = {
    __typename: "Tag",
    databaseId: shortquery.databaseId || 0,
    count: fullquery.count || 0,
    description: fullquery.description || "",
    name: shortquery.name || "",
    uri: shortquery.uri || "",
  };

  return {
    ...data,
    uri: data.uri || "",
    name: data.name || "",
    count: data.count || 0,
  };
}
