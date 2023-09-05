import { gql } from "@/__generated__";

export const NC_PRIMARY_MENU_QUERY_FRAGMENT = gql(`
    fragment NcPrimaryMenuFieldsFragment on MenuItem {  
        id  
        uri
        path  
        label
        parentId
        cssClasses
        databaseId
        ncmazfaustMenu {
          __typename
          isMegaMenu
          numberOfMenuColumns
          posts {
            nodes {
              id
              ... on Post {
                __typename
                databaseId
                title
                uri
                modified
                date
                excerpt
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
              }
            }
          }
      }
    }
`);

export const NC_FOOTER_MENU_QUERY_FRAGMENT = gql(`
fragment NcFooterMenuFieldsFragment on MenuItem {
      databaseId
      uri
      label
      parentId
      databaseId
      id
}
`);
