import { gql } from "@/__generated__";

//
export const GET_SITE_VIEWER = gql(/* GraphQL */ `
  query GetViewerData {
    viewer {
      id
      capabilities
      url
      uri
      username
      slug
      name
      email
      description
      databaseId
      ncUserMeta {
        ncBio
        featuredImage {
          node {
            ...NcmazFcImageFields
          }
        }
      }
      roles {
        edges {
          node {
            id
            name
            isRestricted
            displayName
          }
        }
      }
    }
  }
`);

export const QUERY_GET_POSTS_BY = gql(/* GraphQL */ `
  query QueryGetPostsBy(
    $in: [ID] = null
    $first: Int = 20
    $after: String = null
    $author: Int = null
    $categoryId: Int = null
    $categoryName: String = null
    $tagId: String = null
    $day: Int = null
    $month: Int = null
    $year: Int = null
    $search: String = ""
    $field: PostObjectsConnectionOrderbyEnum = DATE
    $order: OrderEnum = DESC
  ) {
    posts(
      first: $first
      after: $after
      where: {
        in: $in
        author: $author
        categoryId: $categoryId
        categoryName: $categoryName
        tagId: $tagId
        dateQuery: { day: $day, month: $month, year: $year }
        search: $search
        orderby: { field: $field, order: $order }
      }
    ) {
      nodes {
        ...NcmazFcPostCardFields
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export const QUERY_GET_USER_REACTION_POSTS_BY_AUTHOR_AND_SEARCH =
  gql(/* GraphQL */ `
    query QueryGetUserReactionPostsByAuthorAndSearch(
      $first: Int = 400
      $author: Int = null
      $authorName: String = ""
      $search: String = ""
      $after: String = ""
    ) {
      userReactionPosts(
        first: $first
        where: {
          author: $author
          authorName: $authorName
          search: $search
          orderby: { field: DATE, order: DESC }
        }
        after: $after
      ) {
        nodes {
          databaseId
          title
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `);

export const NC_COMMENT_FULL_FRAGMENT = gql(/* GraphQL */ `
  fragment NcmazFcCommentFullFields on Comment {
    __typename
    status
    parentId
    parentDatabaseId
    id
    date
    databaseId
    content
    author {
      node {
        ... on User {
          id
          databaseId
          uri
          url
          name
          ncUserMeta {
            featuredImage {
              node {
                ...NcmazFcImageFields
              }
            }
          }
        }
        ... on CommentAuthor {
          id
          name
          databaseId
          url
          avatar {
            url
            default
          }
        }
      }
    }
  }
`);

export const QUERY_GET_COMMENTS_BY_POST_ID = gql(/* GraphQL */ `
  query QueryGetCommentsByPostId(
    $after: String
    $first: Int = 10
    $order: OrderEnum = ASC
    $orderby: CommentsConnectionOrderbyEnum = COMMENT_DATE_GMT
    $includeUnapproved: [ID]
    $contentId: ID
  ) {
    comments(
      first: $first
      after: $after
      where: {
        order: $order
        orderby: $orderby
        includeUnapproved: $includeUnapproved
        contentId: $contentId
      }
    ) {
      nodes {
        ...NcmazFcCommentFullFields
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);

export const QUERY_MUTATION_CREATE_COMMENT = gql(/* GraphQL */ `
  mutation MutationCreateComment(
    $author: String = null
    $parent: ID = null
    $status: CommentStatusEnum = APPROVE
    $content: String = null
    $commentOn: Int = null
    $authorEmail: String = null
    $approved: String = null
    $authorUrl: String = null
  ) {
    createComment(
      input: {
        author: $author
        status: $status
        parent: $parent
        content: $content
        commentOn: $commentOn
        approved: $approved
        authorEmail: $authorEmail
        authorUrl: $authorUrl
      }
    ) {
      clientMutationId
      success
      comment {
        ...NcmazFcCommentFullFields
      }
    }
  }
`);

export const QUERY_MUTATION_DELETE_COMMENT_BY_ID = gql(/* GraphQL */ `
  mutation MutationDeleteCommentById($id: ID = "") {
    deleteComment(input: { id: $id }) {
      deletedId
      comment {
        databaseId
      }
    }
  }
`);

export const QUERY_MUTATION_UPDATE_COMMENT_BY_ID = gql(/* GraphQL */ `
  mutation MutationUpdateCommentById($id: ID = "", $content: String = "") {
    updateComment(input: { id: $id, content: $content }) {
      clientMutationId
      success
      comment {
        ...NcmazFcCommentFullFields
      }
    }
  }
`);

//
export const QUERY_GET_TOP_10_CATEGORIES = gql(/* GraphQL */ `
  query QueryGet10Categories($first: Int = 10) {
    categories(first: $first, where: { orderby: COUNT, order: DESC }) {
      nodes {
        ...NcmazFcCategoryFullFieldsFragment
      }
    }
  }
`);

export const QUERY_GET_CATEGORIES = gql(/* GraphQL */ `
  query QueryGetCategories($after: String, $first: Int = 20) {
    categories(first: $first, after: $after) {
      nodes {
        ...NcmazFcCategoryFullFieldsFragment
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export const QUERY_GET_TAGS = gql(/* GraphQL */ `
  query QueryGetTags($after: String = "", $first: Int = 20) {
    tags(first: $first, after: $after) {
      nodes {
        __typename
        ...NcmazFcTagShortFieldsFragment
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export const QUERY_GET_POSTS_BY_USER_REACTION = gql(/* GraphQL */ `
  query QueryGetPostsByUserReact(
    $after: String
    $first: Int = 20
    $inUserAndReaction: String
  ) {
    posts(
      first: $first
      after: $after
      where: { inUserAndReaction: $inUserAndReaction }
    ) {
      nodes {
        ...NcmazFcPostCardFields
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);
