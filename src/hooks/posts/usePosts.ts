import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/apiPosts";
import { useSearchParams } from "next/navigation";

export function usePosts() {
  const searchParams = useSearchParams();

  const filters = {
    search: searchParams.get("search"),
    category: searchParams.get("category"),
    sort: searchParams.get("sort"),
  };

  const { data, error, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["posts", filters],
      queryFn: ({ pageParam }) =>
        getAllPosts({ ...filters, page: pageParam, limit: 100 }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.length === 0) return;
        return allPages?.length + 1;
      },
    });

  const posts = data?.pages?.flat() ?? [];

  return { isLoading, posts, error, fetchNextPage, hasNextPage };
}
