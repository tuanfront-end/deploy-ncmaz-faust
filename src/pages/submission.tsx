import { GetStaticPropsContext } from "next";
import { FaustPage, getNextStaticProps, useAuth } from "@faustwp/core";
import CreateNewPostEditor from "@/components/PostSubmissionEditor/CreateNewPostEditor";
import { useRouter } from "next/router";
import CircleLoading from "@/components/Loading/CircleLoading";
import SwitchDarkMode from "@/components/SwitchDarkMode/SwitchDarkMode";
import AvatarDropdown from "@/components/Header/AvatarDropdown";
import Logo from "@/components/Logo/Logo";
import CreateBtn from "@/components/Header/CreateBtn";
import { useEffect } from "react";

const Page: FaustPage<{}> = (props) => {
  const { isAuthenticated, isReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.replace("/login");
    }
  }, [isAuthenticated]);

  if (!isReady) {
    return (
      <div className="container flex items-center justify-center p-5">
        <CircleLoading />
      </div>
    );
  }

  const renderHeader = () => {
    return (
      <div className="relative w-full lg:mx-auto lg:max-w-7xl lg:px-8">
        <div className="flex h-16 sm:h-20 items-center gap-x-4 border-b border-neutral-200 dark:border-neutral-600 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
          <div className="flex flex-1 gap-4 self-stretch lg:gap-6">
            <div className="relative flex items-center flex-1">
              <Logo />
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Separator */}
              <div
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-neutral-200 dark:bg-neutral-600"
                aria-hidden="true"
              />

              {/* Profile dropdown */}
              <div className="flex-1 flex items-center justify-end ">
                <CreateBtn className="block" />
                <SwitchDarkMode />
                <AvatarDropdown />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="relative w-full h-[100vh] flex flex-col">
        {renderHeader()}
        <CreateNewPostEditor isSubmittingPage />
      </div>
    </>
  );
};

export function getStaticProps(ctx: GetStaticPropsContext) {
  return getNextStaticProps(ctx, {
    Page,
    revalidate: false,
  });
}

export default Page;
