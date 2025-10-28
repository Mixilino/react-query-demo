import {
  createPresentation,
  createSlide,
} from "../../utils/presentationHelpers";

export const presentation = createPresentation({
  slides: [
    createSlide({
      subtitle: "Traditional Pagination",
      bulletPoints: [],
    }),
    createSlide({
      subtitle: "What is Traditional Pagination?",
      bulletPoints: [
        "Divide data into discrete pages",
        "Navigate with page numbers",
        "Fixed number of items per page",
        "Clear navigation controls",
        "Predictable data loading patterns",
      ],
    }),
    createSlide({
      subtitle: "keepPreviousData Magic",
      bulletPoints: [
        "Shows previous data while fetching new page",
        "Prevents loading spinners between pages",
        "Smoother user experience during navigation",
      ],
    }),
    createSlide({
      subtitle: "When to Use Traditional Pagination",
      bulletPoints: [
        "Search and filtering scenarios",
        "Large datasets with known structure",
        "Desktop applications",
        "When users need to bookmark pages",
      ],
    }),
  ],
});
