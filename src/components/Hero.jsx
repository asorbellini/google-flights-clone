import { Box, Typography, useTheme, useMediaQuery } from "@mui/material"
import { memo, useState } from "react"

const Hero = () => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const isTablet = useMediaQuery(theme.breakpoints.down('md'))
    
    return (
        <Box 
            maxWidth="lg" 
            sx={{
                backgroundImage: imageLoaded 
                    ? `url(https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg)`
                    : 'none',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: {
                    xs: '200px',    
                    sm: '250px',    
                    md: '300px',    
                    lg: '350px'     
                },
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                margin: 'auto',
                backgroundColor: 'grey.100',
                transition: 'background-image 0.3s ease',
                px: { xs: 2, sm: 3, md: 4 }, 
                pb: { xs: 2, sm: 3, md: 4 }  
            }}
        >
            <img 
                src="https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg"
                alt=""
                style={{ display: 'none' }}
                onLoad={() => setImageLoaded(true)}
            />
            <Typography 
                variant={isMobile ? "h4" : isTablet ? "h3" : "h2"} 
                component="div" 
                sx={{ 
                    color: "text.primary", 
                    textAlign: 'center',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                    mb: { xs: 1, sm: 2 }
                }}
            >
                Vuelos
            </Typography>
        </Box>
    )
}

export default memo(Hero)