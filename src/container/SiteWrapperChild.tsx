"use client";

import { useQuery } from "@apollo/client";
import { getApolloAuthClient, useAuth } from "@faustwp/core";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateViewer as updateViewerToStore,
  removeAll as removeAllViewerDataFromStore,
} from "@/stores/viewer/viewerSlice";
import { updateGeneralSettings } from "@/stores/genneral-settings/generalSettingsSlice";
import useInitGetAndUpdateViewerReactionPosts from "@/hooks/useInitGetAndUpdateViewerReactionPosts";
import { GET_SITE_VIEWER } from "@/fragments/queries";
import ControlSettingsDemo from "./ControlSettingsDemo";
import CookiestBoxPopover from "@/components/CookiestBoxPopover";
import errorHandling from "@/utils/errorHandling";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";

export function SiteWrapperChild({
  children,
  ...props
}: {
  children: ReactNode;
  __TEMPLATE_QUERY_DATA__: any;
}) {
  const client = getApolloAuthClient();
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const [refetchTimes, setRefetchTimes] = useState(0);

  // init get and update viewer reaction posts
  useInitGetAndUpdateViewerReactionPosts();

  // useLazyQuery get viewer data
  const { refetch } = useQuery(GET_SITE_VIEWER, {
    client,
    skip: !isAuthenticated,
    context: { fetchOptions: { method: "GET" } },
    onCompleted: (data) => {
      // check is dev mode and log viewer data
      if (data?.viewer?.databaseId) {
        dispatch(updateViewerToStore(data?.viewer));
      } else {
        dispatch(removeAllViewerDataFromStore());
      }
    },
    onError: (error) => {
      console.log(123, "🎈 __________get_viewer_error____", error);
      if (refetchTimes > 3) {
        errorHandling(error);
        return;
      }
      setRefetchTimes(refetchTimes + 1);
      refetch();
    },
  });

  // update general settings to store
  useEffect(() => {
    const generalSettings =
      props?.__TEMPLATE_QUERY_DATA__?.generalSettings ?? {};
    dispatch(updateGeneralSettings(generalSettings));
  }, []);

  return (
    <>
      {children}

      <div>
        <CookiestBoxPopover />
        <ControlSettingsDemo />
        <MusicPlayer />
      </div>
    </>
  );
}
