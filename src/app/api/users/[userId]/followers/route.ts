import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { FollowerInfoType } from "@/lib/types";
import { NextRequest } from "next/server";

export const GET = async (
  _: NextRequest,
  { params }: { params: { userId: string } },
) => {
  const { user: loggedInUser } = await validateRequest();

  try {
    const { userId } = params;

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        followers: {
          where: {
            followerId: loggedInUser.id,
          },
          select: {
            followerId: true,
          },
        },
        _count: {
          select: {
            followers: true,
          },
        },
      },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const data: FollowerInfoType = {
      followersCount: user._count.followers,
      isFollowedByUser: user.followers.some(
        (follower) => follower.followerId === loggedInUser.id,
      ),
    };

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

export const POST = async (
  _: NextRequest,
  { params }: { params: { userId: string } },
) => {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { userId } = params;

    await prisma.follow.upsert({
      where: {
        followerId_followingId: {
          followerId: loggedInUser.id,
          followingId: userId,
        },
      },
      create: {
        followerId: loggedInUser.id,
        followingId: userId,
      },
      update: {},
    });

    return new Response();
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

export const DELETE = async (
  _: NextRequest,
  { params }: { params: { userId: string } },
) => {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { userId } = params;

    await prisma.follow.deleteMany({
      where: {
        followerId: loggedInUser.id,
        followingId: userId,
      },
    });

    return new Response();
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
