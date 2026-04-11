import toast from "react-hot-toast";

export async function reverseGeocoding(cityName) {
  if (!cityName) return null;

  // تنظيف النص من الكلمات اللي بتعمل "شوشرة" على الـ API
  const cleanCityName = cityName
    .replace(/ بال/g, " ")
    .replace(/ في /g, " ")
    .trim();

  try {
    const res = await fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(cleanCityName)}&limit=1`,
    );

    const data = await res.json();

    if (data && data.features && data.features.length > 0) {
      const [lon, lat] = data.features[0].geometry.coordinates;

      return {
        lat: lat, // بنرجعهم بالشكل اللي الكود بتاعك متعود عليه
        lon: lon,
      };
    }

    console.warn("⚠️ مفيش نتائج لـ:", cleanCityName);
    return null;
  } catch (err) {
    toast.error("Could not find the city");
    return null;
  }
}
