import AllContainer from "@/components/AllContainer";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

function HomePage() {


    return (
        <div className="header">
            <header>
                <Header />
            </header>
            <main>
                <AllContainer />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default HomePage;
