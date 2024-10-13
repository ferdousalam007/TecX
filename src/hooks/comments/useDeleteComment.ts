import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment as deleteCommentApi } from "../../services/apiComments";
import toast from "react-hot-toast";

export function useDeleteComment() {
  const queryClient = useQueryClient();

  const { isPending, mutate: deleteComment } = useMutation({
    mutationFn: deleteCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
      toast.success("Comment deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isPending, deleteComment };
}
