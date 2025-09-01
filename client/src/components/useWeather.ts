import { useEffect, useState } from 'react';

type WeatherData = {
    temperature: number;
    time: string;
};

export function useWeather(location: string) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchWeather() {
            try {
                const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=cs&format=json`);
                const geoData = await geo.json();
                const [place] = geoData.results ?? [];
                if (!place) throw new Error('Location not found');

                const weatherRes = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m`
                );
                const weatherData = await weatherRes.json();

                setWeather({
                    temperature: weatherData.current.temperature_2m,
                    time: weatherData.current.time,
                });
            } catch (err: any) {
                setError(err.message ?? 'Unknown error');
            }
        }

        fetchWeather();
    }, [location]);

    return { weather, error };
}
