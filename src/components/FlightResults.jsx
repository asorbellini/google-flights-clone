
import { Box, Paper, Typography, Grid, Card, CardContent, Chip, Divider, Alert, CircularProgress, useTheme, useMediaQuery} from '@mui/material';
import { Flight, AccessTime, FlightTakeoff, FlightLand } from '@mui/icons-material';

const FlightResults = ({ results, loading, searchParams, originName, destinationName }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={4}>
        <CircularProgress size={isMobile ? 40 : 60} />
        <Typography variant={isMobile ? "body1" : "h6"} ml={2}>
          Buscando vuelos...
        </Typography>
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
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      width: '100%' 
    }}>
      <Paper 
        elevation={2} 
        sx={{ 
          p: { xs: 2, sm: 3 }, 
          mt: 3,
          mx: { xs: 1, sm: 0 },
          maxWidth: '100%',
          width: '100%',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: { xs: 2, sm: 3 }
        }}
      >
        <Box sx={{ mb: { xs: 2, sm: 3 }, textAlign: 'center' }}>
            <Typography 
              variant={isMobile ? "h5" : isTablet ? "h4" : "h4"} 
              gutterBottom 
              color="primary"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 1
              }}
            >
                <Flight sx={{ mr: 1, verticalAlign: 'middle' }} />
                Resultados de Vuelos
            </Typography>
            
            <Typography 
              variant={isMobile ? "body1" : "h6"} 
              color="text.secondary"
              sx={{ mb: 1 }}
            >
            {originName} → {destinationName}
            </Typography>
            
            <Typography 
              variant={isMobile ? "caption" : "body2"} 
              color="text.secondary"
              sx={{ mb: 1 }}
            >
                {searchParams.date}
                {searchParams.returnDate && ` - ${searchParams.returnDate}`}
            </Typography>
            
            <Box sx={{ 
              mt: 1, 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              alignItems: 'center',
              gap: 1 
            }}>
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

        <Divider sx={{ mb: { xs: 2, sm: 3 } }} />

        {/* LISTA DE VUELOS */}
        <Grid 
          container 
          spacing={{ xs: 1, sm: 2 }}
          justifyContent="center"
          alignItems="stretch"
        >
            {itineraries.map((itinerary, index) => (
            <Grid 
              item 
              xs={12} 
              key={`${itinerary.id || 'it'}-${index}`}
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
                <Card 
                  variant="outlined" 
                  sx={{ 
                    width: '100%',
                    maxWidth: { xs: '100%', sm: '100%', md: '100%' },
                    '&:hover': { boxShadow: 2 },
                    borderRadius: { xs: 1, sm: 2 }
                  }}
                >
                    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                        {/* PRECIO Y TAGS */}
                        <Box display="flex" 
                          flexDirection={{ xs: 'column', sm: 'row' }}
                          justifyContent="space-between" 
                          alignItems={{ xs: 'flex-start', sm: 'center' }} 
                          mb={2}
                          gap={1}
                        >
                            <Box>
                                <Typography 
                                  variant={isMobile ? "h6" : "h5"} 
                                  color="primary" 
                                  fontWeight="bold"
                                >
                                    {itinerary.price?.formatted || 'Precio no disponible'}
                                </Typography>
                                <Typography 
                                  variant="caption" 
                                  color="text.secondary"
                                >
                                    {itinerary.legs?.length === 2 ? 'Ida y vuelta' : 'Solo ida'}
                                </Typography>
                            </Box>
                            <Box sx={{ 
                              display: 'flex', 
                              flexWrap: 'wrap', 
                              gap: 0.5,
                              justifyContent: { xs: 'flex-start', sm: 'flex-end' }
                            }}>
                                {itinerary.tags?.map((tag, tagIndex) => (
                                <Chip 
                                    key={tagIndex} 
                                    label={tag === 'cheapest' ? 'Más barato' : tag === 'shortest' ? 'Más corto' : tag} 
                                    size="small" 
                                    color={tag === 'cheapest' ? 'success' : 'default'}
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
                            <Grid 
                              container 
                              spacing={{ xs: 1, sm: 2 }} 
                              alignItems="center"
                              justifyContent="center"
                            >
                                {/* ORIGEN */}
                                <Grid item xs={12} sm={4} md={4}>
                                    <Box textAlign="center">
                                        <Typography 
                                          variant={isMobile ? "h6" : "h6"} 
                                          color="primary"
                                        >
                                            {leg.origin?.displayCode || leg.origin?.id}
                                        </Typography>
                                        <Typography 
                                          variant={isMobile ? "caption" : "body2"} 
                                          color="text.secondary"
                                          sx={{ 
                                            display: { xs: 'block', sm: 'block' },
                                            wordBreak: 'break-word'
                                          }}
                                        >
                                            {leg.origin?.name || leg.origin?.city}
                                        </Typography>
                                        <Typography 
                                          variant="caption" 
                                          color="text.secondary"
                                        >
                                            {leg.origin?.city}
                                        </Typography>
                                    </Box>
                                </Grid>

                                {/* FLECHA Y DURACIÓN */}
                                <Grid item xs={12} sm={4} md={4}>
                                    <Box textAlign="center">
                                        <Flight sx={{ 
                                          transform: 'rotate(90deg)', 
                                          color: 'primary.main',
                                          fontSize: { xs: '1.5rem', sm: '2rem' }
                                        }} />
                                        <Typography 
                                          variant={isMobile ? "caption" : "body2"} 
                                          color="text.secondary" 
                                          sx={{ mt: 1 }}
                                        >
                                            <AccessTime sx={{ 
                                              fontSize: 16, 
                                              verticalAlign: 'middle', 
                                              mr: 0.5 
                                            }} />
                                            {Math.floor(leg.durationInMinutes / 60)}h {leg.durationInMinutes % 60}m
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {leg.stopCount === 0 ? 'Directo' : `${leg.stopCount} escala${leg.stopCount > 1 ? 's' : ''}`}
                                        </Typography>
                                    </Box>
                                </Grid>

                                {/* DESTINO */}
                                <Grid item xs={12} sm={4} md={4}>
                                    <Box textAlign="center">
                                        <Typography 
                                          variant={isMobile ? "h6" : "h6"} 
                                          color="primary"
                                        >
                                            {leg.destination?.displayCode || leg.destination?.id}
                                        </Typography>
                                        <Typography 
                                          variant={isMobile ? "caption" : "body2"} 
                                          color="text.secondary"
                                          sx={{ 
                                            display: { xs: 'block', sm: 'block' },
                                            wordBreak: 'break-word'
                                          }}
                                        >
                                            {leg.destination?.name || leg.destination?.city}
                                        </Typography>
                                        <Typography 
                                          variant="caption" 
                                          color="text.secondary"
                                        >
                                            {leg.destination?.city}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                                {/* HORARIOS */}
                            <Box display="flex" 
                              flexDirection={{ xs: 'column', sm: 'row' }}
                              justifyContent="space-between" 
                              mt={2}
                              gap={1}
                            >
                                <Typography variant={isMobile ? "caption" : "body2"}>
                                    <FlightTakeoff sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                                    Salida: {new Date(leg.departure).toLocaleTimeString('es-ES', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                    })}
                                </Typography>
                                <Typography variant={isMobile ? "caption" : "body2"}>
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
                                <Typography variant={isMobile ? "caption" : "body2"} color="text.secondary">
                                    Operado por: <img src={leg.carriers.marketing[0].logoUrl} alt={leg.carriers.marketing[0].name} /> {leg.carriers.marketing[0].name}
                                </Typography>
                                
                            </Box>
                            )}
                        </Box>
                        ))}

                        {/* POLÍTICA DE TARIFA */}
                        {itinerary.farePolicy && (
                        <Box mt={2} p={2} bgcolor="grey.50" borderRadius={1}>
                            <Typography variant={isMobile ? "caption" : "body2"} color="text.secondary">
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
    </Box>
  );
};

export default FlightResults;