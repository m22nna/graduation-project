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

export async function fetchRoutes(searchParams: SearchRouteParams, token: string | null) {
    const response = await fetch(
        "http://transguideapi.runasp.net/api/Location/SearchRoutes?pageIndex=1&pageSize=10",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(searchParams),
        },
    );

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
            errorData._errormessage ||
                errorData.message ||
                "مشكلة في تحميل الطرق",
        );
    }

    const data = await response.json();
    console.log(data);

    return data;
}
