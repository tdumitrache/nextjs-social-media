"use client";

import InfinitieScrollContainer from "@/components/InfinitieScrollContainer";
import Post from "@/components/posts/Post";
import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";
import kyInstance from "@/lib/ky";
import { PaginatedPostsDataType, PostData } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface UserPostsProps {
  userId: string;
}

const UserPosts = ({ userId }: UserPostsProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "user-posts", userId],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          `/api/users/${userId}/posts`,
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
        This user has not posted anything yet.
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

export default UserPosts;
