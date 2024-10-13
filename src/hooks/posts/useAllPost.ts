import { useQuery } from "@tanstack/react-query";
import { getMyPost } from "../../services/apiPosts";

export const useAllPost = () => {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ["allPost"], // Unique query key
        queryFn: () => getMyPost(), // Correct function to fetch all posts
    });

    return { posts, isLoading, error };
};