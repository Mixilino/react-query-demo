import {
  Typography,
  Box,
  Alert,
  Paper,
  Divider,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import { useInfinitePosts } from "./useInfinitePosts";
import { InfinitePostsList } from "./InfinitePostsList";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Presentation } from "../../components/Presentation";
import { presentation } from "./slides";
import LoadingFetchingState from "../../components/LoadingFetchingState";

export default function Page() {
  const [enableAutoScroll, setEnableAutoScroll] = useState(false);
  const pageSize = 5;

  // Infinite query for "load more" pattern
  const {
    data: infiniteData,
    isLoading: infiniteLoading,
    isFetching: infiniteFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error: infiniteError,
  } = useInfinitePosts(pageSize);

  // Flatten infinite data for display
  const allInfinitePosts =
    infiniteData?.pages.flatMap((page) => page.posts) ?? [];

  if (infiniteLoading) return <LoadingSpinner />;

  if (infiniteError) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error loading posts:{" "}
        {(infiniteError as Error)?.message || "Unknown error"}
      </Alert>
    );
  }

  return (
    <Box>
      <Presentation presentationData={presentation} />
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Infinite Query & Load More Patterns
      </Typography>

      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
          This page demonstrates infinite loading with both manual "Load More"
          button and automatic scroll detection. Toggle auto-scroll to see the
          difference between user-controlled and automatic progressive loading.
        </Typography>

        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Switch
                checked={enableAutoScroll}
                onChange={(e) => setEnableAutoScroll(e.target.checked)}
              />
            }
            label="Enable Auto-Scroll (Infinite Loading)"
          />
        </Box>

        <LoadingFetchingState
          data={infiniteData}
          isLoading={infiniteLoading}
          isFetching={infiniteFetching && !isFetchingNextPage}
        />

        <InfinitePostsList
          posts={allInfinitePosts}
          isLoading={infiniteLoading}
          isFetching={infiniteFetching && !isFetchingNextPage}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          enableAutoScroll={enableAutoScroll}
        />
      </Paper>
    </Box>
  );
}
