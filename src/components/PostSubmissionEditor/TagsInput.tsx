import { gql, useLazyQuery } from "@apollo/client";
import React, { FC, useEffect, useRef, useState } from "react";
import Loading from "../Button/Loading";
import { QUERY_GET_TAGS } from "@/fragments/queries";
import { NcmazFcTagShortFieldsFragmentFragment } from "@/__generated__/graphql";
import ButtonPrimary from "../Button/ButtonPrimary";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { NC_SITE_SETTINGS } from "@/contains/site-settings";

const MAX_TAGS_LENGTH =
  NC_SITE_SETTINGS["submissions-settings"].max_tags_allowed || 5;

export interface TagNodeShort extends NcmazFcTagShortFieldsFragmentFragment {}

interface TagsInputProps {
  onChange: (tags: TagNodeShort[]) => void;
  defaultValue?: TagNodeShort[];
}

const TagsInput: FC<TagsInputProps> = ({ onChange, defaultValue }) => {
  const [queryGetTags, { loading, error, data, fetchMore, called }] =
    useLazyQuery(QUERY_GET_TAGS, {
      notifyOnNetworkStatusChange: true,
      context: { fetchOptions: { method: "GET" } },
      variables: {
        first: 50,
      },
    });

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

  //
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  let [isOpen, setIsOpen] = useState(false);
  const [tags, setTags] = useState<TagNodeShort[]>(defaultValue || []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    queryGetTags();
  }, [isOpen]);

  useEffect(() => {
    if (tags.length >= MAX_TAGS_LENGTH) {
      setIsOpen(false);
    }

    onChange(tags);
  }, [tags.length]);

  function closePopover() {
    setIsOpen(false);
  }

  function openPopover() {
    setIsOpen(true);
  }

  const checkIncludes = (tag: TagNodeShort) => {
    return tags.some((item) => item.name === tag.name);
  };

  const setNewTags = (tag: TagNodeShort) => {
    if (!checkIncludes(tag)) {
      setTags((prevTags) => [...prevTags, tag]);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (eventClickOutsideDiv) {
      document.removeEventListener("click", eventClickOutsideDiv);
    }
    isOpen && document.addEventListener("click", eventClickOutsideDiv);
    return () => {
      document.removeEventListener("click", eventClickOutsideDiv);
    };
  }, [isOpen]);

  const eventClickOutsideDiv = (event: MouseEvent) => {
    if (!isOpen || !containerRef.current) {
      return;
    }

    // CLICK IN_SIDE
    if (
      containerRef.current.contains(event.target as Node) ||
      inputRef.current?.contains(event.target as Node)
    ) {
      return;
    }

    // CLICK OUT_SIDE
    setIsOpen(false);
  };

  const handleRemoveTag = (tag: TagNodeShort) => {
    setTags(tags.filter((t) => t.name !== tag.name));
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const tagsData = (data?.tags?.nodes ||
    []) as NcmazFcTagShortFieldsFragmentFragment[];

  const isMax = tags.length >= MAX_TAGS_LENGTH;

  return (
    <div className="relative w-full text-xs sm:text-sm">
      <ul className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <li
            className="flex items-center justify-center px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800"
            key={tag.databaseId}
          >
            # {tag.name}
            <button
              className="ms-1 px-1 text-base flex items-center justify-center hover:text-neutral-900 dark:hover:text-neutral-50"
              onClick={() => handleRemoveTag(tag)}
              title="Remove tag"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </li>
        ))}

        {!isMax && (
          <li>
            {/* <Popover.Button>Solutions</Popover.Button> */}
            <input
              ref={inputRef}
              className={`${
                tags.length ? "px-3" : "px-0"
              }  h-full py-2 border-none focus:outline-none focus:ring-0 bg-transparent text-base text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-300 disabled:cursor-not-allowed`}
              type="text"
              placeholder={
                !tags.length
                  ? `Add tags (${tags.length}/${MAX_TAGS_LENGTH})...`
                  : `Add tag (${tags.length}/${MAX_TAGS_LENGTH})`
              }
              onFocus={openPopover}
              onKeyDown={(e) => {
                if (e.code !== "Enter") {
                  return;
                }
                setNewTags({
                  databaseId: Date.now(),
                  name: e.currentTarget.value,
                  __typename: "Tag",
                });
              }}
            />
          </li>
        )}
      </ul>

      {isOpen && (
        <div
          ref={containerRef}
          className="absolute top-full space-y-5 mt-4 inset-x-0 p-5 bg-white dark:bg-neutral-800 shadow-lg rounded-2xl z-50 ring-1 ring-black/[0.03]"
        >
          <h3 className="text-xl font-semibold">Tags</h3>
          <div className="w-full border-b border-neutral-300 dark:border-neutral-700" />
          {!!error && <p className="text-red-500">{error.message}</p>}
          {!!loading && !tagsData.length && <Loading />}
          {!!tagsData.length ? (
            <ul className="flex flex-wrap gap-2">
              {tagsData.map((tag) => {
                const isSelected = checkIncludes(tag);
                return (
                  <li key={tag.databaseId}>
                    <button
                      className={`flex items-center justify-center px-3 py-2 rounded-lg ${
                        isSelected
                          ? "bg-neutral-900 text-neutral-50"
                          : "bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-600 hover:bg-neutral-200"
                      }`}
                      onClick={() => {
                        if (isSelected) {
                          handleRemoveTag(tag);
                          return;
                        }
                        !isMax && setNewTags(tag);
                      }}
                    >
                      #{` `}
                      {tag.name} ({tag.count || 0})
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : null}

          {/* SHOW MORE */}
          {data?.tags?.pageInfo.hasNextPage ? (
            <>
              <div className="w-full border-b border-neutral-300 dark:border-neutral-700" />
              <div className="flex justify-center ">
                <ButtonPrimary loading={loading} onClick={handleClickShowMore}>
                  Load more tags
                </ButtonPrimary>
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default TagsInput;
