// src/components/EventTable.tsx
import type { DateRecord } from './EventTypes';

type EventTableProps = {
    dates: DateRecord[];
};

export const EventTable: React.FC<EventTableProps> = ({ dates }) => {
    // všechna unikátní jména účastníků
    const participants = Array.from(
        new Set(dates.flatMap(d => d.records.map(r => r.name)))
    );

    return (
        <table border={1}>
            <thead>
            <tr>
                <th>Participant</th>
                {dates.map(d => (
                    <th key={d.timestamp}>
                        {new Date(d.timestamp).toLocaleDateString()}
                    </th>
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
};
