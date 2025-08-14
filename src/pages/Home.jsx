import { useState } from "react";
import Header from "../components/Headers";
import Hero from "../components/Hero";
import FlightSearch from "../components/FlightSearch";
import FlightResults from "../components/FlightResults";
import {Box, Container, Typography, Alert, CircularProgress} from "@mui/material"
import { skyApi } from "../services/skyApi";

export default function Home() {
    const [flightResults, setFlightResults] = useState(null)
    const [isSearching, setIsSearching] = useState(false)
    const [searchParams, setSearchParams] = useState(null);
    const [searchError, setSearchError] = useState(null)
    const [originName, setOriginName] = useState('');
    const [destinationName, setDestinationName] = useState('');

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
            <Container maxWidth="lg" sx={{py:4}}>
                <FlightSearch onSearch={handleFlightSearch} loading={isSearching}/>
                {searchError && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        <Typography variant="body1">
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
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <CircularProgress size={40} />
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            Buscando vuelos en tiempo real...
                        </Typography>
                    </Box>
                )}
            </Container>
        </Box>
    )
}