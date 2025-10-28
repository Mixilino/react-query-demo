import { useInfiniteQuery } from 'react-query'
import { fetchPosts, type PostsResponse } from '../../api/functions'

export const useInfinitePosts = (pageSize: number = 5) => {
  return useInfiniteQuery<PostsResponse, Error>(
    ['posts', 'infinite', pageSize],
    ({ pageParam = 1 }) => fetchPosts(pageParam as number, pageSize),
    {
      getNextPageParam: (lastPage) => {
        // Return next page number if there are more pages
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1
        }
        return undefined // No more pages
      },
      getPreviousPageParam: (firstPage) => {
        // Return previous page number if not on first page
        if (firstPage.page > 1) {
          return firstPage.page - 1
        }
        return undefined // No previous pages
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    }
  )
}