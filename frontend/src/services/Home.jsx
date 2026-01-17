import "./Home.css";
import SearchButton from "../components/SearchButton.jsx";

export default function home() {
    return (
        <div className="home-page">
            <h1>
                This is the homepage of this project.
            </h1>
            <div className="home-body">
                <SearchButton />
            </div>
        </div>
    )
}