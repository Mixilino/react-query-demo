import { createFileRoute } from '@tanstack/react-router'
import Page from '../pages/4-pagination/Page'

export const Route = createFileRoute('/pagination')({
  component: Page,
})