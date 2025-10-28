import { createFileRoute } from "@tanstack/react-router";
import UseMutationPage from "../pages/3-useMutation/Page";

export const Route = createFileRoute("/use-mutation")({
  component: UseMutationPage,
});