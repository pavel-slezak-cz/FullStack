import type { PollingEvent } from '../components/EventTypes'

export const sampleEvents: PollingEvent[] = [
    {
        id: 1,
        title: 'Tým building',
        location: 'Praha',
        dates: [
            {
                timestamp: 1726514405258,
                records: [
                    { name: 'Honza', answer: 'yes' },
                    { name: 'Jana', answer: 'no' },
                ],
            },
            {
                timestamp: 1726600861177,
                records: [{ name: 'Jana', answer: 'no' }],
            },
        ],
    },
    {
        id: 2,
        title: 'Workshop',
        location: 'Brno',
        dates: [],
    },
]
