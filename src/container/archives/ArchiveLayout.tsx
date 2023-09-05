import ArchiveFilterListBox from "@/components/ArchiveFilterListBox/ArchiveFilterListBox";
import { TPostCard } from "@/components/Card2/Card2";
import { TCategoryCardFull } from "@/components/CardCategory1/CardCategory1";
import GridPostsArchive from "@/components/GridPostsArchive";
import { FILTERS_OPTIONS } from "@/contains/contants";
import { PostDataFragmentType } from "@/data/types";
import useGetPostsNcmazMetaByIds from "@/hooks/useGetPostsNcmazMetaByIds";
import useHandleGetPostsArchivePage from "@/hooks/useHandleGetPostsArchivePage";
import dynamic from "next/dynamic";
import { FC } from "react";

const DynamicModalCategories = dynamic(
  () => import("@/components/ModalCategories")
);
const DynamicModalTags = dynamic(() => import("@/components/ModalTags"));
const DynamicSectionTrendingTopic = dynamic(
  () => import("@/components/SectionTrendingTopic")
);
const DynamicSectionSubscribe2 = dynamic(
  () => import("@/components/SectionSubscribe2/SectionSubscribe2")
);

interface IArchiveLayoutProps {
  children: React.ReactNode;
  name?: string | null;
  initPosts?: PostDataFragmentType[] | null;
  initPostsPageInfo?: {
    endCursor?: string | null | undefined;
    hasNextPage: boolean;
  } | null;
  tagDatabaseId?: number | null;
  categoryDatabaseId?: number | null;
  taxonomyType: "tag" | "category" | "postFormat";
  top10Categories: TCategoryCardFull[] | null;
}

const ArchiveLayout: FC<IArchiveLayoutProps> = ({
  children,
  name,
  initPosts: posts,
  initPostsPageInfo,
  tagDatabaseId,
  categoryDatabaseId,
  taxonomyType,
  top10Categories,
}) => {
  // START ----------
  //
  const {} = useGetPostsNcmazMetaByIds({
    posts: (posts || []) as TPostCard[],
  });
  //

  const {
    currentPosts,
    handleChangeFilterPosts,
    handleClickShowMore,
    hasNextPage,
    loading,
  } = useHandleGetPostsArchivePage({
    initPosts: posts,
    initPostsPageInfo,
    tagDatabaseId,
    categoryDatabaseId,
  });

  return (
    <div className="">
      <div className={`ncmazfc-page-category`}>
        {/* HEADER */}
        {children}
        {/* ====================== END HEADER ====================== */}

        <div className="container pt-10 pb-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
          <div>
            <div className="flex flex-col md:justify-between md:flex-row">
              <div className="flex space-x-2.5 rtl:space-x-reverse">
                <DynamicModalCategories />
                <DynamicModalTags />
              </div>
              <div className="block my-4 border-b w-full border-neutral-300 dark:border-neutral-500 md:hidden" />
              <div className="flex justify-end">
                <ArchiveFilterListBox
                  onChange={handleChangeFilterPosts}
                  lists={FILTERS_OPTIONS}
                />
              </div>
            </div>

            <GridPostsArchive
              posts={currentPosts}
              loading={loading}
              showLoadmore={hasNextPage}
              onClickLoadmore={handleClickShowMore}
            />
          </div>

          {/* MORE SECTIONS */}
          <DynamicSectionTrendingTopic categories={top10Categories} />

          {/* SUBCRIBES */}
          <DynamicSectionSubscribe2 />
        </div>
      </div>
    </div>
  );
};

export default ArchiveLayout;
