import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { PollingEvent } from './EventTypes'

export default function EventsList() {
    const [data, setData] = useState<PollingEvent[] | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch('/api/events')
            .then(async (r) => {
                if (!r.ok) throw new Error(`${r.status} ${r.statusText}`)
                const json = await r.json()
                const items = Array.isArray(json) ? json : json.items // server vrací { items: [...] }
                if (!Array.isArray(items)) throw new Error('Neplatná odpověď API (chybí items)')
                return items as PollingEvent[]
            })
            .then(setData)
            .catch((e) => setError(String(e)))
    }, [])

    if (error) return <div style={{ color: 'crimson' }}>Error: {error}</div>
    if (!data) return <div>Načítám…</div>
    if (data.length === 0) return <div>Žádné události.</div>

    return (
        <div style={{ padding: 16 }}>
            <h1>Události</h1>
            <ul>
                {data.map((e) => (
                    <li key={String(e.id)}>
                        <Link to={`/events/${e.id}`}>{e.title}</Link>
                        {e.location ? ` (${e.location})` : ''}
                    </li>
                ))}
            </ul>
        </div>
    )
}
