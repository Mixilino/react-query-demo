import { rest } from 'msw'
import { posts, type Post } from './data/posts'
import { countries, type Country } from './data/countries'

export interface User {
  id: number
  name: string
  email: string
  username: string
}

export type { Post, Country }

const mockUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', username: 'johndoe' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', username: 'janesmith' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', username: 'bobjohnson' },
]

// Create a mutable copy of posts for mutations
let mockPosts: Post[] = [...posts]

export const handlers = [
  // Get all posts
  rest.get('/api/posts', (req, res, ctx) => {
    const url = new URL(req.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPosts = mockPosts.slice(startIndex, endIndex)
    
    // Return only id, title, and userId for the list view
    const simplifiedPosts = paginatedPosts.map(post => ({
      id: post.id,
      title: post.title,
      userId: post.userId
    }))
    
    return res(
      ctx.delay(800), // 800ms delay
      ctx.json({
        posts: simplifiedPosts,
        total: mockPosts.length,
        page,
        limit,
        totalPages: Math.ceil(mockPosts.length / limit)
      })
    )
  }),

  // Get post by id
  rest.get('/api/posts/:id', (req, res, ctx) => {
    const id = parseInt(req.params.id as string)
    const post = mockPosts.find((p: Post) => p.id === id)
    
    if (!post) {
      return res(ctx.delay(2000), ctx.status(404)) // 2 second delay
    }
    
    return res(ctx.delay(2000), ctx.json(post)) // 2 second delay
  }),

  // Get all countries with pagination
  rest.get('/api/countries', (req, res, ctx) => {
    const url = new URL(req.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedCountries = countries.slice(startIndex, endIndex)
    
    return res(
      ctx.delay(2000), // 2 second delay
      ctx.json({
        countries: paginatedCountries,
        total: countries.length,
        page,
        limit,
        totalPages: Math.ceil(countries.length / limit)
      })
    )
  }),

  // Get country by id
  rest.get('/api/countries/:id', (req, res, ctx) => {
    const id = parseInt(req.params.id as string)
    const country = countries.find((c: Country) => c.id === id)
    
    if (!country) {
      return res(ctx.delay(2000), ctx.status(404)) // 2 second delay
    }
    
    return res(ctx.delay(2000), ctx.json(country)) // 2 second delay
  }),

  // Get all users
  rest.get('/api/users', (_req, res, ctx) => {
    return res(ctx.delay(2000), ctx.json(mockUsers)) // 2 second delay
  }),

  // Get user by id
  rest.get('/api/users/:id', (req, res, ctx) => {
    const id = parseInt(req.params.id as string)
    const user = mockUsers.find(u => u.id === id)
    
    if (!user) {
      return res(ctx.delay(2000), ctx.status(404)) // 2 second delay
    }
    
    return res(ctx.delay(2000), ctx.json(user)) // 2 second delay
  }),

  // Create new post
  rest.post('/api/posts', async (req, res, ctx) => {
    const newPost = await req.json() as Omit<Post, 'id'>
    const post: Post = {
      id: mockPosts.length + 1,
      ...newPost
    }
    mockPosts.push(post)
    return res(ctx.delay(2000), ctx.status(201), ctx.json(post)) // 2 second delay
  }),

  // Update post
  rest.put('/api/posts/:id', async (req, res, ctx) => {
    const id = parseInt(req.params.id as string)
    const updatedPost = await req.json() as Post
    const index = mockPosts.findIndex((p: Post) => p.id === id)
    
    if (index === -1) {
      return res(ctx.delay(2000), ctx.status(404)) // 2 second delay
    }
    
    mockPosts[index] = { ...mockPosts[index], ...updatedPost }
    return res(ctx.delay(2000), ctx.json(mockPosts[index])) // 2 second delay
  }),

  // Delete post
  rest.delete('/api/posts/:id', (req, res, ctx) => {
    const id = parseInt(req.params.id as string)
    const index = mockPosts.findIndex((p: Post) => p.id === id)
    
    if (index === -1) {
      return res(ctx.delay(2000), ctx.status(404)) // 2 second delay
    }
    
    mockPosts.splice(index, 1)
    return res(ctx.delay(2000), ctx.status(204)) // 2 second delay
  }),
]