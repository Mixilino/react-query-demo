import React, { useMemo, useRef } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { Box, Typography, Chip, IconButton, Tooltip } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import type { PostSummary } from "../../api/functions";
import { usePrefetchPost } from "./usePosts";

interface PostsTableProps {
  posts: PostSummary[];
  isLoading?: boolean;
  isFetching?: boolean;
  isPreviousData?: boolean;
  onEditPost: (postId: number) => void;
}

export const PostsTable: React.FC<PostsTableProps> = ({
  posts,
  isLoading = false,
  isFetching = false,
  isPreviousData = false,
  onEditPost,
}) => {
  const prefetchPost = usePrefetchPost();
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout>  | null>(null);

  const startPrefetch = (postId: number) => {
    hoverTimeoutRef.current = setTimeout(() => {
      prefetchPost(postId);
    }, 1000); // 1 second delay before prefetching
  };

  const cancelPrefetch = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const columns = useMemo<MRT_ColumnDef<PostSummary>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 80,
        Cell: ({ cell }) => (
          <Chip
            label={`#${cell.getValue<number>()}`}
            size="small"
            variant="outlined"
            color="primary"
          />
        ),
      },
      {
        accessorKey: "title",
        header: "Title",
        size: 300,
        Cell: ({ cell, row }) => (
          <Box
            onMouseEnter={() => {
              // Prefetch the full post data when hovering over the title
              prefetchPost(row.original.id);
            }}
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.08)",
                borderRadius: 1,
                transition: "background-color 0.2s ease",
              },
              p: 1,
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {cell.getValue<string>()}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 0.5, display: "block" }}
            >
              💡 Hover to prefetch full post data
            </Typography>
          </Box>
        ),
      },
      {
        accessorKey: "userId",
        header: "Author ID",
        size: 120,
        Cell: ({ cell }) => (
          <Chip
            label={`User ${cell.getValue<number>()}`}
            size="small"
            color="secondary"
          />
        ),
      },
      {
        id: "actions",
        header: "Actions",
        size: 100,
        Cell: ({ row }) => (
          <Tooltip title="Edit Post (Opens Modal)" arrow>
            <IconButton
              onClick={() => onEditPost(row.original.id)}
              onMouseEnter={() => startPrefetch(row.original.id)}
              onMouseLeave={cancelPrefetch}
              color="primary"
              size="small"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    [prefetchPost, onEditPost]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Posts ({posts.length} items)
        </Typography>
        {isFetching && (
          <Chip
            label="Fetching..."
            size="small"
            color="info"
            variant="outlined"
          />
        )}
      </Box>

      <MaterialReactTable
        columns={columns}
        data={posts}
        enablePagination={false}
        enableSorting={false}
        enableColumnFilters={false}
        enableColumnActions={false}
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        enableHiding={false}
        state={{
          isLoading,
          showProgressBars: isFetching,
        }}
        muiTableBodyRowProps={{
          sx: {
            opacity: isPreviousData ? 0.7 : 1,
            transition: "opacity 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          },
        }}
        renderTopToolbarCustomActions={() => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              💡 <strong>Clean Architecture Demo:</strong> Hover over posts to
              see prefetching in action
            </Typography>
          </Box>
        )}
      />

      <Box sx={{ mt: 2, p: 2, bgcolor: "background.default", borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>🎯 Prefetching Demo:</strong> When you hover over a post title
          or edit button, the full post data is automatically prefetched in the
          background. This makes opening the modal instant since the data is
          already cached!
        </Typography>
      </Box>
    </Box>
  );
};
