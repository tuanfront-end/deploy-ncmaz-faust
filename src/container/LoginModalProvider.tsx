import NcModal from "@/components/NcModal/NcModal";
import React, { FC, createContext, useContext, useState } from "react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Error from "@/components/Error";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import Logo from "@/components/Logo/Logo";
import {
  IS_CHISNGHIAX_DEMO_SITE,
  NC_SITE_SETTINGS,
} from "@/contains/site-settings";
import { useLogin } from "@faustwp/core";
import Link from "next/link";
import toast from "react-hot-toast";

const LoginModalContext = createContext<{
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}>({
  isLoginModalOpen: false,
  openLoginModal: () => {},
  closeLoginModal: () => {},
});

export function useLoginModal() {
  return useContext(LoginModalContext);
}

interface LoginModalProviderProps {
  children: React.ReactNode;
}

const LoginModalProvider: FC<LoginModalProviderProps> = ({ children }) => {
  const { login, loading, data, error } = useLogin();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const errorMessage = error?.message || data?.generateAuthorizationCode.error;

  const handleClickLostPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      NC_SITE_SETTINGS.signIn_page.lost_password
        .is_use_lostpassword_default_of_wp === false
    ) {
      e.preventDefault();
      toast.error(NC_SITE_SETTINGS.signIn_page.lost_password.message, {
        position: "bottom-center",
      });
      return;
    }
  };

  const renderContent = (closeModal: () => void) => {
    return (
      <div className="flex min-h-full flex-1 flex-col justify-center py-2.5 sm:p-6 lg:pb-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Logo className="block w-full text-center" imageClassName="mx-auto" />
          <div className="text-center">
            <h2 className="mt-5 sm:mt-7 text-center text-xl md:text-2xl font-semibold leading-9 tracking-tight text-neutral-900 dark:text-neutral-200">
              Sign in to your account
            </h2>
            {IS_CHISNGHIAX_DEMO_SITE && (
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                Try sing in with a demo account (demo/demo).
              </span>
            )}
          </div>
        </div>
        <div className="mt-5 sm:mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="grid gap-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();

                if (
                  !e.currentTarget.username?.value ||
                  !e.currentTarget.password?.value
                ) {
                  toast.error("Username and password are required!", {
                    position: "bottom-center",
                  });
                  return;
                }

                login(
                  e.currentTarget.username.value,
                  e.currentTarget.password.value,
                  "/"
                );
              }}
            >
              <div className="grid gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="email">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Email or username"
                    autoCapitalize="none"
                    autoComplete="username"
                    autoCorrect="off"
                    type="text"
                    required
                    defaultValue={IS_CHISNGHIAX_DEMO_SITE ? "demo" : undefined}
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    defaultValue={IS_CHISNGHIAX_DEMO_SITE ? "demo" : undefined}
                  />
                </div>
                <div className="grid">
                  <ButtonPrimary loading={loading}>Sign in</ButtonPrimary>
                  {!!errorMessage && (
                    <Error className="text-center mt-2" error={errorMessage} />
                  )}
                </div>
              </div>
            </form>
          </div>

          <p className="mt-5 sm:mt-10 text-center text-sm leading-6 text-neutral-500 dark:text-neutral-400">
            Not a member?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 hover:underline underline-offset-2"
              onClick={closeModal}
            >
              Sign up!
            </Link>
            <span className="mx-1">|</span>
            <a
              href={
                NC_SITE_SETTINGS.signIn_page.lost_password
                  .url_lostpassword_default_of_wp
              }
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 hover:underline underline-offset-2"
              onClick={handleClickLostPassword}
            >
              Lost your password?
            </a>
          </p>
        </div>
      </div>
    );
  };

  const renderModalLogin = () => {
    return (
      <NcModal
        isOpenProp={isLoginModalOpen}
        onCloseModal={closeLoginModal}
        contentExtraClass="max-w-screen-md"
        renderContent={renderContent}
        renderTrigger={() => null}
        modalTitle=""
      />
    );
  };

  return (
    <LoginModalContext.Provider
      value={{
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
      {renderModalLogin()}
    </LoginModalContext.Provider>
  );
};

export default LoginModalProvider;
