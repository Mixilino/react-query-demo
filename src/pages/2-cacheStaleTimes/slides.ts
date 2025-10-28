import type { Slide } from "../../types/presentation";

export const slides: Slide[] = [
  {
    subtitle: "cacheTime and staleTime",
    bulletPoints: ["fresh, stale data", "default: 0 (no cache)"],
  },
  {
    subtitle: "cacheTime",
    bulletPoints: [
      "Controls how long inactive queries stay in memory after they become unused",
      "After cacheTime expires, data is garbage collected",
      "Cached data = instant loading on remount",
    ],
  },
  {
    subtitle: "staleTime",
    bulletPoints: [
      'How long data is considered "fresh"',
      "Default: 0ms (immediately stale)",
      "Fresh data = no background refetch",
      "Stale data = triggers background refetch",
    ],
  },
  {
    subtitle: "isLoading and isFetching",
    bulletPoints: [
      "isLoading: true when the query is in the process of loading data",
      "isFetching: true when the query is fetching data in the background (e.g., after a refetch)",
      "Both can be true at the same time during a refetch",
      "if data is cached, isLoading will be false during refetch",
    ],
  },
];
