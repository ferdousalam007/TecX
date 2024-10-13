import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function useResetPassword() {
  const router = useRouter();
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success("Your password has been reset successfully.");
      router.push("/sign-in");
    },
    onError: () => {
      toast.error("Token is invalid or has expired. Please try again.");
    },
  });

  return { resetPassword, isPending };
}
