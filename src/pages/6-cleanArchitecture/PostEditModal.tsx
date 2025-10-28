import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Chip,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material'
import { Save as SaveIcon, Close as CloseIcon } from '@mui/icons-material'
import type { Post } from '../../mocks/handlers'
import { usePost, useUpdatePost } from './usePosts'
import { postsQueryKeys } from './queryKey'

interface PostEditModalProps {
  open: boolean
  postId: number | null
  onClose: () => void
}

export const PostEditModal: React.FC<PostEditModalProps> = ({
  open,
  postId,
  onClose,
}) => {
  const [editedPost, setEditedPost] = useState<Post | null>(null)

  // Fetch post data using our clean architecture hook
  const {
    data: post,
    isLoading: postLoading,
    isFetching: postFetching,
    isPlaceholderData,
  } = usePost(postId)

  // Update post mutation
  const updatePostMutation = useUpdatePost()

  // Initialize form when post data loads
  useEffect(() => {
    if (post) {
      setEditedPost(post)
    }
  }, [post])

  const handleSave = () => {
    if (!editedPost) return

    updatePostMutation.mutate(editedPost, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  const handleClose = () => {
    setEditedPost(null)
    onClose()
  }

  const handleFieldChange = (field: keyof Post, value: string) => {
    if (!editedPost) return

    setEditedPost({
      ...editedPost,
      [field]: value,
    })
  }

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: { minHeight: '400px' }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            Edit Post {postId && `#${postId}`}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {postFetching && (
              <Chip 
                icon={<CircularProgress size={16} />}
                label="Fetching..." 
                size="small" 
                color="info"
              />
            )}
            {isPlaceholderData && (
              <Chip 
                label="Cached Data" 
                size="small" 
                color="success"
              />
            )}
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        {postLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {editedPost && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Query Key Demo */}
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                🔑 Query Key (Clean Architecture)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                {JSON.stringify(postsQueryKeys.queries.detail(postId!), null, 2)}
              </Typography>
            </Box>

            <TextField
              label="Title"
              fullWidth
              value={editedPost.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              variant="outlined"
            />

            <TextField
              label="Body"
              fullWidth
              multiline
              rows={4}
              value={editedPost.body}
              onChange={(e) => handleFieldChange('body', e.target.value)}
              variant="outlined"
            />

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                label="User ID"
                type="number"
                value={editedPost.userId}
                onChange={(e) => handleFieldChange('userId', e.target.value)}
                variant="outlined"
              />
              <TextField
                label="Post ID"
                value={editedPost.id}
                disabled
                variant="outlined"
                helperText="ID cannot be changed"
              />
            </Box>

            <Divider />

            {/* Invalidation Strategy Info */}
            <Box sx={{ p: 2, bgcolor: 'info.light', borderRadius: 1, color: 'info.contrastText' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                📝 What happens when you save:
              </Typography>
              <Typography variant="body2">
                1. <strong>Optimistic Update:</strong> Post detail cache is updated immediately<br/>
                2. <strong>List Invalidation:</strong> All post lists are invalidated and refetched<br/>
                3. <strong>Detail Refresh:</strong> This post's detail is also invalidated for freshness<br/>
                4. <strong>Consistent State:</strong> All components show updated data
              </Typography>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button 
          onClick={handleClose} 
          variant="outlined"
          startIcon={<CloseIcon />}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!editedPost || updatePostMutation.isLoading}
          startIcon={updatePostMutation.isLoading ? <CircularProgress size={16} /> : <SaveIcon />}
        >
          {updatePostMutation.isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}