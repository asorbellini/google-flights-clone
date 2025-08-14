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

    
    // autodetect type trip flights
    async searchFlights(searchParams) {
        const params = this.buildFlightParams(searchParams)
        // SIMULACIÓN: Respuesta de mock para vuelos
        console.log(' Búsqueda de vuelos simulada con parámetros:', params);
        console.log('✅ Resultados de vuelos simulados:', mockFlightResults);
        // REAL: Solicitud a la API
        // const results = apiClient.get('/api/v1/searchFlights', params)
        
        let filteredResults = { ...mockFlightResults }; //{...results}
    
        if (params.returnDate) {
            filteredResults.data.itineraries = mockFlightResults.data.itineraries.filter(
            itinerary => itinerary.legs && itinerary.legs.length === 2)
        } else {
            filteredResults.data.itineraries = mockFlightResults.data.itineraries.filter(
                itinerary => itinerary.legs && itinerary.legs.length === 1)
        }
        return filteredResults;
        
    },
}