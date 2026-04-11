import AllContainer from "@/components/AllContainer";
import Header from "@/components/Header";
import { FoundRoutesProvider } from "@/context/foundRoutesContext";

function HomePage() {
  return (
    <div className="header">
      <FoundRoutesProvider>
        <header>
          <Header />
        </header>
        <main>
          <AllContainer />
        </main>
      </FoundRoutesProvider>
    </div>
  );
}

export default HomePage;
