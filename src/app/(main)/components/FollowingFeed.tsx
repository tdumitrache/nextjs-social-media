"use client";

import InfinitieScrollContainer from "@/components/InfinitieScrollContainer";
import Post from "@/components/posts/Post";
import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";
import kyInstance from "@/lib/ky";
import { PaginatedPostsDataType, PostData } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const FollowingFeed = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "following"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/posts/following",
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<PaginatedPostsDataType>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  if (status === "pending") return <PostsLoadingSkeleton />;

  if (status === "success" && posts.length === 0 && !hasNextPage)
    return (
      <p className="text-center text-muted-foreground">
        No posts found. Start following some users to get started.
      </p>
    );

  if (status === "error")
    return (
      <p className="text-center text-destructive">
        An error occured while loading posts.
      </p>
    );

  return (
    <InfinitieScrollContainer
      className="flex flex-col gap-4"
      onBottomReached={() => {
        if (hasNextPage && !isFetching) fetchNextPage();
      }}
    >
      {posts?.map((post: PostData) => (
        <Post key={post.id} post={post} />
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfinitieScrollContainer>
  );
};

export default FollowingFeed;
