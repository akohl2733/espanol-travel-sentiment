import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./CityDetail.css";

export default function CityDetail() {
    const {id} = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/city/${id}`);
                if (!response.ok) {
                    throw new Error(`Error fetching data. Status: ${response.status}`);
                } else {
                    console.log(response)
                    const data = await response.json();
                    setDetails(data);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [id]);

    if (loading) {
        return <div>Loading.....</div>
    }
    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="city-page">
            {/* Direct fields from City table */}
            <div className='city-page-header'>
                <h1>{details.city}</h1>
                <HomeButton />
            </div> 
            
            {/* Nested fields from Country table */}
            <h3>Located in: {details.country.name} ({details.country.region})</h3>

            {/* Mapping through the nested Climate list */}
            <div className="weather-grid">
            {details.climate_data.map((month) => (
                <div key={month.month} className="month-card">
                <p>
                    {numToMonth(month.month)}
                </p>
                <p>Average High: {month.avg_high_temp}°F</p>
                <p>Average Number of Rainy Days: {month.rainy_days}</p>
                </div>
            ))}
            </div>
        </div>
    );
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function numToMonth(num) {
    const month = months[num-1];
    return month;
}


function HomeButton() {
    const navigate = useNavigate();

    return (
        <div className="home-button-body">
            <button type="button" onClick={() => navigate("/")}>
                Go to Home Page.
            </button>
        </div>
    )
}
