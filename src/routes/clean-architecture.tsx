import { createFileRoute } from '@tanstack/react-router'
import Page from '../pages/6-cleanArchitecture/Page'

export const Route = createFileRoute('/clean-architecture')({
  component: Page,
})