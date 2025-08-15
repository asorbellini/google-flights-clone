import { useState, useCallback, useMemo } from 'react';
import { Box, Paper, Grid, TextField, Autocomplete, Button, Typography, FormControl, InputLabel,  Select, MenuItem, Alert, CircularProgress, Chip, useTheme, useMediaQuery, Divider} from '@mui/material';
import { Flight, Search, SwapHoriz, FlightTakeoff, FlightLand, People, Class } from '@mui/icons-material';
import { skyApi } from '../services/skyApi';
import { searchAirportsMock } from '../services/mockData';

const FlightSearch = ({ onSearch, loading = false }) => {
  const [formData, setFormData] = useState({
    origin: null,
    destination: null,
    departureDate: '',
    returnDate: '',
    adults: 1,
    children: 0,
    infants: 0,
    cabinClass: 'economy',
    tripType: 'oneWay',
  });
  const [airportOptions, setAirportOptions] = useState([]);
  const [searchingAirports, setSearchingAirports] = useState(false);
  const [errors, setErrors] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const searchAirports = useCallback(async(query) => {
    if (!query || query.length < 2) return;
    setSearchingAirports(true);
    try {
      console.log(`🔍 Buscando aeropuertos para: "${query}"`);
      // SIMULACIÓN: traer info de mockData con searchPlaces
      const airports = await skyApi.searchPlaces(query);
      console.log('✅ Resultados recibidos de skyApi:', airports);
      console.log('✅ Tipo de resultado:', typeof airports);
      console.log('✅ Es array:', Array.isArray(airports));
      
      if (Array.isArray(airports)) {
          setAirportOptions(airports);
      } else {
          console.warn('⚠️ skyApi.searchPlaces no retornó un array:', airports);
          setAirportOptions([]);
      }
    } catch (error) {
      console.error('Error buscando aeropuertos:', error);
      setAirportOptions([]);
    } finally {
      setSearchingAirports(false);
    }
  }, []);

  // validate
  const canSearch = useMemo(() => {
    const hasOrigin = formData.origin?.navigation?.entityId && formData.origin?.navigation?.relevantFlightParams?.skyId
    const hasDestination = formData.destination?.navigation?.entityId && formData.destination?.navigation?.relevantFlightParams?.skyId
    const hasDate = formData.departureDate;
    const isValidReturn = formData.tripType === 'oneWay' || formData.returnDate;
    
    return hasOrigin && hasDestination && hasDate && isValidReturn;
  }, [formData]);

  // Fecha mínima (hoy)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };


  const swapOriginDestination = () => {
    console.log('Estado actual:', {
      origin: formData.origin,
      destination: formData.destination
    });

    // Verificar que ambos campos estén llenos
    if (!formData.origin || !formData.destination) {
      console.warn('⚠️ No se pueden intercambiar campos vacíos');
      return;
    }

    // Verificar que no sean el mismo aeropuerto
    if (formData.origin?.navigation?.entityId === formData.destination?.navigation?.entityId) {
      console.warn('⚠️ No se pueden intercambiar el mismo aeropuerto');
      return;
    }

    console.log('🔄 Intercambiando origen y destino:', {
      from: formData.origin?.presentation?.title,
      to: formData.destination?.presentation?.title
    });

    // Intercambiar los valores
    const newOrigin = formData.destination;
    const newDestination = formData.origin;

    setFormData(prev => ({
      ...prev,
      origin: newOrigin,
      destination: newDestination,
    }));
  };

  const handleSearch = () => {
    console.log('canSearch:', canSearch);
    
    if (!canSearch) {
      console.warn('❌ No se puede buscar - validación fallida');
      return;
    }

    const searchParams = {
      originSkyId: formData.origin?.navigation?.relevantFlightParams?.skyId,
      originEntityId: formData.origin?.navigation?.relevantFlightParams?.entityId,
      destinationSkyId: formData.destination?.navigation?.relevantFlightParams?.skyId,
      destinationEntityId: formData.destination?.navigation?.relevantFlightParams?.entityId,
      originName: formData.origin?.presentation?.title,
      destinationName: formData.destination?.presentation?.title,
      date: formData.departureDate,
      returnDate: formData.tripType === 'roundTrip' ? formData.returnDate : undefined,
      adults: formData.adults,
      children: formData.children,
      infants: formData.infants,
      cabinClass: formData.cabinClass,
    };
    console.log('🚀 Parámetros de búsqueda:', searchParams);
    console.log('🚀 Llamando a onSearch...');
    onSearch(searchParams);
  };

  const validateDates = (departure, returnDate) => {
    if (departure) {
      const departureDate = new Date(departure);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (departureDate < today) {
        setErrors(prev => ({ ...prev, departureDate: 'La fecha de salida no puede ser anterior a hoy' }));
        return false;
      } else {
        setErrors(prev => ({ ...prev, departureDate: '' }));
      }
    }

    if (formData.tripType === 'roundTrip' && returnDate) {
      const dep = new Date(departure);
      const ret = new Date(returnDate);
      if (ret <= dep) {
        setErrors(prev => ({ ...prev, returnDate: 'La fecha de regreso debe ser posterior a la de salida' }));
        return false;
      } else {
        setErrors(prev => ({ ...prev, returnDate: '' }));
      }
    }
    return true;
  };

  return (
    <Paper elevation={3} sx={{ 
      p: { xs: 2, sm: 3 }, 
      mb: 3,
      mx: { xs: 1, sm: 0 }
    }}>

      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
        <FormControl size="small" fullWidth={isMobile}>
          <InputLabel>Tipo de viaje</InputLabel>
          <Select
            value={formData.tripType}
            label="Tipo de viaje"
            onChange={(e) => {
              const newTripType = e.target.value;
              setFormData(prev => ({ 
                ...prev, 
                tripType: newTripType,
                returnDate: newTripType === 'oneWay' ? '' : prev.returnDate
              }));
              if (newTripType === 'oneWay') {
                setErrors(prev => ({ ...prev, returnDate: '' }));
              }
            }}
          >
            <MenuItem value="oneWay">Solo ida</MenuItem>
            <MenuItem value="roundTrip">Ida y vuelta</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {/* From */}
        <Grid item xs={12} sm={6} md={5}>
          <Autocomplete
            options={airportOptions}
            getOptionLabel={(option) => option.presentation?.title || ''}
            isOptionEqualToValue={(option, value) => option.navigation?.entityId === value?.navigation?.entityId}
            onInputChange={(_, value) => searchAirports(value)}
            onChange={(_, value) => setFormData(prev => ({ ...prev, origin: value }))}
            loading={searchingAirports}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Origen"
                placeholder={"Ciudad o aeropuerto"}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <FlightTakeoff sx={{ color: 'text.secondary', mr: 1 }} />,
                  endAdornment: (
                    <>
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                <Box>
                  <Typography variant="body1">{option.presentation?.title}</Typography>
                  {option.navigation?.relevantFlightParams?.skyId && (
                    <Typography variant="caption" color="text.secondary">
                        {option.navigation.relevantFlightParams.skyId}
                    </Typography>
                )}
                </Box>
              </Box>
            )}
          />
        </Grid>

        {/* Button to change - Simplificado y funcional */}
        <Grid item xs={12} sm={12} md={2} sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          order: { xs: 2, sm: 2, md: 2 },
          my: { xs: 1, sm: 0 }
        }}>
          <Button
            variant="outlined"
            size={isMobile ? "medium" : "small"}
            onClick={swapOriginDestination}
            disabled={!formData.origin || !formData.destination}
            sx={{ 
              minWidth: { xs: '100%', sm: 'auto' },
              p: { xs: 1.5, sm: 1.5, md: 1 },
              borderRadius: { xs: 2, sm: 1.5, md: 1 },
              borderWidth: 2,
              backgroundColor: formData.origin && formData.destination ? 'primary.50' : 'transparent',
              borderColor: formData.origin && formData.destination ? 'primary.main' : 'grey.400',
              color: formData.origin && formData.destination ? 'primary.main' : 'text.disabled',
              '&:hover': {
                borderWidth: 2,
                transform: 'scale(1.05)',
                transition: 'all 0.2s ease-in-out',
                backgroundColor: formData.origin && formData.destination ? 'primary.100' : 'transparent',
                boxShadow: formData.origin && formData.destination ? 2 : 0
              },
              '&:active': {
                transform: 'scale(0.95)',
                transition: 'all 0.1s ease-in-out'
              },
              '&:disabled': {
                opacity: 0.5,
                cursor: 'not-allowed',
                transform: 'none',
                boxShadow: 'none'
              }
            }}
            startIcon={<SwapHoriz />}
            title={
              !formData.origin || !formData.destination 
                ? 'Completa origen y destino para intercambiar' 
                : 'Intercambiar origen y destino'
            }
          >
            {isMobile ? 'Intercambiar' : ''}
          </Button>
        </Grid>

        {/* To */}
        <Grid item xs={12} sm={6} md={5}>
          <Autocomplete
            options={airportOptions}
            getOptionLabel={(option) => option.presentation?.title || ''}
            isOptionEqualToValue={(option, value) => option.navigation?.entityId === value?.navigation?.entityId}
            onInputChange={(_, value) => searchAirports(value)}
            onChange={(_, value) => setFormData(prev => ({ ...prev, destination: value }))}
            loading={searchingAirports}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Destino"
                placeholder={"Ciudad o aeropuerto"}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <FlightLand sx={{ color: 'text.secondary', mr: 1 }} />,
                  endAdornment: (
                    <>
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                <Box>
                  <Typography variant="body1">{option.presentation?.title}</Typography>
                  {option.navigation?.relevantFlightParams?.skyId && (
                    <Typography variant="caption" color="text.secondary">
                        {option.navigation.relevantFlightParams.skyId}
                  </Typography>
                  )}
                </Box>
              </Box>
            )}
          />
        </Grid>

        {/* Divider para separar secciones en móvil */}
        {isMobile && (
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>
        )}

        {/* Dates */}
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            type="date"
            label="Fecha de salida"
            value={formData.departureDate}
            onChange={(e) => {
              const newDate = e.target.value;
              setFormData(prev => ({ ...prev, departureDate: newDate }));              
              if (formData.returnDate && new Date(newDate) >= new Date(formData.returnDate)) {
                setFormData(prev => ({ ...prev, returnDate: '' }));
                setErrors(prev => ({ ...prev, returnDate: 'Selecciona una nueva fecha de regreso' }));
              }
              
              validateDates(newDate, formData.returnDate);
            }}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: getMinDate()
            }}
            fullWidth
            required
            error={!!errors.departureDate}
            helperText={errors.departureDate || `Fecha mínima: ${getMinDate()}`}
          />
        </Grid>

        {formData.tripType === 'roundTrip' && (
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              type="date"
              label="Fecha de regreso"
              value={formData.returnDate}
              onChange={(e) => {
                const newDate = e.target.value;
                setFormData(prev => ({ ...prev, returnDate: newDate }));
                validateDates(formData.departureDate, newDate);
              }}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: formData.departureDate || getMinDate()
              }}
              fullWidth
              required
              error={!!errors.returnDate}
              helperText={errors.returnDate || (formData.departureDate ? `Fecha mínima: ${formData.departureDate}` : 'Selecciona primero la fecha de salida')}
            />
          </Grid>
        )}

        {/* Divider para separar secciones en móvil */}
        {isMobile && (
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>
        )}

        {/* Passengers - Reorganizar en móvil */}
        <Grid item xs={6} sm={3} md={3}>
          <FormControl fullWidth>
            <InputLabel>Adultos</InputLabel>
            <Select
              value={formData.adults}
              label="Adultos"
              onChange={(e) => setFormData(prev => ({ ...prev, adults: e.target.value }))}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <MenuItem key={num} value={num}>{num}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={3} md={3}>
          <FormControl fullWidth>
            <InputLabel>Niños</InputLabel>
            <Select
              value={formData.children}
              label="Niños"
              onChange={(e) => setFormData(prev => ({ ...prev, children: e.target.value }))}
            >
              {[0, 1, 2, 3, 4, 5, 6].map(num => (
                <MenuItem key={num} value={num}>{num}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={3} md={3}>
          <FormControl fullWidth>
            <InputLabel>Infantes</InputLabel>
            <Select
              value={formData.infants}
              label="Infantes"
              onChange={(e) => setFormData(prev => ({ ...prev, infants: e.target.value }))}
            >
              {[0, 1, 2, 3, 4].map(num => (
                <MenuItem key={num} value={num}>{num}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={3} md={3}>
          <FormControl fullWidth>
            <InputLabel>Clase</InputLabel>
            <Select
              value={formData.cabinClass}
              label="Clase"
              onChange={(e) => setFormData(prev => ({ ...prev, cabinClass: e.target.value }))}
            >
              <MenuItem value="economy">Económica</MenuItem>
              <MenuItem value="premiumEconomy">Premium Económica</MenuItem>
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="first">Primera</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Botón de búsqueda */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" sx={{ mt: { xs: 2, sm: 3 } }}>
            <Button
              variant="contained"
              size={isMobile ? "large" : "large"}
              onClick={handleSearch}
              disabled={!canSearch || loading}
              startIcon={loading ? <CircularProgress size={20} /> : <Search />}
              sx={{ 
                minWidth: { xs: '100%', sm: 200 }, 
                py: { xs: 2, sm: 1.5 },
                px: { xs: 3, sm: 4 }
              }}
            >
              {loading ? 'Buscando...' : 'Buscar Vuelos'}
            </Button>
          </Box>
        </Grid>

        {/* Resumen de búsqueda */}
        {canSearch && (
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mt: { xs: 2, sm: 2 } }}>
              <Typography variant={isMobile ? "caption" : "body2"}>
                <strong>Resumen:</strong> {formData.origin?.presentation?.title} → {formData.destination?.presentation?.title} 
                el {formData.departureDate}
                {formData.tripType === 'roundTrip' && ` - Regreso: ${formData.returnDate}`}
                {formData.adults > 0 && ` • ${formData.adults} adulto${formData.adults > 1 ? 's' : ''}`}
                {formData.children > 0 && ` • ${formData.children} niño${formData.children > 1 ? 's' : ''}`}
                {formData.infants > 0 && ` • ${formData.infants} infante${formData.infants > 1 ? 's' : ''}`}
              </Typography>
            </Alert>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default FlightSearch;