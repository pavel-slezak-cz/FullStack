// src/components/EventTypes.ts

export type UserRecord = {
    name: string;
    answer: 'yes' | 'no' | 'if-needed';
};

export type DateRecord = {
    timestamp: number;
    records: UserRecord[];
};

export type EventProps = {
    location?: string;
    id: string;
    title: string;
    dates: DateRecord[];
};
