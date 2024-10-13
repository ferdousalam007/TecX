import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function useSignup() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      toast.success("Signup successful");
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signup, isPending };
}
