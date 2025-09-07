import { Event } from './Event';
import { Weather } from './Weather';
import type { PollingEvent } from './EventTypes';

type EventDetailProps = {
    data: PollingEvent;
};

export default function EventDetail({ data }: EventDetailProps) {
    return (
        <div>
            <h1>Detail události</h1>
            <Event {...data} />
            {data.location && <Weather location={data.location} />}
        </div>
    );
}
