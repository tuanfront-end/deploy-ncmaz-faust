import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LocalPostsSavedListState {
  localSavedPosts: number[];
  viewerUnSavedPosts: number[];
}

const initialState: LocalPostsSavedListState = {
  localSavedPosts: [],
  viewerUnSavedPosts: [],
};

export const localPostsSavedListSlice = createSlice({
  name: "localPostsSavedList",
  initialState,
  reducers: {
    updateLocalPostsSavedList: (state, action: PayloadAction<number>) => {
      if (state.localSavedPosts.includes(action.payload)) {
        state.localSavedPosts = state.localSavedPosts.filter(
          (item) => item !== action.payload
        );
      } else {
        state.localSavedPosts.push(action.payload);
      }
      return state;
    },
    addViewerUnSavedPostsList: (state, action: PayloadAction<number>) => {
      if (!state.viewerUnSavedPosts.includes(action.payload)) {
        state.viewerUnSavedPosts.push(action.payload);
      }
      return state;
    },
    removeAllViewerUnSavedPostsList: (state) => {
      state.viewerUnSavedPosts = [];
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateLocalPostsSavedList,
  // addViewerUnSavedPostsList,
  // removeAllViewerUnSavedPostsList,
} = localPostsSavedListSlice.actions;

export default localPostsSavedListSlice.reducer;
