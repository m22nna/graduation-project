import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

// We use relative pathing to route through Vite proxy and bypass browser CORS during development
const HUB_URL = "/signHub";

let connection: HubConnection | null = null;

export const signLanguageHub = {
  /**
   * Initializes and starts the SignalR hub connection.
   */
  startConnection: async (token?: string): Promise<HubConnection | null> => {
    if (connection && connection.state === "Connected") {
      return connection;
    }

    try {
      const builder = new HubConnectionBuilder()
        .withUrl(HUB_URL, {
          accessTokenFactory: token ? () => token : undefined,
        })
        .configureLogging(LogLevel.Warning)
        .withAutomaticReconnect();

      connection = builder.build();

      await connection.start();
      console.log("SignalR Connection established successfully.");
      return connection;
    } catch (err) {
      console.warn("SignalR connection failed (will fallback to direct UI):", err);
      connection = null;
      return null;
    }
  },

  /**
   * Disconnects and cleans up the active hub connection.
   */
  stopConnection: async (): Promise<void> => {
    if (!connection) return;

    try {
      if (connection.state !== "Disconnected") {
        await connection.stop();
        console.log("SignalR Connection stopped.");
      }
    } catch (err) {
      console.error("Error stopping SignalR connection:", err);
    } finally {
      connection = null;
    }
  },

  /**
   * Invokes a hub method to notify the backend/other clients of a new predicted sign.
   */
  sendPrediction: async (sessionId: string, predictedChar: string): Promise<void> => {
    if (!connection || connection.state !== "Connected") {
      console.debug("SignalR not connected. Skipping prediction sync.");
      return;
    }

    try {
      // Try standard hubs methods that graduation projects typically use
      await connection.invoke("SendPrediction", sessionId, predictedChar);
    } catch (err) {
      console.warn("Invoke 'SendPrediction' failed, trying fallback 'SendResult':", err);
      try {
        await connection.invoke("SendResult", sessionId, predictedChar);
      } catch (errFallback) {
        console.warn("Fallback invoke failed too. Real-time broadcast disabled.", errFallback);
      }
    }
  },

  /**
   * Registers a listener for predictions broadcast from the backend (if any).
   */
  onReceivePrediction: (callback: (char: string) => void): (() => void) => {
    if (!connection) return () => {};

    const handler = (char: string) => {
      callback(char);
    };

    connection.on("ReceivePrediction", handler);
    connection.on("ReceiveResult", handler);

    return () => {
      if (connection) {
        connection.off("ReceivePrediction", handler);
        connection.off("ReceiveResult", handler);
      }
    };
  },
};

export default signLanguageHub;


