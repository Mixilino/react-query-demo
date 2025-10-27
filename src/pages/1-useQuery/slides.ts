import {
  createPresentation,
  createSlide,
} from "../../utils/presentationHelpers";

const modalData = createPresentation({
  slides: [
    createSlide({
      subtitle: "1. useQuery - Basic Patterns",
      bulletPoints: [],
    }),
    createSlide({
      subtitle: "usePosts Hook - The Foundation",
      bulletPoints: [
        "useQuery hook is a fundamental hook for data fetching",
        "Returns { data, isLoading, error }",
        "takes queryKey and fetcher function as arguments",
        "Handles caching, background updates, and stale data",
      ],
    }),
    createSlide({
      subtitle: "Basic Query States in Action",
      bulletPoints: [
        "Loading state: Shows spinner while fetching posts list",
        "Success state: Renders posts grid with clickable cards",
        "Error state: Displays error message with retry options",
        "Status indicators: isLoading, isError, isSuccess, isIdle",
      ],
    }),
    createSlide({
      subtitle: "Conditional Queries with enabled option",
      bulletPoints: [
        "enabled: !!selectedPostId - query only runs when post is selected",
        "Prevents unnecessary API calls when no post is chosen",
        "Query automatically triggers when selectedPostId changes",
        "Perfect for master-detail patterns and dependent data",
      ],
    }),
    createSlide({
      subtitle: "placeholderData",
      bulletPoints: [
        "Shows cached list data instantly while fetching full post",
        "queryClient.getQueryData() retrieves cached posts list",
        "Finds matching post by ID to use as placeholder",
        "User sees title & author immediately, body loads in background",
      ],
    }),
    createSlide({
      subtitle: "initialData (Instantly Hydrate Query Cache)",
      bulletPoints: [
        "Provides immediate data for a query before it fetches from the server",
        "Marks the query as successful right away (isLoading = false)",
        "Unlike placeholderData — it's treated as real cached data",
      ],
    }),
  ],
});

export { modalData };
