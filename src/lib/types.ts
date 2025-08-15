import { Prisma } from "@prisma/client";

export const userDataSelect = {
  username: true,
  displayName: true,
  avatarUrl: true,
} satisfies Prisma.UserSelect;

export const postDataInclude = {
  user: {
    select: userDataSelect,
  },
} satisfies Prisma.PostInclude;

export interface PostData
  extends Prisma.PostGetPayload<{
    include: typeof postDataInclude;
  }> {}
