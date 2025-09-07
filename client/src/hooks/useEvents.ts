import { useEffect, useState } from 'react'
import type { PollingEvent } from '../components/EventTypes'

export function useEvent(id: number | string) {
    const [event, setEvent] = useState<PollingEvent | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        const run = async () => {
            try {
                const r = await fetch(`/api/events/${id}`)
                if (!r.ok) throw new Error(`${r.status} ${r.statusText}`)
                const obj = (await r.json()) as PollingEvent // detail vrací jeden objekt
                if (!cancelled) setEvent(obj)
            } catch (e: any) {
                if (!cancelled) setError(e?.message ?? 'Chyba při načítání detailu')
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        setLoading(true)
        setError(null)
        setEvent(null)
        run()

        return () => { cancelled = true }
    }, [id])

    return { event, loading, error }
}
