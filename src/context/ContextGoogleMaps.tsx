// import { createContext, useState } from "react";

// const FromContext = createContext();

// const function FromProvider({children}) {
//     const [coords, setCoords] = useState({});

//     async function getCoordsFromAddress(address = 'محطة رمسيس') {
//         const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);
//         const data = await res.json();
//         setCoords(data)
//         console.log(data);
//     }
// }