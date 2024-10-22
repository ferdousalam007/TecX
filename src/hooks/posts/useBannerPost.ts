import { getBannerPost } from "@/services/apiPosts";
import { useQuery } from "@tanstack/react-query";


export const useAllBannerPost = () => {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ["allBannerPost"],
        queryFn: () => getBannerPost(),
    });

    return { posts, isLoading, error };
};