import { createFileRoute } from "@tanstack/react-router";
import UseQueryPage from "../pages/1-useQuery/Page";

export const Route = createFileRoute("/use-query")({
  component: UseQueryPage,
});
