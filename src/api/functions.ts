import type { Post, User, Country } from '../mocks/handlers'

export interface PostSummary {
  id: number
  title: string
  userId: number
}

export interface PostsResponse {
  posts: PostSummary[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface CountriesResponse {
  countries: Country[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Posts API functions
export const fetchPosts = async (page = 1, limit = 10): Promise<PostsResponse> => {
  const response = await fetch(`/api/posts?page=${page}&limit=${limit}`)
  if (!response.ok) throw new Error('Failed to fetch posts')
  return response.json()
}

export const fetchPost = async (id: number): Promise<Post> => {
  const response = await fetch(`/api/posts/${id}`)
  if (!response.ok) throw new Error('Failed to fetch post')
  return response.json()
}

export const createPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
  if (!response.ok) throw new Error('Failed to create post')
  return response.json()
}

export const updatePost = async (post: Post): Promise<Post> => {
  const response = await fetch(`/api/posts/${post.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
  if (!response.ok) throw new Error('Failed to update post')
  return response.json()
}

export const deletePost = async (id: number): Promise<void> => {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error('Failed to delete post')
}

// Users API functions
export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('/api/users')
  if (!response.ok) throw new Error('Failed to fetch users')
  return response.json()
}

export const fetchUser = async (id: number): Promise<User> => {
  const response = await fetch(`/api/users/${id}`)
  if (!response.ok) throw new Error('Failed to fetch user')
  return response.json()
}

// Countries API functions
export const fetchCountries = async (page = 1, limit = 10): Promise<CountriesResponse> => {
  const response = await fetch(`/api/countries?page=${page}&limit=${limit}`)
  if (!response.ok) throw new Error('Failed to fetch countries')
  return response.json()
}

export const fetchCountry = async (id: number): Promise<Country> => {
  const response = await fetch(`/api/countries/${id}`)
  if (!response.ok) throw new Error('Failed to fetch country')
  return response.json()
}