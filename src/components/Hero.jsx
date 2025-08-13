import { Box, Typography } from "@mui/material"
import { memo } from "react"

const Hero = () => {
    return (
            <Box maxWidth="lg" sx={{
                backgroundImage: `url(https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg)`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: '300px',
                width:'100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                margin:'auto'
                }}>
                    <Typography variant="h3" component="div" sx={{ color: "text.primary", textAlign:'center'}}>
                        Vuelos
                    </Typography>
            </Box>
    )
}

export default memo(Hero)