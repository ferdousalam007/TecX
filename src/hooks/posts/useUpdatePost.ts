import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost as updatePostApi } from "../../services/apiPosts";
import toast from "react-hot-toast";

export function useUpdatePost() {
  const queryClient = useQueryClient();

  const {
    mutate: updatePost,
    isPending,
    error,
  } = useMutation({
    mutationFn: updatePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      toast.success("Post updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updatePost, isPending, error };
}
