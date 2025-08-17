"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude } from "@/lib/types";

export const deletePost = async (postId: string) => {
  const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) throw Error("Post not found");

  if (user.id !== post.userId) throw Error("Unauthorized");

  const deletedPost = await prisma.post.delete({
    where: {
      id: postId,
    },
    include: getPostDataInclude(user.id),
  });

  return deletedPost;
};
