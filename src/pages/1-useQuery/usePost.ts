import { useQuery, useQueryClient } from "react-query";
import { fetchPost } from "../../api";
import type { Post } from "../../mocks/handlers";
import type { PostsResponse } from "../../api/functions";

const usePost = (id: number | null) => {
  const queryClient = useQueryClient();

  return useQuery<Post>(["post", id], () => fetchPost(id!), {
    placeholderData: () => {
      const postsData = queryClient.getQueryData<PostsResponse>(["posts"]);
      return postsData?.posts.find((p: any) => p.id === id) as Post | undefined;
    },
    enabled: !!id,
  });
};

export default usePost;
