import { useWeather } from './useWeather';

type Props = {
    lat?: number;
    lon?: number;
    title?: string;
};

export default function Weather({ lat, lon, title = 'Počasí' }: Props) {
    const { now, loading, error } = useWeather({ lat, lon });

    if (loading) return <div>Načítám počasí…</div>;
    if (error)   return <div style={{ color: 'crimson' }}>Počasí: {error}</div>;
    if (!now)    return <div>Počasí není k dispozici.</div>;

    const when = new Date(now.time).toLocaleString();

    return (
        <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 8, display: 'inline-block' }}>
            <strong>{title}</strong>
            <div>Aktuálně: {now.temperature} °C</div>
            <div>Vítr: {now.windspeed} km/h (směr {now.winddirection}°)</div>
            <small>Aktualizováno: {when}</small>
        </div>
    );
}
