import axios from "axios";

// We use relative pathing to route through Vite proxy and bypass browser CORS during development
const BASE_URL = "";
const DETECTOR_URL = "https://amr-yasserr-arsl-fingerspelling-detector.hf.space/api/v1/recognize";

export interface RecognizeResponse {
  prediction?: string;
  predicted_char?: string;
  confidence?: number;
}

export interface SessionResponse {
  sessionId: string;
}

export const signLanguageApi = {
  /**
   * Creates a new translation session on the backend.
   * @param token Authentication token of the user
   */
  createSession: async (token?: string): Promise<SessionResponse> => {
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await axios.post<SessionResponse>(
      `${BASE_URL}/api/Sign/create`,
      {},
      { headers }
    );
    return response.data;
  },

  /**
   * Sends hand coordinates/landmarks to the fingerspelling AI model.
   * @param sessionId Current active session ID
   * @param landmarks Array of 63 floats (21 x,y,z coordinates)
   */
  recognizeLandmarks: async (
    sessionId: string,
    landmarks: number[]
  ): Promise<RecognizeResponse> => {
    const response = await axios.post<RecognizeResponse>(
      DETECTOR_URL,
      {
        session_id: sessionId,
        landmarks: landmarks,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  /**
   * Closes the active session on the backend.
   * @param sessionId Active session ID
   * @param token Authentication token of the user
   */
  endSession: async (sessionId: string, token?: string): Promise<void> => {
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    await axios.post(
      `${BASE_URL}/api/Sign/end/${sessionId}`,
      {},
      { headers }
    );
  },
};
export default signLanguageApi;
