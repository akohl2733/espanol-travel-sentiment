import React, { useEffect, useState } from 'react';

export default function DataFetcher() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/data");
                if (!response.ok) {
                    throw new Error(`HTTP Error! See status here ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
        <h1>Fetched Posts</h1>
        <ul>
            {Object.entries(data).map(([key, value]) => (
                <li key={key}>
                    <strong>{key}:</strong> {JSON.stringify(value)}
                </li>
            ))}
        </ul>
        </div>
    );
}
