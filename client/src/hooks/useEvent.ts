import { useEffect, useState } from 'react';
import type { PollingEvent } from '../components/EventTypes';


export function useEvent(id: number) {
    const [event, setEvent] = useState<PollingEvent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/events/${id}`);
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                const data = await res.json();
                setEvent(data);
            } catch (err: any) {
                setError(err.message || 'Neznámá chyba při načítání události');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    return { event, loading, error };
}
