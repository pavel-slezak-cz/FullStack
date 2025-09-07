import { useEffect, useState } from 'react';
import type { PollingEvent } from '../components/EventTypes';

export function useEvents() {
    const [events, setEvents] = useState<PollingEvent[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch('/api/events');
                if (!res.ok) throw new Error(`Chyba serveru: ${res.status}`);
                const data = await res.json();
                setEvents(data.items);
            } catch (err: any) {
                setError(err.message || 'Neznámá chyba při načítání událostí');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return { events, loading, error };
}
