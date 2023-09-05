import { CoreColumnsFragmentFragment } from "@/__generated__/graphql";
import MyWordPressBlockViewer from "@/components/MyWordPressBlockViewer";
import { gql } from "@apollo/client";
import { WordPressBlock, getStyles, useBlocksTheme } from "@faustwp/blocks";
import React from "react";
//
const CoreColumns: WordPressBlock<CoreColumnsFragmentFragment> = (props) => {
  // get the BlocksTheme object
  const theme = useBlocksTheme();
  const style = getStyles(theme, { ...props });

  const { attributes } = props || {};
  const { className, cssClassName } = attributes || {};

  return (
    <div className={`${className || ""} ${cssClassName || ""}`} style={style}>
      {/* @ts-ignore */}
      <MyWordPressBlockViewer blocks={props.children} />
    </div>
  );
};

export const CoreColumnsFragments = {
  entry: gql`
    fragment CoreColumnsFragment on CoreColumns {
      attributes {
        style
        className
        cssClassName
      }
    }
  `,
  key: `CoreColumnsFragment`,
};

CoreColumns.displayName = "CoreColumns";
export default CoreColumns;
