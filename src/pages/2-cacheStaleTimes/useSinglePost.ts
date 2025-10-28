import { useQuery } from "react-query";
import { fetchPost } from "../../api/functions";
import type { Post } from "../../mocks/handlers";

export const useSinglePost = () => {
  return useQuery<Post>(["post", "cache", 1], () => fetchPost(1), {
    cacheTime: 10000,
    staleTime: 5000,
  });
};
