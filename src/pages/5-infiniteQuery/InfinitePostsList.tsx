import React, { useEffect, useRef } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  LinearProgress,
  Alert,
} from '@mui/material'
import type { PostSummary } from '../../api/functions'

interface InfinitePostsListProps {
  posts: PostSummary[]
  isLoading?: boolean
  isFetching?: boolean
  isFetchingNextPage?: boolean
  hasNextPage?: boolean
  fetchNextPage: () => void
  enableAutoScroll?: boolean
}

export const InfinitePostsList: React.FC<InfinitePostsListProps> = ({
  posts,
  isLoading = false,
  isFetching = false,
  isFetchingNextPage = false,
  hasNextPage = false,
  fetchNextPage,
  enableAutoScroll = false,
}) => {
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // Auto-scroll functionality
  useEffect(() => {
    if (!enableAutoScroll || !hasNextPage || isFetchingNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [enableAutoScroll, hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isLoading) {
    return <LinearProgress sx={{ width: '100%', mt: 2 }} />
  }

  return (
    <Box>
      <Box sx={{ display: 'grid', gap: 2, mb: 3 }}>
        {posts.map((post, index) => (
          <Card 
            key={`${post.id}-${index}`}
            elevation={1}
            sx={{
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                elevation: 3,
                transform: 'translateY(-2px)',
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Post #{post.id}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
                    {post.title}
                  </Typography>
                </Box>
                <Chip 
                  label={`User ${post.userId}`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                Loaded in chunk {Math.floor(index / 5) + 1}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Loading more indicator */}
      {isFetchingNextPage && (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <LinearProgress sx={{ width: '100%', mb: 2 }} />
          <Typography variant="body2" color="text.secondary">
            Loading more posts...
          </Typography>
        </Box>
      )}

      {/* Load more button or auto-scroll trigger */}
      {hasNextPage && (
        <Box 
          ref={loadMoreRef}
          sx={{ 
            textAlign: 'center', 
            py: 3,
            borderTop: '1px solid #e0e0e0',
            mt: 2,
          }}
        >
          {!enableAutoScroll ? (
            <Button
              variant="contained"
              onClick={fetchNextPage}
              disabled={isFetchingNextPage}
              size="large"
            >
              {isFetchingNextPage ? "Loading..." : "Load More Posts"}
            </Button>
          ) : (
            <Typography variant="body2" color="text.secondary">
              {isFetchingNextPage ? "Loading more posts..." : "Scroll down to load more"}
            </Typography>
          )}
        </Box>
      )}

      {/* End of data indicator */}
      {!hasNextPage && posts.length > 0 && (
        <Alert severity="info" sx={{ mt: 3 }}>
          🎉 You've reached the end! No more posts to load.
        </Alert>
      )}

      {/* Stats */}
      <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Loaded:</strong> {posts.length} posts • 
          <strong> Chunks:</strong> {Math.ceil(posts.length / 5)} • 
          <strong> Mode:</strong> {enableAutoScroll ? 'Auto-scroll' : 'Load More Button'}
          {isFetching && !isFetchingNextPage && ' • Background refresh active'}
        </Typography>
      </Box>
    </Box>
  )
}