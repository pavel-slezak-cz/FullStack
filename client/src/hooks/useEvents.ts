import { useEffect, useState } from 'react';
import { Fetcher } from 'openapi-typescript-fetch';
import type { paths } from '../types';

type EventResponse =
    paths['/api/events/{id}']['get']['responses']['200']['content']['application/json'];

export const useEvent = (id: number) => {
    const [event, setEvent] = useState<EventResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetcher = Fetcher.for<paths>();
                const getEvent = fetcher.path('/api/events/{id}').method('get').create();
                const res = await getEvent({ id }); // 👈 jen { id }, bez 'params'
                setEvent(res.data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return { event, loading, error };
};
