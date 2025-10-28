import { createRootRoute, Outlet } from '@tanstack/react-router'
import { 
  Box, 
  List, 
  ListItemButton, 
  ListItemText, 
  Typography, 
  AppBar, 
  Toolbar, 
  CssBaseline 
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Link } from '@tanstack/react-router'

const theme = createTheme()
const sidebarWidth = 200

const navigation = [
  { to: '/', label: '0. Empty Page' },
  { to: '/use-query', label: '1. useQuery' },
  { to: '/cache-stale-time', label: '2. Cache & Stale Time' },
  { to: '/use-mutation', label: '3. useMutation' },
  { to: '/infinite-query', label: '9. Infinite Query' },
]

function RootComponent() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
        {/* Header */}
        <AppBar position="static" sx={{ zIndex: 1 }}>
          <Toolbar sx={{ minHeight: '56px !important' }}>
            <Typography variant="h6" component="div">
              React Query Demo
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <Box
            sx={{
              width: sidebarWidth,
              borderRight: '1px solid #e0e0e0',
              backgroundColor: '#fafafa'
            }}
          >
            <List sx={{ py: 1 }}>
              {navigation.map((item) => (
                <ListItemButton 
                  key={item.to} 
                  component={Link}
                  to={item.to}
                  sx={{ py: 1, px: 2 }}
                  activeProps={{
                    style: {
                      backgroundColor: 'rgba(25, 118, 210, 0.12)',
                    },
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
            </List>
          </Box>
          
          {/* Main content */}
          <Box
            component="main"
            sx={{ 
              flex: 1,
              overflow: 'auto',
              p: 2,
              backgroundColor: '#fff',
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})