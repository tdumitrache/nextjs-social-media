"use client";

import Post from "@/components/posts/Post";
import { PostData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";

const ForYouFeed = () => {
  const { data, isLoading, error } = useQuery<PostData[]>({
    queryKey: ["posts", "for-you"],
    queryFn: async () => {
      const res = await fetch("/api/posts/for-you");
      return res.json();
    },
  });

  if (isLoading) return <Loader2 className="mx-auto animate-spin" />;
  if (error)
    return (
      <p className="text-center text-destructive">
        An error occured while loading posts.
      </p>
    );

  return (
    <div className="flex flex-col gap-4">
      {data?.map((post: PostData) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default ForYouFeed;
