import { Box, Typography } from "@mui/material"
import { memo, useState } from "react"

const Hero = () => {
    const [imageLoaded, setImageLoaded] = useState(false)
    return (
            <Box maxWidth="lg" sx={{
                backgroundImage: imageLoaded 
                    ? `url(https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg)`
                    : 'none',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: '300px',
                width:'100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                margin:'auto',
                backgroundColor: 'grey.100',
                transition:'background-image 0.3s ease'
                }}>
                    <img 
                        src="https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg"
                        alt=""
                        style={{ display: 'none' }}
                        onLoad={() => setImageLoaded(true)}
                    />
                    <Typography variant="h3" component="div" sx={{ color: "text.primary", textAlign:'center'}}>
                        Vuelos
                    </Typography>
            </Box>
    )
}

export default memo(Hero)