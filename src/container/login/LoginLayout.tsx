import Logo from "@/components/Logo/Logo";
import {
  IS_CHISNGHIAX_DEMO_SITE,
  NC_SITE_SETTINGS,
} from "@/contains/site-settings";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
  rightBtn: {
    text: string;
    href: string;
  };
  isLoginPage?: boolean;
  isSignUpPage?: boolean;
}

const LoginLayout: FC<Props> = ({
  children,
  rightBtn,
  isLoginPage = true,
  isSignUpPage = false,
}) => {
  let blockquoteText = NC_SITE_SETTINGS.signIn_page.blockquote.text;
  let blockquoteAuthor = NC_SITE_SETTINGS.signIn_page.blockquote.author;
  let title = NC_SITE_SETTINGS.signIn_page.title;
  let subTitle = IS_CHISNGHIAX_DEMO_SITE
    ? "Try sing in with a demo account (demo/demo)."
    : NC_SITE_SETTINGS.signIn_page.sub_title;

  if (isSignUpPage) {
    blockquoteText = NC_SITE_SETTINGS.signUp_page.blockquote.text;
    blockquoteAuthor = NC_SITE_SETTINGS.signUp_page.blockquote.author;
    title = NC_SITE_SETTINGS.signUp_page.title;
    subTitle = NC_SITE_SETTINGS.signUp_page.sub_title;
  }

  return (
    <div className="container relative h-[100vh] min-h-[600px] xl:min-h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 dark:bg-neutral-900">
      <Link
        className="hidden lg:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-neutral-100 dark:hover:bg-neutral-700 h-9 px-4 py-2 absolute right-4 top-4 md:right-8 md:top-8"
        href={rightBtn.href}
      >
        {rightBtn.text}
      </Link>
      <div className="relative hidden h-full overflow-y-auto flex-col p-10 text-white dark:text-neutral-900 dark:border-r lg:flex border-neutral-200 dark:border-neutral-600">
        <div className="absolute inset-0 bg-neutral-900 dark:bg-neutral-100" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">“{blockquoteText}”</p>
            <footer className="text-sm">{blockquoteAuthor}</footer>
          </blockquote>
        </div>
      </div>
      <div className="pt-12 pb-8 sm:py-8 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:space-y-10 sm:w-96">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{subTitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
