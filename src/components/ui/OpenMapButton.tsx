import { MapPin } from "lucide-react";
import LoadingSpinner from "../LoadingSpinner";
import toast from "react-hot-toast";
import { reverseGeocoding } from "../../services/reverseGeocoding";
import React from "react";
type NominatimResult = {
  lat: string;
  lon: string;
  display_name: string;
  address?: {
    city?: string;
    town?: string;
    suburb?: string;
  };
};

type Coordinates = {
  lat: number;
  lng: number;
  accuracy?: number;
};

type OpenMapButtonProps = {
  from: string;
  to: string;
  userCoords: Coordinates | null;
  disabled: boolean;
  isLoading: boolean;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchRouteParams | null>>;
};

interface SearchRouteParams {
  userLocation: string;
  userLatitude: number;
  userLongitude: number;
  destination: string;
  destinationLatitude: number;
  destinationLongitude: number;
}

export default function OpenMapButton({
  from,
  to,
  userCoords,
  disabled,
  isLoading,
  setSearchParams,
}: OpenMapButtonProps) {
  const loading = isLoading || disabled;

  // Haversine formula لحساب المسافة الدقيقة
  function haversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) {
    const R = 6371; // نصف قطر الأرض بالكيلومتر
    const toRad = (x: number) => (x * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // المسافة بالكيلومتر
  }

  // فلترة واختيار أقرب محطة
  function getClosestResult(
    results: NominatimResult[],
    userCoords: Coordinates,
    cityName?: string,
  ): NominatimResult | null {
    // 1. لو مفيش نتائج رجعت من السيرفر أصلاً
    if (!results || results.length === 0) {
      toast.error("Sorry, no stations found for the specified location.");
      return null;
    }

    // 2. الفلترة الصارمة داخل المدينة (أو الحي)
    const filtered = cityName
      ? results.filter(
          (r) =>
            r.address?.city === cityName ||
            r.address?.town === cityName ||
            r.address?.suburb === cityName,
        )
      : results;

    // 3. لو ملقاش نتائج "داخل المدينة" تحديداً، يطلع إيرور ويرجع null
    if (filtered.length === 0) {
      toast.error("Sorry, no stations found for the specified location.");
      return null;
    }

    // 4. لو لقى نتائج، يبدأ يحسب الأقرب جغرافياً من النتائج المفلترة فقط
    let closest = filtered[0];
    let minDist = Infinity;

    filtered.forEach((item) => {
      const lat = parseFloat(item.lat);
      const lon = parseFloat(item.lon);
      const dist = haversineDistance(userCoords.lat, userCoords.lng, lat, lon);

      if (dist < minDist) {
        minDist = dist;
        closest = item;
      }
    });

    return closest;
  }

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!from || !userCoords) return;

    try {
      // جلب كل المحطات بنفس الاسم مع التفاصيل
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          from,
        )}&format=json&addressdetails=1`,
      );
      const data: NominatimResult[] = await res.json();
      console.log("fdgdrgtsh", { data });

      // نحاول نعرف المدينة/الحي من بيانات الـ user أو أول نتيجة
      const cityName =
        data[0]?.address?.city ||
        data[0]?.address?.town ||
        data[0]?.address?.suburb;

      // نجيب أقرب محطة بعد الفلترة
      const closest = getClosestResult(data, userCoords, cityName);

      if (!closest) {
        console.error("No destination found");
        return;
      }

      openGoogleMaps(userCoords, closest);
    } catch (err) {
      console.error("Error fetching destination:", err);
    }
  }

  //////////////
  async function handleSearch() {
    const posCoords = await reverseGeocoding(from);
    const distCoords = await reverseGeocoding(to);

    console.log({
      userLocation: from,
      userLatitude: posCoords?.lat || 0,
      userLongitude: posCoords?.lon || 0,
      destination: to,
      destinationLatitude: distCoords?.lat || 0,
      destinationLongitude: distCoords?.lon || 0,
    }, from, to);

    setSearchParams({
      userLocation: from,
      userLatitude: posCoords?.lat || 0,
      userLongitude: posCoords?.lon || 0,
      destination: to,
      destinationLatitude: distCoords?.lat || 0,
      destinationLongitude: distCoords?.lon || 0,
    });
  }

  function openGoogleMaps(
    userCoords: Coordinates,
    destCoords: { lat: string; lon: string },
  ) {
    const origin = `${userCoords.lat},${userCoords.lng}`;
    const destination = `${parseFloat(destCoords.lat)},${parseFloat(
      destCoords.lon,
    )}`;

    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
    window.open(url, "_blank");
  }

  return (
    <div className="flex flex-row items-center justify-center gap-4 mt-10">
      <button
        onClick={handleSearch}
        disabled={loading}
        className="
      flex items-center justify-center gap-2 
      bg-green-600 hover:bg-green-700 active:bg-green-800
      text-white font-semibold
      px-2 py-2 rounded-xl
      shadow-md hover:shadow-lg
      transition-all duration-300 text-[10px] sm:text-base
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600
    "
      >
        🔍
        <span>
          {isLoading === true ? (
            <div className="flex gap-2">
              <LoadingSpinner /> <p>Loading...</p>
            </div>
          ) : (
            "Search"
          )}
        </span>
      </button>

      <button
        onClick={handleClick}
        disabled={loading}
        className="
      flex items-center justify-center gap-2 w-
      bg-green-600 hover:bg-green-700 active:bg-green-800
      text-white font-semibold
      px-2 py-2 rounded-xl
      shadow-md hover:shadow-lg
      transition-all duration-300 text-[10px] sm:text-base
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600
    "
      >
        <MapPin className="w-4 h-4 text-white" />
        {isLoading === true ? (
          <>
            <LoadingSpinner /> <p>Loading...</p>
          </>
        ) : (
          "Open In Google Maps"
        )}
      </button>
    </div>
  );
}
