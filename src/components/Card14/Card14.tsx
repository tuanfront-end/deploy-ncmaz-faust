import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import Avatar from "@/components/Avatar/Avatar";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import Link from "next/link";
import { CommonPostCardProps } from "../Card2/Card2";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import { useFragment } from "@/__generated__";
import { NC_IMAGE_MEDIA_FRAGMENT } from "@/fragments";
import ncFormatDate from "@/utils/formatDate";

export interface Card14Props extends CommonPostCardProps {
  hoverClass?: string;
  ratio?: string;
}

const Card14: FC<Card14Props> = ({
  className = "h-full",
  ratio = "aspect-w-5 aspect-h-5",
  post,
  hoverClass = "",
}) => {
  const { title, date, categories, author, postFormats, featuredImage, uri } =
    getPostDataFromPostFragment(post);

  const authorFeaturedImage = useFragment(
    NC_IMAGE_MEDIA_FRAGMENT,
    author?.ncUserMeta?.featuredImage?.node
  );

  return (
    <div
      className={`nc-Card14 relative flex flex-col group rounded-3xl overflow-hidden ${hoverClass} ${className}`}
    >
      <Link href={uri} className={`flex items-start relative w-full ${ratio}`}>
        <NcImage
          alt="post"
          containerClassName="absolute inset-0 overflow-hidden"
          fill
          className="object-cover w-full h-full rounded-3xl"
          src={featuredImage?.sourceUrl || ""}
        />

        <span className="absolute inset-0 bg-black bg-opacity-40">
          <PostTypeFeaturedIcon
            className="absolute top-4 end-4"
            postType={postFormats}
            wrapSize="w-8 h-8"
            iconSize="w-4 h-4"
          />
        </span>
      </Link>

      <div className="absolute top-4 inset-x-4 sm:top-5 sm:inset-x-5">
        <CategoryBadgeList
          itemClass="px-3 py-[6px]"
          categories={categories?.nodes || []}
        />
      </div>

      <div className="dark absolute bottom-4 inset-x-4 sm:bottom-4 sm:inset-x-5 flex flex-col flex-grow">
        <h2 className="block text-base font-semibold text-white">
          <Link
            dangerouslySetInnerHTML={{ __html: title }}
            href={uri}
            className="line-clamp-2"
            title={title}
          ></Link>
        </h2>

        <div className="p-2 sm:p-2.5 mt-4 sm:mt-5 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-full flex items-center text-neutral-50 text-xs sm:text-[13px] font-medium">
          <Link
            href={author?.uri || ""}
            className="relative flex items-center space-x-2 rtl:space-x-reverse"
          >
            <Avatar
              radius="rounded-full"
              containerClassName="ring-2 ring-white"
              sizeClass="h-6 w-6 text-sm"
              imgUrl={authorFeaturedImage?.sourceUrl || ""}
              userName={author.name || ""}
            />
            <span className="block text-white truncate">
              {author.name || ""}
            </span>
          </Link>
          <>
            <span className=" mx-[6px]">·</span>
            <span className=" font-normal truncate">
              {ncFormatDate(date || "")}
            </span>
          </>
        </div>
      </div>
    </div>
  );
};

export default Card14;
