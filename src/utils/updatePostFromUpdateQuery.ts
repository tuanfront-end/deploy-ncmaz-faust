type Ex = { posts?: { nodes?: any[] | null } | null };

export default function updatePostFromUpdateQuery<T extends Ex>(
  prev: T,
  fetchMoreResult: T
) {
  if (fetchMoreResult?.posts?.nodes) {
    return {
      ...prev,
      ...fetchMoreResult,
      posts: {
        ...fetchMoreResult.posts,
        nodes: [...(prev?.posts?.nodes || []), ...fetchMoreResult.posts.nodes],
      },
    };
  }
  return prev;
}
