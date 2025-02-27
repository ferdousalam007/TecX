import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      toast.success("Login successful");
      const redirectUrl = searchParams.get("redirect");
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push("/");
      }
    },
    onError: (error) => {
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ('response' in error && (error.response as any).status === 500) {
        toast.error("incorrect email or password");
      } else {
        toast.error(error.message)
      }
    },
    // onError: (error) => {
    //   toast.error(error.message);
    // },
  });

  return { login, isPending };
}
