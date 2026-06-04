/**
 * Helper to dynamically load external scripts via CDN.
 */
export const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // If the script is already loaded, resolve immediately
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
};

/**
 * Loads all MediaPipe scripts required for hand landmark tracking.
 */
export const loadMediaPipe = async (): Promise<void> => {
  try {
    // MediaPipe hands depends on camera_utils, so load camera_utils first, then hands
    await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js");
    await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js");
    console.log("MediaPipe Hands loaded successfully from CDN.");
  } catch (error) {
    console.error("Error loading MediaPipe from CDN:", error);
    throw error;
  }
};
