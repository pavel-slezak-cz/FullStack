import React from 'react';
import type { EventProps } from './EventTypes';
import { EventHeader } from './EventHeader';
import { EventTable } from './EventTable';

export const Event: React.FC<EventProps> = (props) => {
    return (
        <div>
            <EventHeader title={props.title} location={props.location} />
            <EventTable dates={props.dates} />
        </div>
    );
};
