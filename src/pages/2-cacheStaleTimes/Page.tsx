import React from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import { useQueryClient } from "react-query";
import { Presentation } from "../../components/Presentation";
import { slides } from "./slides";
import { useSinglePost } from "./useSinglePost";
import LoadingFetchingState from "../../components/LoadingFetchingState";

const CacheStalePage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching } = useSinglePost();

  const handleInvalidate = () => {
    queryClient.invalidateQueries(["post", "cache", 1]);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Presentation presentationData={{ slides }} />

      <Card sx={{ mt: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ mb: 3, fontWeight: "bold" }}
          >
            Cache & Stale Time Demo
          </Typography>

          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleInvalidate}
              startIcon={<RefreshIcon />}
              sx={{ px: 4, py: 2 }}
            >
              Invalidate Query
            </Button>
          </Box>

          <LoadingFetchingState
            data={data}
            isLoading={isLoading}
            isFetching={isFetching}
          />

          {data && (
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ mb: 2, fontWeight: "bold" }}
                >
                  Post Data (ID: 1)
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1">
                    <strong>ID:</strong> {data.id}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1">
                    <strong>Title:</strong> {data.title}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1">
                    <strong>User ID:</strong> {data.userId}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1">
                    <strong>Content:</strong>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, color: "text.secondary" }}
                  >
                    {data.body}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Query Key: ['post', 'cache', 1]
                </Typography>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CacheStalePage;
