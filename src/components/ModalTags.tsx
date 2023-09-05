"use client";

import React, { FC } from "react";
import NcModal from "@/components/NcModal/NcModal";
import Button from "@/components/Button/Button";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { FragmentType } from "@/__generated__";
import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import ButtonPrimary from "./Button/ButtonPrimary";
import Empty from "./Empty";
import Skeleton from "./Skeleton/Skeleton";
import { QUERY_GET_TAGS } from "@/fragments/queries";
import { getTagDataFromTagFragment } from "@/utils/getTagDataFromTagFragment";
import { NC_TAG_SHORT_FIELDS_FRAGMENT } from "@/fragments";
import errorHandling from "@/utils/errorHandling";
import GraphqlError from "./GraphqlError";

export interface ModalTagsProps {}

const ModalTags: FC<ModalTagsProps> = ({}) => {
  const [refetchTimes, setRefetchTimes] = React.useState(0);

  const [queryGetTags, { loading, error, data, fetchMore, refetch }] =
    useLazyQuery(QUERY_GET_TAGS, {
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

  const tags = (data?.tags?.nodes || []) as FragmentType<
    typeof NC_TAG_SHORT_FIELDS_FRAGMENT
  >[];

  const handleClickShowMore = () => {
    fetchMore({
      variables: {
        after: data?.tags?.pageInfo?.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !fetchMoreResult?.tags?.nodes) {
          return prev;
        }

        return {
          tags: {
            ...fetchMoreResult.tags,
            nodes: [
              ...(prev?.tags?.nodes || []),
              ...fetchMoreResult.tags.nodes,
            ],
          },
        };
      },
    });
  };

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
        {!tags?.length && !loading ? (
          <Empty />
        ) : (
          <div className="flex flex-wrap dark:text-neutral-200 gap-2.5">
            {!tags?.length && loading
              ? [
                  100, 90, 80, 100, 100, 75, 160, 100, 77, 144, 88, 100, 55, 88,
                  77, 100, 66, 99, 77, 76, 88,
                ].map((w, i) => (
                  <div
                    key={i}
                    className={`border border-neutral-200 dark:border-neutral-700 inline-flex gap-1 bg-white hover:bg-neutral-50 text-sm text-neutral-600 dark:text-neutral-300 py-2 px-3 rounded-lg md:py-2.5 md:px-4 dark:bg-neutral-900 `}
                  >
                    <Skeleton width={w} />
                  </div>
                ))
              : (tags || []).map((tag) => (
                  <Link
                    key={getTagDataFromTagFragment(tag).databaseId}
                    className={`border border-neutral-200 dark:border-neutral-700 inline-block bg-white hover:bg-neutral-50 text-sm text-neutral-600 dark:text-neutral-300 py-2 px-3 rounded-lg md:py-2.5 md:px-4 dark:bg-neutral-900 `}
                    href={getTagDataFromTagFragment(tag).uri}
                  >
                    #{getTagDataFromTagFragment(tag).name}
                    <span className="text-sm font-normal">
                      ({getTagDataFromTagFragment(tag).count})
                    </span>
                  </Link>
                ))}
          </div>
        )}

        {/* SHOW MORE */}
        {data?.tags?.pageInfo.hasNextPage ? (
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
    <div className="nc-ModalTags">
      <NcModal
        contentExtraClass="max-w-screen-md"
        renderTrigger={(openModal) => (
          <Button
            pattern="third"
            fontSize="text-sm font-medium"
            onClick={() => {
              openModal();
              queryGetTags();
            }}
          >
            <svg
              className="w-5 h-5 -ms-1.5 me-2 "
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 3L8 21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 3L14 21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.5 9H21.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.5 15H20.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div>
              <span className="hidden sm:inline">Other</span> Tags
            </div>
            <ChevronDownIcon
              className="w-4 h-4 ms-2 -me-1"
              aria-hidden="true"
            />
          </Button>
        )}
        modalTitle="Discover other tags"
        renderContent={renderModalContent}
      />
    </div>
  );
};

export default ModalTags;
