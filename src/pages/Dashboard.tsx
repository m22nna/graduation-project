import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CountersGraph from "@/components/CountersGraph";
import StatsSection from "@/components/StatesSection";

import { UserContext } from "@/context/UserContext";
import { useDashboard, useAllUsers } from "@/features/useDashboard";
import { useAllStations } from "@/features/useStations";
import { useAllRoutes, useCreateRoute } from "@/features/useAdminRoutes";

import { DashboardRolesTable } from "@/components/DashboardRolesTable";
import { DashboardUsersTable } from "@/components/DashboardUsersTable";
import { DashboardStationsTable } from "@/components/DashboardStationsTable";
import { DashboardRoutesTable } from "@/components/DashboardRoutesTable";
import RouteFormModal from "@/components/ui/RouteFormModal";

const Dashboard: React.FC = () => {
  const { userToken, setUserToken } = useContext(UserContext);
  const navigate = useNavigate();

  const [isAddRouteModalOpen, setIsAddRouteModalOpen] = useState(false);

  const {
    data,
    isLoading,
    error,
  } = useDashboard(userToken ?? "");

  const {
    data: usersData,
    isLoading: isUsersLoading,
    error: usersError,
  } = useAllUsers(userToken ?? "");

  const {
    data: stationsData,
    isLoading: isStationsLoading,
    error: stationsError,
  } = useAllStations(1, 10, "", userToken ?? "");

  const {
    data: routesData,
    isLoading: isRoutesLoading,
    error: routesError,
    refetch: refetchRoutes,
  } = useAllRoutes(1, 10, userToken ?? "");

  const createRouteMutation = useCreateRoute();

  const roles = Array.isArray(data) ? data : (data?.roles || data?.data || []);
  const users = Array.isArray(usersData) ? usersData : (usersData?.data || usersData?.items || []);
  const stations = Array.isArray(stationsData) ? stationsData : (stationsData?.data || stationsData?.items || stationsData?.stations || []);

  useEffect(() => {
    const err = error as any || stationsError as any || usersError as any || routesError as any;
    if (err?.response?.status === 401) {
      setUserToken(null);
      localStorage.removeItem("userToken");
      localStorage.removeItem("userId");
      navigate("/login");
    }
  }, [error, stationsError, usersError, routesError, navigate, setUserToken]);

  useEffect(() => {
    if (createRouteMutation.isSuccess) {
      refetchRoutes();
      setIsAddRouteModalOpen(false);
    }
  }, [createRouteMutation.isSuccess, refetchRoutes]);

  if (!userToken) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container mx-auto p-5 text-white">      
      <div className="flex flex-col lg:flex-row gap-6">  

        {/* الجزء اليمين - الإحصائيات */}
        <div className="w-full lg:w-1/2 flex flex-col ">
          <div className="w-full mb-5">
            <StatsSection />
          </div>
          <div className="w-full mb-5">
            <CountersGraph />
          </div>
          <div className="w-full">
            <DashboardRoutesTable
              routes={routesData}
              isLoading={isRoutesLoading}
              onCreateClick={() => setIsAddRouteModalOpen(true)}
            />
          </div>
        </div> 
              
        <div className="w-full lg:w-1/2">
          
          <DashboardRolesTable roles={roles} isLoading={isLoading} />

          <DashboardUsersTable users={users} isLoading={isUsersLoading} />

          <DashboardStationsTable stations={stations} isLoading={isStationsLoading} />

        </div>
      </div>

      <RouteFormModal
        isOpen={isAddRouteModalOpen}
        onClose={() => setIsAddRouteModalOpen(false)}
        onSubmit={(routeData) => {
          if (userToken) {
            createRouteMutation.mutate({
              input: routeData,
              token: userToken,
            });
          }
        }}
        title="إضافة طريق جديد"
        isPending={createRouteMutation.isPending}
      />
    </div>
  );
};

export default Dashboard;