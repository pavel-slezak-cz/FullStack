// src/components/EventHeader.tsx
import React from 'react';

type EventHeaderProps = {
    title: string;
    location?: string;
};

export const EventHeader: React.FC<EventHeaderProps> = ({ title, location }) => (
    <div>
        <h2>{title}</h2>
        {location && <p>{location}</p>}
    </div>
);
