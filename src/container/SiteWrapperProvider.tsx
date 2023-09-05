import React, { FC } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/stores/store";
import { SiteWrapperChild } from "./SiteWrapperChild";
import { SkeletonTheme } from "react-loading-skeleton";
import LoginModalProvider from "./LoginModalProvider";

interface SiteWrapperProviderProps {
  children: React.ReactNode;
  __TEMPLATE_QUERY_DATA__: any;
}

const SiteWrapperProvider: FC<SiteWrapperProviderProps> = ({
  children,
  ...props
}) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SkeletonTheme>
          <LoginModalProvider>
            <SiteWrapperChild {...props}>{children}</SiteWrapperChild>
          </LoginModalProvider>
        </SkeletonTheme>
      </PersistGate>
    </Provider>
  );
};

export default SiteWrapperProvider;
