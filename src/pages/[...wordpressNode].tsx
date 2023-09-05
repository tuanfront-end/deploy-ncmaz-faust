import { getWordPressProps, WordPressTemplate } from "@faustwp/core";
import { GetStaticProps } from "next";
import { WordPressTemplateProps } from "../types";

export default function Page(props: WordPressTemplateProps) {
  return <WordPressTemplate {...props} />;
}

export async function getStaticPaths() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_WORDPRESS_URL?.replace(/\/$/, "") +
      "/wp-json/wp/v2/posts?per_page=70&_fields=slug"
  );
  let posts = (await response.json()) as any[];
  if (!posts?.length) {
    posts = [{ slug: "hello-world" }];
  }
  posts = [
    ...posts,
    { slug: "home-2" },
    { slug: "home-3-podcast" },
    { slug: "home-4-video" },
    { slug: "home-5-gallery" },
    { slug: "home-6" },
  ];

  return {
    paths: posts.map((page) => ({
      params: { wordpressNode: [page.slug] },
    })),
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = (ctx) => {
  return getWordPressProps({ ctx, revalidate: 900 });
};
