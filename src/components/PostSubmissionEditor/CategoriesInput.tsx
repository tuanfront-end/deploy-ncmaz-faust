import { useLazyQuery } from "@apollo/client";
import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import Loading from "../Button/Loading";
import { QUERY_GET_CATEGORIES } from "@/fragments/queries";
import { NcmazFcCategoryFullFieldsFragmentFragment } from "@/__generated__/graphql";
import ButtonPrimary from "../Button/ButtonPrimary";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { NC_SITE_SETTINGS } from "@/contains/site-settings";

const MAX_TAGS_LENGTH =
  NC_SITE_SETTINGS["submissions-settings"].max_categories_allowed || 5;

interface Props {
  onChange: (categories: NcmazFcCategoryFullFieldsFragmentFragment[]) => void;
  defaultValue?: NcmazFcCategoryFullFieldsFragmentFragment[];
}

const CategoriesInput: FC<Props> = ({ onChange, defaultValue }) => {
  const [queryGetCategories, { loading, error, data, fetchMore, called }] =
    useLazyQuery(QUERY_GET_CATEGORIES, {
      notifyOnNetworkStatusChange: true,
      context: { fetchOptions: { method: "GET" } },
      variables: {
        first: 50,
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

  //
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLButtonElement>(null);
  //

  let [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<
    NcmazFcCategoryFullFieldsFragmentFragment[]
  >(defaultValue || []);

  useEffect(() => {
    if (!isOpen) return;
    queryGetCategories();
  }, [isOpen]);

  useEffect(() => {
    onChange(categories);
  }, [categories.length]);

  const checkIncludes = (
    category: NcmazFcCategoryFullFieldsFragmentFragment
  ) => {
    return categories.some((item) => item.databaseId === category.databaseId);
  };

  function closePopover() {
    setIsOpen(false);
  }

  function openPopover() {
    setIsOpen(true);
  }

  const setNewTags = (category: NcmazFcCategoryFullFieldsFragmentFragment) => {
    if (!checkIncludes(category)) {
      setCategories((prevCategories) => [...prevCategories, category]);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  const handleRemoveTag = (
    category: NcmazFcCategoryFullFieldsFragmentFragment
  ) => {
    setCategories(
      categories.filter((t) => t.databaseId !== category.databaseId)
    );
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
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

  const categoriesData = (data?.categories?.nodes ||
    []) as NcmazFcCategoryFullFieldsFragmentFragment[];
  const isMax = categories.length >= MAX_TAGS_LENGTH;

  return (
    <div className="relative w-full text-xs sm:text-sm">
      <>
        <ul className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <li
              className="flex items-center justify-center px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800"
              key={cat.databaseId}
            >
              {cat.name}
              <button
                className="ms-1 px-1 text-base flex items-center justify-center hover:text-neutral-900 dark:hover:text-neutral-50"
                onClick={() => handleRemoveTag(cat)}
                title="Remove category"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </li>
          ))}

          <li>
            <button
              ref={inputRef}
              onClick={openPopover}
              className={`${
                categories.length ? "px-3" : ""
              }  h-full py-2 border-none focus:outline-none focus:ring-0 bg-transparent text-base text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-300 disabled:cursor-not-allowed`}
              type="button"
              disabled={isMax}
            >
              {`Add categories (${categories.length}/${MAX_TAGS_LENGTH})`}
            </button>
          </li>
        </ul>
        <Transition as={Fragment} show={!isMax && isOpen}>
          <div
            ref={containerRef}
            className="absolute top-full space-y-5 mt-4 inset-x-0 p-5 bg-white dark:bg-neutral-800 shadow-lg rounded-2xl z-50 ring-1 ring-black/[0.03]"
          >
            <h3 className="text-xl font-semibold">Categories</h3>
            <div className="w-full border-b border-neutral-300 dark:border-neutral-700" />
            {!!error && <p className="text-red-500">{error.message}</p>}
            {!!loading && !categoriesData.length && <Loading />}
            {!!categoriesData.length ? (
              <ul className="flex flex-wrap gap-2">
                {categoriesData.map((cat) => {
                  const isSelected = checkIncludes(cat);
                  return (
                    <li key={cat.databaseId}>
                      <button
                        className={`flex items-center justify-center px-3 py-2 rounded-lg ${
                          isSelected
                            ? "bg-neutral-900 text-neutral-50"
                            : "bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-600 hover:bg-neutral-200"
                        }`}
                        onClick={() => {
                          if (isSelected) {
                            handleRemoveTag(cat);
                            return;
                          }
                          !isMax && setNewTags(cat);
                        }}
                      >
                        {cat.name} ({cat.count || 0})
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : null}

            {/* SHOW MORE */}
            {data?.categories?.pageInfo.hasNextPage ? (
              <>
                <div className="w-full border-b border-neutral-300 dark:border-neutral-700" />
                <div className="flex justify-center ">
                  <ButtonPrimary
                    loading={loading}
                    onClick={handleClickShowMore}
                  >
                    Load more categories
                  </ButtonPrimary>
                </div>
              </>
            ) : null}
          </div>
        </Transition>
      </>
    </div>
  );
};

export default CategoriesInput;
