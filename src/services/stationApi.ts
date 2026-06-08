import axios from "axios";

const BASE_URL = "https://transguideapi.runasp.net/api/AdminDashboard";

export interface Station {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export interface CreateStationInput {
  name: string;
  latitude: number;
  longitude: number;
}

/**
 * Create a new station
 */
export async function createStation(input: CreateStationInput, token: string) {
  const response = await axios.post(`${BASE_URL}/CreateStation`, input, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

/**
 * Update an existing station
 */
export async function updateStation(station: Station, token: string) {
  const response = await axios.put(`${BASE_URL}/UpdateStation`, station, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

/**
 * Delete station by ID
 */
export async function deleteStation(id: number, token: string) {
  const response = await axios.delete(`${BASE_URL}/DeleteStation`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { id },
  });
  return response.data;
}

/**
 * Get station by ID
 */
export async function fetchStationById(id: string, token: string) {
  const response = await axios.get(`${BASE_URL}/GetStation/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

/**
 * Get all stations with pagination and search
 */
export async function fetchAllStations(
  pageIndex: number,
  pageSize: number,
  search: string,
  token: string
) {
  const response = await axios.get(`${BASE_URL}/GetAllStations`, {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      pageIndex,
      pageSize,
      search: search || undefined,
    },
  });
  return response.data;
}
