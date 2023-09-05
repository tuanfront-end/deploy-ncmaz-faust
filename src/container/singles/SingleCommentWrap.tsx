import React, {
  FC,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import SingleCommentLists from "./SingleCommentLists";
import SingleCommentForm from "./SingleCommentForm";
import ModalDeleteComment from "./ModalDeleteComment";
import ModalEditComment from "./ModalEditComment";
import {
  flatListToHierarchical,
  getApolloAuthClient,
  useAuth,
} from "@faustwp/core";
import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";
import {
  QUERY_GET_COMMENTS_BY_POST_ID,
  QUERY_MUTATION_CREATE_COMMENT,
  QUERY_MUTATION_DELETE_COMMENT_BY_ID,
  QUERY_MUTATION_UPDATE_COMMENT_BY_ID,
} from "@/fragments/queries";
import { useMutation, useQuery } from "@apollo/client";
import { TCommentHasChild } from "@/components/CommentCard/CommentCard";
import toast from "react-hot-toast";
import {
  CommentStatusEnum,
  NcmazFcCommentFullFieldsFragment,
} from "@/__generated__/graphql";
import errorHandling from "@/utils/errorHandling";
import GraphqlError from "@/components/GraphqlError";

export const CommentWrapContext = createContext<{
  isReplyingDatabaseId?: number | null;
  isEditingDatabaseId?: number | null;
  isDeletingDatabaseId?: number | null;
  isCreateNewReplyCommentLoading?: boolean;
  isDeleteCommentsByIdLoading?: boolean;
  isCreateNewCommentLoading?: boolean;
  isUpdateCommentByIdLoading?: boolean;
}>({});

interface SingleCommentWrapProps {
  postDatabaseId: number;
  commentCount: number;
}

const SingleCommentWrap: FC<SingleCommentWrapProps> = ({
  postDatabaseId,
  commentCount: commentCountProp,
}) => {
  const endOfNodeCommentListRef = useRef<HTMLDivElement>(null);
  //
  const client = getApolloAuthClient();
  const { isReady, isAuthenticated } = useAuth();
  const { viewer } = useSelector((state: RootState) => state.viewer);
  const commentCountOkFromStore = useSelector(
    (state: RootState) =>
      state.postsNcmazMetaDataOk[postDatabaseId]?.commentCount || 0
  );

  const commentCount = commentCountOkFromStore || commentCountProp;

  const [refetchTimes, setRefetchTimes] = useState(0);

  //
  const [isReplyingDatabaseId, setIsReplyingDatabaseId] = useState<
    number | null
  >();
  const [isEditingDatabaseId, setIsEditingDatabaseId] = useState<
    number | null
  >();
  const [isDeletingDatabaseId, setIsDeletingDatabaseId] = useState<
    number | null
  >();

  //
  const [isOpenReplyFormWithId, setIsOpenReplyFormWithId] = useState<
    number | null
  >();
  const [isOpenDeleteModalWithId, setIsOpenDeleteModalWithId] = useState<
    number | null
  >();
  const [isOpenEditModalWithId, setIsOpenEditModalWithId] = useState<
    number | null
  >();

  //
  const [deletedCommentIds, setDeletedCommentIds] = useState<number[]>([]);
  const [listNewCommentCreated, setListNewCommentCreated] = useState<
    TCommentHasChild[]
  >([]);
  const [listCommentUpdated, setListCommentUpdated] = useState<
    TCommentHasChild[]
  >([]);

  //
  const { data, fetchMore, loading, error, called, refetch } = useQuery(
    QUERY_GET_COMMENTS_BY_POST_ID,
    {
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true,
      context: { fetchOptions: { method: "GET" } },
      variables: {
        first: 40,
        contentId: postDatabaseId.toString(),
      },
      onError: (error) => {
        if (refetchTimes > 3) {
          errorHandling(error);
          return;
        }
        setRefetchTimes(refetchTimes + 1);
        refetch();
      },
    }
  );
  const [mutaionDeleteCommentsById, deleteCommentsByIdResult] = useMutation(
    QUERY_MUTATION_DELETE_COMMENT_BY_ID,
    {
      client,
      notifyOnNetworkStatusChange: true,
    }
  );
  const [mutaionCreateNewComments, createNewCommentsResult] = useMutation(
    QUERY_MUTATION_CREATE_COMMENT,
    {
      client,
      notifyOnNetworkStatusChange: true,
    }
  );
  const [mutaionCreateNewReplyComments, createNewReplyCommentsResult] =
    useMutation(QUERY_MUTATION_CREATE_COMMENT, {
      client,
      notifyOnNetworkStatusChange: true,
    });
  const [mutaionUpdateCommentById, updateCommentByIdResult] = useMutation(
    QUERY_MUTATION_UPDATE_COMMENT_BY_ID,
    {
      client,
      notifyOnNetworkStatusChange: true,
    }
  );

  const openReplyForm = (comment: TCommentHasChild) => {
    if (comment.databaseId === isOpenReplyFormWithId) {
      return;
    }
    setIsOpenReplyFormWithId(comment.databaseId);
  };
  const closeReplyForm = () => setIsOpenReplyFormWithId(null);

  const openModalEditComment = (comment: TCommentHasChild) =>
    setIsOpenEditModalWithId(comment.databaseId);
  const closeModalEditComment = () => setIsOpenEditModalWithId(null);

  const openModalDeleteComment = (comment: TCommentHasChild) =>
    setIsOpenDeleteModalWithId(comment.databaseId);
  const closeModalDeleteComment = () => setIsOpenDeleteModalWithId(null);

  // handle delete comment
  useEffect(() => {
    if (!isDeletingDatabaseId || !deleteCommentsByIdResult.called) {
      return;
    }

    if (deleteCommentsByIdResult.loading) {
      toast.loading("Deleting comment...");
      return;
    }

    if (deleteCommentsByIdResult.error) {
      toast.dismiss();
      toast.error(deleteCommentsByIdResult.error.message);
      setIsDeletingDatabaseId(null);
      deleteCommentsByIdResult.reset();
      return;
    }

    if (deleteCommentsByIdResult.data) {
      toast.dismiss();
      toast.success("Delete comment successfully");
      setDeletedCommentIds([
        ...deletedCommentIds,
        deleteCommentsByIdResult.data?.deleteComment?.comment?.databaseId || 0,
      ]);
      setIsDeletingDatabaseId(null);
      deleteCommentsByIdResult.reset();
      return;
    }
  }, [deleteCommentsByIdResult.loading]);

  // handle create new comment
  useEffect(() => {
    if (!createNewCommentsResult.called) {
      return;
    }

    if (createNewCommentsResult.loading) {
      toast.loading("Creating comment...");
      return;
    }

    if (
      createNewCommentsResult.error ||
      !createNewCommentsResult.data?.createComment?.success
    ) {
      toast.dismiss();
      toast.error(
        createNewCommentsResult?.error?.message || "Create comment failed"
      );
      createNewCommentsResult.reset();
      return;
    }

    if (createNewCommentsResult.data) {
      toast.dismiss();
      toast.success("Create comment successfully");
      const newCreated = createNewCommentsResult.data?.createComment
        ?.comment as TCommentHasChild;
      if (
        !listNewCommentCreated.some(
          (c) => c.databaseId === newCreated.databaseId
        )
      ) {
        setListNewCommentCreated([...listNewCommentCreated, newCreated]);
        setTimeout(() => {
          const newNode = document.getElementById(
            `comment-${newCreated.databaseId}`
          );
          newNode?.scrollIntoView({
            behavior: "auto",
            block: "nearest",
          });
          (
            newNode?.querySelector(".nc-CommentCard__box") as HTMLElement | null
          )?.classList.add("ring", "ring-inset");
        }, 500);
      }
      createNewCommentsResult.reset();
      return;
    }
  }, [createNewCommentsResult.loading]);

  // handle create new reply comment
  useEffect(() => {
    if (!createNewReplyCommentsResult.called || !isOpenReplyFormWithId) {
      return;
    }

    if (createNewReplyCommentsResult.loading) {
      toast.loading("Replying comment...");
      return;
    }

    if (
      createNewReplyCommentsResult.error ||
      !createNewReplyCommentsResult.data?.createComment?.success
    ) {
      toast.dismiss();
      toast.error(
        createNewReplyCommentsResult?.error?.message || "Reply comment failed"
      );
      createNewReplyCommentsResult.reset();
      return;
    }

    if (createNewReplyCommentsResult.data) {
      toast.dismiss();
      toast.success("Reply comment successfully");
      const newCreated = createNewReplyCommentsResult.data?.createComment
        ?.comment as TCommentHasChild;
      if (
        !listNewCommentCreated.some(
          (c) => c.databaseId === newCreated.databaseId
        )
      ) {
        setListNewCommentCreated([...listNewCommentCreated, newCreated]);
        setTimeout(() => {
          const newNode = document.getElementById(
            `comment-${newCreated.databaseId}`
          );
          newNode?.scrollIntoView({
            behavior: "auto",
            block: "nearest",
          });
          (
            newNode?.querySelector(".nc-CommentCard__box") as HTMLElement | null
          )?.classList.add("ring", "ring-inset");
        }, 500);
      }
      setIsOpenReplyFormWithId(null);
      createNewReplyCommentsResult.reset();
      return;
    }
  }, [createNewReplyCommentsResult.loading]);

  // handle update a comment
  useEffect(() => {
    if (
      !updateCommentByIdResult.called ||
      !isOpenEditModalWithId ||
      !isEditingDatabaseId
    ) {
      return;
    }

    if (updateCommentByIdResult.loading) {
      toast.loading("Updating comment...");
      return;
    }

    if (
      updateCommentByIdResult.error ||
      !updateCommentByIdResult.data?.updateComment?.success
    ) {
      toast.dismiss();
      toast.error(
        updateCommentByIdResult?.error?.message || "Updating comment failed"
      );
      updateCommentByIdResult.reset();
      return;
    }

    if (updateCommentByIdResult.data) {
      toast.dismiss();
      toast.success("Update comment successfully");
      const newUpdated = updateCommentByIdResult.data?.updateComment
        ?.comment as TCommentHasChild;
      if (
        !listCommentUpdated.some((c) => c.databaseId === newUpdated.databaseId)
      ) {
        setListCommentUpdated([...listCommentUpdated, newUpdated]);
      } else {
        setListCommentUpdated(
          listCommentUpdated.map((c) =>
            c.databaseId === newUpdated.databaseId ? newUpdated : c
          )
        );
      }

      setIsEditingDatabaseId(null);
      updateCommentByIdResult.reset();
      return;
    }
  }, [updateCommentByIdResult.loading]);

  //
  const handleLoadmoreComments = () => {
    fetchMore({
      variables: {
        after: data?.comments?.pageInfo?.endCursor,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult?.comments) {
          return prevResult;
        }

        return {
          ...prevResult,
          ...fetchMoreResult,
          comments: {
            ...prevResult.comments,
            ...fetchMoreResult.comments,
            nodes: [
              ...(prevResult.comments?.nodes || []),
              ...(fetchMoreResult.comments?.nodes || []),
            ],
          },
        };
      },
    });
  };

  const handleSubmitCommentForm = (data: string) => {
    if (!isAuthenticated || !viewer?.databaseId) {
      toast.error("You must login to comment");
      return;
    }

    mutaionCreateNewComments({
      variables: {
        content: data,
        commentOn: postDatabaseId,
      },
    });
  };

  const handleSubmitFormReply = (data: {
    comment: TCommentHasChild;
    data: string;
  }) => {
    if (!isAuthenticated || !viewer?.databaseId) {
      toast.error("You must login to comment");
      return;
    }
    data.comment.parentDatabaseId &&
      mutaionCreateNewReplyComments({
        variables: {
          content: data.data,
          commentOn: postDatabaseId,
          parent: data.comment.parentDatabaseId.toString(),
        },
      });
  };

  // caculate data flat
  const aDataHandled = useMemo(() => {
    // handle caculate comment data list
    const nodes = (data?.comments?.nodes ||
      []) as NcmazFcCommentFullFieldsFragment[];

    // add new comment created
    let dataActual = [...nodes, ...listNewCommentCreated];

    // add new comment updated
    dataActual = dataActual.map((item) => {
      const itemUpdated = listCommentUpdated.find(
        (c) => c.databaseId === item.databaseId
      );
      return itemUpdated ? itemUpdated : item;
    });

    // add fake comment to show reply form
    if (isOpenReplyFormWithId && viewer?.databaseId) {
      dataActual = [
        ...dataActual,
        {
          ...dataActual[0],
          status: CommentStatusEnum.Trash,
          id: `fake-for-reply-${Date.now()}`,
          databaseId: Number(Date.now()),
          parentDatabaseId: isOpenReplyFormWithId,
          parentId:
            dataActual.find((item) => item.databaseId === isOpenReplyFormWithId)
              ?.id || null,
          content: "",
          author: {
            node: viewer,
          },
        },
      ];
    }

    // remove deleted comment -- cai nay phai lam sau phan add new comment
    dataActual = dataActual?.filter(
      (item) => !deletedCommentIds.includes(item?.databaseId)
    );

    const aDataHierarchical = flatListToHierarchical(dataActual, {
      idKey: "id",
      parentKey: "parentId",
    }) as TCommentHasChild[];

    return {
      aDataHierarchical,
      aDataFlat: dataActual,
    };
  }, [
    data,
    viewer?.databaseId,
    listNewCommentCreated,
    isOpenReplyFormWithId,
    deletedCommentIds,
    listCommentUpdated,
  ]);

  const renderComments = () => {
    return (
      <>
        <>
          <SingleCommentLists
            aDataHierarchical={aDataHandled.aDataHierarchical || []}
            loading={loading || !called}
            hasNextPage={data?.comments?.pageInfo?.hasNextPage}
            onLoadmoreComments={handleLoadmoreComments}
            postDatabaseId={postDatabaseId}
            onClickDelete={openModalDeleteComment}
            onClickEdit={openModalEditComment}
            onClickReply={openReplyForm}
            onSubmitFormReply={handleSubmitFormReply}
            onCancelFormReply={closeReplyForm}
          />
          <div className="!my-0" ref={endOfNodeCommentListRef}></div>
        </>

        {!!error && (
          <>
            <div className="my-10 border-t border-neutral-200 dark:border-neutral-700"></div>
            <GraphqlError
              error={error}
              hasRefetchBtn
              refetch={refetch}
              loading={loading}
            />
          </>
        )}
      </>
    );
  };

  return (
    <CommentWrapContext.Provider
      value={{
        isReplyingDatabaseId,
        isEditingDatabaseId,
        isDeletingDatabaseId,
        isCreateNewReplyCommentLoading: createNewReplyCommentsResult.loading,
        isCreateNewCommentLoading: createNewCommentsResult.loading,
        isDeleteCommentsByIdLoading: deleteCommentsByIdResult.loading,
        isUpdateCommentByIdLoading: updateCommentByIdResult.loading,
      }}
    >
      <div>
        {/* COMMENT FORM */}
        <div className="max-w-screen-md mx-auto pt-5">
          <h3
            id="nc-single-comment"
            className="text-lg xl:text-xl font-semibold text-neutral-800 dark:text-neutral-200"
          >
            Responses ({commentCount} )
          </h3>
          <SingleCommentForm
            isSuccessfulCreatedComment={
              !!createNewCommentsResult.data?.createComment?.success
            }
            onClickSubmit={handleSubmitCommentForm}
          />
        </div>

        {renderComments()}

        {/* -------------------modal---------------------- */}
        <ModalEditComment
          show={!!isOpenEditModalWithId}
          onCloseModalEditComment={closeModalEditComment}
          onSubmitModalEditComment={({ comment, newContent }) => {
            if (
              !comment.databaseId ||
              !isAuthenticated ||
              !newContent ||
              newContent === comment.content
            ) {
              closeModalEditComment();
              return;
            }
            closeModalEditComment();
            setIsEditingDatabaseId(comment.databaseId);
            mutaionUpdateCommentById({
              variables: {
                id: comment.databaseId.toString(),
                content: newContent,
              },
            });
          }}
          comment={aDataHandled.aDataFlat.find(
            (item) => item.databaseId === isOpenEditModalWithId
          )}
        />
        <ModalDeleteComment
          show={!!isOpenDeleteModalWithId}
          commentDatabaseId={isOpenDeleteModalWithId || 0}
          onCloseModalDeleteComment={closeModalDeleteComment}
          onSubmitDeletedComment={(databaseID) => {
            if (!isAuthenticated) return;

            closeModalDeleteComment();
            setIsDeletingDatabaseId(databaseID);
            mutaionDeleteCommentsById({
              variables: {
                id: databaseID?.toString(),
              },
            });
          }}
        />
      </div>
    </CommentWrapContext.Provider>
  );
};

export default SingleCommentWrap;
