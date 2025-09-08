import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Fetcher } from 'openapi-typescript-fetch'
import type { paths } from '../types'

const client = Fetcher.for<paths>()

// správné nastavení base URL pomocí configure
client.configure({
    baseUrl: 'http://localhost:4000',
})

export default function EventsList() {
    const [data, setData] = useState<any[] | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const call = client.path('/api/events').method('get').create()
                const response = await call({})
                setData(response.data.items)
            } catch (e) {
                setError(String(e))
            }
        }

        fetchEvents()
    }, [])

    if (error) return <div style={{ color: 'crimson' }}>Error: {error}</div>
    if (!data) return <div>Načítám…</div>
    if (data.length === 0) return <div>Žádné události.</div>

    return (
        <div style={{ padding: 16 }}>
            <h1>Události</h1>
            <ul>
                {data.map((e) => (
                    <li key={e.id}>
                        <Link to={`/events/${e.id}`}>{e.title}</Link>
                        {e.location ? ` (${e.location})` : ''}
                    </li>
                ))}
            </ul>
        </div>
    )
}
