import { useState } from "react";
import AllContainer from "@/components/AllContainer";
import Header from "@/components/Header";
import type { SearchRouteParams } from "@/services/routesApi";

function HomePage() {
  const [searchParams, setSearchParams] = useState<SearchRouteParams | null>(null);

  return (
    <div className="header">
      <header>
        <Header setSearchParams={setSearchParams} />
      </header>
      <main>
        <AllContainer searchParams={searchParams} />
      </main>
    </div>
  );
}

export default HomePage;
