export interface GoogleTrendsSerpResponse {
    interest_over_time: {
        timeline_data: InterestOverTimeLine[],
    } 
    search_metadata?: object,
    search_parameters?: object
}

export interface InterestOverTimeLine {
    date: string,
    timestamp: string,
    values: [{
        query: string,
        value: string,
        extracted_value: number
    }],
    extracted_value: number
}