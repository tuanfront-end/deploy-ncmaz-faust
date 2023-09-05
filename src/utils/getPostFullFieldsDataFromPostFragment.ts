// import { FragmentType, useFragment } from "../__generated__";
// import {
//   NC_IMAGE_MEDIA_FRAGMENT,
//   NC_IMAGE_MEDIA_HAS_DETAIL_FRAGMENT,
//   NC_POST_FULL_FRAGMENT,
//   NC_POST_META_DATA_FRAGMENT,
// } from "../fragments";

// export function getPostDataFromPostFragment(
//   post: FragmentType<typeof NC_POST_FULL_FRAGMENT>
// ) {
//   let query = useFragment(NC_POST_FULL_FRAGMENT, post);

//   const featuredImage = useFragment(
//     NC_IMAGE_MEDIA_HAS_DETAIL_FRAGMENT,
//     query.featuredImage?.node
//   );
//   //
//   const postFormats = (
//     query.postFormats?.edges?.[0]?.node?.name || ""
//   ).toLowerCase();

//   //
//   const authorFeaturedImage = useFragment(
//     NC_IMAGE_MEDIA_FRAGMENT,
//     query.author?.node.ncUserMeta?.featuredImage?.node
//   );
//   const author = { ...query.author?.node };
//   //
//   const ncPostMetaData = useFragment(
//     NC_POST_META_DATA_FRAGMENT,
//     query.ncPostMetaData
//   );

//   // ncmazGalleryImgs is a list of 8 images
//   const ncmazGalleryImg1 = useFragment(
//     NC_IMAGE_MEDIA_HAS_DETAIL_FRAGMENT,
//     query.ncmazGalleryImgs?.image1?.node
//   );
//   const ncmazGalleryImg2 = useFragment(
//     NC_IMAGE_MEDIA_HAS_DETAIL_FRAGMENT,
//     query.ncmazGalleryImgs?.image2?.node
//   );
//   const ncmazGalleryImg3 = useFragment(
//     NC_IMAGE_MEDIA_HAS_DETAIL_FRAGMENT,
//     query.ncmazGalleryImgs?.image3?.node
//   );
//   const ncmazGalleryImg4 = useFragment(
//     NC_IMAGE_MEDIA_HAS_DETAIL_FRAGMENT,
//     query.ncmazGalleryImgs?.image4?.node
//   );
//   const ncmazGalleryImg5 = useFragment(
//     NC_IMAGE_MEDIA_HAS_DETAIL_FRAGMENT,
//     query.ncmazGalleryImgs?.image5?.node
//   );
//   const ncmazGalleryImg6 = useFragment(
//     NC_IMAGE_MEDIA_HAS_DETAIL_FRAGMENT,
//     query.ncmazGalleryImgs?.image6?.node
//   );
//   const ncmazGalleryImg7 = useFragment(
//     NC_IMAGE_MEDIA_HAS_DETAIL_FRAGMENT,
//     query.ncmazGalleryImgs?.image7?.node
//   );
//   const ncmazGalleryImg8 = useFragment(
//     NC_IMAGE_MEDIA_HAS_DETAIL_FRAGMENT,
//     query.ncmazGalleryImgs?.image8?.node
//   );
//   const ncmazGalleryImgs = [
//     ncmazGalleryImg1,
//     ncmazGalleryImg2,
//     ncmazGalleryImg3,
//     ncmazGalleryImg4,
//     ncmazGalleryImg5,
//     ncmazGalleryImg6,
//     ncmazGalleryImg7,
//     ncmazGalleryImg8,
//   ];
//   //
//   return {
//     ...query,
//     uri: query.uri || "",
//     link: query.link || "",
//     title: query.title || "",
//     excerpt: query.excerpt || "",
//     date: query.date || "",
//     content: query.content || "",
//     postFormats,
//     featuredImage,
//     ncPostMetaData,
//     ncmazGalleryImgs,
//   };
// }
