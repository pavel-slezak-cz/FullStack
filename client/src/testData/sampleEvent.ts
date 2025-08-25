// src/testData/sampleEvent.ts
import type { EventProps } from '../components/EventTypes';

export const sampleEvent: EventProps = {
    id: '1',
    title: 'Team Meeting',
    location: 'Conference Room',
    dates: [
        {
            timestamp: new Date('2025-08-25').getTime(),
            records: [
                { name: 'Alice', answer: 'yes' },
                { name: 'Bob', answer: 'no' },
            ],
        },
        {
            timestamp: new Date('2025-08-26').getTime(),
            records: [
                { name: 'Alice', answer: 'if-needed' },
                { name: 'Bob', answer: 'yes' },
            ],
        },
    ],
};
