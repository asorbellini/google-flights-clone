
import { Box, Paper, Typography, Grid, Card, CardContent, Chip, Divider, Alert, CircularProgress} from '@mui/material';
import { Flight, AccessTime, FlightTakeoff, FlightLand } from '@mui/icons-material';

const FlightResults = ({ results, loading, searchParams, originName, destinationName }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={4}>
        <CircularProgress size={60} />
        <Typography variant="h6" ml={2}>Buscando vuelos...</Typography>
      </Box>
    );
  }

  if (!results || !results.data || !results.data.itineraries) {
    return (
      <Alert severity="info">
        No se encontraron resultados para tu búsqueda.
      </Alert>
    );
  }

  const { itineraries } = results.data;

  return (
    <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom color="primary">
                <Flight sx={{ mr: 1, verticalAlign: 'middle' }} />
                Resultados de Vuelos
            </Typography>
            
            <Typography variant="h6" color="text.secondary">
            {originName} → {destinationName}
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
                {searchParams.date}
                {searchParams.returnDate && ` - ${searchParams.returnDate}`}
            </Typography>
            
            <Box sx={{ mt: 1 }}>
                <Chip 
                    label={`${searchParams.adults} adulto${searchParams.adults > 1 ? 's' : ''}`} 
                    size="small" 
                    sx={{ mr: 1 }} 
                />
                {searchParams.children > 0 && (
                    <Chip 
                    label={`${searchParams.children} niño${searchParams.children > 1 ? 's' : ''}`} 
                    size="small" 
                    sx={{ mr: 1 }} 
                    />
                )}
                {searchParams.infants > 0 && (
                    <Chip 
                    label={`${searchParams.infants} infante${searchParams.infants > 1 ? 's' : ''}`} 
                    size="small" 
                    />
                )}
            </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* LISTA DE VUELOS */}
        <Grid container spacing={2}>
            {itineraries.map((itinerary, index) => (
            <Grid item xs={12} key={`${itinerary.id || 'it'}-${index}`}>
                <Card variant="outlined" sx={{ '&:hover': { boxShadow: 2 } }}>
                    <CardContent>
                        {/* PRECIO Y TAGS */}
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Box>
                                <Typography variant="h5" color="primary" fontWeight="bold">
                                    {itinerary.price?.formatted || 'Precio no disponible'}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {itinerary.legs?.length === 2 ? 'Ida y vuelta' : 'Solo ida'}
                                </Typography>
                            </Box>
                            <Box>
                                {itinerary.tags?.map((tag, tagIndex) => (
                                <Chip 
                                    key={tagIndex} 
                                    label={tag === 'cheapest' ? 'Más barato' : tag === 'shortest' ? 'Más corto' : tag} 
                                    size="small" 
                                    color={tag === 'cheapest' ? 'success' : 'default'}
                                    sx={{ mr: 1 }}
                                />
                                ))}
                            </Box>
                        </Box>

                        {/* DETALLES DEL VUELO */}
                        {itinerary.legs?.map((leg, legIndex) => (
                        <Box key={`${itinerary.id || index}-leg-${legIndex}`} sx={{ mb: 2 }}>
                            {itinerary.legs.length === 2 && (
                                <Box sx={{ mb: 1, textAlign: 'center' }}>
                                    <Chip 
                                        label={legIndex === 0 ? 'IDA' : 'VUELTA'} 
                                        size="small" 
                                        color={legIndex === 0 ? 'primary' : 'secondary'}
                                        variant="outlined"
                                    />
                                </Box>
                            )}
                            <Grid container spacing={2} alignItems="center">
                                {/* ORIGEN */}
                                <Grid item xs={12} md={4}>
                                    <Box textAlign="center">
                                        <Typography variant="h6" color="primary">
                                            {leg.origin?.displayCode || leg.origin?.id}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {leg.origin?.name || leg.origin?.city}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {leg.origin?.city}
                                        </Typography>
                                    </Box>
                                </Grid>

                                {/* FLECHA Y DURACIÓN */}
                                <Grid item xs={12} md={4}>
                                    <Box textAlign="center">
                                        <Flight sx={{ transform: 'rotate(90deg)', color: 'primary.main' }} />
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            <AccessTime sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                                            {Math.floor(leg.durationInMinutes / 60)}h {leg.durationInMinutes % 60}m
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {leg.stopCount === 0 ? 'Directo' : `${leg.stopCount} escala${leg.stopCount > 1 ? 's' : ''}`}
                                        </Typography>
                                    </Box>
                                </Grid>

                                {/* DESTINO */}
                                <Grid item xs={12} md={4}>
                                    <Box textAlign="center">
                                        <Typography variant="h6" color="primary">
                                            {leg.destination?.displayCode || leg.destination?.id}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {leg.destination?.name || leg.destination?.city}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {leg.destination?.city}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                                {/* HORARIOS */}
                            <Box display="flex" justifyContent="space-between" mt={2}>
                                <Typography variant="body2">
                                    <FlightTakeoff sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                                    Salida: {new Date(leg.departure).toLocaleTimeString('es-ES', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                    })}
                                </Typography>
                                <Typography variant="body2">
                                    <FlightLand sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                                    Llegada: {new Date(leg.arrival).toLocaleTimeString('es-ES', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                    })}
                                </Typography>
                            </Box>

                            {/* AEROLÍNEA */}
                            {leg.carriers?.marketing?.[0] && (
                            <Box mt={2} textAlign="center">
                                <Typography variant="body2" color="text.secondary">
                                    Operado por: {leg.carriers.marketing[0].name}
                                </Typography>
                            </Box>
                            )}
                        </Box>
                        ))}

                        {/* POLÍTICA DE TARIFA */}
                        {itinerary.farePolicy && (
                        <Box mt={2} p={2} bgcolor="grey.50" borderRadius={1}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Política de tarifa:</strong> 
                                {itinerary.farePolicy.isChangeAllowed ? ' Cambios permitidos' : ' Sin cambios'} • 
                                {itinerary.farePolicy.isCancellationAllowed ? ' Cancelación permitida' : ' Sin cancelación'}
                            </Typography>
                        </Box>
                        )}
                    </CardContent>
                </Card>
            </Grid>
            ))}
        </Grid>
    </Paper>
  );
};

export default FlightResults;