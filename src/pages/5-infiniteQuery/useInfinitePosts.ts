import { useInfiniteQuery } from "react-query";
import { fetchPosts, type PostsResponse } from "../../api/functions";

export const useInfinitePosts = (pageSize: number = 5) => {
  return useInfiniteQuery<PostsResponse, Error>(
    ["posts", "infinite", pageSize],
    ({ pageParam = 1 }) => fetchPosts(pageParam as number, pageSize),
    {
      getNextPageParam: (lastPage: PostsResponse) => {
        console.log("Last page:", lastPage);
        // Return next page number if there are more pages
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
        return undefined; // No more pages
      },
    }
  );
};
