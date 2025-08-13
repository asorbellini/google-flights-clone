import { AppBar, Toolbar, Typography, IconButton, Box, Button } from "@mui/material"
import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material"
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
const Header = () => {
  return (
    <AppBar position="static" color="inherit" elevation={5}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography variant="h5" component="div" sx={{ color: "text.primary" }}>
              Google
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          <Button color="inherit"><FlightIcon style={{rotate:'45deg'}} />Vuelos</Button>
          <Button color="inherit"><HotelIcon />Hoteles</Button>
        </Box>

        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header
