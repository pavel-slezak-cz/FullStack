// src/components/Event.tsx
import React from 'react';
import type { EventProps } from './EventTypes';

export const Event: React.FC<EventProps> = ({ location, title, dates }) => {
    // získáme všechny unikátní jména účastníků
    const participants = Array.from(
        new Set(dates.flatMap(d => d.records.map(r => r.name)))
    );

    return (
        <div>
            <h2>{title}</h2>
            {location && <p>{location}</p>}
            <table border={1}>
                <thead>
                <tr>
                    <th>Participant</th>
                    {dates.map(d => (
                        <th key={d.timestamp}>{new Date(d.timestamp).toLocaleDateString()}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {participants.map(name => (
                    <tr key={name}>
                        <td>{name}</td>
                        {dates.map(d => {
                            const record = d.records.find(r => r.name === name);
                            return <td key={d.timestamp}>{record ? record.answer : '-'}</td>;
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
