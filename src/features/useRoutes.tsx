import { useQuery } from "@tanstack/react-query";
import { useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { fetchRoutes } from "../services/routesApi";
import type { SearchRouteParams } from "../services/routesApi";
import { UserContext } from "@/context/UserContext";

export function useRoutes(searchParams: SearchRouteParams | null) {
    const { userToken } = useContext(UserContext);
    const {
        isLoading,
        data: routes,
        error,
    } = useQuery({
        queryKey: ["routes", searchParams],
        queryFn: () => {
            if (!searchParams) throw new Error("No search parameters provided");
            return fetchRoutes(searchParams, userToken);
        },
        enabled: !!searchParams,
        retry: false,
    });

    useEffect(() => {
        if (error) {
            toast.error(error.message, {
                style: {
                    fontSize: '17px',
                    fontWeight: 'bold',
                    backgroundColor: '#ffffff',
                    color: '#ef4444', 
                    padding: '16px 24px',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                    borderRadius: '12px'
                }
            });
        }
    }, [error]);

    return { isLoading, routes, error };
}
