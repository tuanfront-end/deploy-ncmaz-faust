// import React, { FC, useEffect, useDeferredValue } from "react";
// import ButtonPrimary from "components/Button/ButtonPrimary";
// import NCMAZ_TRANSLATE from "contains/translate";
// import TitleEditor from "./TitleEditor";
// import { debounce } from "lodash";
// import TagsInput, { TagNodeShort } from "./TagsInput";
// import ButtonSecondary from "components/Button/ButtonSecondary";
// import CategoriesInput from "./CategoriesInput";
// import PostOptionsBtn, { PostOptionsData } from "./PostOptionsBtn";
// import ImageUploadToServer, {
//   ImageState,
// } from "components/ImageUploadToServer";

// import Label from "components/Label/Label";
// import { CategoriesNode3, PostNodeFullData } from "data/postCardType";
// import TiptapEditor from "./TiptapEditor";
// import { Editor } from "@tiptap/react";
// import { gql, useMutation } from "@apollo/client";
// import Alert from "components/Alert/Alert";
// import toast from "react-hot-toast";
// import ModalDraftPost from "./ModalDraftPost";
// import { handleBeforeunload } from "./CreateNewPostEditor";

// interface Data {
//   updatePost: UpdatePost;
// }

// interface UpdatePost {
//   post: Post;
//   __typename: string;
// }

// interface Post {
//   title: string;
//   link: string;
//   id: string;
//   postId: number;
//   __typename: string;
// }

// interface Props {
//   postNode: PostNodeFullData;
// }

// const UpdatePostEditor: FC<Props> = ({ postNode }) => {
//   //
//   const [openDraftModal, setOpenDraftModal] = React.useState(false);

//   //
//   const [titleContent, setTitleContent] = React.useState(postNode.title);
//   const [contentHTML, setContentHTML] = React.useState(postNode.content);
//   const [featuredImage, setFeaturedImage] = React.useState<
//     ImageState | undefined
//   >({
//     sourceUrl: postNode.featuredImage?.node.sourceUrl || "",
//     id: postNode.featuredImage?.node.databaseId || "",
//     altText: postNode.featuredImage?.node.altText || "",
//   });

//   const [tags, setTags] = React.useState<TagNodeShort[]>(
//     postNode.tags?.edges.map((item) => item.node) || []
//   );
//   const [categories, setCategories] = React.useState<CategoriesNode3[]>(
//     postNode.categories?.nodes.map((item) => item.node) || []
//   );

//   const [postOptionsData, setPostOptionsData] = React.useState<PostOptionsData>(
//     {
//       audioUrl: postNode.ncmazAudioUrl.audioUrl || "",
//       videoUrl: postNode.ncmazVideoUrl.videoUrl || "",
//       isAllowComments: postNode.commentStatus === "open",
//       excerptText: postNode.excerpt || "",
//       postFormatsSelected:
//         (postNode.postFormats?.edges[0]?.node.slug as any) || "Standard",
//       objGalleryImgs: {
//         1: {
//           sourceUrl: postNode.ncmazGalleryImgs.image1?.sourceUrl || "",
//           id: postNode.ncmazGalleryImgs.image1?.databaseId || "",
//           altText: postNode.ncmazGalleryImgs.image1?.altText || "",
//         },
//         2: {
//           sourceUrl: postNode.ncmazGalleryImgs.image2?.sourceUrl || "",
//           id: postNode.ncmazGalleryImgs.image2?.databaseId || "",
//           altText: postNode.ncmazGalleryImgs.image2?.altText || "",
//         },
//         3: {
//           sourceUrl: postNode.ncmazGalleryImgs.image3?.sourceUrl || "",
//           id: postNode.ncmazGalleryImgs.image3?.databaseId || "",
//           altText: postNode.ncmazGalleryImgs.image3?.altText || "",
//         },
//         4: {
//           sourceUrl: postNode.ncmazGalleryImgs.image4?.sourceUrl || "",
//           id: postNode.ncmazGalleryImgs.image4?.databaseId || "",
//           altText: postNode.ncmazGalleryImgs.image4?.altText || "",
//         },
//         5: {
//           sourceUrl: postNode.ncmazGalleryImgs.image5?.sourceUrl || "",
//           id: postNode.ncmazGalleryImgs.image5?.databaseId || "",
//           altText: postNode.ncmazGalleryImgs.image5?.altText || "",
//         },
//         6: {
//           sourceUrl: postNode.ncmazGalleryImgs.image6?.sourceUrl || "",
//           id: postNode.ncmazGalleryImgs.image6?.databaseId || "",
//           altText: postNode.ncmazGalleryImgs.image6?.altText || "",
//         },
//         7: {
//           sourceUrl: postNode.ncmazGalleryImgs.image7?.sourceUrl || "",
//           id: postNode.ncmazGalleryImgs.image7?.databaseId || "",
//           altText: postNode.ncmazGalleryImgs.image7?.altText || "",
//         },
//         8: {
//           sourceUrl: postNode.ncmazGalleryImgs.image8?.sourceUrl || "",
//           id: postNode.ncmazGalleryImgs.image8?.databaseId || "",
//           altText: postNode.ncmazGalleryImgs.image8?.altText || "",
//         },
//       },
//     }
//   );
//   //

//   // MUTATION_CREATE_POST GQL
//   // status: PENDING | PRIVATE | PUBLISH | DRAFT | TRASH
//   // Lưu ý có biến ncTags - Biến này được tạo ra để Contributor và Author có thể thêm Tags mới vào Post (Được xử lý trong ncmaz-custom-wpgraphql)
//   const MUTATION_UPDATE_POST = gql`
//     mutation MUTATION_UPDATE_POST(
//       $commentStatus: String = "open"
//       $id: ID = ""
//       $status: PostStatusEnum = null
//       $title: String = ""
//       $excerpt: String = ""
//       $ncFeaturedImageDatabaseId: Int = null
//       $ncmazAudioUrl: String = null
//       $ncmazGalleryImgs_1_databaseID: Int = null
//       $ncmazGalleryImgs_2_databaseID: Int = null
//       $ncmazGalleryImgs_3_databaseID: Int = null
//       $ncmazGalleryImgs_4_databaseID: Int = null
//       $ncmazGalleryImgs_5_databaseID: Int = null
//       $ncmazGalleryImgs_6_databaseID: Int = null
//       $ncmazGalleryImgs_7_databaseID: Int = null
//       $ncmazGalleryImgs_8_databaseID: Int = null
//       $content: String = ""
//       $ncmazVideoUrl: String = null
//       $postFormatNodes: [PostPostFormatsNodeInput] = []
//       $postFormatNodesAppend: Boolean = false
//       $categoryNodes: [PostCategoriesNodeInput] = {}
//       $ncTags: String = null
//     ) {
//       updatePost(
//         input: {
//           id: $id
//           commentStatus: $commentStatus
//           status: $status
//           title: $title
//           excerpt: $excerpt
//           ncFeaturedImageDatabaseId: $ncFeaturedImageDatabaseId
//           ncmazAudioUrl: $ncmazAudioUrl
//           ncmazGalleryImgs1DatabaseID: $ncmazGalleryImgs_1_databaseID
//           ncmazGalleryImgs2DatabaseID: $ncmazGalleryImgs_2_databaseID
//           ncmazGalleryImgs3DatabaseID: $ncmazGalleryImgs_3_databaseID
//           ncmazGalleryImgs4DatabaseID: $ncmazGalleryImgs_4_databaseID
//           ncmazGalleryImgs5DatabaseID: $ncmazGalleryImgs_5_databaseID
//           ncmazGalleryImgs6DatabaseID: $ncmazGalleryImgs_6_databaseID
//           ncmazGalleryImgs7DatabaseID: $ncmazGalleryImgs_7_databaseID
//           ncmazGalleryImgs8DatabaseID: $ncmazGalleryImgs_8_databaseID
//           content: $content
//           categories: { append: false, nodes: $categoryNodes }
//           ncTags: $ncTags
//           ncmazVideoUrl: $ncmazVideoUrl
//           postFormats: {
//             nodes: $postFormatNodes
//             append: $postFormatNodesAppend
//           }
//         }
//       ) {
//         post {
//           title
//           link
//           id
//           postId
//           postFormats {
//             edges {
//               node {
//                 id
//                 name
//                 slug
//               }
//             }
//           }
//         }
//       }
//     }
//   `;
//   const [mutationUpdatePost, { error, data, loading }] =
//     useMutation<Data>(MUTATION_UPDATE_POST);

//   const dataDeferredValueAfterSubmit = useDeferredValue(
//     data?.updatePost.post.id
//   );

//   useEffect(() => {
//     window.addEventListener("beforeunload", handleBeforeunload, true);
//   }, []);

//   useEffect(() => {
//     if (!dataDeferredValueAfterSubmit || !data?.updatePost.post.link) {
//       return;
//     }
//     window.removeEventListener("beforeunload", handleBeforeunload, true);
//     toast.success(NCMAZ_TRANSLATE["Post successful"] + "!");
//     setTimeout(() => {
//       window.location.href = data?.updatePost.post.link;
//     }, 500);
//   }, [dataDeferredValueAfterSubmit]);

//   //
//   const debounceGetTitle = debounce(function (e: Editor) {
//     setTitleContent(e.getText());
//   }, 300);

//   const debounceGetContentHtml = debounce(function (e: Editor) {
//     setContentHTML(e.getHTML());
//   }, 400);
//   //
//   const handleChangeFeaturedImage = (image: ImageState) => {
//     setFeaturedImage(image);
//   };

//   const handleChangeCategories = (data: CategoriesNode3[]) => {
//     setCategories(data);
//   };

//   const handleChangeTags = (tags: TagNodeShort[]) => {
//     setTags(tags);
//   };

//   const handleApplyPostOptions = (data: PostOptionsData) => {
//     setPostOptionsData(data);
//   };

//   const converPostOptionDataToInput = (data: PostOptionsData) => {
//     let optionsInput: Record<string, any> = {
//       excerpt: data.excerptText,
//       commentStatus: data.isAllowComments ? "open" : "closed",
//       postFormatNodes: [
//         {
//           slug:
//             data.postFormatsSelected !== "Standard"
//               ? data.postFormatsSelected
//               : null,
//         },
//       ],
//     };
//     if (data.postFormatsSelected === "post-format-gallery") {
//       optionsInput = {
//         ...optionsInput,
//         ncmazGalleryImgs_1_databaseID: data.objGalleryImgs[1].id || 0,
//         ncmazGalleryImgs_2_databaseID: data.objGalleryImgs[2].id || 0,
//         ncmazGalleryImgs_3_databaseID: data.objGalleryImgs[3].id || 0,
//         ncmazGalleryImgs_4_databaseID: data.objGalleryImgs[4].id || 0,
//         ncmazGalleryImgs_5_databaseID: data.objGalleryImgs[5].id || 0,
//         ncmazGalleryImgs_6_databaseID: data.objGalleryImgs[6].id || 0,
//         ncmazGalleryImgs_7_databaseID: data.objGalleryImgs[7].id || 0,
//         ncmazGalleryImgs_8_databaseID: data.objGalleryImgs[8].id || 0,
//       };
//     }
//     if (data.postFormatsSelected === "post-format-video") {
//       optionsInput = {
//         ...optionsInput,
//         ncmazVideoUrl: data.videoUrl || null,
//       };
//     }
//     if (data.postFormatsSelected === "post-format-audio") {
//       optionsInput = {
//         ...optionsInput,
//         ncmazAudioUrl: data.audioUrl || null,
//       };
//     }

//     return optionsInput;
//   };

//   const onSubmmitMutation = (
//     status: "PENDING" | "PRIVATE" | "PUBLISH" | "DRAFT" | "TRASH"
//   ) => {
//     const optionsInput = converPostOptionDataToInput(postOptionsData);
//     const variables = {
//       id: postNode.id,
//       status,
//       title: titleContent,
//       ncFeaturedImageDatabaseId: featuredImage?.id || 0,
//       content: contentHTML,
//       categoryNodes: categories.map((item) => ({
//         id: item.id,
//       })),
//       ncTags: tags.map((item) => item.name).join(","),
//       // tagNodes: tags.map((item) => ({
//       //   name: item.name,
//       // })),
//       ...optionsInput,
//     };
//     mutationUpdatePost({ variables });
//   };

//   const handleClickPublish = () => {
//     if (
//       // CAI NAY TAM THOI - HY VONG SAU NAY WPGRAPHQL SE FIX
//       frontendObject.currentUser?.roles.edges[0]?.node.name === "contributor"
//     ) {
//       onSubmmitMutation("PENDING");
//       return;
//     }
//     onSubmmitMutation("PUBLISH");
//   };

//   const handleClickSaveDraft = () => {
//     if (postNode.status === "pending" || postNode.status === "publish") {
//       setOpenDraftModal(true);
//       return;
//     }
//     onSubmmitMutation("DRAFT");
//   };

//   const renderPostTitle = () => {
//     return (
//       <div className="pb-10 lg:py-10 w-full max-w-screen-md mx-auto ">
//         <div className="flex flex-col w-full">
//           <Label className="block !text-base">
//             {NCMAZ_TRANSLATE["Add a cover image"]}
//           </Label>
//           <ImageUploadToServer
//             defaultImage={featuredImage}
//             onChangeImage={handleChangeFeaturedImage}
//           />
//         </div>

//         <CategoriesInput
//           defaultValue={categories}
//           onChange={handleChangeCategories}
//         />
//         <TitleEditor defaultTitle={titleContent} onUpdate={debounceGetTitle} />
//         <TagsInput defaultValue={tags} onChange={handleChangeTags} />
//       </div>
//     );
//   };

//   return (
//     <div className="nc-UpdatePostEditor ">
//       <div className="bg-white dark:bg-neutral-900 lg:shadow-xl rounded-2xl dark:ring dark:ring-neutral-50/10">
//         {renderPostTitle()}

//         <TiptapEditor
//           defaultContent={contentHTML}
//           onUpdate={debounceGetContentHtml}
//         />

//         <div className="w-full border-b my-2 border-neutral-300 dark:border-neutral-700"></div>
//         {error && (
//           <Alert containerClassName="text-sm m-4 mb-0" type="error">
//             {error.message}
//           </Alert>
//         )}
//         <div className="w-full max-w-screen-md mx-auto flex py-8">
//           <ButtonPrimary
//             fontSize="text-base font-medium"
//             onClick={handleClickPublish}
//             loading={loading}
//             disabled={loading}
//           >
//             {NCMAZ_TRANSLATE["Publish"]}
//           </ButtonPrimary>
//           <ButtonSecondary
//             fontSize="text-base font-medium"
//             className="ml-2.5"
//             onClick={handleClickSaveDraft}
//             loading={loading}
//             disabled={loading}
//           >
//             {NCMAZ_TRANSLATE["Save draft"]}
//           </ButtonSecondary>
//           <PostOptionsBtn
//             defaultData={postOptionsData}
//             onSubmit={handleApplyPostOptions}
//           />
//         </div>
//       </div>
//       <ModalDraftPost
//         show={openDraftModal}
//         onCloseModal={() => setOpenDraftModal(false)}
//         onSubmit={() => {
//           onSubmmitMutation("DRAFT");
//           setOpenDraftModal(false);
//         }}
//       />
//     </div>
//   );
// };

// export default UpdatePostEditor;
