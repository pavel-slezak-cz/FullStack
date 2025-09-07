import { useEffect, useState } from 'react';

export type WeatherNow = {
    temperature: number;       // °C
    windspeed: number;         // km/h (Open-Meteo vrací v km/h)
    winddirection: number;     // °
    time: string;              // ISO
};

export type WeatherState = {
    now: WeatherNow | null;
    loading: boolean;
    error: string | null;
};

type Options = {
    lat?: number;
    lon?: number;
};

export function useWeather(opts: Options = {}) {
    const lat = opts.lat ?? 50.0755;   // Praha
    const lon = opts.lon ?? 14.4378;

    const [state, setState] = useState<WeatherState>({
        now: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        let cancel = false;

        async function run() {
            try {
                setState((s) => ({ ...s, loading: true, error: null }));
                const url = new URL('https://api.open-meteo.com/v1/forecast');
                url.searchParams.set('latitude', String(lat));
                url.searchParams.set('longitude', String(lon));
                url.searchParams.set('current_weather', 'true');
                url.searchParams.set('timezone', 'auto');

                const r = await fetch(url.toString());
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                const json = await r.json();

                const now: WeatherNow = {
                    temperature: json.current_weather?.temperature,
                    windspeed: json.current_weather?.windspeed,
                    winddirection: json.current_weather?.winddirection,
                    time: json.current_weather?.time,
                };

                if (!cancel) {
                    setState({ now, loading: false, error: null });
                }
            } catch (e: any) {
                if (!cancel) {
                    setState({ now: null, loading: false, error: e?.message ?? 'Nepodařilo se načíst počasí' });
                }
            }
        }

        run();
        return () => { cancel = true; };
    }, [lat, lon]);

    return state;
}
