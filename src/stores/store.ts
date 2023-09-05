import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import viewerSlice from "./viewer/viewerSlice";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import generalSettingsSlice from "./genneral-settings/generalSettingsSlice";
import localPostsSavedListSlice from "./localPostSavedList/localPostsSavedListSlice";
import postsNcmazMetaDataOkSlice from "./postsNcmazMetaDataOk/postsNcmazMetaDataOkSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  viewer: viewerSlice,
  generalSettings: generalSettingsSlice,
  localPostsSavedList: localPostsSavedListSlice,
  postsNcmazMetaDataOk: postsNcmazMetaDataOkSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["counter", "localPostSavedList"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  //
  middleware:
    process.env.NODE_ENV !== "production"
      ? (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
      : undefined,
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
