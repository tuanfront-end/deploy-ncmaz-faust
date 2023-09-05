import { gql } from "@/__generated__";

export const NC_MUTATION_UPDATE_USER_REACTION_POST_COUNT = gql(/* GraphQL */ `
  mutation MyMutation(
    $number: NcmazFcUserReactionPostNumberUpdateEnum = ADD_1
    $post_id: Int
    $reaction: NcmazFcUserReactionPostActionEnum = LIKE
    $user_id: Int
  ) {
    ncmazFaustUpdateUserReactionPostCount(
      input: {
        number: $number
        post_id: $post_id
        reaction: $reaction
        user_id: $user_id
      }
    ) {
      errors
      new_count
      post_id
      reaction
      result
      user_id
      number
    }
  }
`);

//
//
//

export const NC_MUTATION_CREATE_POST = gql(/* GraphQL */ `
  mutation NC_MUTATION_CREATE_POST(
    $commentStatus: String = "open"
    $status: PostStatusEnum = null
    $title: String = ""
    $excerpt: String = ""
    $ncmazAudioUrl: String = null
    $content: String = ""
    $ncmazVideoUrl: String = null
    $postFormatName: String = null
    $categoryNodes: [PostCategoriesNodeInput] = {}
    $ncTags: String = null
    $date: String = null
    #
    $img_1_url: String = null
    $img_2_url: String = null
    $img_3_url: String = null
    $img_4_url: String = null
    $img_5_url: String = null
    $img_6_url: String = null
    $img_7_url: String = null
    $img_8_url: String = null
    $featuredImg_url: String = null
    #
    $img_1_alt: String = null
    $img_2_alt: String = null
    $img_3_alt: String = null
    $img_4_alt: String = null
    $img_5_alt: String = null
    $img_6_alt: String = null
    $img_7_alt: String = null
    $img_8_alt: String = null
    $featuredImg_alt: String = null
  ) {
    createPost(
      input: {
        status: $status
        date: $date
        commentStatus: $commentStatus
        title: $title
        excerpt: $excerpt
        ncmazAudioUrl: $ncmazAudioUrl
        content: $content
        categories: { append: false, nodes: $categoryNodes }
        ncTags: $ncTags
        ncmazVideoUrl: $ncmazVideoUrl
        postFormats: { nodes: { name: $postFormatName }, append: false }
        #
        ncmazGalleryImg1Url: $img_1_url
        ncmazGalleryImg2Url: $img_2_url
        ncmazGalleryImg3Url: $img_3_url
        ncmazGalleryImg4Url: $img_4_url
        ncmazGalleryImg5Url: $img_5_url
        ncmazGalleryImg6Url: $img_6_url
        ncmazGalleryImg7Url: $img_7_url
        ncmazGalleryImg8Url: $img_8_url
        ncmazFeaturedImgUrl: $featuredImg_url
        #
        ncmazGalleryImg1Alt: $img_1_alt
        ncmazGalleryImg2Alt: $img_2_alt
        ncmazGalleryImg3Alt: $img_3_alt
        ncmazGalleryImg4Alt: $img_4_alt
        ncmazGalleryImg5Alt: $img_5_alt
        ncmazGalleryImg6Alt: $img_6_alt
        ncmazGalleryImg7Alt: $img_7_alt
        ncmazGalleryImg8Alt: $img_8_alt
        ncmazFeaturedImgAlt: $featuredImg_alt
      }
    ) {
      post {
        title
        id
        databaseId
        status
        uri
      }
    }
  }
`);
export const NC_MUTATION_UPDATE_POST = gql(/* GraphQL */ `
  mutation NC_MUTATION_UPDATE_POST(
    $id: ID!
    $commentStatus: String = "open"
    $status: PostStatusEnum = null
    $title: String = ""
    $excerpt: String = ""
    $ncmazAudioUrl: String = null
    $content: String = ""
    $ncmazVideoUrl: String = null
    $postFormatName: String = null
    $categoryNodes: [PostCategoriesNodeInput] = {}
    $ncTags: String = null
    $date: String = null
    #
    $img_1_url: String = null
    $img_2_url: String = null
    $img_3_url: String = null
    $img_4_url: String = null
    $img_5_url: String = null
    $img_6_url: String = null
    $img_7_url: String = null
    $img_8_url: String = null
    $featuredImg_url: String = null
    #
    $img_1_alt: String = null
    $img_2_alt: String = null
    $img_3_alt: String = null
    $img_4_alt: String = null
    $img_5_alt: String = null
    $img_6_alt: String = null
    $img_7_alt: String = null
    $img_8_alt: String = null
    $featuredImg_alt: String = null
  ) {
    updatePost(
      input: {
        id: $id
        status: $status
        date: $date
        commentStatus: $commentStatus
        title: $title
        excerpt: $excerpt
        ncmazAudioUrl: $ncmazAudioUrl
        content: $content
        categories: { append: false, nodes: $categoryNodes }
        ncTags: $ncTags
        ncmazVideoUrl: $ncmazVideoUrl
        postFormats: { nodes: { name: $postFormatName }, append: false }
        #
        ncmazGalleryImg1Url: $img_1_url
        ncmazGalleryImg2Url: $img_2_url
        ncmazGalleryImg3Url: $img_3_url
        ncmazGalleryImg4Url: $img_4_url
        ncmazGalleryImg5Url: $img_5_url
        ncmazGalleryImg6Url: $img_6_url
        ncmazGalleryImg7Url: $img_7_url
        ncmazGalleryImg8Url: $img_8_url
        ncmazFeaturedImgUrl: $featuredImg_url
        #
        ncmazGalleryImg1Alt: $img_1_alt
        ncmazGalleryImg2Alt: $img_2_alt
        ncmazGalleryImg3Alt: $img_3_alt
        ncmazGalleryImg4Alt: $img_4_alt
        ncmazGalleryImg5Alt: $img_5_alt
        ncmazGalleryImg6Alt: $img_6_alt
        ncmazGalleryImg7Alt: $img_7_alt
        ncmazGalleryImg8Alt: $img_8_alt
        ncmazFeaturedImgAlt: $featuredImg_alt
      }
    ) {
      post {
        title
        id
        databaseId
        status
        uri
      }
    }
  }
`);

//
//
//
export const MUTATION_ADD_SUBCRIBER_TO_MAILPOET =
  gql(` mutation MyMutationAddSubscriber($listId: String = "", $user_email: String = "", $user_first_name: String = "") {
  ncmazFaustAddSubscriberToMailpoet(
    input: {user_email: $user_email, listId: $listId, user_first_name: $user_first_name}
  ) {
    user_first_name
    user_email
    success
    errors
  }
} `);
