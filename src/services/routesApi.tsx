export interface SearchRouteParams {
  userLocation: string;
  userLatitude: number;
  userLongitude: number;
  destination: string;
  destinationLatitude: number;
  destinationLongitude: number;
}

export async function fetchRoutes(searchParams: SearchRouteParams) {
  
  const response = await fetch(
    "http://transguideapi.runasp.net/api/Location/SearchRoutes?pageIndex=1&pageSize=10",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({searchParams}),
    },
  );
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "مشكلة في تحميل الطرق");
  }
  
  const data = await response.json();
  console.log(data);
  
  return data;
}
