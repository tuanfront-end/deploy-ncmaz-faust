import React, { FC } from "react";
import Avatar from "@/components/Avatar/Avatar";
import Link from "next/link";
import { NcmazFcUserFullFieldsFragment } from "@/__generated__/graphql";
import { FragmentType } from "@/__generated__";
import { NC_USER_FULL_FIELDS_FRAGMENT } from "@/fragments";
import ncFormatDate from "@/utils/formatDate";
import { getUserDataFromUserCardFragment } from "@/utils/getUserDataFromUserCardFragment";

export interface PostCardMetaV2Props {
  meta: {
    date?: string;
    author?:
      | FragmentType<typeof NC_USER_FULL_FIELDS_FRAGMENT>
      | NcmazFcUserFullFieldsFragment;
    title?: string;
    uri?: string;
  };
  hiddenAvatar?: boolean;
  className?: string;
  titleClassName?: string;
  avatarSize?: string;
}

const PostCardMetaV2: FC<PostCardMetaV2Props> = ({
  meta,
  hiddenAvatar = false,
  className = "leading-none text-xs",
  titleClassName = "text-base",
  avatarSize = "h-9 w-9 text-base",
}) => {
  const { date, title, uri } = meta;

  const author = getUserDataFromUserCardFragment(
    meta.author as FragmentType<typeof NC_USER_FULL_FIELDS_FRAGMENT>
  );

  if (!author?.databaseId && !date) {
    return null;
  }

  return (
    <div
      className={`nc-PostCardMetaV2 inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${className}`}
    >
      <div className="relative flex space-x-2 rtl:space-x-reverse">
        {!hiddenAvatar && author?.name && (
          <div className="flex-shrink-0 pt-1">
            <Avatar
              radius="rounded-full"
              sizeClass={avatarSize}
              imgUrl={author.featuredImageMeta?.sourceUrl || ""}
              userName={author?.name || ""}
            />
          </div>
        )}
        <div>
          <h2 className={`block font-semibold ${titleClassName}`}>
            <Link
              dangerouslySetInnerHTML={{ __html: title || "" }}
              className="line-clamp-2"
              href={uri || ""}
            ></Link>
          </h2>

          <Link href={author?.uri || ""} className="flex mt-1.5">
            <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium capitalize">
              {author?.name || ""}
            </span>
            <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
              ·
            </span>
            <span className="text-neutral-500 dark:text-neutral-400 font-normal">
              {ncFormatDate(date || "")}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCardMetaV2;
