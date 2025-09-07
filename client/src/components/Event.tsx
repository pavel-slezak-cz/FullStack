// src/components/Event.tsx
import type { PollingEvent } from './EventTypes';
import EventHeader from './EventHeader';
import EventTable from './EventTable';

export const Event: React.FC<PollingEvent> = (props) => {
    return (
        <div>
            <EventHeader title={props.title} location={props.location} />
            <EventTable dates={props.dates} />
        </div>
    );
};
