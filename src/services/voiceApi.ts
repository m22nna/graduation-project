import { convertToWav } from "@/utils/audioUtils";

export async function sendVoiceSearch(audioBlob: Blob): Promise<any> {
  const formData = new FormData();
  
  // The AI backend strictly requires a true PCM .wav file.
  // We use the AudioContext utility to convert the browser's webm/mp4 blob into a real WAV.
  const trueWavBlob = await convertToWav(audioBlob);
  
  formData.append("file", trueWavBlob, "recording.wav");

  const response = await fetch("https://transguideapi.runasp.net/api/Voice/SendVoice", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData._errormessage ||
      errorData.message ||
      "حدث خطأ أثناء معالجة الصوت، حاول مرة أخرى."
    );
  }

  return response.json();
}
