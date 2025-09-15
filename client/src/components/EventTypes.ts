// Typ reprezentující odpověď účastníka
export type AttendanceRecord = {
    name: string;
    answer: 'yes' | 'no' | 'if-needed';
};

// Typ pro jeden termín události
export type DateRecord = {
    timestamp: number;
    records: AttendanceRecord[];
};
