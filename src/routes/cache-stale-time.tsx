import { createFileRoute } from '@tanstack/react-router'
import CacheStalePage from '../pages/2-cacheStaleTimes/Page'

export const Route = createFileRoute('/cache-stale-time')({
  component: CacheStalePage,
})