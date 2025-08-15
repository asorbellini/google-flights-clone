import { AppBar, Toolbar, Typography, IconButton, Box, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme, useMediaQuery, Divider } from "@mui/material"
import { memo, useState } from "react"
import { Menu as MenuIcon, AccountCircle, Close } from "@mui/icons-material"
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Vuelos', icon: <FlightIcon style={{rotate:'45deg'}} />, href: '#/' },
    { text: 'Hoteles', icon: <HotelIcon />, href: '#/hoteles' },
  ];

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, mb: 2 }}>
        <Typography variant="h6" component="div" sx={{ color: "text.primary" }}>
          Google
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            key={item.text} 
            component="a" 
            href={item.href}
            onClick={handleDrawerToggle}
            sx={{ 
              py: 1.5,
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.04)',
                transform: 'translateX(4px)'
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" color="inherit" elevation={5}>
      <Toolbar sx={{ 
        justifyContent: "space-between",
        px: { xs: 1, sm: 2, md: 3 } // Padding horizontal responsivo
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}>
          {isMobile ? (
            <IconButton 
              edge="start" 
              color="inherit" 
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              component="div" 
              sx={{ 
                color: "text.primary",
                fontWeight: 'bold'
              }}
            >
              Google
            </Typography>
          </Box>
        </Box>

        {/* Menú de navegación - oculto en móvil */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {menuItems.map((item) => (
            <Button 
              key={item.text}
              color="inherit"
              startIcon={item.icon}
              sx={{ 
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.04)'
                }
              }}
            >
              {item.text}
            </Button>
          ))}
        </Box>

        <IconButton 
          color="inherit"
          sx={{ 
            ml: { xs: 1, sm: 2 },
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.04)'
            }
          }}
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Mejor rendimiento en móvil
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 250,
            backgroundColor: 'background.paper',
            transition: 'transform 0.3s ease-in-out'
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  )
}

export default memo(Header)
