// client/src/components/WeatherAt.tsx
import { useEffect, useMemo, useState } from 'react';

const geoCache = new Map<string, { lat: number; lon: number }>();

type WeatherPoint = {
    time: string;
    temperature: number;
    precipitation: number;
    windspeed: number;
    winddirection: number;
    source: 'forecast' | 'archive';
};

type Props = {
    city: string | undefined;
    timestamp: number; // ms since epoch
};

export default function WeatherAt({ city, timestamp }: Props) {
    const [wp, setWp] = useState<WeatherPoint | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const eventDate = useMemo(() => new Date(timestamp), [timestamp]);
    const ymd = (d: Date) => {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    useEffect(() => {
        let cancel = false;
        async function load() {
            try {
                setLoading(true);
                setError(null);
                setWp(null);
                if (!city || !city.trim()) throw new Error('Chybí město u události');

                let coords = geoCache.get(city);
                if (!coords) {
                    const geoUrl = new URL('https://geocoding-api.open-meteo.com/v1/search');
                    geoUrl.searchParams.set('name', city);
                    geoUrl.searchParams.set('count', '1');
                    geoUrl.searchParams.set('language', 'cs');
                    geoUrl.searchParams.set('format', 'json');
                    const gr = await fetch(geoUrl.toString());
                    if (!gr.ok) throw new Error(`Geocoding HTTP ${gr.status}`);
                    const gjson = await gr.json();
                    const first = gjson?.results?.[0];
                    if (!first) throw new Error(`Město „${city}” nenalezeno`);
                    coords = { lat: first.latitude, lon: first.longitude };
                    geoCache.set(city, coords);
                }

                const now = Date.now();
                const isPast = timestamp < now - 12 * 60 * 60 * 1000;
                const base = isPast
                    ? 'https://archive-api.open-meteo.com/v1/era5'
                    : 'https://api.open-meteo.com/v1/forecast';

                const day = ymd(eventDate);
                const url = new URL(base);
                url.searchParams.set('latitude', String(coords.lat));
                url.searchParams.set('longitude', String(coords.lon));
                url.searchParams.set('hourly', 'temperature_2m,precipitation,windspeed_10m,winddirection_10m');
                url.searchParams.set('start_date', day);
                url.searchParams.set('end_date', day);
                url.searchParams.set('timezone', 'auto');

                const r = await fetch(url.toString());
                if (!r.ok) throw new Error(`Weather HTTP ${r.status}`);
                const j = await r.json();

                const times: string[] = j?.hourly?.time ?? [];
                const temps: number[] = j?.hourly?.temperature_2m ?? [];
                const precs: number[] = j?.hourly?.precipitation ?? [];
                const winds: number[] = j?.hourly?.windspeed_10m ?? [];
                const dirs: number[] = j?.hourly?.winddirection_10m ?? [];
                if (!times.length) throw new Error('Počasí pro tento den není k dispozici');

                const target = eventDate.getTime();
                let bestIdx = 0, bestDiff = Infinity;
                for (let i = 0; i < times.length; i++) {
                    const tMs = new Date(times[i]).getTime();
                    const diff = Math.abs(tMs - target);
                    if (diff < bestDiff) { bestIdx = i; bestDiff = diff; }
                }

                const point: WeatherPoint = {
                    time: times[bestIdx],
                    temperature: temps[bestIdx],
                    precipitation: precs[bestIdx],
                    windspeed: winds[bestIdx],
                    winddirection: dirs[bestIdx],
                    source: isPast ? 'archive' : 'forecast',
                };
                if (!cancel) setWp(point);
            } catch (e: any) {
                if (!cancel) setError(e?.message ?? 'Nepodařilo se načíst počasí');
            } finally {
                if (!cancel) setLoading(false);
            }
        }
        load();
        return () => { cancel = true; };
    }, [city, timestamp]);

    if (loading) return <small>Počasí: načítám…</small>;
    if (error) return <small style={{ color: 'crimson' }}>Počasí: {error}</small>;
    if (!wp) return <small>Počasí: —</small>;

    const when = new Date(wp.time).toLocaleString();
    return (
        <div style={{ fontSize: 12, lineHeight: 1.4 }}>
            <strong>Počasí</strong> ({wp.source === 'archive' ? 'historie' : 'předpověď'}):{' '}
            {wp.temperature}°C, vítr {wp.windspeed} km/h, srážky {wp.precipitation} mm
            <div><small>{when}</small></div>
        </div>
    );
}
