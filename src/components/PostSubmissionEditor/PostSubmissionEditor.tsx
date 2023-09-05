import { gql, useLazyQuery } from "@apollo/client";
import Alert from "@/components/Alert";
import React, { FC, Suspense, useEffect } from "react";
import CircleLoading from "../Loading/CircleLoading";

const CreateNewPostEditorLazy = React.lazy(
  () => import("./CreateNewPostEditor")
);
// const UpdatePostEditorLazy = React.lazy(() => import("./UpdatePostEditor"));

interface Props {
  action?: "edit" | "create";
  postDatabaseID?: number;
}

const PostSubmissionEditor: FC<Props> = ({
  action = "create",
  postDatabaseID,
}) => {
  const [getPostByDataBaseID, { error, data, loading }] = useLazyQuery(
    gql(` query GetPostSiglePageForTipTabEditor($databaseId: ID!, $asPreview: Boolean = false) {
        post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
            ...NcmazFcPostFullFields
        }
      } `),
    {
      notifyOnNetworkStatusChange: true,
      context: { fetchOptions: { method: "GET" } },
    }
  );

  useEffect(() => {
    if (action === "edit" && !!postDatabaseID) {
      getPostByDataBaseID({ variables: { postId: Number(postDatabaseID) } });
    }
  }, []);

  if (action === "edit" && !!postDatabaseID) {
    if (error) {
      return (
        <Alert type="error">
          <div
            dangerouslySetInnerHTML={{
              __html: `${error.message}
          <a
            class="underline ml-2"
            href="javascript:window.location.href=window.location.href"
          >
            Reload
          </a>`,
            }}
          ></div>
        </Alert>
      );
    }
    if (loading) {
      return <CircleLoading />;
    }
    if (!data) {
      return <Alert>Something went wrong!</Alert>;
    }
    return (
      <Suspense fallback={<div />}>
        tuan
        {/* <UpdatePostEditorLazy postNode={data.post} /> */}
      </Suspense>
    );
  }

  if (action === "create") {
    return (
      <Suspense fallback={<div />}>
        <CreateNewPostEditorLazy />
      </Suspense>
    );
  }

  return null;
};

export default PostSubmissionEditor;
