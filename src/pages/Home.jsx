import { useState } from "react";
import Header from "../components/Headers";
import Hero from "../components/Hero";
import FlightSearch from "../components/FlightSearch";
import FlightResults from "../components/FlightResults";
import {Box, Container, Typography, Alert, CircularProgress, useTheme, useMediaQuery} from "@mui/material"
import { skyApi } from "../services/skyApi";

export default function Home() {
    const [flightResults, setFlightResults] = useState(null)
    const [isSearching, setIsSearching] = useState(false)
    const [searchParams, setSearchParams] = useState(null);
    const [searchError, setSearchError] = useState(null)
    const [originName, setOriginName] = useState('');
    const [destinationName, setDestinationName] = useState('');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleFlightSearch = async (searchParams) => {
        console.log('🔍 Busqueda iniciada con:', searchParams)
        setIsSearching(true)
        setSearchParams(searchParams)
        setOriginName(searchParams.originName || 'Origen');
        setDestinationName(searchParams.destinationName || 'Destino');
        setSearchError(null)
        setFlightResults(null)
        
        try {
            console.log('Enviando parametros a la API...')
            console.log('Parámetros enviados:', {
                originSkyId: searchParams.originSkyId,
                originEntityId: searchParams.originEntityId,
                destinationSkyId: searchParams.destinationSkyId,
                destinationEntityId: searchParams.destinationEntityId,
                date: searchParams.date,
                returnDate: searchParams.returnDate,
                adults: searchParams.adults,
                children: searchParams.children,
                infants: searchParams.infants,
                cabinClass: searchParams.cabinClass
            });
            
            const results = await skyApi.searchFlights(searchParams)
            console.log('✅ Resultados recibidos:', results);
            setFlightResults(results)
            
        } catch (error) {
            console.error('❌ Error en búsqueda:', error);
            setSearchError(error.message || 'Error al buscar vuelos');
            setFlightResults({ error: error.message });
        } finally {
            setIsSearching(false);
        }
    }
    return(
        <Box sx={{ minHeight: "100vh", bgcolor: "white" }}>
            <Header />
            <Hero />
            <Container 
                maxWidth="lg" 
                sx={{
                    py: { xs: 2, sm: 3, md: 4 },
                    px: { xs: 1, sm: 2, md: 3 }
                }}
            >
                <FlightSearch onSearch={handleFlightSearch} loading={isSearching}/>                
                {searchError && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        <Typography variant={isMobile ? "body2" : "body1"}>
                            Error en la búsqueda: {searchError}
                        </Typography>
                    </Alert>
                )}

                {searchParams && (
                    <FlightResults
                        results={flightResults}
                        loading={isSearching}
                        searchParams={searchParams}
                        originName={originName}
                        destinationName={destinationName}
                    />
                )}

                {isSearching && (
                    <Box sx={{ 
                        mt: { xs: 2, sm: 3 }, 
                        textAlign: 'center',
                        py: { xs: 3, sm: 4 }
                    }}>
                        <CircularProgress size={isMobile ? 40 : 60} />
                        <Typography 
                            variant={isMobile ? "body2" : "body1"} 
                            sx={{ mt: 2 }}
                        >
                            Buscando vuelos en tiempo real...
                        </Typography>
                    </Box>
                )}
            </Container>
        </Box>
    )
}