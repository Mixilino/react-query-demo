import {
  Typography,
  Box,
  Alert,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
} from "@mui/material";
import { useState } from "react";
import type { PostSummary } from "../../api/functions";
import usePosts from "./usePosts";
import usePost from "./usePost";
import LoadingSpinner from "../../components/LoadingSpinner";
import EditablePostModal from "./EditablePostModal";
import { Presentation } from "../../components/Presentation";
import { presentation } from "./slides";
import LoadingFetchingState from "../../components/LoadingFetchingState";

export default function Page() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const {
    data: postsData,
    isLoading: postsLoading,
    error: postsError,
    isFetching: postsFetching,
  } = usePosts();

  const {
    data: postData,
    isLoading: postLoading,
    isFetching: postFetching,
    isPlaceholderData,
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
      <Presentation presentationData={presentation} />
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        useMutation - Edit Posts
      </Typography>

      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Posts List status
      </Typography>

      <LoadingFetchingState
        data={postsData}
        isLoading={postsLoading}
        isFetching={postsFetching}
      />

      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Single Post status ['post', {selectedPostId ?? 'null'}]
      </Typography>
      <LoadingFetchingState
        data={postData}
        isLoading={postLoading}
        isFetching={postFetching}
      />
      <Divider sx={{ my: 4 }} />

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
                Edit Post
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {selectedPostId && (
        <EditablePostModal
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
