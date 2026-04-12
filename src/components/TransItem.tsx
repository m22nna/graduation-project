import { useState } from "react";
import {
    Bus,
    Clock,
    ArrowRightLeft,
    Banknote,
    Navigation,
    ChevronLeft,
    Copy,
    Check,
} from "lucide-react";
import type { TransGuideRoute, RouteDetail } from "../services/routesApi";

function TransItem({ route, destination }: { route: TransGuideRoute; destination?: string }) {
    const [copied, setCopied] = useState(false);
    const totalTime = route.routeDetails?.[0]?.averageTimeInMinutes || 0;
    const totalPrice = route.routeDetails?.reduce(
        (sum: number, detail: RouteDetail) => sum + (Number(detail.ticketPrice) || 0),
        0,
    );

    // فك اسم المسار لمصفوفة
    const routeNames = route.routeName.split("+").map((s: string) => s.trim());

    const formatTime = (minutes: number) => {
        if (!minutes) return "غير محدد";
        if (minutes < 60) return `${minutes} دقيقة`;
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return m > 0 ? `${h} س و ${m} د` : `${h} ساعة`;
    };

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        const steps = route.routeDetails.map((d: any) => d.routeName).join(' ثم ');
        navigator.clipboard.writeText(`مساري: ركوب ${steps} | التكلفة: ${totalPrice > 0 ? totalPrice + ' جنيه' : 'مجاناً'} | الوقت: ${formatTime(totalTime)}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            dir="rtl"
            className="group relative overflow-hidden rounded-2xl border border-gray-300 bg-white/80 backdrop-blur-3xl p-5 shadow-lg shadow-gray-200/40 hover:shadow-2xl hover:shadow-orange-200/20 hover:-translate-y-1.5 transition-all duration-500 flex flex-col gap-6 cursor-pointer active:scale-[0.98]"
        >
            {/* Glossy Top Background Effect */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-400/5 rounded-full blur-3xl -z-10 group-hover:bg-orange-400/10 transition-colors duration-500"></div>

 

            {/* Header: Green Chips & Type */}
            <div className="flex justify-between items-start gap-4 flex-wrap z-10">
                <div className="flex flex-col gap-2.5">
                    <span className="text-[11px] font-extrabold text-gray-400 tracking-[0.1em] uppercase">
                        خطة الرحلة
                    </span>

                    {/* أسماء الخطوط بالأخضر وبالعرض */}
                    <div className="flex flex-wrap items-center gap-1.5">
                        {routeNames.map((name: string, i: number) => (
                            <div key={`route-chip-${name}-${i}`} className="flex items-center gap-1.5">
                                <div className="bg-gradient-to-tr from-emerald-500 to-emerald-400 text-white px-4 py-1.5 rounded-xl text-[12px] font-black shadow-md shadow-emerald-500/20 ring-1 ring-white/20">
                                    {name}
                                </div>
                                {i < routeNames.length - 1 && (
                                    <ChevronLeft className="w-4 h-4 text-orange-400/80" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Copy Button */}
                    <button 
                        onClick={handleCopy}
                        className="p-2.5 bg-white/80 hover:bg-emerald-50 hover:border-emerald-200 rounded-xl border border-gray-200 text-gray-400 hover:text-emerald-600 transition-all shadow-sm hover:shadow-md flex items-center justify-center h-full"
                        title="نسخ المسار"
                    >
                        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    
                    {/* نوع الرحلة: خط أصغر ومريح */}
                    <div className="flex items-center justify-center text-[13px] font-black tracking-wide text-emerald-700 bg-emerald-50/80 px-4 py-2.5 rounded-xl border border-emerald-100/80 shadow-sm whitespace-nowrap h-full">
                        {route.routeType === "Direct" ||
                        route.routeType === "direct"
                            ? "مباشر"
                            : route.routeType}
                    </div>
                </div>
            </div>

            {/* Stats Bar (Orange Accents) */}
            <div className="flex items-center gap-8 py-4 border-y border-gray-100/80 z-10">
                {/* Time Stats */}
                <div className="flex items-center gap-3.5 group/stat">
                    <div className="p-2.5 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl shadow-inner border border-orange-100/60 group-hover/stat:scale-110 group-hover/stat:rotate-[-5deg] transition-transform duration-300">
                        <Clock className="w-4.5 h-4.5 text-orange-500" />
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-[11px] text-gray-500 font-extrabold mb-0.5">
                            الوقت الإجمالي
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className={totalTime >= 60 ? "text-[13px] font-black text-gray-800" : "text-[16px] font-black text-gray-800"}>
                                {totalTime >= 60 ? formatTime(totalTime) : totalTime}
                            </span>
                            {totalTime < 60 && (
                                <span className="text-[11px] font-bold text-gray-500">
                                    دقيقة
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-[1.5px] h-10 bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>

                {/* Price Stats */}
                <div className="flex items-center gap-3.5 group/stat">
                    <div className="p-2.5 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl shadow-inner border border-orange-100/60 group-hover/stat:scale-110 group-hover/stat:rotate-[5deg] transition-transform duration-300">
                        <Banknote className="w-4.5 h-4.5 text-orange-600" />
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-[11px] text-gray-500 font-extrabold mb-0.5">
                            التكلفة
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className={totalPrice === 0 ? "text-[12px] px-2 py-0.5 mt-0.5 bg-emerald-50 text-emerald-600 rounded-md font-black ring-1 ring-emerald-200" : "text-[16px] font-black text-gray-800"}>
                                {totalPrice === 0 ? "مجاناً" : totalPrice}
                            </span>
                            {totalPrice > 0 && (
                                <span className="text-[11px] font-bold text-gray-500">
                                    جنيه
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Journey Timeline */}
            <div className="relative flex flex-col gap-6 mt-2 text-right z-10 pb-2">
                {/* The timeline line attached to the right instead of left */}
                <div className="absolute right-[11px] top-4 bottom-5 w-[2.5px] bg-gradient-to-b from-orange-300 via-gray-200 to-emerald-300 rounded-full opacity-60"></div>

                {/* Start Point */}
                <div className="flex items-center gap-4 relative z-10 group/step">
                    <div className="w-[26px] h-[26px] bg-white border-[3px] border-orange-400 rounded-full shadow-md flex-shrink-0 relative overflow-hidden">
                        <div className="absolute inset-[3px] bg-orange-400 rounded-full scale-0 group-hover/step:scale-100 transition-transform duration-500 ease-out"></div>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-[11px] font-bold text-orange-500/90 mb-0.5">
                            انت هنا
                        </span>
                        <span className="font-extrabold text-gray-800 text-[14px] leading-tight">
                            {route.closestStationName}
                        </span>
                    </div>
                </div>

                {/* Steps */}
                {route.routeDetails?.map((detail: RouteDetail, idx: number) => (
                    <div
                        key={`step-${detail.routeName}-${idx}`}
                        className="flex flex-col gap-5 mr-[12px] pr-7 relative"
                    >
                        {/* Ride Card */}
                        <div className="flex items-center gap-3 relative group/ride hover:-translate-x-1.5 transition-transform duration-300">
                            <div className="absolute right-[-6.5px] w-3 h-3 bg-white rounded-full border-[2.5px] border-gray-300 shadow-sm"></div>
                            <div className="flex items-center gap-3 w-full bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm hover:border-orange-200 hover:shadow-orange-100/50 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-1.5 h-full bg-orange-400/90"></div>
                                <div className="bg-orange-50 p-2 rounded-lg text-orange-500 group-hover/ride:bg-orange-500 group-hover/ride:text-white transition-colors duration-300">
                                    <Bus className="w-4 h-4 transform rtl:-scale-x-100" />
                                </div>
                                <div className="flex items-center gap-2 text-right w-full">
                                    <span className="font-bold text-gray-500 text-[12px]">
                                        هتركب:
                                    </span>
                                    <span className="font-extrabold text-orange-600 text-[13px]">
                                        {detail.routeName}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Transfer Point */}
                        {route.transferStations[idx] && (
                            <div className="flex items-center gap-4 py-1.5 relative z-10">
                                <div className="absolute z-20 right-[-14px] w-[30px] h-[30px] bg-gradient-to-tr from-emerald-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 border-2 border-white">
                                    <ArrowRightLeft className="w-3.5 h-3.5 text-white" />
                                </div>
                                <div className="bg-gradient-to-r from-emerald-50/90 to-white/70 border border-emerald-100/80 px-5 py-3 rounded-2xl w-full text-right shadow-sm relative overflow-hidden group/transfer hover:shadow-md transition-all duration-300 hover:-translate-x-1 cursor-default">
                                    <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-500/5 blur-2xl group-hover/transfer:bg-emerald-500/10 transition-colors duration-500"></div>
                                    <span className="text-[11px] font-bold block text-emerald-700/70 mb-1 relative z-10">
                                        هتحول في:
                                    </span>
                                    <p className="text-[14px] font-black truncate relative z-10 text-emerald-950">
                                        {route.transferStations[idx]}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* Arrival */}
                <div className="flex items-center gap-4 relative z-10 group/step mt-1">
                    <div className="w-[26px] h-[26px] bg-gradient-to-tr from-emerald-500 to-emerald-400 rounded-full flex items-center justify-center shadow-md shadow-emerald-500/20 flex-shrink-0 border-2 border-white ring-2 ring-emerald-100">
                        <Navigation className="w-3 h-3 text-white fill-current" />
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-[11px] font-bold text-emerald-600/80 mb-0.5">
                            هتنزل
                        </span>
                        <span className="font-extrabold text-gray-800 text-[14px]">
                            في {destination || 'وجهتك'}
                        </span>
                    </div>
                </div>
            </div>

            {/* الخط الجمالي السفلي */}
            <div className="absolute bottom-0 right-0 w-full h-[6px] bg-gradient-to-l from-orange-400 via-emerald-400 to-emerald-500 opacity-90 group-hover:h-[9px] transition-all duration-300"></div>
        </div>
    );
}

export default TransItem;
