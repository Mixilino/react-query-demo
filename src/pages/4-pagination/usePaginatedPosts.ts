import { useQuery } from "react-query";
import { fetchPosts, type PostsResponse } from "../../api/functions";

export const usePaginatedPosts = (page: number = 1, pageSize: number = 5) => {
  return useQuery<PostsResponse, Error>(
    ["posts", "paginated", pageSize, page],
    () => fetchPosts(page, pageSize),
    {
      keepPreviousData: true,
    }
  );
};
