import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory as createCategoryApi } from "../../services/apiCategories"
import toast from "react-hot-toast";
export const useCreateCategories = () => {
    const queryClient = useQueryClient();
    const {
      mutate: createCategory,
        isPending,
        error,
        reset,
    }=useMutation({
      mutationFn: createCategoryApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["categories"],
            });
            toast.success("Post created successfully");
          },
          onError: (error) => {
            toast.error(error.message);
          },
        });
    return {
        createCategory,
        isPending,
        error,
        reset,
    }}