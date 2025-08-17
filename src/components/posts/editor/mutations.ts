"use client";

import { useToast } from "@/components/ui/use-toast";
import { submitPost } from "./actions";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { PaginatedPostsDataType } from "@/lib/types";
import { useSession } from "@/app/(main)/SessionProvider";

const useSubmitPostMutation = () => {
  const { toast } = useToast();

  const { user } = useSession();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitPost,
    onSuccess: async (newPost) => {
      const queryFilter: QueryFilters = {
        queryKey: ["post-feed"],
        predicate: (query) => {
          return (
            query.queryKey.includes("for-you") ||
            (query.queryKey.includes("user-posts") &&
              query.queryKey.includes(user?.id))
          );
        },
      } satisfies QueryFilters;

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PaginatedPostsDataType>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (!firstPage) return oldData;

          return {
            pageParams: oldData?.pageParams,
            pages: [
              {
                posts: [newPost, ...firstPage.posts],
                nextCursor: firstPage.nextCursor,
              },
              ...oldData.pages.slice(1),
            ],
          };
        },
      );

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate: (query) => !query.state.data,
      });

      toast({
        title: "Post created",
        description: "Your post has been created",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while creating your post",
      });
    },
  });

  return mutation;
};

export default useSubmitPostMutation;
