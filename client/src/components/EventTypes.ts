export type PollAnswer = 'yes' | 'no' | 'maybe'

export type AttendanceRecord = {
    name: string
    answer: PollAnswer
}

export type EventDate = {
    timestamp: number       // ms od epochy
    records: AttendanceRecord[]
}

export type PollingEvent = {
    id: number | string
    title: string
    location?: string
    dates: EventDate[]
}
