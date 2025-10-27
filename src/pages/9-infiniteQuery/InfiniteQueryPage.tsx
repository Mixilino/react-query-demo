import { 
  Typography, 
  Box,
  CircularProgress, 
  Alert,
  Chip
} from '@mui/material'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { useMemo, useCallback } from 'react'
import { useInfiniteQuery } from 'react-query'
import { fetchCountries } from '../../api'
import type { Country } from '../../mocks/handlers'
import { Presentation } from '../../components/Presentation'
import { createSlide, createPresentation } from '../../utils/presentationHelpers'

// Local hooks for InfiniteQueryPage
const useInfiniteCountries = (limit = 10) => {
  return useInfiniteQuery(
    ['countries', 'infinite', limit],
    ({ pageParam = 1 }) => fetchCountries(pageParam, limit),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined
      },
      staleTime: 10 * 60 * 1000,
    }
  )
}

export default function InfiniteQueryPage() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteCountries(10) // 10 countries per page

  // Flatten all countries from all pages
  const allCountries = useMemo(() => {
    return data?.pages.flatMap(page => page.countries) || []
  }, [data?.pages])

  const presentationData = createPresentation([
    createSlide(
      "Infinite Query Pattern",
      [
        "Automatically loads data in chunks as user scrolls",
        "Manages pagination state internally with getNextPageParam"
      ],
      "Efficient data loading for large datasets"
    ),
    createSlide(
      "Performance Benefits", 
      [
        "Reduces initial load time by fetching data incrementally",
        "Provides smooth user experience with progressive loading",
        "Intelligent caching of all loaded pages"
      ],
      "Optimized user experience"
    ),
    createSlide(
      "Implementation Details",
      [
        "Uses scroll position to trigger next page fetch",
        "Handles loading states for both initial and subsequent requests",
        "Flattens paginated data for seamless table display"
      ],
      "Technical implementation"
    )
  ])

  const columns = useMemo<MRT_ColumnDef<Country>[]>(
    () => [
      {
        accessorKey: 'flag',
        header: 'Flag',
        size: 80,
        Cell: ({ cell }) => (
          <Typography variant="h4">{cell.getValue<string>()}</Typography>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Country',
        size: 200,
        Cell: ({ cell }) => (
          <Typography variant="subtitle1" fontWeight="bold">
            {cell.getValue<string>()}
          </Typography>
        ),
      },
      {
        accessorKey: 'code',
        header: 'Code',
        size: 80,
        Cell: ({ cell }) => (
          <Chip 
            label={cell.getValue<string>()} 
            size="small" 
            variant="outlined" 
          />
        ),
      },
      {
        accessorKey: 'capital',
        header: 'Capital',
        size: 150,
      },
      {
        accessorKey: 'continent',
        header: 'Continent',
        size: 120,
        Cell: ({ cell }) => (
          <Chip 
            label={cell.getValue<string>()} 
            size="small" 
            color="primary"
            variant="filled"
          />
        ),
      },
      {
        accessorKey: 'population',
        header: 'Population',
        size: 120,
        Cell: ({ cell }) => (
          <Typography variant="body2">
            {cell.getValue<number>().toLocaleString()}
          </Typography>
        ),
      },
    ],
    [],
  )

  // Handle infinite scrolling
  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
      
      // Trigger fetch when user scrolls to bottom (with some buffer)
      if (
        scrollHeight - scrollTop - clientHeight < 100 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  )

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    )
  }

  if (status === 'error') {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error loading countries: {(error as Error)?.message || 'Unknown error'}
      </Alert>
    )
  }

  return (
    <Box>
      <Presentation presentationData={presentationData} />
      
      <Typography variant="h4" component="h1" gutterBottom>
        Infinite Query Demo - Country Explorer
      </Typography>
      <Typography variant="body1" paragraph>
        This page demonstrates useInfiniteQuery with real infinite scrolling! Scroll down in the table
        to automatically load more countries. The table shows 10 countries at a time and loads more as you scroll.
      </Typography>

      {isFetching && !isFetchingNextPage && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Refetching data...
        </Alert>
      )}

      <MaterialReactTable
        columns={columns}
        data={allCountries}
        enablePagination={false}
        enableBottomToolbar={isFetchingNextPage}
        enableTopToolbar={true}
        enableGlobalFilter={true}
        enableColumnFilters={true}
        enableSorting={true}
        enableRowSelection={false}
        enableColumnActions={false}
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        enableHiding={false}
        muiTableContainerProps={{
          sx: {
            maxHeight: '700px',
            overflow: 'auto',
          },
          onScroll: handleScroll,
        }}
        muiTableProps={{
          sx: {
            tableLayout: 'fixed',
          },
        }}
        state={{
          isLoading: false,
        }}
        renderTopToolbarCustomActions={() => (
          <Box>
            <Typography variant="body2" color="text.secondary">
              Showing {allCountries.length} countries 
              {data && ` from ${data.pages.length} page(s)`}
            </Typography>
            {isFetchingNextPage && (
              <Typography variant="body2" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={16} />
                Loading more countries...
              </Typography>
            )}
          </Box>
        )}
        renderBottomToolbarCustomActions={() => (
          isFetchingNextPage ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress size={24} />
            </Box>
          ) : null
        )}
        muiTableBodyRowProps={{
          sx: {
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          },
        }}
      />

      {!hasNextPage && (
        <Alert severity="success" sx={{ mt: 2 }}>
          🎉 You've reached the end! All {allCountries.length} countries have been loaded.
        </Alert>
      )}
    </Box>
  )
}