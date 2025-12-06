import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftRight, ArrowDownUp } from "lucide-react";
import OpenMapButton from "./ui/OpenMapButton";

export default function SearchInputs() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [swapClicked, setSwapClicked] = useState(false);
    const [disabled, setDisabled] = useState(true);

    type Coordinates = {
        lat: number;
        lng: number;
        accuracy: number;
    };
    const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

    useEffect(() => {
        if (from === "") {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [from]);

    useEffect(() => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by this browser.");
            return;
        }

        let bestPosition: Coordinates | null = null;
        let cityFetched = false;

        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                const current: Coordinates = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    accuracy: pos.coords.accuracy,
                };

                if (!bestPosition || current.accuracy < bestPosition.accuracy) {
                    bestPosition = current;
                    console.log("New best position:", bestPosition);
                }

                if (current.accuracy <= 10 && !cityFetched) {
                    cityFetched = true;
                    setCoordinates(current);
                    navigator.geolocation.clearWatch(watchId);
                    fetchCityName(current);
                }
            },
            (err) => {
                console.error("Error getting location:", err);
                alert("Failed to get location.");
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 30000,
            }
        );

        setTimeout(() => {
            navigator.geolocation.clearWatch(watchId);
            if (bestPosition && !cityFetched) {
                cityFetched = true;
                setCoordinates(bestPosition);
                console.log("Final best position:", bestPosition);
                fetchCityName(bestPosition);
            }
        }, 10000);

        async function fetchCityName(position: Coordinates) {
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json`,
                    {
                        headers: {
                            "User-Agent": "MyApp/1.0 (youremail@example.com)",
                            "Accept-Language": "ar",
                        },
                    }
                );

                if (!res.ok) throw new Error("Failed to fetch city data");

                const data = await res.json();
                console.log("Reverse Geocode Data:", data);
                console.log("Address object:", data.address);

                setFrom(
                    `${
                        data.address.road ||
                        data.address.suburb ||
                        data.address.town
                    } - ${data.address.city}`
                );
            } catch (error) {
                console.error("Error fetching city:", error);
            }
        }
    }, []);

    const handleSwap = () => {
        setSwapClicked(true);
        const temp = from;
        setFrom(to);
        setTo(temp);
        setTimeout(() => setSwapClicked(false), 300);
    };

    return (
        <div className="search-input flex justify-center items-center w-full mt-10 px-6">
            <div className="w-full max-w-6xl">
                <Card className="bg-white border border-gray-200 rounded-2xl transition-all duration-300">
                    <CardContent className="p-6 pb-0">
                        <div className="flex flex-col [@media(min-width:850px)]:flex-row items-center justify-center gap-5 md:gap-8">
                            {/* FROM */}
                            <div className="flex items-center gap-3 w-full [@media(min-width:850px)]:w-[45%]">
                                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0 transition-transform duration-300 hover:scale-125" />
                                <div
                                    className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 
                             transition-all duration-300 w-full
                             hover:border-green-400 
                             focus-within:scale-105 focus-within:border-green-500"
                                >
                                    <span className="text-gray-600 font-medium whitespace-nowrap">
                                        From
                                    </span>
                                    <div className="h-6 w-px bg-gray-300" />
                                    <Input
                                        value={from}
                                        onChange={(e) =>
                                            setFrom(e.target.value)
                                        }
                                        placeholder="Enter your location"
                                        className="flex-1 bg-transparent text-sm md:text-base font-semibold text-gray-800 border-none focus:ring-0 focus:outline-none px-2"
                                    />
                                </div>
                            </div>

                            {/* Swap button */}
                            <button
                                onClick={handleSwap}
                                className={`bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-full border border-gray-300 transition-all duration-300 
                ${swapClicked ? "scale-110 border-green-500" : "scale-100"} 
                hover:border-green-400 flex justify-center items-center`}
                                aria-label="Swap"
                            >
                                <ArrowLeftRight className="hidden [@media(min-width:850px)]:block w-5 h-5 text-green-600" />
                                <ArrowDownUp className="block [@media(min-width:850px)]:hidden w-5 h-5 text-green-600" />
                            </button>

                            {/* TO */}
                            <div className="flex items-center gap-3 w-full [@media(min-width:850px)]:w-[45%]">
                                <span className="w-2.5 h-2.5 bg-orange-500 rounded-full flex-shrink-0 transition-transform duration-300 hover:scale-125" />
                                <div
                                    className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 
                             transition-all duration-300 w-full
                             hover:border-green-400 
                             focus-within:scale-105 focus-within:border-green-500"
                                >
                                    <span className="text-gray-600 font-medium whitespace-nowrap">
                                        To
                                    </span>
                                    <div className="h-6 w-px bg-gray-300" />
                                    <Input
                                        value={to}
                                        onChange={(e) => setTo(e.target.value)}
                                        placeholder="Enter your destination"
                                        className="flex-1 bg-transparent text-sm md:text-base font-semibold text-gray-800 border-none focus:ring-0 focus:outline-none px-2"
                                    />
                                </div>
                            </div>
                        </div>

                        <OpenMapButton
                            from={from}
                            userCoords={coordinates}
                            disabled={disabled}
                        />

                        <p className="text-xs text-red-500 px-2 text-right mt-6">
                            تنبيه: يجب كتابة اسم المدينة مع المحطة في البحث*
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
