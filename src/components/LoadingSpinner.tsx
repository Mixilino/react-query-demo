import { CircularProgress, Stack } from "@mui/material";
import React from "react";

const LoadingSpinner = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      direction="row"
      width="100%"
      height="100%"
    >
      <CircularProgress />
    </Stack>
  );
};

export default LoadingSpinner;
