import React from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Paper,
  Fade,
  Chip,
  Skeleton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { Post } from '../mocks/handlers';

interface PostModalProps {
  open: boolean;
  onClose: () => void;
  post?: Post;
  isLoading?: boolean;
  isPlaceholder?: boolean;
}

const PostModal: React.FC<PostModalProps> = ({
  open,
  onClose,
  post,
  isLoading = false,
  isPlaceholder = false,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
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
            maxWidth: '600px',
            maxHeight: '80vh',
            overflow: 'auto',
            position: 'relative',
            borderRadius: 3,
            outline: 'none',
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={onClose}
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
            {/* Status indicator */}
            <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
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
            </Box>

            {/* Post ID */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Post #{post?.id}
            </Typography>

            {/* Post Title */}
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ mb: 3, fontWeight: 'bold' }}
            >
              {post?.title || <Skeleton width="80%" />}
            </Typography>

            {/* Author ID */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Author ID: {post?.userId || <Skeleton width="60px" />}
            </Typography>

            {/* Post Body */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'semibold' }}>
              Content:
            </Typography>
            
            {post?.body ? (
              <Typography 
                variant="body1" 
                sx={{ 
                  lineHeight: 1.6,
                  backgroundColor: isPlaceholder ? 'rgba(255, 193, 7, 0.1)' : 'transparent',
                  padding: isPlaceholder ? 2 : 0,
                  borderRadius: isPlaceholder ? 1 : 0,
                  border: isPlaceholder ? '1px dashed rgba(255, 193, 7, 0.5)' : 'none'
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
              <Box>
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="95%" />
                <Skeleton variant="text" width="87%" />
                <Skeleton variant="text" width="92%" />
              </Box>
            )}
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default PostModal;