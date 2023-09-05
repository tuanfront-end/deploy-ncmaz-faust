import { GetViewerDataQuery } from "@/__generated__/graphql";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ViewerState {
  viewer: GetViewerDataQuery["viewer"] | null;
  viewerReactionPosts?:
    | {
        __typename?: "UserReactionPost" | undefined;
        id: string;
        title?: string | null | undefined;
        isNewAddedFromClient?: boolean | null | undefined;
        isNewUnLikeFromClient?: boolean | null | undefined;
        newLikedCount?: number | null | undefined;
      }[]
    | null;
}

const initialState: ViewerState = {
  viewer: null,
  viewerReactionPosts: null,
};

export const viewerSlice = createSlice({
  name: "viewer",
  initialState,
  reducers: {
    removeAll: (state) => {
      state.viewer = null;
      state.viewerReactionPosts = null;
      return state;
    },
    updateAll: (state, action: PayloadAction<ViewerState>) => {
      state = action.payload;
      return state;
    },
    updateViewer: (state, action: PayloadAction<ViewerState["viewer"]>) => {
      state.viewer = action.payload;
      return state;
    },
    updateViewerAllReactionPosts: (
      state,
      action: PayloadAction<ViewerState["viewerReactionPosts"]>
    ) => {
      state = {
        ...state,
        viewerReactionPosts: action.payload,
      };
      return state;
    },
    addViewerReactionPosts: (
      state,
      action: PayloadAction<ViewerState["viewerReactionPosts"]>
    ) => {
      state = {
        ...state,
        viewerReactionPosts: [
          ...(state.viewerReactionPosts || []),
          ...(action.payload || []),
        ],
      };
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  removeAll,
  updateAll,
  updateViewer,
  updateViewerAllReactionPosts,
  addViewerReactionPosts,
} = viewerSlice.actions;

export default viewerSlice.reducer;
