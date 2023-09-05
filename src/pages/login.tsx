import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Error from "@/components/Error";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import LoginLayout from "@/container/login/LoginLayout";
import {
  IS_CHISNGHIAX_DEMO_SITE,
  NC_SITE_SETTINGS,
} from "@/contains/site-settings";
import { useAuth, useLogin } from "@faustwp/core";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function Login() {
  const { isAuthenticated, isReady } = useAuth();
  const { login, loading, error, data } = useLogin();
  const router = useRouter();

  if (isReady && isAuthenticated) {
    router.replace("/");
  }

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

  return (
    <LoginLayout
      isLoginPage
      rightBtn={{
        text: "Sign up",
        href: "/sign-up",
      }}
    >
      <>
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

        <p className="text-center text-sm leading-6 text-neutral-500 dark:text-neutral-400">
          Not a member?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 hover:underline underline-offset-2"
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
      </>
    </LoginLayout>
  );
}
