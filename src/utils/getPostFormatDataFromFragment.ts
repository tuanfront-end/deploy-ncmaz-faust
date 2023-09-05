import {
  NcmazFcTagFullFieldsFragmentFragment,
  NcmazFcTagShortFieldsFragmentFragment,
} from "@/__generated__/graphql";
import { FragmentType, useFragment } from "../__generated__";
import {
  NC_POST_FORMAT_FULL_FIELDS_FRAGMENT,
  NC_POST_FORMAT_SHORT_FIELDS_FRAGMENT,
} from "../fragments";

export function getPostFormatDataFromFragment(
  postFormat:
    | FragmentType<typeof NC_POST_FORMAT_FULL_FIELDS_FRAGMENT>
    | FragmentType<typeof NC_POST_FORMAT_SHORT_FIELDS_FRAGMENT>
) {
  let fullquery = useFragment(
    NC_POST_FORMAT_FULL_FIELDS_FRAGMENT,
    postFormat as FragmentType<typeof NC_POST_FORMAT_FULL_FIELDS_FRAGMENT>
  );
  let shortquery = useFragment(
    NC_POST_FORMAT_SHORT_FIELDS_FRAGMENT,
    postFormat as FragmentType<typeof NC_POST_FORMAT_SHORT_FIELDS_FRAGMENT>
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
