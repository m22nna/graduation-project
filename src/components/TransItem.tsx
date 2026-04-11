import { Bus, Clock, ArrowRightLeft, Banknote, Navigation, ChevronRight } from "lucide-react";

function TransItem({ route }: { route: any }) {
  const totalTime = route.routeDetails?.[0]?.averageTimeInMinutes || 0;
  const totalPrice = route.routeDetails?.reduce((sum: number, detail: any) => 
    sum + (Number(detail.ticketPrice) || 0), 0);

  // فك اسم المسار لمصفوفة
  const routeNames = route.routeName.split('+').map((s: string) => s.trim());

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 cursor-pointer active:scale-[0.99]">
      
      {/* Header: Green Chips & Type */}
      <div className="flex justify-between items-start gap-3 flex-wrap">
        <div className="flex flex-col gap-2">
          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Route Plan</span>
          
          {/* أسماء الخطوط بالأخضر وبالعرض */}
          <div className="flex flex-wrap items-center gap-1.5">
            {routeNames.map((name: string, i: number) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="bg-green-500/90 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm ring-1 ring-green-100">
                  {name}
                </div>
                {i < routeNames.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-orange-400" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* نوع الرحلة: خط أصغر ومريح */}
        <div className="text-sm font-medium text-green-600 bg-green-50/50 px-3 py-1.5 rounded-lg border border-green-100/50 whitespace-nowrap">
          {route.routeType}
        </div>
      </div>

      {/* Stats Bar (Orange Accents) */}
      <div className="flex items-center gap-6 py-3 border-y border-gray-50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-orange-50 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-orange-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-gray-400 font-bold uppercase">Time</span>
            <span className="text-xs font-black text-gray-700">{totalTime} min</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-orange-50 rounded-lg">
            <Banknote className="w-3.5 h-3.5 text-orange-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-gray-400 font-bold uppercase">Price</span>
            <span className="text-xs font-black text-gray-700">{totalPrice} EGP</span>
          </div>
        </div>
      </div>

      {/* Journey Timeline */}
      <div className="relative flex flex-col gap-5 mt-1">
        <div className="absolute left-[9px] top-2 bottom-2 w-[1.5px] bg-gray-100 rounded-full"></div>

        {/* Start Point */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-[18px] h-[18px] bg-white border-2 border-orange-400 rounded-full shadow-sm flex-shrink-0"></div>
          <div className="flex flex-col">
            <span className="text-[8px] font-bold text-gray-400 uppercase">From</span>
            <span className="font-bold text-gray-700 text-xs leading-tight">{route.closestStationName}</span>
          </div>
        </div>

        {/* Steps */}
        {route.routeDetails?.map((detail: any, idx: number) => (
          <div key={idx} className="flex flex-col gap-3 ml-[9px] pl-6 relative">
            <div className="flex items-center gap-3">
               <div className="absolute left-[-4px] w-2 h-2 bg-gray-200 rounded-full border border-white"></div>
               <div className="flex items-center gap-2 w-full">
                  <Bus className="w-4 h-4 text-orange-400/70" />
                  <div className="bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 shadow-sm min-w-[80px] text-center">
                    <span className="font-bold text-slate-600 text-[10px]">Line {detail.routeName}</span>
                  </div>
               </div>
            </div>

            {/* Transfer Point */}
            {route.transferStations[idx] && (
              <div className="flex items-center gap-3 py-1 relative z-10">
                <div className="absolute left-[-16px] w-[22px] h-[22px] bg-green-500 rounded-lg flex items-center justify-center shadow-sm">
                  <ArrowRightLeft className="w-3 h-3 text-white" />
                </div>
                <div className="bg-green-50/40 border border-green-100/60 text-green-800 px-4 py-2 rounded-xl w-full">
                   <span className="text-[9px] font-bold block uppercase opacity-60 tracking-wider text-center">Transfer At</span>
                   <p className="text-xs font-black text-center truncate">
                     {route.transferStations[idx]}
                   </p>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Arrival */}
        <div className="flex items-center gap-3 relative z-10">
           <div className="w-[18px] h-[18px] bg-orange-500 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
              <Navigation className="w-3 h-3 text-white fill-current" />
           </div>
           <div className="flex flex-col">
              <span className="text-[8px] font-bold text-gray-400 uppercase">To</span>
              <span className="font-bold text-gray-700 text-xs">Destination Area</span>
           </div>
        </div>
      </div>

      {/* الخط الجمالي السفلي */}
      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-orange-400 via-green-400 to-green-500 opacity-90"></div>
    </div>
  );
}

export default TransItem;