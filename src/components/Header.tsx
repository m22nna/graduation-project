import SearchInputs from "./SearchInputs";
import type { SearchRouteParams } from "@/services/routesApi";

interface HeaderProps {
  setSearchParams: React.Dispatch<React.SetStateAction<SearchRouteParams | null>>;
}

function Header({ setSearchParams }: HeaderProps) {
    return (
        <div>
            <h1 className="pt-10 px-6 text-3xl font-bold">
                Your Journey Starts Here
            </h1>

            <SearchInputs setSearchParams={setSearchParams} />
        </div>
    );
}

export default Header;
