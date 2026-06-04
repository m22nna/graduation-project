import axios from "axios";

const BASE_URL = "https://transguideapi.runasp.net/api/AdminDashboard";

export interface Route {
  id: number;
  name: string;
  startPoint: string;
  endPoint: string;
  region: string;
  description: string;
  ticketPrice: number;
  averageTimeInMinutes: number;
  routeStatusId: number;
}

export interface CreateRouteInput {
  name: string;
  startPoint: string;
  endPoint: string;
  region: string;
  description: string;
  ticketPrice: number;
  averageTimeInMinutes: number;
  routeStatusId: number;
}

/**
 * Get all routes (paginated)
 */
export async function fetchAllRoutes(pageIndex: number, pageSize: number, token: string) {
  const response = await axios.get(`${BASE_URL}/GetAllRoutes`, {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      pageIndex,
      pageSize,
    },
  });
  return response.data;
}

/**
 * Get route by ID
 */
export async function fetchRouteById(id: string, token: string) {
  const response = await axios.get(`${BASE_URL}/GetRoute/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

/**
 * Create a new route
 */
export async function createRoute(input: CreateRouteInput, token: string) {
  const response = await axios.post(`${BASE_URL}/CreateRoute`, input, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

/**
 * Update an existing route
 */
export async function updateRoute(route: Route, token: string) {
  const response = await axios.post(`${BASE_URL}/UpdateRoute`, route, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

/**
 * Update route status
 */
export async function updateRouteStatus(id: number, status: number, token: string) {
  const response = await axios.patch(
    `${BASE_URL}/UpdateRouteStatus`,
    null,
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { id, status },
    }
  );
  return response.data;
}

/**
 * Delete a route by ID
 */
export async function deleteRoute(id: number, token: string) {
  const response = await axios.delete(`${BASE_URL}/DeleteRoute`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { id },
  });
  return response.data;
}
