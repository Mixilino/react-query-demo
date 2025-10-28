import { useQuery, useMutation, useQueryClient } from 'react-query'
import { fetchPosts, fetchPost, updatePost } from '../../api/functions'
import type { Post } from '../../mocks/handlers'
import { postsQueryKeys } from './queryKey'

export const usePosts = (page: number = 1, limit: number = 5) => {
  return useQuery({
    queryKey: postsQueryKeys.queries.list(page, limit),
    queryFn: () => fetchPosts(page, limit),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const usePost = (id: number | null) => {
  return useQuery({
    queryKey: postsQueryKeys.queries.detail(id!),
    queryFn: () => fetchPost(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  })
}

export const usePrefetchPost = () => {
  const queryClient = useQueryClient()

  return (id: number) => {
    queryClient.prefetchQuery({
      queryKey: postsQueryKeys.queries.detail(id),
      queryFn: () => fetchPost(id),
      staleTime: 5 * 60 * 1000,
    })
  }
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {

      queryClient.invalidateQueries({
        queryKey: postsQueryKeys.queries.lists(),
      })

      queryClient.invalidateQueries({
        queryKey: postsQueryKeys.queries.detail(updatedPost.id),
      })
    },
    onError: (error) => {
      console.error('Failed to update post:', error)
    },
  })
}

// Utility hook to get query client for manual cache operations
// export const usePostsQueryClient = () => {
//   const queryClient = useQueryClient()

//   return {
//     // Invalidate all posts queries
//     invalidateAllPosts: () => {
//       queryClient.invalidateQueries({
//         queryKey: postsQueryKeys.all(),
//       })
//     },

//     // Invalidate specific post
//     invalidatePost: (id: number) => {
//       queryClient.invalidateQueries({
//         queryKey: postsQueryKeys.queries.detail(id),
//       })
//     },

//     // Invalidate all post lists
//     invalidatePostLists: () => {
//       queryClient.invalidateQueries({
//         queryKey: postsQueryKeys.queries.lists(),
//       })
//     },

//     // Prefetch post
//     prefetchPost: (id: number) => {
//       queryClient.prefetchQuery({
//         queryKey: postsQueryKeys.queries.detail(id),
//         queryFn: () => fetchPost(id),
//       })
//     },

//     // Get cached post data
//     getCachedPost: (id: number): Post | undefined => {
//       return queryClient.getQueryData(postsQueryKeys.queries.detail(id))
//     },

//     // Set post data in cache
//     setCachedPost: (post: Post) => {
//       queryClient.setQueryData(postsQueryKeys.queries.detail(post.id), post)
//     },
//   }
// }