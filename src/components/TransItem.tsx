import { Bus } from "lucide-react";

interface Trans {
  id: number;
  busNumber: string;
  price: number;
  lastStation: string;
  type: string;
}

function TransItem({ trans }: { trans: Trans }) {
  return (
    <div
      className="
        relative overflow-hidden rounded-xl border border-gray-100 bg-white 
        shadow-md hover:shadow-xl hover:-translate-y-1.5 
        transition-all duration-300 ease-in-out 
        p-6 flex flex-col gap-4 text-left cursor-pointer active:scale-[0.98]
      "
    >
      {/*  Bus number + price */}
      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-gray-500 text-xs sm:text-sm font-medium">Bus Number:</span>
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white font-extrabold px-4 py-1.5 rounded-lg text-sm sm:text-base shadow-sm">
            {trans.busNumber}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-gray-500 text-xs sm:text-sm font-medium">Ticket Price:</span>
          <div className="bg-gradient-to-r from-green-200 to-green-100 text-green-800 font-bold px-4 py-1.5 rounded-lg text-xs sm:text-sm shadow-inner">
            {trans.price} EGP
          </div>
        </div>
      </div>

      {/* type*/}
      <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm">
        <Bus className="w-4 h-4 text-orange-500" />
        <span className="text-gray-500 font-medium">Vehicle Type:</span>
        <span className="font-semibold text-gray-800">{trans.type}</span>
      </div>

      {/* final sation*/}
      <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm">
        <span className="text-orange-500">🏁</span>
        <span className="text-gray-500 font-medium">Last Station:</span>
        <span className="font-semibold text-gray-800 truncate">{trans.lastStation}</span>
      </div>


      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-orange-400 to-green-400 opacity-70 rounded-b-xl"></div>
    </div>
  );
}

export default TransItem;
