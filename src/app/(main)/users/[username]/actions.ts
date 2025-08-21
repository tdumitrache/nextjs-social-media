"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";
import { UpdateUserProfileValues } from "@/lib/validation";
import { updateUserProfileSchema } from "@/lib/validation";

export const updateUserProfile = async (values: UpdateUserProfileValues) => {
  const validatedFields = updateUserProfileSchema.parse(values);

  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: validatedFields,
    select: getUserDataSelect(user.id),
  });

  return updatedUser;
};
