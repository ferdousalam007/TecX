import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment as updateCommentApi } from "../../services/apiComments";
import toast from "react-hot-toast";

export function useUpdateComment() {
  const queryClient = useQueryClient();

  const {
    mutate: updateComment,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
      toast.success("Comment updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateComment, isPending, error };
}
