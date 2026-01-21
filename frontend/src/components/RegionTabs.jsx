import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./RegionTabs.css";

export default function RegionTabs() {
    const [ allData, setAllData ] = useState([]);
    const [ selectedRegion, setSelectedRegion ] = useState("Central America");
    const [ error, setError ] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const res = await fetch("http://localhost:8000/all_regions");
                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }
                const data = await res.json();
                setAllData(data);
            } catch (err) {
                setError(err);
            }
        }
        fetchOptions();
    }, []);

    if (error) {
        return <div>Error fetching data: {error}</div>
    }

    const filteredCountries = allData.filter(c => c.region === selectedRegion);
    const regions = ["North America", "Central America", "South America", "Caribbean", "Europe", "Africa"];

    return (
        <div>
            <div className="tabs">
                {regions.map((r) => (
                    <button
                        key={r}
                        className={selectedRegion === r ? "active" : ""}
                        onClick={() => setSelectedRegion(r)}
                    >
                        {r}
                    </button>
                ))}
            </div>

            <div>
                {filteredCountries.map((country) => (
                    <div key={country.id} className="country-section">
                        <h4>{country.name}</h4>
                        <div className="city-chips">
                            {country.cities.map((c) => (
                                <span
                                    key={c.id}
                                    className="city-chip"
                                    onClick={() => navigate(`/city/${c.id}`)}
                                >
                                    {c.city}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
