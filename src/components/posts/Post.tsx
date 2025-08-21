import { PostData } from "@/lib/types";
import Link from "next/link";
import React from "react";
import UserAvatar from "../UserAvatar";
import { formatRelativeDate } from "@/lib/utils";
import PostMoreButton from "./PostMoreButton";
import { useSession } from "@/app/(main)/SessionProvider";
import Linkify from "../Linkify";
import UserTooltip from "../UserTooltip";

interface PostProps {
  post: PostData;
}

const Post = ({ post }: PostProps) => {
  const { user } = useSession();

  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <UserTooltip user={post.user}>
            <Link href={`/users/${post.user.username}`}>
              <UserAvatar avatarUrl={post.user.avatarUrl} />
            </Link>
          </UserTooltip>

          <div>
            <Link
              href={`/users/${post.user.username}`}
              className="block cursor-pointer font-medium hover:underline"
            >
              {post.user.displayName}
            </Link>

            <Link
              href={`/posts/${post.id}`}
              className="block cursor-pointer text-sm text-muted-foreground hover:underline"
            >
              {formatRelativeDate(post.createdAt)}
            </Link>
          </div>
        </div>
        {post.user.id === user?.id && (
          <PostMoreButton
            post={post}
            className="opacity-0 group-hover/post:opacity-100"
          />
        )}
      </div>

      <Linkify>
        <div className="whitespace-pre-line break-words">{post.content}</div>
      </Linkify>
    </article>
  );
};

export default Post;
