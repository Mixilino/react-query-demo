import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Paper,
  Fade,
  Chip,
  Skeleton,
  TextField,
  Button,
  Stack,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import type { Post } from '../../mocks/handlers';
import useUpdatePost, { type UpdatePostData } from './useUpdatePost';

interface EditablePostModalProps {
  open: boolean;
  onClose: () => void;
  post?: Post;
  isLoading?: boolean;
  isPlaceholder?: boolean;
}

const EditablePostModal: React.FC<EditablePostModalProps> = ({
  open,
  onClose,
  post,
  isLoading = false,
  isPlaceholder = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const updatePostMutation = useUpdatePost();

  // Reset form when post changes
  useEffect(() => {
    if (post) {
      setEditedTitle(post.title);
      setEditedBody(post.body);
      setHasChanges(false);
    }
  }, [post]);

  // Check for changes
  useEffect(() => {
    if (post) {
      const titleChanged = editedTitle !== post.title;
      const bodyChanged = editedBody !== post.body;
      setHasChanges(titleChanged || bodyChanged);
    }
  }, [editedTitle, editedBody, post]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (post) {
      setEditedTitle(post.title);
      setEditedBody(post.body);
    }
    setIsEditing(false);
    setHasChanges(false);
  };

  const handleSave = async () => {
    if (!post || !hasChanges) return;

    const updateData: UpdatePostData = {
      id: post.id,
      title: editedTitle.trim(),
      body: editedBody.trim(),
    };

    try {
      await updatePostMutation.mutateAsync(updateData);
      setIsEditing(false);
      // Close the modal after successful update
      onClose();
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const handleClose = () => {
    if (isEditing && hasChanges) {
      const confirmClose = window.confirm('You have unsaved changes. Are you sure you want to close?');
      if (!confirmClose) return;
    }
    handleCancel();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Fade in={open}>
        <Paper
          elevation={24}
          sx={{
            width: { xs: '95%', sm: '80%', md: '70%', lg: '60%' },
            maxWidth: '700px',
            maxHeight: '85vh',
            overflow: 'auto',
            position: 'relative',
            borderRadius: 3,
            outline: 'none',
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Content */}
          <Box sx={{ p: 4, pr: 6 }}>
            {/* Status indicators */}
            <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {isPlaceholder && (
                <Chip 
                  label="Using Placeholder Data" 
                  color="info" 
                  variant="outlined" 
                  size="small"
                />
              )}
              {isLoading && (
                <Chip 
                  label="Fetching Full Data..." 
                  color="primary" 
                  variant="outlined" 
                  size="small"
                />
              )}
              {isEditing && (
                <Chip 
                  label="Edit Mode" 
                  color="warning" 
                  variant="filled" 
                  size="small"
                />
              )}
              {updatePostMutation.isLoading && (
                <Chip 
                  label="Saving..." 
                  color="secondary" 
                  variant="filled" 
                  size="small"
                />
              )}
            </Box>

            {/* Error message */}
            {updatePostMutation.isError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                Failed to update post: {updatePostMutation.error?.message || 'Unknown error'}
              </Alert>
            )}

            {/* Success message */}
            {updatePostMutation.isSuccess && !isEditing && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Post updated successfully!
              </Alert>
            )}

            {/* Post ID */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Post #{post?.id}
            </Typography>

            {/* Post Title */}
            {isEditing ? (
              <TextField
                fullWidth
                label="Post Title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                variant="outlined"
                sx={{ mb: 3 }}
                multiline
                maxRows={3}
              />
            ) : (
              <Typography 
                variant="h4" 
                component="h1" 
                sx={{ mb: 3, fontWeight: 'bold' }}
              >
                {post?.title || <Skeleton width="80%" />}
              </Typography>
            )}

            {/* Author ID */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Author ID: {post?.userId || <Skeleton width="60px" />}
            </Typography>

            {/* Post Body */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'semibold' }}>
              Content:
            </Typography>
            
            {isEditing ? (
              <TextField
                fullWidth
                label="Post Content"
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
                variant="outlined"
                multiline
                rows={6}
                sx={{ mb: 3 }}
              />
            ) : post?.body ? (
              <Typography 
                variant="body1" 
                sx={{ 
                  lineHeight: 1.6,
                  backgroundColor: isPlaceholder ? 'rgba(255, 193, 7, 0.1)' : 'transparent',
                  padding: isPlaceholder ? 2 : 0,
                  borderRadius: isPlaceholder ? 1 : 0,
                  border: isPlaceholder ? '1px dashed rgba(255, 193, 7, 0.5)' : 'none',
                  mb: 3
                }}
              >
                {post.body}
                {isPlaceholder && (
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      display: 'block', 
                      mt: 1, 
                      fontStyle: 'italic',
                      color: 'warning.main'
                    }}
                  >
                    * This content is from placeholder data and may be incomplete
                  </Typography>
                )}
              </Typography>
            ) : (
              <Box sx={{ mb: 3 }}>
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="95%" />
                <Skeleton variant="text" width="87%" />
                <Skeleton variant="text" width="92%" />
              </Box>
            )}

            {/* Action Buttons */}
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              {!isEditing ? (
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                  disabled={!post || isLoading}
                >
                  Edit Post
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    disabled={!hasChanges || updatePostMutation.isLoading}
                    color="primary"
                  >
                    {updatePostMutation.isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    disabled={updatePostMutation.isLoading}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Stack>
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default EditablePostModal;