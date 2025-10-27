import {
  Typography,
  Box,
  Alert,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import type { PostSummary } from "../../api/functions";
import usePosts from "./usePosts";
import usePost from "./usePost";
import LoadingSpinner from "../../components/LoadingSpinner";
import PostModal from "../../components/PostModal";
import { Presentation } from "../../components/Presentation";
import { modalData } from "./slides";

export default function Page() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const {
    data: postsData,
    isLoading: postsLoading,
    error: postsError,
  } = usePosts();

  const {
    data: postData,
    isLoading: postLoading,
    isPlaceholderData,
    isIdle,
    isSuccess,
    isError,
    status,
  } = usePost(selectedPostId);

  const handlePostClick = (postId: number) => {
    setSelectedPostId(postId);
  };

  const handleCloseModal = () => {
    setSelectedPostId(null);
  };

  if (postsLoading) return <LoadingSpinner />;

  if (postsError) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error loading posts: {(postsError as Error)?.message || "Unknown error"}
      </Alert>
    );
  }

  return (
    <Box>
      <Presentation presentationData={modalData} />

      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Posts List (ID, Title, Author ID only)
      </Typography>

      <Typography variant="body2" sx={{ mb: 2 }}>
        Single Post Query <code>['post', {selectedPostId ?? 'null'}]</code> → status:{" "}
        <b>{status}</b> | isSuccess: {isSuccess.toString()} | isError:{" "}
        {isError.toString()} | isIdle: {isIdle.toString()} | isPlaceholderData:{" "}
        {isPlaceholderData.toString()}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {postsData?.posts.map((post: PostSummary) => (
          <Card
            key={post.id}
            sx={{
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 3,
              },
            }}
            onClick={() => handlePostClick(post.id)}
          >
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                Post #{post.id}
              </Typography>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Author ID: {post.userId}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                View Details
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {selectedPostId && (
        <PostModal
          open={!!selectedPostId}
          onClose={handleCloseModal}
          post={postData}
          isLoading={postLoading && !isPlaceholderData}
          isPlaceholder={isPlaceholderData}
        />
      )}
    </Box>
  );
}
