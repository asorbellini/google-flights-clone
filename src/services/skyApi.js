import { apiClient } from "./apiClient";
import { mockFlightResults, searchAirportsMock } from "./mockData";

export const skyApi = {
    async searchPlaces(query) {
        if (!query || query.length < 2) return []
        // SIMULACIÓN:  solicitud con debounce a mockData
        try {
            console.log(`🔍 Búsqueda simulada con debounce para: "${query}"`);
            // SIMULACIÓN: Usando mockData 
            const results = searchAirportsMock(query);
            console.log(results)
            if (!results || !Array.isArray(results)) {
                console.warn('⚠️ searchAirportsMock retornó resultado inválido:', results);
                return [];
            }
            
            console.log(`Resultados simulados: ${results.length} lugares encontrados`);
            
            return results;
        } catch (error) {
            console.error('❌ Error en searchPlaces:', error);
            return [];
        }
        
        // REAL: Solicitud a la API
        /* const data = await apiClient.get('/api/v1/flights/searchAirport',{query})
        const items = data?.data || []
        return items*/
    },

    buildFlightParams(params){
        const required = {
            originSkyId: params.originSkyId,
            originEntityId: params.originEntityId, 
            destinationSkyId: params.destinationSkyId,
            destinationEntityId: params.destinationEntityId, 
            date: params.date, 
            adults: params.adults || 1, 
            currency: params.currency ||'USD'
        }

        const optional = {}
        if (params.children > 0 ) optional.children = params.children
        if (params.infants > 0 ) optional.infants = params.infants
        if (params.returnDate) optional.returnDate = params.returnDate
        if (params.cabinClass && params.cabinClass !== 'economy') optional.cabinClass = params.cabinClass

        return {...required, ...optional}
    },
/* 
    async getAllAirports(){
        try{
            console.log('🔍 Cargando todos los aeropuertos desde la API...')
            const allAirportsData = await apiClient.get('/api/v1/flights/searchAirport',{query:''})
            console.log('Respuesta recibida:',allAirportsData)
            const normalizedAirports = this.normalizeAirports(allAirportsData)
            console.log(`✅ Total de aeropuertos normalizados: ${normalizedAirports.length}`);
            return normalizedAirports;
        } catch (error) {
            console.error('Error cargando aeropuertos:', error);
            throw new Error(`Error cargando aeropuertos ${error.message}`);
        }
    },

    normalizeAirports(airportsData){
        if (!airportsData) {
            console.warn('No se recibieron datos de aeropuertos para normalizar')
            return []
        }

        let airports = [];
        
        if (Array.isArray(airportsData)) {
            airports = airportsData;
        } else if (airportsData.data && Array.isArray(airportsData.data)) {
            airports = airportsData.data;
        } else if (airportsData.airports && Array.isArray(airportsData.airports)) {
            airports = airportsData.airports;
        } else if (airportsData.places && Array.isArray(airportsData.places)) {
            airports = airportsData.places;
        } else {
            console.warn('⚠️ Estructura de respuesta inesperada:', airportsData);
            return [];
        }
        console.log(`📊 Estructura detectada: ${airports.length} aeropuertos encontrados`);
        const normalized = airports.map((airport, index) => {
            if (index < 3) { 
                console.log(`�� Aeropuerto ${index} estructura:`, airport);
            }
            return {
                id: airport?.entityId || airport?.skyId || airport?.id || `airport_${index}`,
                name: airport?.presentation?.title || airport?.name || airport?.iata || `Aeropuerto ${index}`,
                skyId: airport?.skyId || airport?.navigation?.relevantFlightParams?.skyId || '',
                entityId: airport?.entityId || airport?.navigation?.entityId || '',
                iata: airport?.iata || airport?.navigation?.relevantFlightParams?.context?.iataCode || '',
                country: airport?.country || airport?.presentation?.subtitle || '',
                city: airport?.city || airport?.presentation?.title?.split(',')[0] || '',
                type: airport?.type || 'airport'
            };
        });

        const uniqueAirports = normalized.filter((airport, index, self) => 
            airport.entityId && index === self.findIndex(a => a.entityId === airport.entityId)
        );

        console.log(`✅ Aeropuertos únicos después de deduplicación: ${uniqueAirports.length}`);
        return uniqueAirports;
    }, */
    
    // autodetect type trip flights
    async searchFlights(searchParams) {
        const params = this.buildFlightParams(searchParams)
        // SIMULACIÓN: Respuesta de mock para vuelos
        console.log(' Búsqueda de vuelos simulada con parámetros:', params);
        console.log('✅ Resultados de vuelos simulados:', mockFlightResults);
        
        return mockFlightResults;
        // REAL: Solicitud a la API
        /* return apiClient.get('/api/v1/searchFlights', params) */
    },
}