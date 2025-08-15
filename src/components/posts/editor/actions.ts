"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { postSchema } from "@/lib/validation";

export const submitPost = async (input: string) => {
  const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");

  const { content } = postSchema.parse({ content: input });

  await prisma.post.create({
    data: {
      content,
      userId: user.id,
    },
  });
};
