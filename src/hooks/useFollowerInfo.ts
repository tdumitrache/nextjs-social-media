import kyInstance from "@/lib/ky";
import { FollowerInfoType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useFollowerInfo(
  userId: string,
  initialState: FollowerInfoType,
) {
  const query = useQuery({
    queryKey: ["follower-info", userId],
    queryFn: () =>
      kyInstance.get(`/api/users/${userId}/followers`).json<FollowerInfoType>(),
    initialData: initialState,
    staleTime: Infinity,
  });

  return query;
}
