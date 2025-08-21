"use client";

import useFollowerInfo from "@/hooks/useFollowerInfo";
import { FollowerInfoType } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface FollowerCountProps {
  userId: string;
  initialState: FollowerInfoType;
}

export default function FollowerCount({
  userId,
  initialState,
}: FollowerCountProps) {
  const { data } = useFollowerInfo(userId, initialState);

  return (
    <span>
      Followers:{" "}
      <span className="font-semibold">{formatNumber(data.followersCount)}</span>
    </span>
  );
}
