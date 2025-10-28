import {
  Typography,
  Box,
  Alert,
  Paper,
  Divider,
  Stack,
  Pagination,
} from "@mui/material";
import { useState } from "react";
import { usePosts } from "./usePosts";
import { PostsTable } from "./PostsTable";
import { PostEditModal } from "./PostEditModal";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Presentation } from "../../components/Presentation";
import { presentation } from "./slides";
import LoadingFetchingState from "../../components/LoadingFetchingState";
import { postsQueryKeys } from "./queryKey";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const pageSize = 5;

  // Use our clean architecture hook
  const {
    data: postsData,
    isLoading: postsLoading,
    isFetching: postsFetching,
    isPreviousData,
    error: postsError,
  } = usePosts(currentPage, pageSize);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleEditPost = (postId: number) => {
    setSelectedPostId(postId);
  };

  const handleCloseModal = () => {
    setSelectedPostId(null);
  };

  const currentPosts = postsData?.posts ?? [];
  const totalPages = postsData?.totalPages ?? 1;

  if (postsLoading) return <LoadingSpinner />;

  if (postsError) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error loading posts: {postsError instanceof Error ? postsError.message : "Unknown error"}
      </Alert>
    );
  }

  return (
    <Box>
      <Presentation presentationData={presentation} />
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Clean Architecture with React Query
      </Typography>

      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
          This page demonstrates clean architecture patterns with React Query including 
          query key factories, prefetching strategies, and proper invalidation patterns.
        </Typography>

        {/* Query Key Factory Demo */}
        <Box sx={{ mb: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            🏗️ Query Key Factory Pattern
          </Typography>
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Current Query Key:
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
                {JSON.stringify(postsQueryKeys.queries.list(currentPage, pageSize))}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Benefits:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Type-safe key generation<br/>
                • Hierarchical invalidation<br/>
                • Centralized key management<br/>
                • No key conflicts
              </Typography>
            </Box>
          </Box>
        </Box>

        <LoadingFetchingState
          data={postsData}
          isLoading={postsLoading}
          isFetching={postsFetching}
        />

        {isPreviousData && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <strong>keepPreviousData in action!</strong> You're seeing previous page data 
            while new data loads. This is handled automatically by our clean architecture.
          </Alert>
        )}

        <PostsTable
          posts={currentPosts}
          isLoading={postsLoading}
          isFetching={postsFetching}
          isPreviousData={isPreviousData}
          onEditPost={handleEditPost}
        />

        <Stack spacing={2} sx={{ mt: 3, alignItems: "center" }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
          
          <Typography variant="body2" color="text.secondary">
            Page {currentPage} of {totalPages} • Showing {currentPosts.length} posts per page
          </Typography>
        </Stack>
      </Paper>

      {/* <Divider sx={{ my: 4 }} />

      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          🎯 Clean Architecture Features Demonstrated
        </Typography>
        
        <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" } }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "primary.main" }}>
              Query Key Factory
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              ✅ Centralized key management<br/>
              ✅ Type-safe key generation<br/>
              ✅ Hierarchical structure<br/>
              ✅ Easy invalidation patterns<br/>
              ✅ No key conflicts
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "secondary.main" }}>
              Prefetching Strategy
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              ✅ Hover-triggered prefetching<br/>
              ✅ Instant modal loading<br/>
              ✅ Background data loading<br/>
              ✅ Improved perceived performance<br/>
              ✅ Smart cache utilization
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "success.main" }}>
              Invalidation Patterns
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              ✅ Optimistic updates<br/>
              ✅ Targeted invalidation<br/>
              ✅ Automatic refetching<br/>
              ✅ Consistent state management<br/>
              ✅ Hierarchical cache control
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 3, p: 2, bgcolor: "info.light", borderRadius: 1, color: "info.contrastText" }}>
          <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
            💡 Try These Features:
          </Typography>
          <Typography variant="body2">
            1. <strong>Hover over post titles</strong> to see prefetching in action<br/>
            2. <strong>Click the edit button</strong> to open the modal (notice it loads instantly if you hovered first!)<br/>
            3. <strong>Edit and save a post</strong> to see how invalidation updates the table automatically<br/>
            4. <strong>Navigate between pages</strong> to see keepPreviousData preventing loading flickers
          </Typography>
        </Box>
      </Paper> */}

      {/* Edit Modal */}
      <PostEditModal
        open={!!selectedPostId}
        postId={selectedPostId}
        onClose={handleCloseModal}
      />
    </Box>
  );
}