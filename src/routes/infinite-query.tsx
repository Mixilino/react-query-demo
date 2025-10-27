import { createFileRoute } from '@tanstack/react-router'
import InfiniteQueryPage from '../pages/9-infiniteQuery/InfiniteQueryPage'

export const Route = createFileRoute('/infinite-query')({
  component: InfiniteQueryPage,
})