import { Stack, Typography } from "@mui/material";
import { Presentation } from "../../components/Presentation";
import { createSlide } from "../../utils/presentationHelpers";

const Empty = () => {
  const presentationData = {
    slides: [
      createSlide({
        subtitle: "1. Introduction to React Query",
        bulletPoints: [],
      }),
      createSlide({
        subtitle: "Why React Query?",
        bulletPoints: [
          "Powerful asynchronous state management, server-state utilities and data fetching",
          "Treat server data as a cache, not local React state",
          "Removes boilerplate: no more manual useEffect + useState",
          "Built-in caching, background refetching, and more",
        ],
      }),
      createSlide({
        subtitle: "Before React Query (The Pain)",
        bulletPoints: [
          "Manual loading/error/data state in every component",
          "Custom logic for refetching and caching → duplication & bugs",
          "Hard to visualize what’s happening under the hood",
        ],
      }),
      createSlide({
        subtitle: "React Query Devtools",
        bulletPoints: [
          "Visual debugger for queries and cache",
          "Inspect active and cached queries in real time",
          "View query status: fresh, stale, fetching, error",
        ],
      }),
    ],
  };

  return (
    <Stack>
      <Presentation presentationData={presentationData} />
      <Typography variant="h6" sx={{ mt: 4 }}>
        This is empty page with no data fetching.
      </Typography>
      <Typography variant="body2" sx={{ mt: 4 }}>
        We will use this page to demonstrate how cache works
      </Typography>
    </Stack>
  );
};

export default Empty;
