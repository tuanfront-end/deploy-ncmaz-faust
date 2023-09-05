import { NcgeneralSettingsFieldsFragmentFragment } from "@/__generated__/graphql";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GeneralSettingsState {
  generalSettings: NcgeneralSettingsFieldsFragmentFragment | null;
}

const initialState: GeneralSettingsState = {
  generalSettings: null,
};

export const generalSettingsSlice = createSlice({
  name: "generalSettings",
  initialState,
  reducers: {
    removeGeneralSettings: (state) => {
      state.generalSettings = null;
      return state;
    },
    updateGeneralSettings: (
      state,
      action: PayloadAction<GeneralSettingsState["generalSettings"]>
    ) => {
      state.generalSettings = action.payload;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { removeGeneralSettings, updateGeneralSettings } =
  generalSettingsSlice.actions;

export default generalSettingsSlice.reducer;
