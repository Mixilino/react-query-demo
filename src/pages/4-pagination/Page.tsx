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
import { usePaginatedPosts } from "./usePaginatedPosts";
import { PostsTable } from "./PostsTable";
import { Presentation } from "../../components/Presentation";
import { presentation } from "./slides";
import LoadingFetchingState from "../../components/LoadingFetchingState";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const {
    data: paginatedData,
    isLoading: paginatedLoading,
    isFetching: paginatedFetching,
    isPreviousData,
    error: paginatedError,
  } = usePaginatedPosts(currentPage, pageSize);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const currentPaginatedPosts = paginatedData?.posts ?? [];
  const totalPages = paginatedData?.totalPages ?? 1;

  if (paginatedError) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error loading posts:{" "}
        {(paginatedError as Error)?.message || "Unknown error"}
      </Alert>
    );
  }

  return (
    <Box>
      <Presentation presentationData={presentation} />
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Traditional Pagination with keepPreviousData
      </Typography>

      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
          This pattern shows discrete pages with navigation controls. Notice how{" "}
          <code>keepPreviousData</code>
          prevents loading spinners between pages by showing previous data while
          fetching new data.
        </Typography>

        <Box sx={{ mb: 3 }}>
          <LoadingFetchingState
            data={paginatedData}
            isLoading={paginatedLoading}
            isFetching={paginatedFetching}
          />

          {isPreviousData && (
            <Alert severity="info" sx={{ mt: 2 }}>
              <strong>keepPreviousData in action!</strong> You're seeing
              previous page data while new data loads. This prevents loading
              spinners and provides smoother UX.
            </Alert>
          )}
        </Box>

        <PostsTable
          posts={currentPaginatedPosts}
          isLoading={paginatedLoading}
          isFetching={paginatedFetching}
          isPreviousData={isPreviousData}
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
            Page {currentPage} of {totalPages} • Showing{" "}
            {currentPaginatedPosts.length} posts per page
          </Typography>
        </Stack>
      </Paper>

      <Divider sx={{ my: 4 }} />

      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          � Traditional Pagination Benefits
        </Typography>
      </Paper>
    </Box>
  );
}
