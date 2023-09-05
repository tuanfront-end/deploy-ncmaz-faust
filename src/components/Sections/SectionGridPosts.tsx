import React, { FC } from "react";
import Card3 from "@/components/Card3/Card3";
import Card4 from "@/components/Card4/Card4";
import Card7 from "@/components/Card7/Card7";
import Card9 from "@/components/Card9/Card9";
import Card10 from "@/components/Card10/Card10";
import Card11 from "@/components/Card11/Card11";
import Card14 from "@/components/Card14/Card14";
import Card10V2 from "@/components/Card10/Card10V2";
import Card15Podcast from "@/components/Card15Podcast/Card15Podcast";
import { SectionMagazine1Props } from "./SectionMagazine1";
import { TPostCard } from "../Card2/Card2";

//
export interface SectionGridPostsProps extends SectionMagazine1Props {
  gridClass?: string;
  postCardName?:
    | "card3"
    | "card4"
    | "card7"
    | "card9"
    | "card10"
    | "card10V2"
    | "card11"
    | "card14"
    | "card15Podcast";
}

const SectionGridPosts: FC<SectionGridPostsProps> = ({
  posts,
  postCardName = "card3",
  className = "",
  gridClass = "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}) => {
  const renderCard = (post: TPostCard) => {
    const { databaseId: postId } = post;
    switch (postCardName) {
      case "card3":
        return <Card3 key={postId} post={post} />;
      case "card4":
        return <Card4 key={postId} post={post} />;
      case "card7":
        return <Card7 key={postId} post={post} ratio="aspect-w-6 aspect-h-7" />;
      case "card9":
        return <Card9 key={postId} post={post} />;
      case "card10":
        return <Card10 key={postId} post={post} />;
      case "card10V2":
        return <Card10V2 key={postId} post={post} />;
      case "card11":
        return <Card11 key={postId} post={post} />;
      case "card14":
        return <Card14 key={postId} post={post} />;
      case "card15Podcast":
        return <Card15Podcast key={postId} post={post} />;
      default:
        return null;
    }
  };

  return (
    <div className={`nc-SectionGridPosts relative ${className}`}>
      <div className={`grid gap-6 md:gap-x-7 md:gap-y-8 ${gridClass}`}>
        {posts.map(renderCard)}
      </div>
    </div>
  );
};

export default SectionGridPosts;
