import { Grid, Paper, Typography, Chip } from "@mui/material";
import React from "react";

const LoadingFetchingState: React.FC<{
  isLoading: boolean;
  isFetching: boolean;
  data: any;
}> = ({ isLoading, isFetching, data }) => {
  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      <Grid item xs={12} md={4}>
        <Paper
          sx={{
            p: 2,
            textAlign: "center",
            backgroundColor: isLoading ? "warning.light" : "grey.100",
            color: isLoading ? "warning.contrastText" : "text.secondary",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            isLoading
          </Typography>
          <Chip
            label={String(isLoading)}
            color={isLoading ? "warning" : "default"}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper
          sx={{
            p: 2,
            textAlign: "center",
            backgroundColor: isFetching ? "info.light" : "grey.100",
            color: isFetching ? "info.contrastText" : "text.secondary",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            isFetching
          </Typography>
          <Chip
            label={String(isFetching)}
            color={isFetching ? "info" : "default"}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper
          sx={{
            p: 2,
            textAlign: "center",
            backgroundColor: data ? "success.light" : "grey.100",
            color: data ? "success.contrastText" : "text.secondary",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            hasData
          </Typography>
          <Chip label={String(!!data)} color={data ? "success" : "default"} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoadingFetchingState;
