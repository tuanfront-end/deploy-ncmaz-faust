import { gql } from "@/__generated__";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Error from "@/components/Error";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import LoginLayout from "@/container/login/LoginLayout";
import { useMutation } from "@apollo/client";
import { useAuth, useLogin, useLogout } from "@faustwp/core";
import Link from "next/link";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const { login, loading: loginLoading } = useLogin();
  const { isAuthenticated, isReady } = useAuth();
  const { logout, loading: logoutLoading } = useLogout();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userName = email.split("@")[0];

  const [mutationRegisterUser, { loading, data, error, called }] = useMutation(
    gql(/* GraphQL */ `
      mutation SignUpPageMutationRegisterUser(
        $username: String! = ""
        $email: String
        $password: String
      ) {
        registerUser(
          input: { username: $username, email: $email, password: $password }
        ) {
          clientMutationId
        }
      }
    `),
    {
      onCompleted: (data) => {
        toast.success("User created successfully!");
        if (isAuthenticated) {
          logout("/login");
        } else {
          login(email, password, "/dashboard/edit-profile/general");
        }
      },
      onError: (error) => {
        toast.error(error.message, {
          position: "bottom-center",
        });
      },
    }
  );

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required!", {
        position: "bottom-center",
      });
      return;
    }
    mutationRegisterUser({
      variables: {
        username: userName,
        email: email,
        password: password,
      },
    });
  };

  return (
    <LoginLayout
      isSignUpPage
      rightBtn={{
        text: "Login",
        href: "/login",
      }}
    >
      <>
        <div className="grid gap-6">
          <form onSubmit={handleRegister}>
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid">
                <ButtonPrimary
                  loading={loading || loginLoading || logoutLoading}
                >
                  Sign up
                </ButtonPrimary>

                {!!error?.message && (
                  <Error className="text-center mt-2" error={error.message} />
                )}
              </div>
            </div>
          </form>
        </div>

        <p className="text-center text-sm leading-6 text-gray-500 dark:text-neutral-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-500 hover:underline underline-offset-2"
          >
            Login!
          </Link>
        </p>
      </>
    </LoginLayout>
  );
}
