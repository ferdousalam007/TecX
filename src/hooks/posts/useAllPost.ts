import { useQuery } from "@tanstack/react-query";
import { getMyPost } from "../../services/apiPosts";

export const useAllPost = () => {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ["allPost"], 
        queryFn: () => getMyPost(), 
    });

    return { posts, isLoading, error };
};