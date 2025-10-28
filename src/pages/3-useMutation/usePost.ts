import { useQuery } from "react-query";
import { fetchPost } from "../../api";
import type { Post } from "../../mocks/handlers";

const usePost = (id: number | null) => {
  return useQuery<Post>(["post", id], () => fetchPost(id!), {
    staleTime: 0,
    cacheTime: 10000,
    enabled: !!id,
  });
};

export default usePost;
