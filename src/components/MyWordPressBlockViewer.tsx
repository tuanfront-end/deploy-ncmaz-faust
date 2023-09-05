import {
  WordPressBlocksViewer,
  WordpressBlocksViewerProps,
} from "@faustwp/blocks";
import React, { FC } from "react";

interface Props extends WordpressBlocksViewerProps {}

const MyWordPressBlockViewer: FC<Props> = ({ blocks }) => {
  return <WordPressBlocksViewer blocks={blocks} />;
};

export default MyWordPressBlockViewer;
