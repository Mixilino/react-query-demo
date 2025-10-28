import {
  createPresentation,
  createSlide,
} from "../../utils/presentationHelpers";

export const presentation = createPresentation({
  slides: [
    createSlide({
      subtitle: "Clean Architecture with React Query",
      bulletPoints: [],
    }),
    createSlide({
      subtitle: "Query Key Factory Pattern",
      bulletPoints: [
        "Centralized query key management",
        "Type-safe key generation",
        "Hierarchical structure for easy invalidation",
        "Prevents key conflicts and duplicates",
        "Makes refactoring safer and easier",
      ],
    }),
    createSlide({
      subtitle: "Prefetching Benefits",
      bulletPoints: [
        "Preload data before user needs it",
        "Improved perceived performance",
        "Smooth user experience",
        "Reduce loading states",
        "Great for hover interactions",
      ],
    }),
  ],
});
