import { useRoutes } from "@/features/useRoutes";
import type { SearchRouteParams } from "@/services/routesApi";
import TransItem from "./TransItem";
import TransItemSkeleton from "./TransItemSkeleton";
import type { TransGuideRoute } from "@/services/routesApi";

// // داتا وهمية (Mock Data) مطابقة لشكل الـ API عشان تجرب الشكل
// const mockRoutes = [
//   {
//     routeName: "M10 + M5",
//     routeType: "1 Transfer",
//     price: 80,
//     closestStationName: "Hosary Square",
//     transferStations: ["Abdel Moneim Riad"],
//     routeDetails: [
//       { lineName: "Bus M10", time: 90 },
//       { lineName: "Bus M5", time: 90 }
//     ]
//   },
//   {
//     routeName: "M21",
//     routeType: "Direct",
//     price: 40,
//     closestStationName: "6 October University",
//     transferStations: [],
//     routeDetails: [
//       { lineName: "Bus M21", time: 100 }
//     ]
//   }
// ];

interface AllContainerProps {
  searchParams: SearchRouteParams | null;
}

function AllContainer({ searchParams }: AllContainerProps) {
  const { routes, isLoading, error } = useRoutes(searchParams);
  const finalRoutes = routes?.data || [];
  
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
  <>
    {finalRoutes && finalRoutes.length > 0 ? (
      // الحالة الأولى: لو فيه داتا
      <div className="bg-white shadow-md grid gap-6 sm:grid-cols-2 w-full md:w-[95%] max-w-6xl mx-auto transition-all duration-300 rounded-[2rem] md:rounded-2xl my-10 p-4 sm:p-8">
        {finalRoutes.map((route: TransGuideRoute, index: number) => (
          <TransItem key={`route-result-${route.routeName}-${index}`} route={route} destination={searchParams?.destination} />
        ))}
      </div>
    ) : (
      // الحالة الثانية: لما مفيش داتا (بالخلفية والتوسيط)
      <div className="flex items-center justify-center min-h-[60vh] w-full px-4">
        <div className="bg-white shadow-lg border border-gray-100 w-full md:w-[95%] max-w-6xl mx-auto rounded-[2rem] md:rounded-2xl p-20 flex items-center justify-center transition-all duration-300">
          <p className="text-center text-gray-400 text-2xl md:text-3xl font-bold tracking-tight">
            No routes found. Please search for a route.
          </p>
        </div>
      </div>
    )}
  </>
);
}

export default AllContainer;
