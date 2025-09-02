import { Link } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';

export default function EventsList() {
    const { events, loading, error } = useEvents();

    if (loading) return <p>Načítám události...</p>;
    if (error) return <p style={{ color: 'red' }}>Chyba: {error}</p>;
    if (!events || events.length === 0) return <p>Žádné události</p>;

    return (
        <ul>
            {events.map(ev => (
                <li key={ev.id}>
                    <Link to={`/events/${ev.id}`}>{ev.title}</Link> ({ev.location})
                </li>
            ))}
        </ul>
    );
}