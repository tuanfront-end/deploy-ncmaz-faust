import { NcmazFcPostMetaFullFieldsFragment } from "@/__generated__/graphql";
import { TPostCard } from "@/components/Card2/Card2";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type TState = Record<
  string,
  {
    databaseId: number;
    commentCount: number;
    ncPostMetaData: NcmazFcPostMetaFullFieldsFragment;
  }
>;

const initialState: TState = {};

export const postsNcmazMetaDataOkSlice = createSlice({
  name: "postsNcmazMetaDataOk",
  initialState,
  reducers: {
    removeAllPostsNcmazMetaDataOk: (state) => {
      state = {};
      return state;
    },
    updatePostsNcmazMetaDataOk: (
      state,
      action: PayloadAction<
        {
          databaseId: number;
          ncPostMetaData:
            | TPostCard["ncPostMetaData"]
            | NcmazFcPostMetaFullFieldsFragment;
        }[]
      >
    ) => {
      const newState = action.payload.reduce((acc, cur) => {
        return {
          ...acc,
          [cur.databaseId]: cur,
        };
      }, {} as TState);

      state = {
        ...state,
        ...newState,
      };
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { removeAllPostsNcmazMetaDataOk, updatePostsNcmazMetaDataOk } =
  postsNcmazMetaDataOkSlice.actions;

export default postsNcmazMetaDataOkSlice.reducer;
