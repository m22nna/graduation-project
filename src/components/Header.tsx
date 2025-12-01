import SearchInputs from "./SearchInputs";

function Header() {
    return (
        <div>
            <h1 className="pt-10 px-6 text-3xl font-bold">
                Your Journey Starts Here
            </h1>

            <SearchInputs />
        </div>
    );
}

export default Header;
