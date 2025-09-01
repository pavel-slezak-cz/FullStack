import { useWeather } from './useWeather';

type WeatherProps = {
    location: string;
};

export function Weather({ location }: WeatherProps) {
    const { weather, error } = useWeather(location);

    if (error) return <p>Počasí se nepodařilo načíst: {error}</p>;
    if (!weather) return <p>Načítám počasí pro {location}...</p>;

    return (
        <p>
            Aktuální teplota v {location}: {weather.temperature}°C (měřeno v {weather.time})
        </p>
    );
}
