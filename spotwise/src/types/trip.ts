export interface PointOfInterest {
    name: string;
    category: string;
    reviewCount: number;
    rating: number;
    latitude: number;
    longitude: number;
    visitDuration: number;
}

interface DayData {
    pointsOfInterest: PointOfInterest[];
    totalDistance: number;
    totalTime: number;
}

export interface TripDay {
    day: string;
    dayData: DayData;
}

export interface TripResponse {
    days: TripDay[];
}
