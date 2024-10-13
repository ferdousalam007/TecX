import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiUsers";
import { useParams } from "next/navigation";

export function useUser() {
  const { userId } = useParams();

  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId as string),
  });

  return { isLoading, user, error };
}
