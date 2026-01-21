import "./Home.css";
import SearchButton from "../components/SearchButton.jsx";
import RegionTabs from "../components/RegionTabs.jsx";

export default function home() {
    return (
            <div className="home-page">
                <div className="home-title">
                    <h1>
                        Español Travel Sentiment
                    </h1>
                    <h2>Find your Destination.</h2>
                </div>
                <div className="home-button">
                    <SearchButton/>
                </div>
                <div className="region-blocks">
                    <RegionTabs />
                </div>
            </div>
    )
}