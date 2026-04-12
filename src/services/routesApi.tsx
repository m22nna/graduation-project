import axios from "axios";

export interface SearchRouteParams {
    userLocation: string;
    userLatitude: number;
    userLongitude: number;
    destination: string;
    destinationLatitude: number;
    destinationLongitude: number;
}

export interface RouteDetail {
    routeName: string;
    averageTimeInMinutes: number;
    ticketPrice: number;
    [key: string]: any;
}

export interface TransGuideRoute {
    routeName: string;
    routeType: string;
    closestStationName: string;
    transferStations: string[];
    routeDetails: RouteDetail[];
    [key: string]: any;
}

export async function fetchRoutes(searchParams: SearchRouteParams) {
    try {
        const { data } = await axios.post(
            "https://transguideapi.runasp.net/api/Location/SearchRoutes?pageIndex=1&pageSize=10",
            searchParams
        );
        console.log(data);
        return data;
    } catch (error: any) {
        const errorData = error.response?.data || {};
        throw new Error(
            errorData._errormessage ||
                errorData.message ||
                error.message ||
                "مشكلة في تحميل الطرق"
        );
    }
}
