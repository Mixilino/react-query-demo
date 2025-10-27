import { setupWorker } from 'msw'
import { handlers } from './handlers'

// Setup MSW worker
export const worker = setupWorker(...handlers)

// Start worker in development
if (import.meta.env.DEV) {
  worker.start({
    onUnhandledRequest: 'bypass',
  })
}