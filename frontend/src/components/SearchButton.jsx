import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./SearchButton.css";

export default function SearchButton() {
    const [ query, setQuery ] = useState("");
    const [ options, setOptions ] = useState([]);
    const [ error, setError ] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // when user types, fetch options from endpoint
        const fetchCities = async () => {
            try {
                const res = await fetch(`http://localhost:8000/search_cities?q=${query}`)
                if (!res.ok) throw new Error(`Error: ${res.status}`);
                const data = await res.json();
                setOptions(data);
            } catch (err) {
                setError(err.message);
            }
        };

        // Wrap in timeout
        const timeoutId = setTimeout(() => {
            if (query.length > 1) {
                fetchCities();
            } else {
                setOptions([]);
            }
        }, 300);

        // If user types again within 300ms, kill old timer
        return () => clearTimeout(timeoutId)
    }, [query]);
        

    if (error) {
        return <div>Error: {error}</div>
    }


    return (
        <div className="search-page">
            <div className="search-body">
                <input 
                    type="text"
                    placeholder="Search for a city..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                {options.length > 0 && (
                    <ul className="option-list">
                        {options.map(city => (
                            <li key={city.id} onClick={() => navigate(`/city/${city.id}`)}>
                                {city.city}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}