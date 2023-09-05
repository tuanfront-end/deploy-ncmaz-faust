import { GetStaticPaths, GetStaticPropsContext } from "next";
import {
  FaustPage,
  getApolloAuthClient,
  getNextStaticProps,
  useAuth,
} from "@faustwp/core";
import { gql } from "@/__generated__";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useLazyQuery, useMutation } from "@apollo/client";
import CircleLoading from "@/components/Loading/CircleLoading";
import Label from "@/components/Label/Label";
import Input from "@/components/Input/Input";
import Error from "@/components/Error";
import { getUserDataFromUserCardFragment } from "@/utils/getUserDataFromUserCardFragment";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Alert from "@/components/Alert";
import { EnvelopeIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import ButtonInsertImage, {
  ImageState,
} from "@/components/PostSubmissionEditor/ButtonInsertImage";
import Textarea from "@/components/Textarea/Textarea";
import toast from "react-hot-toast";
import { getImageDataFromImageFragment } from "@/utils/getImageDataFromImageFragment";
import { IS_CHISNGHIAX_DEMO_SITE } from "@/contains/site-settings";
import errorHandling from "@/utils/errorHandling";
import DashboardLayout, {
  TDashBoardEditProfileTab,
} from "@/container/DashboardLayout";

const Page: FaustPage<{}> = () => {
  const { isAuthenticated, isReady } = useAuth();
  const router = useRouter();
  const client = getApolloAuthClient();
  const currentTab: TDashBoardEditProfileTab =
    (router.query.tab as TDashBoardEditProfileTab) || "general";

  const displayNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const ncBioRef = useRef<HTMLInputElement>(null);
  const websiteUrlRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const facebookUrlRef = useRef<HTMLInputElement>(null);
  const mediumUrlRef = useRef<HTMLInputElement>(null);
  const githubUrlRef = useRef<HTMLInputElement>(null);
  const vimeoUrlRef = useRef<HTMLInputElement>(null);
  const twitterUrlRef = useRef<HTMLInputElement>(null);
  const instagramUrlRef = useRef<HTMLInputElement>(null);
  const linkedinUrlRef = useRef<HTMLInputElement>(null);
  const pinterestUrlRef = useRef<HTMLInputElement>(null);
  const twitchUrlRef = useRef<HTMLInputElement>(null);
  const buymeacoffeUrlRef = useRef<HTMLInputElement>(null);
  const youtubeUrlRef = useRef<HTMLInputElement>(null);
  const tiktokRef = useRef<HTMLInputElement>(null);

  const [avatarImage, setAvatarImage] = React.useState<ImageState>({
    id: "",
    sourceUrl: "",
    altText: "",
  });
  const [coverImage, setCoverImage] = React.useState<ImageState>({
    id: "",
    sourceUrl: "",
    altText: "",
  });

  const [refetchTimes, setRefetchTimes] = React.useState(0);

  const [queryGetViewerProfile, getViewerProfileResult] = useLazyQuery(
    gql(` query ProfilePageGetAuthorProfile {
      viewer {
        email
        firstName
      lastName
      locale
      nicename
      nickname
        ...NcmazFcUserFullFields
      }
  }   
`),
    {
      client,
      context: { fetchOptions: { method: "GET" } },
      onCompleted: (data) => {
        const { ncUserMeta } = getUserDataFromUserCardFragment(
          data?.viewer || {}
        );
        const bgImage = getImageDataFromImageFragment(
          ncUserMeta?.backgroundImage?.node
        );
        const featuredImage = getImageDataFromImageFragment(
          ncUserMeta?.featuredImage?.node
        );

        setCoverImage({
          ...bgImage,
        });
        setAvatarImage({
          ...featuredImage,
        });
      },
      onError: (error) => {
        if (refetchTimes > 3) {
          errorHandling(error);
        }
        setRefetchTimes(refetchTimes + 1);

        getViewerProfileResult.refetch();
      },
    }
  );

  const [mutationUpdateViewerProfile, updateViewerProfileResult] = useMutation(
    gql(`
    mutation ProfilePageMutationUpdateViewer($id: ID!, $lastName: String, $firstName: String, $email: String, $displayName: String, $description: String, $ncmazBackgroundImgAlt: String, $ncmazBackgroundImgUrl: String, $ncmazBio: String, $ncmazBuymeacoffeUrl: String, $ncmazFacebookUrl: String, $ncmazFeaturedImgAlt: String, $ncmazFeaturedImgUrl: String, $ncmazGithubUrl: String, $ncmazInstagramUrl: String, $ncmazLinkedinUrl: String, $ncmazMediumUrl: String, $ncmazPinterestUrl: String, $ncmazTwitchUrl: String, $ncmazTwitterUrl: String, $ncmazVimeoUrl: String, $ncmazWebsiteUrl: String, $ncmazYoutubeUrl: String, $nicename: String, $nickname: String, $password: String, $websiteUrl: String, $ncmazTiktokUrl: String) {
  updateUser(
    input: {id: $id, email: $email, displayName: $displayName, description: $description, lastName: $lastName, ncmazBackgroundImgAlt: $ncmazBackgroundImgAlt, ncmazBackgroundImgUrl: $ncmazBackgroundImgUrl, ncmazBio: $ncmazBio, ncmazBuymeacoffeUrl: $ncmazBuymeacoffeUrl, ncmazFacebookUrl: $ncmazFacebookUrl, ncmazFeaturedImgAlt: $ncmazFeaturedImgAlt, ncmazFeaturedImgUrl: $ncmazFeaturedImgUrl, ncmazGithubUrl: $ncmazGithubUrl, ncmazInstagramUrl: $ncmazInstagramUrl, ncmazLinkedinUrl: $ncmazLinkedinUrl, ncmazMediumUrl: $ncmazMediumUrl, ncmazPinterestUrl: $ncmazPinterestUrl, ncmazTwitchUrl: $ncmazTwitchUrl, ncmazTwitterUrl: $ncmazTwitterUrl, ncmazVimeoUrl: $ncmazVimeoUrl, ncmazWebsiteUrl: $ncmazWebsiteUrl, ncmazYoutubeUrl: $ncmazYoutubeUrl, websiteUrl: $websiteUrl, ncmazTiktokUrl: $ncmazTiktokUrl, password: $password, nicename: $nicename, nickname: $nickname, firstName: $firstName}
  ){
    user {
      id
    }
  }
}
  `),
    {
      client,
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        toast.success("Update profile successfully!");
      },
      onError: (error) => {
        errorHandling(error);
      },
    }
  );

  const viewerProfile = getUserDataFromUserCardFragment(
    getViewerProfileResult.data?.viewer || {}
  );

  useEffect(() => {
    if (isReady && isAuthenticated === false) {
      router.push("/login");
      return;
    }
    if (isAuthenticated) {
      queryGetViewerProfile();
    }
  }, [isAuthenticated, isReady]);

  //
  const handleSubmitForm = () => {
    if (!isAuthenticated) {
      toast.error("You must login to update profile!");
      return;
    }
    if (currentTab === "password") {
      if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
        toast.error("Password and confirm password do not match!");
        return;
      }
    }

    //  for demo site only, please remove this code on your site
    if (IS_CHISNGHIAX_DEMO_SITE) {
      toast.error("Sorry, profile update is disabled on the demo site!");
      return;
    }

    mutationUpdateViewerProfile({
      client,
      variables: {
        id: viewerProfile.databaseId.toString(),
        lastName: lastNameRef.current?.value,
        firstName: firstNameRef.current?.value,
        email: emailRef.current?.value,
        displayName: displayNameRef.current?.value,
        description: descriptionRef.current?.value,
        ncmazBackgroundImgAlt: coverImage.altText,
        ncmazBackgroundImgUrl: coverImage.sourceUrl,
        ncmazBio: ncBioRef.current?.value,
        ncmazBuymeacoffeUrl: buymeacoffeUrlRef.current?.value,
        ncmazFacebookUrl: facebookUrlRef.current?.value,
        ncmazFeaturedImgAlt: avatarImage.altText,
        ncmazFeaturedImgUrl: avatarImage.sourceUrl,
        ncmazGithubUrl: githubUrlRef.current?.value,
        ncmazInstagramUrl: instagramUrlRef.current?.value,
        ncmazLinkedinUrl: linkedinUrlRef.current?.value,
        ncmazMediumUrl: mediumUrlRef.current?.value,
        ncmazPinterestUrl: pinterestUrlRef.current?.value,
        ncmazTwitchUrl: twitchUrlRef.current?.value,
        ncmazTwitterUrl: twitterUrlRef.current?.value,
        ncmazVimeoUrl: vimeoUrlRef.current?.value,
        ncmazWebsiteUrl: websiteUrlRef.current?.value,
        ncmazYoutubeUrl: youtubeUrlRef.current?.value,
        websiteUrl: websiteUrlRef.current?.value,
        ncmazTiktokUrl: tiktokRef.current?.value,
        nicename: nickNameRef.current?.value,
        nickname: nickNameRef.current?.value,
        password: passwordRef.current?.value,
      },
    });
  };
  //
  //
  const renderContentProfileTab = () => {
    return (
      <div className="flow-root">
        <div className="NcmazAccountPage-GeneralForm space-y-5 sm:space-y-6 md:sm:space-y-7">
          <div>
            <h2 className="text-xl font-semibold capitalize">
              Profile settings
            </h2>
            <span className="block mt-2.5 text-sm text-neutral-500 dark:text-neutral-400">
              Update your username and manage your account.
            </span>
          </div>
          <div className="w-24 border-b border-neutral-200 dark:border-neutral-700"></div>
          {/* ---- */}

          {/* ---- */}
          <div className="EditProfileForm__Profile-picture inline-flex flex-col">
            <Label>Profile picture</Label>
            <ButtonInsertImage
              defaultImage={avatarImage}
              className="mt-1.5 "
              onChangeImage={setAvatarImage}
            />
          </div>

          {/* ---- */}
          <div className="EditProfileForm__Cover-picture">
            <Label>Cover photo</Label>
            <ButtonInsertImage
              defaultImage={coverImage}
              className="mt-1.5 flex-1"
              onChangeImage={setCoverImage}
            />
          </div>

          {/* ---- */}
          <div className="EditProfileForm__firstName">
            <Label>First Name</Label>
            <Input
              className="mt-1.5"
              defaultValue={
                getViewerProfileResult.data?.viewer?.firstName || ""
              }
              ref={firstNameRef}
            />
          </div>

          {/* ---- */}
          <div className="EditProfileForm__lastName">
            <Label>Last Name</Label>
            <Input
              className="mt-1.5"
              defaultValue={getViewerProfileResult.data?.viewer?.lastName || ""}
              ref={lastNameRef}
            />
          </div>

          {/* ---- */}
          <div className="EditProfileForm__nickName">
            <Label>Nickname (required)</Label>
            <Input
              className="mt-1.5"
              defaultValue={getViewerProfileResult.data?.viewer?.nickname || ""}
              required
              ref={nickNameRef}
            />
          </div>

          {/* ---- */}
          <div className="EditProfileForm__Biographical">
            <Label>Biographical Info</Label>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              Biographical Info, this will show up in the author page.
            </span>
            <Textarea
              rows={5}
              className="mt-1.5"
              placeholder={"Something about yourself in a few word."}
              defaultValue={viewerProfile.description || ""}
              ref={descriptionRef}
            />
          </div>

          {/* ---- */}
          <div className="EditProfileForm__shortBio">
            <Label> Short Bio</Label>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              A short Bio (e.g. occupation), this will show up in the author
              cards.
            </span>
            <Input
              className="mt-1.5"
              placeholder={"UX/UI Designer"}
              defaultValue={viewerProfile.ncUserMeta?.ncBio || ""}
              ref={ncBioRef}
            />
          </div>

          {/* ---- */}
          <div className="EditProfileForm__Website">
            <Label>Website</Label>
            <div className="mt-1.5 flex">
              <span className="inline-flex items-center px-3 rounded-s-2xl border border-e-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                <GlobeAltIcon className="w-6 h-6" />
              </span>
              <Input
                className="!rounded-s-none"
                placeholder={"yourwebsite.com"}
                defaultValue={viewerProfile.ncUserMeta?.websiteUrl || ""}
                ref={websiteUrlRef}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContentGeneralTab = () => {
    return (
      <div className="flow-root">
        <div className="NcmazAccountPage-GeneralForm space-y-5 sm:space-y-6 md:sm:space-y-7">
          <div>
            <h2 className="text-xl font-semibold capitalize">
              General settings
            </h2>
            <span className="block mt-2.5 text-sm text-neutral-500 dark:text-neutral-400">
              Update your username and manage your account.
            </span>
          </div>
          <div className="w-24 border-b border-neutral-200 dark:border-neutral-700"></div>
          {/* ---- */}

          <div>
            <Label>Display Name</Label>
            <Input
              className="mt-1.5"
              defaultValue={viewerProfile.name || ""}
              required
              ref={displayNameRef}
            />
          </div>

          {/* ---- */}
          <div>
            <Label>Email</Label>
            <div className="mt-1.5 flex">
              <span className="inline-flex items-center px-2.5 rounded-s-2xl border border-e-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                <EnvelopeIcon className="w-6 h-6" />
              </span>
              <Input
                className="!rounded-s-none"
                placeholder="example@email.com"
                defaultValue={getViewerProfileResult.data?.viewer?.email || ""}
                required
                ref={emailRef}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContentPassWordTab = () => {
    return (
      <div className="flow-root">
        <div className="NcmazAccountPage-GeneralForm space-y-5 sm:space-y-6 md:sm:space-y-7">
          <div>
            <h2 className="text-xl font-semibold capitalize">
              Password settings
            </h2>
            <span className="block mt-2.5 text-sm text-neutral-500 dark:text-neutral-400">
              Update your password.
            </span>
          </div>
          <div className="w-24 border-b border-neutral-200 dark:border-neutral-700"></div>
          {/* ---- */}

          <div className="ChangePasswordForm__newPass">
            <Label>New password</Label>
            <Input
              required
              type="password"
              minLength={6}
              className="mt-1.5"
              ref={passwordRef}
            />
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              Password must be at least 6 characters
            </span>
          </div>
          {/* ---- */}
          <div className="ChangePasswordForm__ConfirmPass">
            <Label>Confirm password</Label>
            <Input
              required
              type="password"
              minLength={6}
              className="mt-1.5"
              ref={confirmPasswordRef}
            />
          </div>
        </div>
      </div>
    );
  };
  const renderContentSocialsTab = () => {
    return (
      <div className="flow-root">
        <div className="NcmazAccountPage-GeneralForm space-y-5 sm:space-y-6 md:sm:space-y-7">
          <div>
            <h2 className="text-xl font-semibold capitalize">
              Social settings
            </h2>
            <span className="block mt-2.5 text-sm text-neutral-500 dark:text-neutral-400">
              Add elsewhere links to your profile.
            </span>
          </div>
          <div className="w-24 border-b border-neutral-200 dark:border-neutral-700"></div>
          {/* ---- */}

          <div className="SocialsProfileForm__fieldsWrap grid grid-cols-1 sm:grid-cols-2 gap-5 ">
            {/* ---- Youtube */}
            <div className="SocialsProfileForm__Youtube">
              <Label>Youtube</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-s-2xl border border-e-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 576 512"
                    fill="currentColor"
                  >
                    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                  </svg>
                </span>
                <Input
                  className="!rounded-s-none"
                  sizeClass="h-11 px-4 ps-2 pe-3"
                  placeholder="https://www.youtube.com/channel/yourname"
                  defaultValue={viewerProfile.ncUserMeta?.youtubeUrl || ""}
                  ref={youtubeUrlRef}
                />
              </div>
            </div>

            {/* ----Facebook */}
            <div className="SocialsProfileForm__Facebook">
              <Label>Facebook</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-s-2xl border border-e-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <svg
                    fill="currentColor"
                    className="w-5 h-5"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                  </svg>
                </span>
                <Input
                  className="!rounded-s-none"
                  sizeClass="h-11 px-4 ps-2 pe-3"
                  placeholder="https://www.facebook.com/yourname"
                  defaultValue={viewerProfile.ncUserMeta?.facebookUrl || ""}
                  ref={facebookUrlRef}
                />
              </div>
            </div>

            {/* ---- Medium */}
            <div className="SocialsProfileForm__Medium">
              <Label>Medium</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-s-2xl border border-e-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <svg
                    fill="currentColor"
                    height="1em"
                    viewBox="0 0 640 512"
                    className="w-5 h-5"
                  >
                    <path d="M180.5,74.262C80.813,74.262,0,155.633,0,256S80.819,437.738,180.5,437.738,361,356.373,361,256,280.191,74.262,180.5,74.262Zm288.25,10.646c-49.845,0-90.245,76.619-90.245,171.095s40.406,171.1,90.251,171.1,90.251-76.619,90.251-171.1H559C559,161.5,518.6,84.908,468.752,84.908Zm139.506,17.821c-17.526,0-31.735,68.628-31.735,153.274s14.2,153.274,31.735,153.274S640,340.631,640,256C640,171.351,625.785,102.729,608.258,102.729Z" />
                  </svg>
                </span>
                <Input
                  className="!rounded-s-none"
                  sizeClass="h-11 px-4 ps-2 pe-3"
                  placeholder="https://medium.com/yourname"
                  defaultValue={viewerProfile.ncUserMeta?.mediumUrl || ""}
                  ref={mediumUrlRef}
                />
              </div>
            </div>

            {/* ---- Github */}
            <div className="SocialsProfileForm__Github">
              <Label>Github </Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-s-2xl border border-e-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <svg
                    fill="currentColor"
                    height="1em"
                    viewBox="0 0 496 512"
                    className="w-5 h-5"
                  >
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                  </svg>
                </span>
                <Input
                  className="!rounded-s-none"
                  sizeClass="h-11 px-4 ps-2 pe-3"
                  placeholder="https://github.com/yourname"
                  defaultValue={viewerProfile.ncUserMeta?.githubUrl || ""}
                  ref={githubUrlRef}
                />
              </div>
            </div>

            {/* ---- Vimeo */}
            <div className="SocialsProfileForm__Vimeo">
              <Label>Vimeo </Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-s-2xl border border-e-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <svg
                    fill="currentColor"
                    height="1em"
                    viewBox="0 0 448 512"
                    className="w-5 h-5"
                  >
                    <path d="M447.8 153.6c-2 43.6-32.4 103.3-91.4 179.1-60.9 79.2-112.4 118.8-154.6 118.8-26.1 0-48.2-24.1-66.3-72.3C100.3 250 85.3 174.3 56.2 174.3c-3.4 0-15.1 7.1-35.2 21.1L0 168.2c51.6-45.3 100.9-95.7 131.8-98.5 34.9-3.4 56.3 20.5 64.4 71.5 28.7 181.5 41.4 208.9 93.6 126.7 18.7-29.6 28.8-52.1 30.2-67.6 4.8-45.9-35.8-42.8-63.3-31 22-72.1 64.1-107.1 126.2-105.1 45.8 1.2 67.5 31.1 64.9 89.4z" />
                  </svg>
                </span>
                <Input
                  className="!rounded-s-none"
                  sizeClass="h-11 px-4 ps-2 pe-3"
                  placeholder="https://vimeo.com/yourname"
                  defaultValue={viewerProfile.ncUserMeta?.vimeoUrl || ""}
                  ref={vimeoUrlRef}
                />
              </div>
            </div>

            {/* ---- Twitter*/}
            <div className="SocialsProfileForm__Twitter">
              <Label>Twitter</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-s-2xl border border-e-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <svg
                    fill="currentColor"
                    height="1em"
                    viewBox="0 0 512 512"
                    className="w-5 h-5"
                  >
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                  </svg>
                </span>
                <Input
                  className="!rounded-s-none"
                  sizeClass="h-11 px-4 ps-2 pe-3"
                  placeholder="https://twitter.com/yourname"
                  defaultValue={viewerProfile.ncUserMeta?.twitterUrl || ""}
                  ref={twitterUrlRef}
                />
              </div>
            </div>

            {/* ---- Instagram */}
            <div className="SocialsProfileForm__Instagram">
              <Label>Instagram </Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-s-2xl border border-e-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <svg
                    fill="currentColor"
                    height="1em"
                    viewBox="0 0 448 512"
                    className="w-5 h-5"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                </span>
                <Input
                  className="!rounded-e-none"
                  sizeClass="h-11 px-4 ps-2 pe-3"
                  placeholder="https://instagram.com/yourname"
                  defaultValue={viewerProfile.ncUserMeta?.instagramUrl || ""}
                  ref={instagramUrlRef}
                />
              </div>
            </div>

            {/* ---- Linkedin  */}
            <div className="SocialsProfileForm__Linkedin">
              <Label>Linkedin </Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-s-2xl border border-e-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <svg
                    fill="currentColor"
                    height="1em"
                    viewBox="0 0 448 512"
                    className="w-5 h-5"
                  >
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                  </svg>
                </span>
                <Input
                  className="!rounded-s-none"
                  sizeClass="h-11 px-4 ps-2 pe-3"
                  placeholder="https://linkedin.com/in/yourname"
                  defaultValue={viewerProfile.ncUserMeta?.linkedinUrl || ""}
                  ref={linkedinUrlRef}
                />
              </div>
            </div>

            {/* ---- Pinterest   */}
            <div className="SocialsProfileForm__Pinterest">
              <Label>Pinterest </Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-s-2xl border border-e-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <svg
                    fill="currentColor"
                    height="1em"
                    viewBox="0 0 384 512"
                    className="w-5 h-5"
                  >
                    <path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z" />
                  </svg>
                </span>
                <Input
                  className="!rounded-s-none"
                  sizeClass="h-11 px-4 ps-2 pe-3"
                  placeholder="https://pinterest.com/yourname"
                  defaultValue={viewerProfile.ncUserMeta?.pinterestUrl || ""}
                  ref={pinterestUrlRef}
                />
              </div>
            </div>

            {/* ---- Twitch    */}
            <div className="SocialsProfileForm__Twitch">
              <Label>Twitch </Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-s-2xl border border-e-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <svg
                    fill="currentColor"
                    height="1em"
                    viewBox="0 0 512 512"
                    className="w-5 h-5"
                  >
                    <path d="M391.17,103.47H352.54v109.7h38.63ZM285,103H246.37V212.75H285ZM120.83,0,24.31,91.42V420.58H140.14V512l96.53-91.42h77.25L487.69,256V0ZM449.07,237.75l-77.22,73.12H294.61l-67.6,64v-64H140.14V36.58H449.07Z" />
                  </svg>
                </span>
                <Input
                  className="!rounded-s-none"
                  sizeClass="h-11 px-4 ps-2 pe-3"
                  placeholder="https://twitch.com/yourname"
                  defaultValue={viewerProfile.ncUserMeta?.twitchUrl || ""}
                  ref={twitchUrlRef}
                />
              </div>
            </div>
            {/* ---- Tiktok    */}
            <div className="SocialsProfileForm__Tiktok">
              <Label>Tiktok </Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-s-2xl border border-e-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <svg
                    fill="currentColor"
                    height="1em"
                    viewBox="0 0 448 512"
                    className="w-5 h-5"
                  >
                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                  </svg>
                </span>
                <Input
                  className="!rounded-s-none"
                  sizeClass="h-11 px-4 ps-2 pe-3"
                  placeholder="https://www.tiktok.com/@name"
                  defaultValue={viewerProfile.ncUserMeta?.tiktokUrl || ""}
                  ref={tiktokRef}
                />
              </div>
            </div>

            {/* ---- Buymeacoffe     */}
            <div className="SocialsProfileForm__Buymeacoffe ">
              <Label>Buy me a coffe</Label>

              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-s-2xl border border-e-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <svg
                    fill="currentColor"
                    height="1em"
                    viewBox="0 0 512 512"
                    className="w-5 h-5"
                  >
                    <path d="M385.1 419.1C349.7 447.2 304.8 464 256 464s-93.7-16.8-129.1-44.9l80.4-80.4c14.3 8.4 31 13.3 48.8 13.3s34.5-4.8 48.8-13.3l80.4 80.4zm68.1 .2C489.9 374.9 512 318.1 512 256s-22.1-118.9-58.8-163.3L465 81c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L419.3 58.8C374.9 22.1 318.1 0 256 0S137.1 22.1 92.7 58.8L81 47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L58.8 92.7C22.1 137.1 0 193.9 0 256s22.1 118.9 58.8 163.3L47 431c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l11.8-11.8C137.1 489.9 193.9 512 256 512s118.9-22.1 163.3-58.8L431 465c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-11.8-11.8zm-34.1-34.1l-80.4-80.4c8.4-14.3 13.3-31 13.3-48.8s-4.8-34.5-13.3-48.8l80.4-80.4C447.2 162.3 464 207.2 464 256s-16.8 93.7-44.9 129.1zM385.1 92.9l-80.4 80.4c-14.3-8.4-31-13.3-48.8-13.3s-34.5 4.8-48.8 13.3L126.9 92.9C162.3 64.8 207.2 48 256 48s93.7 16.8 129.1 44.9zM173.3 304.8L92.9 385.1C64.8 349.7 48 304.8 48 256s16.8-93.7 44.9-129.1l80.4 80.4c-8.4 14.3-13.3 31-13.3 48.8s4.8 34.5 13.3 48.8zM208 256a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z" />
                  </svg>
                </span>
                <Input
                  className="!rounded-s-none"
                  placeholder={"https://buymeacoffee.com/yourname"}
                  sizeClass="h-11 px-4 ps-2 pe-3"
                  defaultValue={viewerProfile.ncUserMeta?.buymeacoffeUrl || ""}
                  ref={buymeacoffeUrlRef}
                />
              </div>
              <span className="block mt-1 mb-2 text-xs text-neutral-500 dark:text-neutral-400">
                You should have an account at - buymeacoffee.com/yourname
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (getViewerProfileResult.loading || !getViewerProfileResult.called)
      return (
        <div className="mt-8">
          <CircleLoading />
        </div>
      );

    if (getViewerProfileResult.error) {
      return <Error error={getViewerProfileResult.error.message} />;
    }

    if (currentTab === "general") {
      return renderContentGeneralTab();
    }

    if (currentTab === "profile") {
      return renderContentProfileTab();
    }

    if (currentTab === "password") {
      return renderContentPassWordTab();
    }

    if (currentTab === "socials") {
      return renderContentSocialsTab();
    }

    return null;
  };

  return (
    <>
      <DashboardLayout>
        <div className="px-4 sm:px-6 lg:px-8">
          {renderContent()}

          {isAuthenticated && viewerProfile.databaseId && (
            <div className="mt-8">
              {/* ---- */}
              {updateViewerProfileResult.error && (
                <Alert type="error" containerClassName="mb-5">
                  {updateViewerProfileResult.error?.message}
                </Alert>
              )}
              {/* ---- */}

              <div className="inline-flex pt-2">
                <ButtonPrimary
                  type="button"
                  className="w-full"
                  loading={updateViewerProfileResult.loading}
                  onClick={handleSubmitForm}
                >
                  Update profile
                </ButtonPrimary>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export function getStaticProps(ctx: GetStaticPropsContext) {
  return getNextStaticProps(ctx, {
    Page,
    revalidate: false,
  });
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      "/dashboard/edit-profile/general",
      "/dashboard/edit-profile/profile",
      "/dashboard/edit-profile/password",
      "/dashboard/edit-profile/socials",
    ],
    fallback: "blocking",
  };
};

export default Page;
