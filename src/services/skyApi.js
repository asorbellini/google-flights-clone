import { apiClient } from "./apiClient";
import { mockFlightResults, searchAirportsMock } from "./mockData";

export const skyApi = {
    async searchPlaces(query) {
        if (!query || query.length < 2) return []
        
        // REAL: Solicitud a la API
        try {
            console.log(`🔍 Búsqueda real en API para: "${query}"`);
            const data = await apiClient.get('/api/v1/flights/searchAirport', {query})
            const items = data?.data || []
            return items;
        } catch (error) {
            console.error('❌ Error en searchPlaces:', error);
            return [];
        }
        
        // SIMULACIÓN
        /* try {
            console.log(`🔍 Búsqueda simulada con debounce para: "${query}"`);
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
        } */
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

    // autodetect type trip flights
    async searchFlights(searchParams) {
        const params = this.buildFlightParams(searchParams)
        
        // REAL: Solicitud a la API
        try {
            console.log('🚀 Búsqueda real de vuelos con parámetros:', params);
            const results = await apiClient.get('/api/v1/flights/searchFlights', params);
            if (!results?.data?.itineraries) {
                console.warn('⚠️ La API no retornó itinerarios:', results);
                return {
                    status: false,
                    message: 'No se encontraron vuelos disponibles',
                    data: { itineraries: [] }
                };
            }
            // Filtrar por tipo de viaje si es necesario
            let filteredResults = { ...results };
            
            if (params.returnDate) {
                // Vuelo de ida y vuelta: mostrar vuelos con 2 legs
                filteredResults.data.itineraries = results.data.itineraries.filter(
                    itinerary => itinerary.legs && itinerary.legs.length === 2
                );
            } else {
                // Vuelo solo ida: mostrar vuelos con 1 leg
                filteredResults.data.itineraries = results.data.itineraries.filter(
                    itinerary => itinerary.legs && itinerary.legs.length === 1
                );
            }
            
            return filteredResults;
        } catch (error) {
            console.error('❌ Error en searchFlights:', error);
            throw error;
        }
        
        // SIMULACIÓN 
        /*console.log(' Búsqueda de vuelos simulada con parámetros:', params);
        console.log('✅ Resultados de vuelos simulados:', mockFlightResults);
        
        let filteredResults = { ...mockFlightResults };
    
        if (params.returnDate) {
            filteredResults.data.itineraries = mockFlightResults.data.itineraries.filter(
            itinerary => itinerary.legs && itinerary.legs.length === 2)
        } else {
            filteredResults.data.itineraries = mockFlightResults.data.itineraries.filter(
                itinerary => itinerary.legs && itinerary.legs.length === 1)
        }
        return filteredResults; */
    },
}