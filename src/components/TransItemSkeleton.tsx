export default function TransItemSkeleton() {
    return (
        <div dir="rtl" className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white/60 backdrop-blur-3xl p-5 shadow-sm flex flex-col gap-6 w-full animate-pulse">
            {/* Header: Chips & Type */}
            <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-3">
                    <div className="h-3 w-16 bg-gray-200/80 rounded-md"></div>
                    <div className="flex gap-2">
                        <div className="h-7 w-20 bg-emerald-100/60 rounded-xl"></div>
                        <div className="h-7 w-12 bg-emerald-100/60 rounded-xl"></div>
                    </div>
                </div>
                <div className="h-8 w-20 bg-gray-100 rounded-xl"></div>
            </div>

            {/* Stats Bar */}
            <div className="flex items-center gap-8 py-4 border-y border-gray-100/60">
                <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl"></div>
                    <div className="flex flex-col gap-1.5 text-right w-16">
                        <div className="h-2.5 w-full bg-gray-200/80 rounded-md mb-1"></div>
                        <div className="h-4 w-3/4 bg-gray-200/80 rounded-md"></div>
                    </div>
                </div>
                <div className="w-[1.5px] h-10 bg-gray-100/60"></div>
                <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl"></div>
                    <div className="flex flex-col gap-1.5 text-right w-16">
                        <div className="h-2.5 w-full bg-gray-200/80 rounded-md mb-1"></div>
                        <div className="h-4 w-3/4 bg-gray-200/80 rounded-md"></div>
                    </div>
                </div>
            </div>

            {/* Journey Timeline Skeleton */}
            <div className="relative flex flex-col gap-5 mt-2 text-right pb-2">
                <div className="absolute right-[12px] top-4 bottom-5 w-[2px] bg-gradient-to-b from-orange-200/40 via-gray-200/40 to-emerald-200/40 rounded-full"></div>
                
                {/* Start */}
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-[26px] h-[26px] bg-white border-4 border-orange-100 rounded-full flex-shrink-0"></div>
                    <div className="flex flex-col gap-2">
                        <div className="h-2.5 w-12 bg-orange-200/60 rounded-md"></div>
                        <div className="h-3 w-28 bg-gray-200/80 rounded-md"></div>
                    </div>
                </div>

                {/* Ride */}
                <div className="flex flex-col gap-5 mr-[14px] pr-7 relative">
                    <div className="absolute right-[-6px] w-3 h-3 bg-white rounded-full border-[2.5px] border-gray-200"></div>
                    <div className="flex items-center gap-3 w-full bg-white px-4 py-3 rounded-xl border border-gray-100/60">
                        <div className="w-8 h-8 rounded-lg bg-orange-50/80"></div>
                        <div className="flex flex-col gap-1.5 w-full">
                            <div className="h-3 w-1/3 bg-gray-200/80 rounded-md"></div>
                            <div className="h-4 w-1/2 bg-orange-100/60 rounded-md"></div>
                        </div>
                    </div>
                </div>

                {/* End */}
                <div className="flex flex-col gap-5 mr-[14px] pr-7 relative mt-2">
                    <div className="absolute right-[-9px] w-[18px] h-[18px] bg-emerald-50 border-[3px] border-white rounded-full shadow-sm"></div>
                    <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-gray-100/60 w-full">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50/80"></div>
                        <div className="flex flex-col gap-1.5 w-full text-right">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-emerald-100/50 rounded-full"></div>
                                <div className="h-3 w-16 bg-emerald-200/60 rounded-md"></div>
                            </div>
                            <div className="h-4 w-28 bg-gray-200/80 rounded-md"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
