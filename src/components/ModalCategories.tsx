import React, { FC } from "react";
import CardCategory1 from "@/components/CardCategory1/CardCategory1";
import NcModal from "@/components/NcModal/NcModal";
import Button from "@/components/Button/Button";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useLazyQuery } from "@apollo/client";
import ButtonPrimary from "./Button/ButtonPrimary";
import Empty from "./Empty";
import CardCategory1Skeleton from "@/components/CardCategory1/CardCategory1Skeleton";
import { QUERY_GET_CATEGORIES } from "@/fragments/queries";
import { NcmazFcCategoryFullFieldsFragmentFragment } from "@/__generated__/graphql";
import errorHandling from "@/utils/errorHandling";
import GraphqlError from "./GraphqlError";

export interface ModalCategoriesProps {}

const ModalCategories: FC<ModalCategoriesProps> = () => {
  const [refetchTimes, setRefetchTimes] = React.useState(0);

  const [queryGetCategories, { loading, error, data, fetchMore, refetch }] =
    useLazyQuery(QUERY_GET_CATEGORIES, {
      variables: { first: 20 },
      notifyOnNetworkStatusChange: true,
      context: { fetchOptions: { method: "GET" } },
      onError: (error) => {
        if (refetchTimes > 3) {
          errorHandling(error);
          return;
        }
        setRefetchTimes(refetchTimes + 1);

        refetch();
      },
    });

  const handleClickShowMore = () => {
    fetchMore({
      variables: {
        after: data?.categories?.pageInfo?.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !fetchMoreResult?.categories?.nodes) {
          return prev;
        }

        return {
          categories: {
            ...fetchMoreResult.categories,
            nodes: [
              ...(prev?.categories?.nodes || []),
              ...fetchMoreResult.categories.nodes,
            ],
          },
        };
      },
    });
  };

  const cats = (data?.categories?.nodes ||
    []) as NcmazFcCategoryFullFieldsFragmentFragment[];

  const renderModalContent = () => {
    if (!!error) {
      return (
        <div>
          <GraphqlError
            error={error}
            hasRefetchBtn
            refetch={refetch}
            loading={loading}
          />
        </div>
      );
    }

    return (
      <div>
        {/* LOOP ITEMS */}
        {!cats.length && !loading ? (
          <Empty />
        ) : (
          <div className="grid gap-2.5 sm:gap-5 sm:grid-cols-2 sm:py-2 md:grid-cols-3 xl:md:grid-cols-4">
            {!cats.length && loading
              ? [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
                  <CardCategory1Skeleton key={i} />
                ))
              : (cats || []).map((cat) => (
                  <CardCategory1
                    key={cat.databaseId}
                    term={cat}
                    size="normal"
                    className="p-2.5 pr-3 rounded-2xl border border-neutral-100 dark:border-neutral-700 "
                  />
                ))}
          </div>
        )}

        {/* SHOW MORE */}
        {data?.categories?.pageInfo.hasNextPage ? (
          <div className="mt-7 flex justify-center">
            <ButtonPrimary loading={loading} onClick={handleClickShowMore}>
              Show me more
            </ButtonPrimary>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="nc-ModalCategories">
      <NcModal
        renderTrigger={(openModal) => (
          <Button
            pattern="third"
            fontSize="text-sm font-medium"
            onClick={() => {
              openModal();
              queryGetCategories();
            }}
          >
            <svg
              className="w-5 h-5 -ms-1.5 me-2 "
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 12.2H15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 16.2H12.38"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 6H14C16 6 16 5 16 4C16 2 15 2 14 2H10C9 2 8 2 8 4C8 6 9 6 10 6Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 4.02002C19.33 4.20002 21 5.43002 21 10V16C21 20 20 22 15 22H9C4 22 3 20 3 16V10C3 5.44002 4.67 4.20002 8 4.02002"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div>
              <span className="hidden sm:inline">Other</span> Categories
            </div>
            <ChevronDownIcon
              className="w-4 h-4 ms-2 -me-1"
              aria-hidden="true"
            />
          </Button>
        )}
        modalTitle="Discover other categories"
        renderContent={renderModalContent}
        enableFooter={false}
      />
    </div>
  );
};

export default ModalCategories;
