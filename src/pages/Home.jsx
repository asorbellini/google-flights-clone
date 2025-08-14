import { useState } from "react";
import Header from "../components/Headers";
import Hero from "../components/Hero";
import FlightSearch from "../components/FlightSearch";
import {Box, Container, Typography, Alert, CircularProgress} from "@mui/material"
import { skyApi } from "../services/skyApi";

export default function Home() {
    const [flightResults, setFlightResults] = useState(null)
    const [isSearching, setIsSearching] = useState(false)
    const [searchError, setSearchError] = useState(null)

    const handleFlightSearch = async (searchParams) => {
        console.log('🔍 Busqueda iniciada con:', searchParams)
        setIsSearching(true)
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

                {flightResults && (
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            <strong>Resultados de búsqueda:</strong>
                        </Typography>
                        <Box sx={{ mb:2, p:2, bgcolor:'success.light', borderRadius:1}}>
                            <Typography>
                                Origen:{flightResults.searchParams?.originEntityId} |
                                Destino:{flightResults.searchParams?.destinationEntityId} |
                                Fecha salida: {flightResults.searchParams?.date} |
                            </Typography>
                            {flightResults.searchParams?.returnDate && (
                                <Typography>
                                        Fecha vuelta: {flightResults.searchParams?.returnDate}
                                </Typography>
                            )}
                        </Box>
                        <Typography variant="subtitle2" gutterBottom>
                            Estructura de respuesta:
                        </Typography>
                        <Box sx={{ 
                            bgcolor: '#f5f5f5', 
                            p: 2, 
                            borderRadius: 1,
                            maxHeight: '400px',
                            overflow: 'auto'
                        }}>
                            <pre style={{ margin: 0, fontSize: '12px' }}>
                                {JSON.stringify(flightResults, null, 2)}
                            </pre>
                        </Box>
                    </Box>
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