import { createFileRoute } from '@tanstack/react-router'
import Page from '../pages/5-infiniteQuery/Page'

export const Route = createFileRoute('/infinite-query')({
  component: Page,
})