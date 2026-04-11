import { createContext, useContext, useState, type ReactNode } from "react";

// 1. تعريف الـ Interfaces هنا مباشرة عشان متبقاش محتاج لملف types بره
export interface RouteDetail {
  id: number;
  routeName: string;
  ticketPrice: number;
  averageTimeInMinutes: number;
  stations: string[];
}

export interface RouteData {
  routeName: string;
  routeType: string;
  closestStationName: string;
  distanceToClosestStationKm: number;
  transferStations: string[];
  routeDetails: RouteDetail[];
}

// 2. تعريف شكل الـ Context
interface RouteContextType {
  finalRoutes: RouteData[];
  setFinalRoutes: (routes: RouteData[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// 3. إنشاء الـ Context
const FoundRoutesContext = createContext<RouteContextType | undefined>(undefined);

// 4. الـ Provider
export function FoundRoutesProvider({ children }: { children: ReactNode }) {
  const [finalRoutes, setFinalRoutes] = useState<RouteData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <FoundRoutesContext.Provider 
      value={{ 
        finalRoutes, 
        setFinalRoutes, 
        isLoading, 
        setIsLoading 
      }}
    >
      {children}
    </FoundRoutesContext.Provider>
  );
}

// 5. الـ Hook
export function useRoutesContext() {
  const context = useContext(FoundRoutesContext);
  if (!context) {
    throw new Error("useRoutesContext must be used within a RouteProvider");
  }
  return context;
}