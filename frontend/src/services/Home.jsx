import "./Home.css";
import SearchButton from "../components/SearchButton.jsx";

export default function home() {
    return (
        <div className="home-page">
            <div className="home-text">
                <h1>
                    Español Travel Sentiment
                </h1>
                <h2>Find your Destination.</h2>
            </div>
            <div className="home-body">
                <SearchButton/>
            </div>
        </div>
    )
}