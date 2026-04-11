import { useQuery } from "@tanstack/react-query";
import { fetchRoutes } from "../services/routesApi";
import type { SearchRouteParams } from "../services/routesApi";

export function useRoutes(searchParams: SearchRouteParams | null) {
  const {
    isLoading,
    data: routes,
    error,
  } = useQuery({
    queryKey: ["routes", searchParams],
    queryFn: () => {
        if (!searchParams) throw new Error("No search parameters provided");
        return fetchRoutes(searchParams);
    },
    enabled: !!searchParams,
  });

  return { isLoading, routes, error };
}