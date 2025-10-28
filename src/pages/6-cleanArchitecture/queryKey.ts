export const postsQueryKeys = {
  all: () => ['posts'] as const,
  
  queries: {
    list: (page: number, limit: number) => 
      [...postsQueryKeys.all(), 'list', { page, limit }] as const,
    
    lists: () => [...postsQueryKeys.all(), 'list'] as const,
    
    detail: (id: number) => [...postsQueryKeys.all(), 'detail', id] as const,
    
    details: () => [...postsQueryKeys.all(), 'detail'] as const,
  },
  
  mutations: {
    create: () => [...postsQueryKeys.all(), 'create'] as const,
    
    update: (id: number) => [...postsQueryKeys.all(), 'update', id] as const,
    
    delete: (id: number) => [...postsQueryKeys.all(), 'delete', id] as const,
  },
} as const


export type PostsQueryKeys = typeof postsQueryKeys