// src/components/EventTable.tsx
import React from 'react';
import type { DateRecord } from './EventTypes';

type EventTableProps = {
    dates: DateRecord[];
    participants: string[];
};

export const EventTable: React.FC<EventTableProps> = ({ dates, participants }) => (
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
);
