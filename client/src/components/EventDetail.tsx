import { EventHeader } from './EventHeader'
import EventTable from './EventTable'
import type { components } from '../types'

type Event = components['schemas']['Event']

interface Props {
    data: Event
}

export default function EventDetail({ data }: Props) {
    return (
        <div style={{ padding: 16 }}>
            <EventHeader title={data.title} location={data.location ?? undefined} />
            <EventTable dates={data.dates ?? []} />
        </div>
    )
}
