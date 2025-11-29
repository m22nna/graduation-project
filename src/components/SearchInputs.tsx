import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftRight, ArrowDownUp } from "lucide-react";
import OpenMapButton from "./ui/OpenMapButton";

export default function SearchInputs() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [swapClicked, setSwapClicked] = useState(false);

    type Coordinates = {
        lat: number;
        lng: number;
    };
    const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

    useEffect(() => {
        async function getPosition(): Promise<{ lat: number; lng: number }> {
            const position = await new Promise<{ lat: number; lng: number }>(
                (resolve, reject) => {
                    if (!navigator.geolocation) {
                        reject(
                            new Error(
                                "Geolocation is not supported by this browser or it is blocked."
                            )
                        );
                    } else {
                        navigator.geolocation.getCurrentPosition(
                            (pos) =>
                                resolve({
                                    lat: pos.coords.latitude,
                                    lng: pos.coords.longitude,
                                }),
                            (err) => reject(err)
                            // { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
                        );
                    }
                }
            );
            console.log(position);

            setCoordinates(position);
            return position;
        }

        async function getCity(position: { lat: number; lng: number }) {
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json`
                );

                if (!res.ok) throw new Error("Failed to fetch city data");

                const data = await res.json();
                console.log(data);
                return data;
            } catch (error) {
                console.error("Error fetching city:", error);
            }
        }

        async function loadAll() {
            try {
                const position = await getPosition();
                const city = await getCity(position);
                console.log(city.address);

                setFrom(city.address.road || city.address.town);
                // setFrom(city.address.suburb || city.address.state);
            } catch (error) {
                console.error("Error:", error);
            }
        }

        loadAll();
    }, []);

    // function getPosition() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (pos) => {
    //                 position = pos;
    //             },
    //             (error) => {
    //                 console.error("Error:", error.message);
    //             }
    //         );
    //     } else {
    //         console.log("Geolocation is not supported by this browser.");
    //     }
    //     console.log(position);
    // }

    // getPosition();

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
                    <CardContent className="p-6">
                        <div className="flex flex-col [@media(min-width:850px)]:flex-row items-center justify-center gap-5 md:gap-8">
                            {/* FROM Section */}
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
                                        className="flex-1 bg-transparent text-base md:text-lg font-semibold text-gray-800 border-none focus:ring-0 focus:outline-none px-2"
                                    />
                                </div>
                            </div>

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
                                        placeholder="Enter your distination"
                                        className="flex-1 bg-transparent text-base md:text-lg font-semibold text-gray-800 border-none focus:ring-0 focus:outline-none px-2"
                                    />
                                </div>
                            </div>
                        </div>

                        {coordinates && <OpenMapButton from={from} userCoords={coordinates} />}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
