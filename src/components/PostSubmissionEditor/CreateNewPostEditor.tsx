import React, { FC, useState } from "react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import TitleEditor from "./TitleEditor";
import { debounce } from "lodash";
import TagsInput, { TagNodeShort } from "./TagsInput";
import CategoriesInput from "./CategoriesInput";
import PostOptionsBtn, { PostOptionsData } from "./PostOptionsBtn";
import TiptapEditor from "./TiptapEditor";
import { Editor } from "@tiptap/react";
import { useMutation } from "@apollo/client";
import Alert from "@/components/Alert";
import toast from "react-hot-toast";
import {
  NcmazFcCategoryFullFieldsFragmentFragment,
  PostStatusEnum,
} from "@/__generated__/graphql";
import ButtonInsertImage, { ImageState } from "./ButtonInsertImage";
import { getApolloAuthClient, useAuth } from "@faustwp/core";
import Button from "../Button/Button";
import { useRouter } from "next/router";
import {
  NC_MUTATION_CREATE_POST,
  NC_MUTATION_UPDATE_POST,
} from "@/fragments/mutations";
import Label from "../Label/Label";
import { IS_CHISNGHIAX_DEMO_SITE } from "@/contains/site-settings";
import NcModal from "../NcModal/NcModal";
import Link from "next/link";
import errorHandling from "@/utils/errorHandling";

interface Props {
  isEditingPage?: boolean;
  isEditingPostId?: string;
  isSubmittingPage?: boolean;
  //
  defaultTitle?: string;
  defaultContent?: string;
  defaultFeaturedImage?: ImageState;
  defaultTags?: TagNodeShort[];
  defaultCategories?: NcmazFcCategoryFullFieldsFragmentFragment[];
  defaultPostOptionsData?: PostOptionsData;
  //
}

export function handleBeforeunload(event: BeforeUnloadEvent) {
  event.preventDefault();
  event.returnValue = "";
}

const CreateNewPostEditor: FC<Props> = ({
  isEditingPostId,
  isEditingPage,
  isSubmittingPage,
  defaultTitle = "",
  defaultContent = "",
  defaultFeaturedImage = {
    sourceUrl: "",
    altText: " Alt text",
  },
  defaultTags = [],
  defaultCategories = [],
  defaultPostOptionsData = {
    audioUrl: "",
    videoUrl: "",
    excerptText: "",
    postFormatsSelected: "",
    objGalleryImgs: undefined,
    isAllowComments: true,
    timeSchedulePublication: undefined,
  },
}) => {
  const { isAuthenticated, isReady } = useAuth();
  const client = getApolloAuthClient();
  //
  const router = useRouter();
  //
  const [titleContent, setTitleContent] = useState(defaultTitle);
  const [contentHTML, setContentHTML] = useState(defaultContent);
  const [featuredImage, setFeaturedImage] = useState(defaultFeaturedImage);
  const [tags, setTags] = useState(defaultTags);
  const [categories, setCategories] = useState(defaultCategories);
  const [postOptionsData, setPostOptionsData] = useState(
    defaultPostOptionsData
  );

  //
  const [newUpdatedUri, setNewUpdatedUri] = useState("");
  //

  // MUTATION_CREATE_POST GQL
  // status: PENDING | PRIVATE | PUBLISH | DRAFT | TRASH
  // Lưu ý có biến ncTags - Biến này được tạo ra để Contributor và Author có thể thêm Tags mới vào Post (Được xử lý trong ncmaz-custom-wpgraphql)
  const [mutationCreatePost, { error, data, loading }] = useMutation(
    NC_MUTATION_CREATE_POST,
    {
      client,
      onCompleted: (data) => {
        toast.success("Created new post successfully");
        window.removeEventListener("beforeunload", handleBeforeunload);
        if (data.createPost?.post?.status !== "publish") {
          router.push(
            `/preview${data?.createPost?.post?.uri}&preview=true&previewPathname=post`
          );
          return;
        }
        router.replace(data?.createPost?.post?.uri || "");
      },
      onError: (error) => {
        errorHandling(error);
      },
    }
  );
  const [
    mutationUpdatePost,
    {
      error: updatePostError,
      data: updatePostData,
      loading: updatePostLoading,
    },
  ] = useMutation(NC_MUTATION_UPDATE_POST, {
    client,
    onCompleted: (data) => {
      toast.success("Update post successfully");
      window.removeEventListener("beforeunload", handleBeforeunload);
      setNewUpdatedUri(`/?p=${data?.updatePost?.post?.databaseId}`);
    },
    onError: (error) => {
      errorHandling(error);
    },
  });

  //
  const debounceGetTitle = debounce(function (e: Editor) {
    setTitleContent(e.getText());
  }, 300);

  const debounceGetContentHtml = debounce(function (e: Editor) {
    setContentHTML(e.getHTML());
  }, 400);
  //
  const handleChangeFeaturedImage = (image: ImageState) => {
    setFeaturedImage(image);
    return;
  };

  const handleChangeCategories = (
    data: NcmazFcCategoryFullFieldsFragmentFragment[]
  ) => {
    setCategories(data);
  };

  const handleChangeTags = (tags: TagNodeShort[]) => {
    setTags(tags);
  };

  const handleApplyPostOptions = (data: PostOptionsData) => {
    setPostOptionsData(data);
  };

  const onSubmmitMutation = (status: PostStatusEnum) => {
    // for site chisnghiax demo - please delete this code on your site
    if (IS_CHISNGHIAX_DEMO_SITE) {
      toast.error("Sorry, post submission is disabled on the demo site!");
      return;
    }

    if (isSubmittingPage) {
      mutationCreatePost({
        variables: {
          status,
          title: titleContent,
          content: contentHTML,
          categoryNodes: categories.map((item) => ({
            id: item.databaseId.toString(),
          })),
          ncTags: tags.map((item) => item.name).join(","),
          featuredImg_alt: featuredImage?.altText ?? null,
          featuredImg_url: featuredImage?.sourceUrl ?? null,
          date: postOptionsData.timeSchedulePublication || null,
          //
          img_1_alt: postOptionsData.objGalleryImgs?.[1]?.altText ?? null,
          img_2_alt: postOptionsData.objGalleryImgs?.[2]?.altText ?? null,
          img_3_alt: postOptionsData.objGalleryImgs?.[3]?.altText ?? null,
          img_4_alt: postOptionsData.objGalleryImgs?.[4]?.altText ?? null,
          img_5_alt: postOptionsData.objGalleryImgs?.[5]?.altText ?? null,
          img_6_alt: postOptionsData.objGalleryImgs?.[6]?.altText ?? null,
          img_7_alt: postOptionsData.objGalleryImgs?.[7]?.altText ?? null,
          img_8_alt: postOptionsData.objGalleryImgs?.[8]?.altText ?? null,
          //
          img_1_url: postOptionsData.objGalleryImgs?.[1]?.sourceUrl ?? null,
          img_2_url: postOptionsData.objGalleryImgs?.[2]?.sourceUrl ?? null,
          img_3_url: postOptionsData.objGalleryImgs?.[3]?.sourceUrl ?? null,
          img_4_url: postOptionsData.objGalleryImgs?.[4]?.sourceUrl ?? null,
          img_5_url: postOptionsData.objGalleryImgs?.[5]?.sourceUrl ?? null,
          img_6_url: postOptionsData.objGalleryImgs?.[6]?.sourceUrl ?? null,
          img_7_url: postOptionsData.objGalleryImgs?.[7]?.sourceUrl ?? null,
          img_8_url: postOptionsData.objGalleryImgs?.[8]?.sourceUrl ?? null,
          //
          commentStatus: postOptionsData.isAllowComments ? "open" : "closed",
          excerpt: postOptionsData.excerptText ?? null,
          ncmazAudioUrl: postOptionsData.audioUrl ?? null,
          ncmazVideoUrl: postOptionsData.videoUrl ?? null,
          postFormatName:
            postOptionsData.postFormatsSelected !== ""
              ? postOptionsData.postFormatsSelected
              : null,
        },
      });
    } else if (isEditingPage) {
      mutationUpdatePost({
        variables: {
          id: isEditingPostId || "",
          status,
          title: titleContent,
          content: contentHTML,
          categoryNodes: categories.map((item) => ({
            id: item.databaseId.toString(),
          })),
          ncTags: tags.map((item) => item.name).join(","),
          featuredImg_alt: featuredImage?.altText ?? null,
          featuredImg_url: featuredImage?.sourceUrl ?? null,
          date: postOptionsData.timeSchedulePublication || null,
          //
          img_1_alt: postOptionsData.objGalleryImgs?.[1]?.altText ?? null,
          img_2_alt: postOptionsData.objGalleryImgs?.[2]?.altText ?? null,
          img_3_alt: postOptionsData.objGalleryImgs?.[3]?.altText ?? null,
          img_4_alt: postOptionsData.objGalleryImgs?.[4]?.altText ?? null,
          img_5_alt: postOptionsData.objGalleryImgs?.[5]?.altText ?? null,
          img_6_alt: postOptionsData.objGalleryImgs?.[6]?.altText ?? null,
          img_7_alt: postOptionsData.objGalleryImgs?.[7]?.altText ?? null,
          img_8_alt: postOptionsData.objGalleryImgs?.[8]?.altText ?? null,
          //
          img_1_url: postOptionsData.objGalleryImgs?.[1]?.sourceUrl ?? null,
          img_2_url: postOptionsData.objGalleryImgs?.[2]?.sourceUrl ?? null,
          img_3_url: postOptionsData.objGalleryImgs?.[3]?.sourceUrl ?? null,
          img_4_url: postOptionsData.objGalleryImgs?.[4]?.sourceUrl ?? null,
          img_5_url: postOptionsData.objGalleryImgs?.[5]?.sourceUrl ?? null,
          img_6_url: postOptionsData.objGalleryImgs?.[6]?.sourceUrl ?? null,
          img_7_url: postOptionsData.objGalleryImgs?.[7]?.sourceUrl ?? null,
          img_8_url: postOptionsData.objGalleryImgs?.[8]?.sourceUrl ?? null,
          //
          commentStatus: postOptionsData.isAllowComments ? "open" : "closed",
          excerpt: postOptionsData.excerptText ?? null,
          ncmazAudioUrl: postOptionsData.audioUrl ?? null,
          ncmazVideoUrl: postOptionsData.videoUrl ?? null,
          postFormatName:
            postOptionsData.postFormatsSelected !== ""
              ? postOptionsData.postFormatsSelected
              : null,
        },
      });
    }
  };

  const handleClickPublish = () => {
    if (!isAuthenticated && !isReady) return;

    if (!!postOptionsData.timeSchedulePublication) {
      onSubmmitMutation(PostStatusEnum.Future);
      return;
    }

    onSubmmitMutation(PostStatusEnum.Publish);
  };

  const handleClickSaveDraft = () => {
    if (!isAuthenticated && !isReady) return;
    onSubmmitMutation(PostStatusEnum.Draft);
  };

  const LOADING = loading || updatePostLoading;
  const ERROR = error || updatePostError;

  const renderPostTitle = () => {
    return (
      <div className="px-2.5 pb-10 lg:py-10 w-full">
        <div className="w-full max-w-screen-md mx-auto space-y-5">
          <div className="">
            <Label className="text-sm">Featured image</Label>
            <ButtonInsertImage
              defaultImage={featuredImage}
              onChangeImage={handleChangeFeaturedImage}
            />
          </div>
          <CategoriesInput
            defaultValue={categories}
            onChange={handleChangeCategories}
          />
          <TitleEditor
            defaultTitle={titleContent}
            onUpdate={debounceGetTitle}
          />
          <TagsInput defaultValue={tags} onChange={handleChangeTags} />
          {ERROR && (
            <Alert containerClassName="text-sm" type="error">
              {ERROR.message}
            </Alert>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="nc-CreateNewPostEditor flex-1 relative">
        <div className="absolute inset-0 flex flex-col h-full">
          <div className="flex-1 overflow-y-auto hiddenScrollbar">
            {renderPostTitle()}

            <TiptapEditor
              defaultContent={contentHTML}
              onUpdate={debounceGetContentHtml}
            />
          </div>

          <div className="flex-shrink-0 w-full border-t border-neutral-200 dark:border-neutral-600 px-2.5">
            <div className="w-full max-w-screen-md mx-auto flex gap-3 py-4 pt-[18px]">
              <ButtonPrimary
                fontSize="text-base font-medium"
                onClick={handleClickPublish}
                loading={LOADING}
                disabled={LOADING}
              >
                {!!postOptionsData.timeSchedulePublication
                  ? "Schedule"
                  : "Publish"}
              </ButtonPrimary>
              <Button
                fontSize="text-base font-medium"
                onClick={handleClickSaveDraft}
                loading={LOADING}
                disabled={LOADING}
                pattern="third"
              >
                {isEditingPage ? "Move to draft" : "Save draft"}
              </Button>
              <PostOptionsBtn
                defaultData={postOptionsData}
                onSubmit={handleApplyPostOptions}
              />
            </div>
          </div>
        </div>
      </div>

      {!!isEditingPage && (
        <NcModal
          renderTrigger={() => null}
          isOpenProp={!!newUpdatedUri}
          renderContent={() => (
            <div className="py-5">
              <div className="font-medium">
                Congratulations! You have successfully updated the post!
              </div>
              <div className="text-sm text-neutral-700 mt-2.5">
                These changes will be applied to the post in about 15 minutes.{" "}
                <br />
                You can{" "}
                <Link
                  href={`/preview${newUpdatedUri}&preview=true&previewPathname=post`}
                  className="font-medium underline"
                >
                  preview the post
                </Link>{" "}
                by clicking the button below.
              </div>
            </div>
          )}
          onCloseModal={() => setNewUpdatedUri("")}
          contentExtraClass="max-w-screen-sm"
          modalTitle="Update post successfully"
          renderFooter={() => (
            <div className="flex justify-end">
              <ButtonPrimary
                href={`/preview${newUpdatedUri}&preview=true&previewPathname=post`}
                onClick={() => {
                  setNewUpdatedUri("");
                }}
              >
                Preview post
              </ButtonPrimary>
            </div>
          )}
        />
      )}
    </>
  );
};

export default CreateNewPostEditor;
