import { FragmentType, useFragment } from "../__generated__";
import {
  NC_IMAGE_MEDIA_HAS_DETAIL_FRAGMENT,
  NC_IMAGE_MEDIA_FRAGMENT,
} from "../fragments";

export function getImageDataFromImageFragment(
  image?:
    | FragmentType<typeof NC_IMAGE_MEDIA_HAS_DETAIL_FRAGMENT>
    | FragmentType<typeof NC_IMAGE_MEDIA_FRAGMENT>
) {
  const featuredImage = useFragment(
    NC_IMAGE_MEDIA_HAS_DETAIL_FRAGMENT,
    image as FragmentType<typeof NC_IMAGE_MEDIA_HAS_DETAIL_FRAGMENT>
  );

  return {
    ...featuredImage,
    sourceUrl: featuredImage?.sourceUrl || "",
    altText: featuredImage?.altText || "",
    caption: featuredImage?.caption || "",
  };
}
