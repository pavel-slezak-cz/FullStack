import { Link } from 'react-router-dom'
import type { EventsListProps } from './EventTypes'

export default function EventsList({ data }: EventsListProps) {
    return (
        <ul>
            {data.map(ev => (
                <li key={ev.id}>
                    <Link to={`/events/${ev.id}`}>{ev.title}</Link> ({ev.location})
                </li>
            ))}
        </ul>
    )
}
