import { useSearchParams } from "react-router-dom";
import { useRoutes } from "@/features/useRoutes";
import type { SearchRouteParams } from "@/services/routesApi";
import TransItem from "./TransItem";
import TransItemSkeleton from "./TransItemSkeleton";
import type { TransGuideRoute } from "@/services/routesApi";

interface AllContainerProps {
  searchParams: SearchRouteParams | null;
}

function AllContainer({ searchParams }: AllContainerProps) {
  const { routes, isLoading, error } = useRoutes(searchParams);
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  
  const activeTab = urlSearchParams.get("filter") || "all";
  
  const handleTabChange = (tabId: string) => {
    urlSearchParams.set("filter", tabId);
    setUrlSearchParams(urlSearchParams, { replace: true });
  };
  
  const finalRoutes = routes?.data || [];
  
  const filteredRoutes = finalRoutes.filter((route: TransGuideRoute) => {
    if (activeTab === "all") return true;
    
    const hasMetro = route.routeDetails?.some(
      (detail: any) => detail.routeName.includes("الخط") || detail.routeName.includes("مترو")
    );
    
    if (activeTab === "metro") return hasMetro;
    if (activeTab === "bus") return !hasMetro;
    return true;
  });

  if (isLoading) {
    return (
      <div className="bg-white shadow-md grid gap-6 sm:grid-cols-2 w-full md:w-[95%] max-w-6xl mx-auto transition-all duration-300 rounded-[2rem] md:rounded-2xl my-10 p-4 sm:p-8">
        {[1, 2, 3, 4].map((i) => (
          <TransItemSkeleton key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] w-full px-4">
        <div className="bg-white shadow-lg shadow-red-500/5 border border-red-100 w-full md:w-[95%] max-w-xl mx-auto rounded-3xl p-8 md:p-10 flex items-center justify-center transition-all duration-300">
          <p className="text-center text-red-500 text-lg md:text-xl font-bold tracking-wide leading-relaxed">
            {error.message || "Error loading routes. Try again later."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      {finalRoutes && finalRoutes.length > 0 ? (
        <div className="w-full">
          {/* Tabs UI */}
          <div className="flex justify-center mt-6 mb-2">
            <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2 w-fit mx-auto relative z-20" dir="rtl">
              {[
                { id: "all", label: "الكل" },
                { id: "metro", label: "مترو" },
                { id: "bus", label: "باص" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative px-8 py-2.5 rounded-xl text-[14px] font-black transition-all duration-300 overflow-hidden group ${
                    activeTab === tab.id
                      ? "text-white shadow-md shadow-emerald-500/20"
                      : "text-gray-500 hover:text-emerald-600"
                  }`}
                >
                  {/* Active Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-tr from-emerald-500 to-emerald-400 transition-opacity duration-300 ${
                      activeTab === tab.id ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>
                  
                  {/* Smooth Hover Background (only visible when not active) */}
                  <div
                    className={`absolute inset-0 bg-emerald-50 rounded-xl transition-all duration-300 ease-out scale-75 opacity-0 ${
                      activeTab !== tab.id ? "group-hover:scale-100 group-hover:opacity-100" : ""
                    }`}
                  ></div>
                  
                  {/* Tab Label */}
                  <span className={`relative z-10 block transition-transform duration-300 ${activeTab !== tab.id ? "group-hover:scale-105" : ""}`}>
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          {filteredRoutes.length > 0 ? (
            <div className="bg-white shadow-md grid gap-6 sm:grid-cols-2 w-full md:w-[95%] max-w-6xl mx-auto transition-all duration-300 rounded-[2rem] md:rounded-2xl mb-10 mt-4 p-4 sm:p-8 relative z-10">
              {filteredRoutes.map((route: TransGuideRoute, index: number) => (
                <TransItem key={`route-result-${route.routeName}-${index}`} route={route} destination={searchParams?.destination} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[40vh] w-full px-4 relative z-10">
              <div className="bg-white shadow-sm border border-gray-100 w-full md:w-[95%] max-w-2xl mx-auto rounded-[2rem] md:rounded-2xl p-16 flex items-center justify-center transition-all duration-300">
                <p className="text-center text-gray-400 text-xl font-bold tracking-tight">
                  لا توجد نتائج في هذا التصنيف
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        // الحالة الثانية: لما مفيش داتا أساساً
        <div className="flex items-center justify-center min-h-[60vh] w-full px-4">
          <div className="bg-white shadow-lg border border-gray-100 w-full md:w-[95%] max-w-6xl mx-auto rounded-[2rem] md:rounded-2xl p-20 flex items-center justify-center transition-all duration-300">
            <p className="text-center text-gray-400 text-2xl md:text-3xl font-bold tracking-tight">
              No routes found. Please search for a route.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllContainer;
