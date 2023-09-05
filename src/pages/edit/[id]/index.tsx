import { GetStaticPaths, GetStaticPropsContext } from "next";
import {
  FaustPage,
  getApolloAuthClient,
  getNextStaticProps,
  useAuth,
} from "@faustwp/core";
import CreateNewPostEditor from "@/components/PostSubmissionEditor/CreateNewPostEditor";
import { gql } from "@/__generated__";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import CircleLoading from "@/components/Loading/CircleLoading";
import Alert from "@/components/Alert";
import Logo from "@/components/Logo/Logo";
import SwitchDarkMode from "@/components/SwitchDarkMode/SwitchDarkMode";
import AvatarDropdown from "@/components/Header/AvatarDropdown";
import CreateBtn from "@/components/Header/CreateBtn";
import errorHandling from "@/utils/errorHandling";

const Page: FaustPage<{}> = (props) => {
  const { isAuthenticated, isReady } = useAuth();
  const client = getApolloAuthClient();
  const router = useRouter();
  const [refetchTimes, setRefetchTimes] = React.useState(0);

  const [getPostForEditPostPage, { called, data, error, loading, refetch }] =
    useLazyQuery(
      gql(`
        query GetPostForEditPostPage($databaseId: ID!) {
          post(id: $databaseId, idType: DATABASE_ID) {
            ...NcmazFcPostFullFields
          }
        }
      `),
      {
        client,
        fetchPolicy: "network-only",
        context: { fetchOptions: { method: "GET" } },
        onError: (error) => {
          if (refetchTimes > 3) {
            errorHandling(error);
          }
          setRefetchTimes(refetchTimes + 1);
          refetch();
        },
      }
    );

  useEffect(() => {
    if (!isAuthenticated || !router.query.id) {
      return;
    }
    getPostForEditPostPage({
      variables: { databaseId: router.query.id as string },
    });
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.replace("/login");
    }
  }, [isAuthenticated]);

  const {
    categories,
    tags,
    title,
    content,
    excerpt,
    uri,
    featuredImage,
    date,
    status,
    ncPostMetaData,
    ncmazGalleryImgs,
    ncmazAudioUrl,
    ncmazVideoUrl,
    postFormats,
    commentStatus,
    databaseId,
  } = getPostDataFromPostFragment(data?.post || {});

  if (!isReady) {
    return (
      <div className="container flex items-center justify-center p-5">
        <CircleLoading />
      </div>
    );
  }

  //
  if (loading) {
    return (
      <div className="container flex items-center justify-center p-5">
        <CircleLoading />
      </div>
    );
  }

  if (!data?.post) {
    return (
      <div className="container">
        <Alert children="Post not found!" type="error" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <Alert children={error.message} type="error" />
      </div>
    );
  }

  const renderHeader = () => {
    return (
      <div className="relative w-full lg:mx-auto lg:max-w-7xl lg:px-8">
        <div className="flex h-16 items-center gap-x-4 border-b border-neutral-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
          <div className="flex flex-1 gap-4 self-stretch lg:gap-6">
            <div className="relative flex items-center flex-1">
              <Logo />
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Separator */}
              <div
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-neutral-200"
                aria-hidden="true"
              />

              {/* Profile dropdown */}
              <div className="flex-1 flex items-center justify-end ">
                <CreateBtn />
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
      <main className="">
        <div className="relative w-full h-[100vh] flex flex-col">
          {renderHeader()}
          <CreateNewPostEditor
            isEditingPostId={databaseId.toString()}
            isEditingPage
            defaultTags={tags.nodes || []}
            defaultTitle={title}
            defaultCategories={categories.nodes || []}
            defaultContent={content}
            defaultFeaturedImage={{
              sourceUrl: featuredImage?.sourceUrl || "",
              altText: featuredImage?.altText || "",
              databaseId: featuredImage?.databaseId || 0,
            }}
            defaultPostOptionsData={{
              timeSchedulePublication: status === "inherit" ? date : undefined,
              audioUrl: ncmazAudioUrl?.audioUrl || "",
              excerptText: excerpt,
              isAllowComments: commentStatus === "open",
              postFormatsSelected: postFormats,
              videoUrl: ncmazVideoUrl?.videoUrl || "",
              objGalleryImgs: ncmazGalleryImgs.reduce((acc, cur, index) => {
                return {
                  ...acc,
                  [`image${index + 1}`]: {
                    sourceUrl: cur?.sourceUrl || "",
                    altText: cur?.altText || "",
                    databaseId: cur?.databaseId || 0,
                  },
                };
              }, {}),
            }}
          />
        </div>
      </main>
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
  return { paths: [], fallback: "blocking" };
};

export default Page;
