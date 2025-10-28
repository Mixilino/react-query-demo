import {
  createPresentation,
  createSlide,
} from "../../utils/presentationHelpers";

export const presentation = createPresentation({
  slides: [
    createSlide({
      subtitle: "Infinite Query & Scrolling",
      bulletPoints: [],
    }),
    createSlide({
      subtitle: "What is useInfiniteQuery?",
      bulletPoints: [
        "Fetch data in chunks/pages progressively",
        "Automatically manages page state",
        "Provides hasNextPage/hasPreviousPage flags",
        "Fetches next page with fetchNextPage()",
        "Perfect for infinite scrolling or load more buttons",
      ],
    }),
    createSlide({
      subtitle: "Benefits of Infinite Loading",
      bulletPoints: [
        "Continuous browsing experience",
        "Great for mobile and discovery",
        "No pagination UI needed",
        "Progressive data loading",
        "Automatic caching per page chunk",
      ],
    }),
    createSlide({
      subtitle: "Load More vs Auto-Scroll",
      bulletPoints: [
        "Load More: User-controlled progression",
        "Auto-Scroll: Automatic on scroll detection",
        "Both use same useInfiniteQuery hook",
        "Load More better for performance control",
        "Auto-Scroll better for discovery flows",
      ],
    }),
    createSlide({
      subtitle: "When to Use Infinite Query",
      bulletPoints: [
        "Social media feeds and timelines",
        "Product catalogs and galleries",
        "Mobile applications",
        "Discovery and browsing scenarios",
        "When exact item count is unknown",
      ],
    }),
    createSlide({
      subtitle: "Implementation Considerations",
      bulletPoints: [
        "Memory management with large datasets",
        "Scroll position restoration",
        "Loading states between chunks",
        "Error handling per page",
        "Backend cursor-based pagination support",
      ],
    }),
  ],
});