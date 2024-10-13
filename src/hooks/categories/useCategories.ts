import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../services/apiCategories";

export function useCategories() {
  const {
    isLoading,
    data: categories,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });
  return { isLoading, categories, error };
}
