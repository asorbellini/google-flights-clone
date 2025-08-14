import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Box, Paper, Grid, TextField, Autocomplete, Button, Typography, FormControl, InputLabel,  Select, MenuItem, Alert, CircularProgress, Chip} from '@mui/material';
import { Flight, Search, SwapHoriz } from '@mui/icons-material';
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


  // For origin and destination reverts
  const swapOriginDestination = () => {
    setFormData(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
    }));
  };

  const handleSearch = () => {
    if (!canSearch) return;

    const searchParams = {
      originSkyId: formData.origin.navigation.relevantFlightParams.skyId,
      originEntityId: formData.origin.navigation.relevantFlightParams.entityId,
      destinationSkyId: formData.destination.navigation.relevantFlightParams.skyId,
      destinationEntityId: formData.destination.navigation.relevantFlightParams.entityId,
      date: formData.departureDate,
      returnDate: formData.tripType === 'roundTrip' ? formData.returnDate : undefined,
      adults: formData.adults,
      children: formData.children,
      infants: formData.infants,
      cabinClass: formData.cabinClass,
    };
    console.log('🚀 Parámetros de búsqueda:', searchParams);
    onSearch(searchParams);
  };

  const validateDates = (departure, returnDate) => {
    if (formData.tripType === 'roundTrip' && returnDate) {
      const dep = new Date(departure);
      const ret = new Date(returnDate);
      if (ret <= dep) {
        setErrors(prev => ({ ...prev, returnDate: 'La fecha de regreso debe ser posterior a la de salida' }));
        return false;
      }
    }
    setErrors(prev => ({ ...prev, returnDate: '' }));
    return true;
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Flight color="primary" />
          Buscar Vuelos
      </Typography>


      {/* Type of trip */}
      <Box sx={{ mb: 3 }}>
        <FormControl size="small">
          <InputLabel>Tipo de viaje</InputLabel>
          <Select
            value={formData.tripType}
            label="Tipo de viaje"
            onChange={(e) => setFormData(prev => ({ ...prev, tripType: e.target.value }))}
          >
            <MenuItem value="oneWay">Solo ida</MenuItem>
            <MenuItem value="roundTrip">Ida y vuelta</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {/* From */}
        <Grid item xs={12} md={5}>
          <Autocomplete
            options={airportOptions}
            getOptionLabel={(option) => option.name || ''}
            isOptionEqualToValue={(option, value) => option.navigation?.entityId === value.navigation?.entityId}
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

        {/* Button to change */}
        <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            size="small"
            onClick={swapOriginDestination}
            sx={{ minWidth: 'auto', p: 1 }}
          >
            <SwapHoriz />
          </Button>
        </Grid>

        {/* To */}
        <Grid item xs={12} md={5}>
          <Autocomplete
            options={airportOptions}
            getOptionLabel={(option) => option.presentation?.title || ''}
            isOptionEqualToValue={(option, value) => option.navigation?.entityId === value.navigation?.entityId}
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

        {/* Dates */}
        <Grid item xs={12} md={6}>
          <TextField
            type="date"
            label="Fecha de salida"
            value={formData.departureDate}
            onChange={(e) => {
              const newDate = e.target.value;
              setFormData(prev => ({ ...prev, departureDate: newDate }));
              validateDates(newDate, formData.returnDate);
            }}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />
        </Grid>

        {formData.tripType === 'roundTrip' && (
          <Grid item xs={12} md={6}>
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
              fullWidth
              required
              error={!!errors.returnDate}
              helperText={errors.returnDate}
            />
          </Grid>
        )}

        {/* Passengers */}
        <Grid item xs={12} md={3}>
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

        <Grid item xs={12} md={3}>
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

        <Grid item xs={12} md={3}>
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

        <Grid item xs={12} md={3}>
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
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={handleSearch}
              disabled={!canSearch || loading}
              startIcon={loading ? <CircularProgress size={20} /> : <Search />}
              sx={{ minWidth: 200, py: 1.5 }}
            >
              {loading ? 'Buscando...' : 'Buscar Vuelos'}
            </Button>
          </Box>
        </Grid>

        {/* Resumen de búsqueda */}
        {canSearch && (
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Resumen:</strong> {formData.origin?.name} → {formData.destination?.name} 
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