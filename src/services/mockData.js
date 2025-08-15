// Simulación de datos basados en estructura Sky Scrapper API 

// Resultados de aeropuertos 
export const mockAirports = {
    status:true,
    timestamp:1691008938320,
    data:[
        {
            presentation: {
                title:"New York",
                suggestionTitle:"New York (Any)",
                subtitle:"United States"
            },
            navigation: {
                entityId:"27537542",
                entityType:"CITY",
                localizedName:"New York",
                relevantFlightParams: {
                    skyId:"NYCA",
                    entityId:"27537542",
                    flightPlaceType:"CITY",
                    localizedName:"New York"
                },
                relevantHotelParams:{
                    entityId:"27537542",
                    entityType:"CITY",
                    localizedName:"New York"
                }
            }
        },
        {
            presentation: {
                title: "New York Newark",
                suggestionTitle: "New York Newark (EWR)",
                subtitle: "United States"
            },
            navigation: {
                entityId: "95565059",
                entityType: "AIRPORT",
                localizedName: "New York Newark",
                relevantFlightParams: {
                    skyId: "EWR",
                    entityId: "95565059",
                    flightPlaceType: "AIRPORT",
                    localizedName: "New York Newark"
                },
                relevantHotelParams: {
                    entityId: "27537542",
                    entityType: "CITY",
                    localizedName: "New York"
                }
            }
        },
        {
            presentation: {
                title: "New York John F. Kennedy",
                suggestionTitle: "New York John F. Kennedy (JFK)",
                subtitle: "United States"
            },
            navigation: {
                entityId: "95565058",
                entityType: "AIRPORT",
                localizedName: "New York John F. Kennedy",
                relevantFlightParams: {
                    skyId: "JFK",
                    entityId: "95565058",
                    flightPlaceType: "AIRPORT",
                    localizedName: "New York John F. Kennedy"
                },
                relevantHotelParams: {
                    entityId: "27537542",
                    entityType: "CITY",
                    localizedName: "New York"
                }
            }
        },
        {
            presentation: {
                title: "New York LaGuardia",
                suggestionTitle: "New York LaGuardia (LGA)",
                subtitle: "United States"
            },
            navigation: {
                entityId: "95565057",
                entityType: "AIRPORT",
                localizedName: "New York LaGuardia",
                relevantFlightParams: {
                    skyId: "LGA",
                    entityId: "95565057",
                    flightPlaceType: "AIRPORT",
                    localizedName: "New York LaGuardia"
                },
                relevantHotelParams: {
                    entityId: "27537542",
                    entityType: "CITY",
                    localizedName: "New York"
                }
            }
        },
        {
            presentation: {
                title: "Stewart International",
                suggestionTitle: "Stewart International (SWF)",
                subtitle: "United States"
            },
            navigation: {
                entityId: "95566280",
                entityType: "AIRPORT",
                localizedName: "Stewart International",
                relevantFlightParams: {
                    skyId: "SWF",
                    entityId: "95566280",
                    flightPlaceType: "AIRPORT",
                    localizedName: "Stewart International"
                },
                relevantHotelParams: {
                    entityId: "27537542",
                    entityType: "CITY",
                    localizedName: "New York"
                }
            }
        }
    ]
}

//simulación búsqueda con debounce
export const searchAirportsMock = (query) => {
    if (!query || query.length < 2) return [];
    
    const searchTerm = query.toLowerCase();

    if (!mockAirports?.data || !Array.isArray(mockAirports.data)) {
        console.warn('⚠️ mockAirports.data no es válido:', mockAirports);
        return [];
    }

    const filtered = mockAirports?.data.filter(place => 
        place?.presentation?.title?.toLowerCase().includes(searchTerm) ||
        place?.presentation?.subtitle?.toLowerCase().includes(searchTerm) ||
        place?.presentation?.suggestionTitle?.toLowerCase().includes(searchTerm)
    );
    return filtered || []
};

// Simulación de datos de vuelos
export const mockFlightResults = {
    status:true,
    timestamp:1691008981566,
    sessionId:"xxxxxxxxx",
    data: {
        context:{
            status:"incomplete",
            totalResults:3
        },
        itineraries:[
            {
                id:"13542-2402201235--30598-0-12712-2402201550|12712-2402221810--30598-0-13542-2402230600",
                price:{
                    raw:419.18,
                    formatted:"$420"
                },
                legs:[
                    {
                        id:"13542-2402201235--30598-0-12712-2402201550",
                        origin:{
                            id:"LGW",
                            name:"London Gatwick",
                            displayCode:"LGW",
                            city:"London",
                            isHighlighted:false
                        },
                        destination:{
                            id:"JFK",
                            name:"New York John F. Kennedy",
                            displayCode:"JFK",
                            city:"New York",
                            isHighlighted:false
                        },
                        durationInMinutes:495,
                        stopCount:0,
                        isSmallestStops:false,
                        departure:"2024-02-20T12:35:00",
                        arrival:"2024-02-20T15:50:00",
                        timeDeltaInDays:0,
                        carriers:{
                            marketing:[
                                {
                                    id:-30598,
                                    logoUrl:"https://logos.skyscnr.com/images/airlines/favicon/I%29.png",
                                    name:"Norse Atlantic Airways (UK)"
                                }
                            ],
                            operationType:"fully_operated"
                        },
                        segments:[
                            {
                                id:"13542-12712-2402201235-2402201550--30598",
                                origin:{
                                    flightPlaceId:"LGW",
                                    displayCode:"LGW",
                                    parent:{
                                        flightPlaceId:"LOND",
                                        displayCode:"LON",
                                        name:"London",
                                        type:"City"
                                    },
                                    name:"London Gatwick",
                                    type:"Airport"
                                },
                                destination:{
                                    flightPlaceId:"JFK",
                                    displayCode:"JFK",
                                    parent:{
                                        flightPlaceId:"NYCA",
                                        displayCode:"NYC",
                                        name:"New York",
                                        type:"City"
                                    },
                                    name:"New York John F. Kennedy",
                                    type:"Airport"
                                },
                                departure:"2024-02-20T12:35:00",
                                arrival:"2024-02-20T15:50:00",
                                durationInMinutes:495,
                                flightNumber:"701",
                                marketingCarrier:{
                                    id:-30598,
                                    name:"Norse Atlantic Airways (UK)",
                                    alternateId:"I)",
                                    allianceId:0
                                },
                                operatingCarrier:{
                                    id:-30598,
                                    name:"Norse Atlantic Airways (UK)",
                                    alternateId:"I)",
                                    allianceId:0
                                }
                            }
                        ]
                    },
                    {
                        id:"12712-2402221810--30598-0-13542-2402230600",
                        origin:{
                            id:"JFK",
                            name:"New York John F. Kennedy",
                            displayCode:"JFK",
                            city:"New York",
                            isHighlighted:false
                        },
                        destination:{
                            id:"LGW",
                            name:"London Gatwick",
                            displayCode:"LGW",
                            city:"London",
                            isHighlighted:false
                        },
                        durationInMinutes:410,
                        stopCount:0,
                        isSmallestStops:false,
                        departure:"2024-02-22T18:10:00",
                        arrival:"2024-02-23T06:00:00",
                        timeDeltaInDays:1,
                        carriers:{
                            marketing:[
                                {
                                    id:-30598,
                                    logoUrl:"https://logos.skyscnr.com/images/airlines/favicon/I%29.png",
                                    name:"Norse Atlantic Airways (UK)"
                                }
                            ],
                            operationType:"fully_operated"
                        },
                        segments:[
                            {
                                id:"12712-13542-2402221810-2402230600--30598",
                                origin:{
                                    flightPlaceId:"JFK",
                                    displayCode:"JFK",
                                    parent:{
                                        flightPlaceId:"NYCA",
                                        displayCode:"NYC",
                                        name:"New York",
                                        type:"City"
                                    },
                                    name:"New York John F. Kennedy",
                                    type:"Airport"
                                },
                                destination:{
                                    flightPlaceId:"LGW",
                                    displayCode:"LGW",
                                    parent:{
                                        flightPlaceId:"LOND",
                                        displayCode:"LON",
                                        name:"London",
                                        type:"City"
                                    },
                                    name:"London Gatwick",
                                    type:"Airport"
                                },
                                departure:"2024-02-22T18:10:00",
                                arrival:"2024-02-23T06:00:00",
                                durationInMinutes:410,
                                flightNumber:"702",
                                marketingCarrier:{
                                    id:-30598,
                                    name:"Norse Atlantic Airways (UK)",
                                    alternateId:"I)",
                                    allianceId:0
                                },
                                operatingCarrier:{
                                    id:-30598,
                                    name:"Norse Atlantic Airways (UK)",
                                    alternateId:"I)",
                                    allianceId:0
                                }
                            }
                        ]
                    },
                    {
                        id:"12712-2402221810--30598-0-13542-2402230600",
                        origin:{
                            id:"JFK",
                            name:"New York John F. Kennedy",
                            displayCode:"JFK",
                            city:"New York",
                            isHighlighted:false
                        },
                        destination:{
                            id:"LGW",
                            name:"London Gatwick",
                            displayCode:"LGW",
                            city:"London",
                            isHighlighted:false
                        },
                        durationInMinutes:410,
                        stopCount:0,
                        isSmallestStops:false,
                        departure:"2024-02-22T18:10:00",
                        arrival:"2024-02-23T06:00:00",
                        timeDeltaInDays:1,
                        carriers:{
                            marketing:[
                                {
                                    id:-30598,
                                    logoUrl:"https://logos.skyscnr.com/images/airlines/favicon/I%29.png",
                                    name:"Norse Atlantic Airways (UK)"
                                }
                            ],
                            operationType:"fully_operated"
                        },
                        segments:[
                            {
                                id:"2402230600--30598",
                                origin:{
                                    flightPlaceId:"SWF",
                                    displayCode:"SWF",
                                    parent:{
                                        flightPlaceId:"NYCA",
                                        displayCode:"NYC",
                                        name:"New York",
                                        type:"City"
                                    },
                                    name:"New York John F. Kennedy",
                                    type:"Airport"
                                },
                                destination:{
                                    flightPlaceId:"SWF",
                                    displayCode:"SWF",
                                    parent:{
                                        flightPlaceId:"SWF",
                                        displayCode:"SWF",
                                        name:"Stewart International",
                                        type:"City"
                                    },
                                    name:"Stewart International",
                                    type:"Airport"
                                },
                                departure:"2024-02-22T18:10:00",
                                arrival:"2024-02-23T06:00:00",
                                durationInMinutes:410,
                                flightNumber:"702",
                                marketingCarrier:{
                                    id:-30598,
                                    name:"Norse Atlantic Airways (UK)",
                                    alternateId:"I)",
                                    allianceId:0
                                },
                                operatingCarrier:{
                                    id:-30598,
                                    name:"Norse Atlantic Airways (UK)",
                                    alternateId:"I)",
                                    allianceId:0
                                }
                            }
                        ]
                    }
                ],
                isSelfTransfer:false,
                isProtectedSelfTransfer:false,
                farePolicy:{
                    isChangeAllowed:false,
                    isPartiallyChangeable:false,
                    isCancellationAllowed:false,
                    isPartiallyRefundable:false
                },
                tags:["cheapest","shortest"],
                isMashUp:false,
                hasFlexibleOptions:false,
                score:0.998502
            },
            {
                id:"13542-2402201235--30598-0-12712-2402201550|12712-2402221810--30598-0-13542-2402230600",
                price:{
                    raw:419.18,
                    formatted:"$420"
                },
                legs:[
                    {
                        id:"13542-2402201235--30598-0-12712-2402201550",
                        origin:{
                            id:"LGW",
                            name:"London Gatwick",
                            displayCode:"LGW",
                            city:"London",
                            isHighlighted:false
                        },
                        destination:{
                            id:"JFK",
                            name:"New York John F. Kennedy",
                            displayCode:"JFK",
                            city:"New York",
                            isHighlighted:false
                        },
                        durationInMinutes:495,
                        stopCount:0,
                        isSmallestStops:false,
                        departure:"2024-02-20T12:35:00",
                        arrival:"2024-02-20T15:50:00",
                        timeDeltaInDays:0,
                        carriers:{
                            marketing:[
                                {
                                    id:-30598,
                                    logoUrl:"https://logos.skyscnr.com/images/airlines/favicon/I%29.png",
                                    name:"Norse Atlantic Airways (UK)"
                                }
                            ],
                            operationType:"fully_operated"
                        },
                        segments:[
                            {
                                id:"13542-12712-2402201235-2402201550--30598",
                                origin:{
                                    flightPlaceId:"LGW",
                                    displayCode:"LGW",
                                    parent:{
                                        flightPlaceId:"LOND",
                                        displayCode:"LON",
                                        name:"London",
                                        type:"City"
                                    },
                                    name:"London Gatwick",
                                    type:"Airport"
                                },
                                destination:{
                                    flightPlaceId:"JFK",
                                    displayCode:"JFK",
                                    parent:{
                                        flightPlaceId:"NYCA",
                                        displayCode:"NYC",
                                        name:"New York",
                                        type:"City"
                                    },
                                    name:"New York John F. Kennedy",
                                    type:"Airport"
                                },
                                departure:"2024-02-20T12:35:00",
                                arrival:"2024-02-20T15:50:00",
                                durationInMinutes:495,
                                flightNumber:"701",
                                marketingCarrier:{
                                    id:-30598,
                                    name:"Norse Atlantic Airways (UK)",
                                    alternateId:"I)",
                                    allianceId:0
                                },
                                operatingCarrier:{
                                    id:-30598,
                                    name:"Norse Atlantic Airways (UK)",
                                    alternateId:"I)",
                                    allianceId:0
                                }
                            }
                        ]
                    },
                    {
                        id:"12712-2402221810--30598-0-13542-2402230600",
                        origin:{
                            id:"JFK",
                            name:"New York John F. Kennedy",
                            displayCode:"JFK",
                            city:"New York",
                            isHighlighted:false
                        },
                        destination:{
                            id:"LGW",
                            name:"London Gatwick",
                            displayCode:"LGW",
                            city:"London",
                            isHighlighted:false
                        },
                        durationInMinutes:410,
                        stopCount:0,
                        isSmallestStops:false,
                        departure:"2024-02-22T18:10:00",
                        arrival:"2024-02-23T06:00:00",
                        timeDeltaInDays:1,
                        carriers:{
                            marketing:[
                                {
                                    id:-30598,
                                    logoUrl:"https://logos.skyscnr.com/images/airlines/favicon/I%29.png",
                                    name:"Norse Atlantic Airways (UK)"
                                }
                            ],
                            operationType:"fully_operated"
                        },
                        segments:[
                            {
                                id:"12712-13542-2402221810-2402230600--30598",
                                origin:{
                                    flightPlaceId:"JFK",
                                    displayCode:"JFK",
                                    parent:{
                                        flightPlaceId:"NYCA",
                                        displayCode:"NYC",
                                        name:"New York",
                                        type:"City"
                                    },
                                    name:"New York John F. Kennedy",
                                    type:"Airport"
                                },
                                destination:{
                                    flightPlaceId:"LGW",
                                    displayCode:"LGW",
                                    parent:{
                                        flightPlaceId:"LOND",
                                        displayCode:"LON",
                                        name:"London",
                                        type:"City"
                                    },
                                    name:"London Gatwick",
                                    type:"Airport"
                                },
                                departure:"2024-02-22T18:10:00",
                                arrival:"2024-02-23T06:00:00",
                                durationInMinutes:410,
                                flightNumber:"702",
                                marketingCarrier:{
                                    id:-30598,
                                    name:"Norse Atlantic Airways (UK)",
                                    alternateId:"I)",
                                    allianceId:0
                                },
                                operatingCarrier:{
                                    id:-30598,
                                    name:"Norse Atlantic Airways (UK)",
                                    alternateId:"I)",
                                    allianceId:0
                                }
                            }
                        ]
                    }
                ],
                isSelfTransfer:false,
                isProtectedSelfTransfer:false,
                farePolicy:{
                    isChangeAllowed:false,
                    isPartiallyChangeable:false,
                    isCancellationAllowed:false,
                    isPartiallyRefundable:false
                },
                tags:["cheapest","shortest"],
                isMashUp:false,
                hasFlexibleOptions:false,
                score:0.998502
            },
            {
                id:"13542-2402201235--30598-0-12712-2402201550|12712-2402221810--30598-0-13542-2402230600",
                price:{
                    raw:419.18,
                    formatted:"$420"
                },
                legs:[
                    {
                        id:"13542-2402201235--30598-0-12712-2402201550",
                        origin:{
                            id:"LGW",
                            name:"London Gatwick",
                            displayCode:"LGW",
                            city:"London",
                            isHighlighted:false
                        },
                        destination:{
                            id:"JFK",
                            name:"New York John F. Kennedy",
                            displayCode:"JFK",
                            city:"New York",
                            isHighlighted:false
                        },
                        durationInMinutes:495,
                        stopCount:0,
                        isSmallestStops:false,
                        departure:"2024-02-20T12:35:00",
                        arrival:"2024-02-20T15:50:00",
                        timeDeltaInDays:0,
                        carriers:{
                            marketing:[
                                {
                                    id:-30598,
                                    logoUrl:"https://logos.skyscnr.com/images/airlines/favicon/I%29.png",
                                    name:"Norse Atlantic Airways (UK)"
                                }
                            ],
                            operationType:"fully_operated"
                        },
                        segments:[
                            {
                                id:"13542-12712-2402201235-2402201550--30598",
                                origin:{
                                    flightPlaceId:"LGW",
                                    displayCode:"LGW",
                                    parent:{
                                        flightPlaceId:"LOND",
                                        displayCode:"LON",
                                        name:"London",
                                        type:"City"
                                    },
                                    name:"London Gatwick",
                                    type:"Airport"
                                },
                                destination:{
                                    flightPlaceId:"JFK",
                                    displayCode:"JFK",
                                    parent:{
                                        flightPlaceId:"NYCA",
                                        displayCode:"NYC",
                                        name:"New York",
                                        type:"City"
                                    },
                                    name:"New York John F. Kennedy",
                                    type:"Airport"
                                },
                                departure:"2024-02-20T12:35:00",
                                arrival:"2024-02-20T15:50:00",
                                durationInMinutes:495,
                                flightNumber:"701",
                                marketingCarrier:{
                                    id:-30598,
                                    name:"Norse Atlantic Airways (UK)",
                                    alternateId:"I)",
                                    allianceId:0
                                },
                                operatingCarrier:{
                                    id:-30598,
                                    name:"Norse Atlantic Airways (UK)",
                                    alternateId:"I)",
                                    allianceId:0
                                }
                            }
                        ]
                    },
                    {
                        id:"12712-2402221810--30598-0-13542-2402230600",
                        origin:{
                            id:"JFK",
                            name:"New York John F. Kennedy",
                            displayCode:"JFK",
                            city:"New York",
                            isHighlighted:false
                        },
                        destination:{
                            id:"LGW",
                            name:"London Gatwick",
                            displayCode:"LGW",
                            city:"London",
                            isHighlighted:false
                        },
                        durationInMinutes:410,
                        stopCount:0,
                        isSmallestStops:false,
                        departure:"2024-02-22T18:10:00",
                        arrival:"2024-02-23T06:00:00",
                        timeDeltaInDays:1,
                        carriers:{
                            marketing:[
                                {
                                    id:-30598,
                                    logoUrl:"https://logos.skyscnr.com/images/airlines/favicon/I%29.png",
                                    name:"Norse Atlantic Airways (UK)"
                                }
                            ],
                            operationType:"fully_operated"
                        },
                        segments:[
                            {
                                id:"12712-13542-2402221810-2402230600--30598",
                                origin:{
                                    flightPlaceId:"JFK",
                                    displayCode:"JFK",
                                    parent:{
                                        flightPlaceId:"NYCA",
                                        displayCode:"NYC",
                                        name:"New York",
                                        type:"City"
                                    },
                                    name:"New York John F. Kennedy",
                                    type:"Airport"
                                },
                                destination:{
                                    flightPlaceId:"LGW",
                                    displayCode:"LGW",
                                    parent:{
                                        flightPlaceId:"LOND",
                                        displayCode:"LON",
                                        name:"London",
                                        type:"City"
                                    },
                                    name:"London Gatwick",
                                    type:"Airport"
                                },
                                departure:"2024-02-22T18:10:00",
                                arrival:"2024-02-23T06:00:00",
                                durationInMinutes:410,
                                flightNumber:"702",
                                marketingCarrier:{
                                    id:-30598,
                                    name:"Norse Atlantic Airways (UK)",
                                    alternateId:"I)",
                                    allianceId:0
                                },
                                operatingCarrier:{
                                    id:-30598,
                                    name:"Norse Atlantic Airways (UK)",
                                    alternateId:"I)",
                                    allianceId:0
                                }
                            }
                        ]
                    }
                ],
                isSelfTransfer:false,
                isProtectedSelfTransfer:false,
                farePolicy:{
                    isChangeAllowed:false,
                    isPartiallyChangeable:false,
                    isCancellationAllowed:false,
                    isPartiallyRefundable:false
                },
                tags:["cheapest","shortest"],
                isMashUp:false,
                hasFlexibleOptions:false,
                score:0.998502
            },
            {
                id:"13542-24201550|12712-2402221810--30598-0-13542-2402230600",
                price:{
                    raw:419.18,
                    formatted:"$420"
                },
                legs:[
                    {
                        id:"13542-2402201235--30598-0-12712-2402201550",
                        origin:{
                            id:"LGW",
                            name:"London Gatwick",
                            displayCode:"LGW",
                            city:"London",
                            isHighlighted:false
                        },
                        destination:{
                            id:"JFK",
                            name:"New York John F. Kennedy",
                            displayCode:"JFK",
                            city:"New York",
                            isHighlighted:false
                        },
                        durationInMinutes:495,
                        stopCount:0,
                        isSmallestStops:false,
                        departure:"2024-02-20T12:35:00",
                        arrival:"2024-02-20T15:50:00",
                        timeDeltaInDays:0,
                        carriers:{
                            marketing:[
                                {
                                    id:-30598,
                                    logoUrl:"https://logos.skyscnr.com/images/airlines/favicon/I%29.png",
                                    name:"Norse Atlantic Airways (UK)"
                                }
                            ],
                            operationType:"fully_operated"
                        },
                        segments:[
                            {
                                id:"13542-12712-2402201235-2402201550--30598",
                                origin:{
                                    flightPlaceId:"LGW",
                                    displayCode:"LGW",
                                    parent:{
                                        flightPlaceId:"LOND",
                                        displayCode:"LON",
                                        name:"London",
                                        type:"City"
                                    },
                                    name:"London Gatwick",
                                    type:"Airport"
                                },
                                destination:{
                                    flightPlaceId:"JFK",
                                    displayCode:"JFK",
                                    parent:{
                                        flightPlaceId:"NYCA",
                                        displayCode:"NYC",
                                        name:"New York",
                                        type:"City"
                                    },
                                    name:"New York John F. Kennedy",
                                    type:"Airport"
                                },
                                departure:"2024-02-20T12:35:00",
                                arrival:"2024-02-20T15:50:00",
                                durationInMinutes:495,
                                flightNumber:"701",
                                marketingCarrier:{
                                    id:-30598,
                                    name:"Norse Atlantic Airways (UK)",
                                    alternateId:"I)",
                                    allianceId:0
                                },
                                operatingCarrier:{
                                    id:-30598,
                                    name:"Norse Atlantic Airways (UK)",
                                    alternateId:"I)",
                                    allianceId:0
                                }
                            }
                        ]
                    }
                ],
                isSelfTransfer:false,
                isProtectedSelfTransfer:false,
                farePolicy:{
                    isChangeAllowed:false,
                    isPartiallyChangeable:false,
                    isCancellationAllowed:false,
                    isPartiallyRefundable:false
                },
                tags:["cheapest","shortest"],
                isMashUp:false,
                hasFlexibleOptions:false,
                score:0.998502
            },
        ],
        messages:[],
        filterStats:{
            duration:{
                min:495,
                max:815
            },
            airports:[
                {
                    city:"New York",
                    airports:[
                        {
                            id:"JFK",
                            name:"New York John F. Kennedy"
                        },
                        {
                            id:"EWR",
                            name:"New York Newark"
                        }
                    ]
                },
                {
                    city:"London",
                    airports:[
                        {
                            id:"LGW",
                            name:"London Gatwick"
                        },
                        {
                            id:"LHR",
                            name:"London Heathrow"
                        }
                    ]
                }
            ],
            carriers:[
                {
                    id:-32753,
                    logoUrl:"https://logos.skyscnr.com/images/airlines/favicon/EI.png",
                    name:"Aer Lingus"
                },
                {
                    id:-30598,
                    logoUrl:"https://logos.skyscnr.com/images/airlines/favicon/I%29.png",
                    name:"Norse Atlantic Airways (UK)"
                }
            ],
            stopPrices:{
                direct:{
                    isPresent:true,
                    formattedPrice:"$420"
                },
                one:{
                    isPresent:true,
                    formattedPrice:"$528"
                },
                twoOrMore:{
                    isPresent:false
                }
            }
        }
    },
};