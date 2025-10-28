import {
  Typography,
  Box,
  Alert,
  Paper,
  Divider,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
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
  const [tabValue, setTabValue] = useState(0);
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

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    // Reset auto-scroll when switching tabs
    if (newValue === 0) {
      setEnableAutoScroll(false);
    }
  };

  // Flatten infinite data for display
  const allInfinitePosts = infiniteData?.pages.flatMap((page) => page.posts) ?? [];

  if (infiniteLoading) return <LoadingSpinner />;

  if (infiniteError) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error loading posts: {(infiniteError as Error)?.message || "Unknown error"}
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
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Load More Button" />
          <Tab label="Auto-Scroll (Infinite)" />
        </Tabs>

        <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
          {tabValue === 0 
            ? "Click 'Load More' to fetch additional posts. This gives users control over data loading."
            : "Scroll to the bottom to automatically load more posts. Perfect for discovery flows."
          }
        </Typography>

        {tabValue === 1 && (
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
        )}

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
          enableAutoScroll={tabValue === 1 && enableAutoScroll}
        />
      </Paper>

      <Divider sx={{ my: 4 }} />

      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          🚀 Infinite Query Patterns
        </Typography>
        
        <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "primary.main" }}>
              Load More Button
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              ✅ User controls data loading<br/>
              ✅ Better for slower connections<br/>
              ✅ Predictable performance<br/>
              ✅ Clear loading states<br/>
              ❌ Requires user interaction
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "secondary.main" }}>
              Auto-Scroll (Infinite)
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              ✅ Seamless browsing experience<br/>
              ✅ Great for discovery flows<br/>
              ✅ Mobile-friendly pattern<br/>
              ✅ No manual interaction needed<br/>
              ❌ Can impact performance<br/>
              ❌ Harder to control data usage
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 3, p: 2, bgcolor: "background.default", borderRadius: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
            💡 Implementation Tips:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Use <code>Intersection Observer API</code> for scroll detection<br/>
            • Implement proper error handling for failed chunks<br/>
            • Consider memory management for very long lists<br/>
            • Provide visual feedback during loading states<br/>
            • Allow users to disable auto-scroll if needed
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}