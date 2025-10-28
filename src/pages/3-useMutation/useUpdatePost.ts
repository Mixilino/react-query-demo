import { useMutation, useQueryClient } from "react-query";
import { updatePost } from "../../api";
import type { Post } from "../../mocks/handlers";

export interface UpdatePostData {
  id: number;
  title: string;
  body: string;
}

const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, UpdatePostData>(
    (updatedPost) => {
      const currentPost = queryClient.getQueryData<Post>(["post", updatedPost.id]);
      const fullPost: Post = {
        id: updatedPost.id,
        title: updatedPost.title,
        body: updatedPost.body,
        userId: currentPost?.userId || 1,
      };
      return updatePost(fullPost);
    },
    {
      onSuccess: (updatedPost) => {
        // Update the individual post cache
        queryClient.setQueryData(["post", updatedPost.id], updatedPost);
        
        // Invalidate and refetch the posts list to ensure consistency
        queryClient.invalidateQueries(["posts"]);
      },
      onError: (error) => {
        console.error("Error updating post:", error);
      },
    }
  );
};

export default useUpdatePost;