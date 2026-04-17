import axios from "axios";

const BASE_URL = "http://transguideapi.runasp.net/api/History";

export async function fetchHistory(token: string) {
  try {
    const response = await axios.get(`${BASE_URL}/MyHistory`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Array.isArray(response.data) ? response.data : response.data?.trips ?? [];
  } catch (error: any) {
    // [FIX] Handle 404 as empty history
    if (error?.response?.status === 404) {
      return [];
    }
    throw error;
  }
}

export async function deleteTrip(tripId: string, userId: string, token: string) {
  const response = await axios.delete(`${BASE_URL}/DeleteTrip`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      tripId: tripId,
      userId: userId,
    },
  });
  return response.data;
}

/**
 * [MODIFIED] Added function to clear all search history
 */
export async function deleteAllHistory(userId: string, token: string) {
  // [IMPORTANT] Reverted to the EXACT misspelled endpoint and structure confirmed via Swagger: DeleteHisrory{userId}
  const response = await axios.delete(`${BASE_URL}/DeleteHisrory${userId}`, { // [MODIFIED] Final fix using server's specific naming convention
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
