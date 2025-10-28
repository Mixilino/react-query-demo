import {
  createPresentation,
  createSlide,
} from "../../utils/presentationHelpers";

export const presentation = createPresentation({
  slides: [
    createSlide({
      subtitle: "useMutation",
      bulletPoints: [],
    }),
    createSlide({
      subtitle: "What is useMutation?",
      bulletPoints: [
        "Perform create / update / delete",
        "Handle server state changes",
        "Trigger refetch or invalidate",
        "Simplify write operations",
      ],
    }),
    createSlide({
      subtitle: "Updating and Invalidating Queries",
      bulletPoints: [
        "Use `useMutation` for write operations (create, update, delete)",
        "Update the specific query cache directly with `setQueryData` for instant consistency",
        "Call `invalidateQueries` to refetch related queries and keep lists in sync",
        "Typical pattern: update detail → invalidate list",
        "Ensures both local cache and server stay consistent after mutation",
      ],
    }),
  ],
});
