import { useQuery } from "react-query";
import { fetchPosts } from "../../api";
import type { PostsResponse } from "../../api/functions";

const usePosts = () => {
  return useQuery<PostsResponse>(["posts"], () => fetchPosts(1, 20), {
    refetchOnWindowFocus: false,
  });
};

export default usePosts;