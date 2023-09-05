import { gql } from "../__generated__";

// TAG =================================================
export const NC_TAG_SHORT_FIELDS_FRAGMENT = gql(/* GraphQL */ `
  fragment NcmazFcTagShortFieldsFragment on Tag {
    __typename
    name
    uri
    databaseId
    count
  }
`);
export const NC_TAG_FULL_FIELDS_FRAGMENT = gql(/* GraphQL */ `
  fragment NcmazFcTagFullFieldsFragment on Tag {
    ...NcmazFcTagShortFieldsFragment
    description
    count
  }
`);

// CATEGORY =================================================
export const NC_CATEGORY_FULL_FIELDS_FRAGMENT = gql(/* GraphQL */ `
  fragment NcmazFcCategoryFullFieldsFragment on Category {
    __typename
    databaseId
    description
    name
    uri
    count
    ncTaxonomyMeta {
      color
      featuredImage {
        node {
          ...NcmazFcImageFields
        }
      }
    }
  }
`);
export const NC_CATEGORY_CARD_FIELD_NOT_IMAGE_FRAGMENT = gql(/* GraphQL */ `
  fragment NcmazFcCategoryCardFieldsNotImage on Category {
    __typename
    name
    uri
    count
    databaseId
    ncTaxonomyMeta {
      color
    }
  }
`);

// POST FORMAT =================================================
export const NC_POST_FORMAT_SHORT_FIELDS_FRAGMENT = gql(/* GraphQL */ `
  fragment NcmazFcPostFormatShortFieldsFragment on PostFormat {
    __typename
    name
    uri
    databaseId
    count
  }
`);
export const NC_POST_FORMAT_FULL_FIELDS_FRAGMENT = gql(/* GraphQL */ `
  fragment NcmazFcPostFormatFullFieldsFragment on PostFormat {
    ...NcmazFcPostFormatShortFieldsFragment
    description
    count
  }
`);

// POSTS =================================================
export const NC_POST_FULL_FRAGMENT = gql(/* GraphQL */ `
  fragment NcmazFcPostFullFields on Post {
    __typename
    uri
    modified
    date
    commentStatus
    status
    commentCount
    excerpt
    databaseId
    title
    content
    author {
      node {
        description
        ...NcmazFcUserShortForPostCardFragment
      }
    }
    categories {
      nodes {
        ...NcmazFcCategoryCardFieldsNotImage
      }
    }
    tags(first: 20) {
      nodes {
        ...NcmazFcTagShortFieldsFragment
      }
    }
    featuredImage {
      node {
        ...NcmazFcImageHasDetailFields
      }
    }
    postFormats {
      nodes {
        id
        name
        slug
      }
    }
    ncmazVideoUrl {
      videoUrl
    }
    ncmazAudioUrl {
      audioUrl
    }
    ncPostMetaData {
      ...NcmazFcPostMetaFullFields
    }
    ncmazGalleryImgs {
      image1 {
        node {
          ...NcmazFcImageHasDetailFields
        }
      }
      image2 {
        node {
          ...NcmazFcImageHasDetailFields
        }
      }
      image3 {
        node {
          ...NcmazFcImageHasDetailFields
        }
      }
      image4 {
        node {
          ...NcmazFcImageHasDetailFields
        }
      }
      image5 {
        node {
          ...NcmazFcImageHasDetailFields
        }
      }
      image6 {
        node {
          ...NcmazFcImageHasDetailFields
        }
      }
      image7 {
        node {
          ...NcmazFcImageHasDetailFields
        }
      }
      image8 {
        node {
          ...NcmazFcImageHasDetailFields
        }
      }
    }
  }
`);
export const NC_POST_CARD_FRAGMENT = gql(/* GraphQL */ `
  fragment NcmazFcPostCardFields on Post {
    ...NcmazFcPostCardFieldsNOTNcmazGalleryImgs
    ncmazGalleryImgs {
      image1 {
        node {
          ...NcmazFcImageFields
        }
      }
      image2 {
        node {
          ...NcmazFcImageFields
        }
      }
      image3 {
        node {
          ...NcmazFcImageFields
        }
      }
      image4 {
        node {
          ...NcmazFcImageFields
        }
      }
      image5 {
        node {
          ...NcmazFcImageFields
        }
      }
      image6 {
        node {
          ...NcmazFcImageFields
        }
      }
      image7 {
        node {
          ...NcmazFcImageFields
        }
      }
      image8 {
        node {
          ...NcmazFcImageFields
        }
      }
    }
  }
`);
export const NC_POST_CARD_NOT_NCMAZGALLERY_FRAGMENT = gql(/* GraphQL */ `
  fragment NcmazFcPostCardFieldsNOTNcmazGalleryImgs on Post {
    __typename
    databaseId
    title
    uri
    status
    modified
    date
    commentStatus
    commentCount
    excerpt
    author {
      node {
        ...NcmazFcUserShortForPostCardFragment
      }
    }
    categories {
      nodes {
        ...NcmazFcCategoryCardFieldsNotImage
      }
    }
    featuredImage {
      node {
        ...NcmazFcImageFields
      }
    }
    postFormats {
      nodes {
        name
        slug
      }
    }
    ncmazVideoUrl {
      videoUrl
    }
    ncmazAudioUrl {
      audioUrl
    }
    ncPostMetaData {
      ...NcmazFcPostMetaFields
    }
  }
`);

export const NC_POST_CARD_NOT_NCMAZ_MEDIA_FRAGMENT = gql(/* GraphQL */ `
  fragment PostCardFieldsNOTNcmazMEDIA on Post {
    __typename
    databaseId
    title
    uri
    status
    modified
    date
    commentStatus
    commentCount
    excerpt
    author {
      node {
        ...NcmazFcUserShortForPostCardFragment
      }
    }
    categories {
      nodes {
        ...NcmazFcCategoryCardFieldsNotImage
      }
    }
    featuredImage {
      node {
        ...NcmazFcImageFields
      }
    }
    postFormats {
      nodes {
        name
        slug
      }
    }
    ncPostMetaData {
      ...NcmazFcPostMetaFields
    }
  }
`);

// MEDIA =================================================
export const NC_IMAGE_MEDIA_FRAGMENT = gql(/* GraphQL */ `
  fragment NcmazFcImageFields on MediaItem {
    __typename
    altText
    databaseId
    sourceUrl
  }
`);
export const NC_IMAGE_MEDIA_HAS_DETAIL_FRAGMENT = gql(/* GraphQL */ `
  fragment NcmazFcImageHasDetailFields on MediaItem {
    __typename
    altText
    databaseId
    sourceUrl
    caption
    mediaDetails {
      height
      width
    }
  }
`);

//  POSTS METADATA =================================================
export const NC_POST_META_DATA_FRAGMENT = gql(/* GraphQL */ `
  fragment NcmazFcPostMetaFields on NcPostMetaData {
    __typename
    viewsCount
    readingTime
    likesCount
  }
`);
export const NC_POST_META_DATA_FULL_FRAGMENT = gql(/* GraphQL */ `
  fragment NcmazFcPostMetaFullFields on NcPostMetaData {
    __typename
    viewsCount
    readingTime
    likesCount
    savedsCount
    showRightSidebar
    template
  }
`);

// USER   =================================================
export const NC_USER_SHORT_FOR_POST_CARD_FRAGMENT = gql(/* GraphQL */ `
  fragment NcmazFcUserShortForPostCardFragment on User {
    databaseId
    uri
    username
    name
    ncUserMeta {
      featuredImage {
        node {
          ...NcmazFcImageFields
        }
      }
    }
  }
`);

export const NC_USER_FULL_FIELDS_FRAGMENT = gql(/* GraphQL */ `
  fragment NcmazFcUserFullFields on User {
    id
    databaseId
    uri
    username
    name
    description
    ncUserMeta {
      buymeacoffeUrl
      color
      facebookUrl
      githubUrl
      instagramUrl
      linkedinUrl
      mediumUrl
      ncBio
      pinterestUrl
      twitchUrl
      twitterUrl
      vimeoUrl
      websiteUrl
      youtubeUrl
      tiktokUrl
      featuredImage {
        node {
          ...NcmazFcImageFields
        }
      }
      backgroundImage {
        node {
          ...NcmazFcImageFields
        }
      }
    }
  }
`);
