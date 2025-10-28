import React, { useMemo } from 'react'
import {
  MaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table'
import { Box, Typography, Chip } from '@mui/material'
import type { PostSummary } from '../../api/functions'

interface PostsTableProps {
  posts: PostSummary[]
  isLoading?: boolean
  isFetching?: boolean
  isPreviousData?: boolean
}

export const PostsTable: React.FC<PostsTableProps> = ({
  posts,
  isLoading = false,
  isFetching = false,
  isPreviousData = false,
}) => {
  const columns = useMemo<MRT_ColumnDef<PostSummary>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
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
        accessorKey: 'title',
        header: 'Title',
        size: 300,
        Cell: ({ cell }) => (
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {cell.getValue<string>()}
          </Typography>
        ),
      },
      {
        accessorKey: 'userId',
        header: 'Author ID',
        size: 120,
        Cell: ({ cell }) => (
          <Chip 
            label={`User ${cell.getValue<number>()}`} 
            size="small" 
            color="secondary"
          />
        ),
      },
    ],
    []
  )

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Posts ({posts.length} items)
        </Typography>
        {isPreviousData && (
          <Chip 
            label="Previous Data" 
            size="small" 
            color="warning" 
            variant="outlined"
          />
        )}
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
            transition: 'opacity 0.3s ease-in-out',
          },
        }}
      />
    </Box>
  )
}