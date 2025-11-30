// import { MapPin } from "lucide-react";
// import { useState } from "react";

// // useEffect(function () {
// //     async function getCoordsFromAddress(address = "محطة رمسيس") {
// //         const res = await fetch(
// //             `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
// //                 address
// //             )}&format=json`
// //         );
// //         const data = await res.json();
// //         setCoords(data);
// //         console.log(data);
// //     }

// //     getCoordsFromAddress();
// // }, []);

// type NominatimResult = {
//   lat: string;
//   lon: string;
//   display_name: string;
// };

// type OpenMapButtonProps = {
//   from: string; // أو string | null حسب حالتك
// };

// export default function OpenMapButton({ from }: OpenMapButtonProps, coordinates) {
//   const [coords, setCoords] = useState<NominatimResult[] | null>(null);

//   async function handleClick(
//     e: React.MouseEvent<HTMLButtonElement>,
//     address: string = "محطة رمسيس"
//   ): Promise<void> {
//     e.preventDefault();

//     if (!from) return;

//     const res = await fetch(
//       `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
//         address
//       )}&format=json`
//     );

//     if (!res.ok) {
//       console.error("Failed to fetch:", res.statusText);
//       return;
//     }

//     const data: NominatimResult[] = await res.json();

//     setCoords(data);
//     console.log("Fetched coords:", data);
//   }

//   return (
//     <button
//       onClick={(e) => handleClick(e, from)}
//       className="
//         mt-10 w-fit flex items-center justify-center gap-2
//         bg-green-600 hover:bg-green-700 active:bg-green-800
//         text-white font-semibold
//         px-4 py-2 rounded-xl
//         shadow-md hover:shadow-lg
//         transition-all duration-300 sm:text-base mx-auto text-xs
//       "
//     >
//       <MapPin className="w-4 h-4 text-white" />
//       <span>Open in Google Maps</span>
//     </button>
//   );
// }

import { MapPin } from "lucide-react";

type NominatimResult = {
    lat: string;
    lon: string;
    display_name: string;
};

type Coordinates = {
    lat: number;
    lng: number;
};

type OpenMapButtonProps = {
    from: string;
    userCoords: Coordinates;



};

export default function OpenMapButton({ from, userCoords }: OpenMapButtonProps) {

    // ---- ACCURATE DISTANCE FORMULA (HAVERSINE) ----
    function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
        const R = 6371; // نصف قطر الأرض بالكيلومتر
        const toRad = (x: number) => (x * Math.PI) / 180;

        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // المسافة بالكيلومتر
    }

    // ---- RETURN CLOSEST GEO RESULT ----
    function getClosestResult(results: NominatimResult[], userCoords: Coordinates): NominatimResult | null {
        if (!results || results.length === 0) return null;

        let closest = results[0];
        let minDist = Infinity;

        results.forEach((item) => {
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

    // ---- WHEN USER CLICKS ----
    async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!from) return;

        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(from)}&format=json`
        );

        const data: NominatimResult[] = await res.json();
        const closest = getClosestResult(data, userCoords);

        if (!closest) {
            console.error("No destination found");
            return;
        }

        openGoogleMaps(userCoords, closest);
    }

    // ---- OPEN GOOGLE MAPS ----
    function openGoogleMaps(
        userCoords: Coordinates,
        destCoords: { lat: string; lon: string }
    ) {
        const destLat = parseFloat(destCoords.lat);
        const destLon = parseFloat(destCoords.lon);

        const origin = `${userCoords.lat},${userCoords.lng}`;
        const destination = `${destLat},${destLon}`;

        const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;

        window.open(url, "_blank");
    }

    return (
        <button
            onClick={handleClick}
            className="
                mt-10 w-fit flex items-center justify-center gap-2
                bg-green-600 hover:bg-green-700 active:bg-green-800
                text-white font-semibold
                px-4 py-2 rounded-xl
                shadow-md hover:shadow-lg
                transition-all duration-300 sm:text-base mx-auto text-xs
            "
        >
            <MapPin className="w-4 h-4 text-white" />
            <span>Open in Google Maps</span>
        </button>
    );
}

 