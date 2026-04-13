
import { useState } from "react";
import { useLocation } from "react-router-dom";
import AllContainer from "@/components/AllContainer";
import Header from "@/components/Header";
import { SearchRouteParams } from "@/services/routesApi";
function HomePage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useState<SearchRouteParams | null>(
    location.state?.searchParams || null
  );

  return (
    <div className="header">
      <header>
        <Header />
      </header>
      <main>
        <AllContainer />
      </main>
    </div>
  );
}

export default HomePage;
