import { createFileRoute } from "@tanstack/react-router";
import Empty from "../pages/0-intro/Empty";

export const Route = createFileRoute("/")({
  component: Empty,
});
