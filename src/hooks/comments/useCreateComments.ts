import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment as createCommentApi } from "../../services/apiComments";
import toast from "react-hot-toast";

export function useCreateComment() {
  const queryClient = useQueryClient();

  const {
    mutate: createComment,
    isPending,
    error,
  } = useMutation({
    mutationFn: createCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
      toast.success("Comment created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createComment, isPending, error };
}
