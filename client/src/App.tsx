import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import EventsList from './components/EventsList';
import EventDetail from './components/EventDetail';
import NewEventForm from './components/NewEventForm';
import Navigation from './components/Navigation';
import type { PollingEvent } from './components/EventTypes';
import { sampleEvents } from './testdata/sampleEvents';

export default function App() {
    const data: PollingEvent[] = sampleEvents;

    return (
        <>
            <Navigation /> {/* 🧭 Vždy viditelné menu */}
            <Routes>
                <Route path="/" element={<Navigate to="/events" replace />} />
                <Route path="/events" element={<EventsList data={data} />} />
                <Route path="/events/new" element={<NewEventForm />} />
                <Route path="/events/:id" element={<EventWrapper data={data} />} />
            </Routes>
        </>
    );
}

function EventWrapper({ data }: { data: PollingEvent[] }) {
    const { id } = useParams<{ id: string }>();
    const event = data.find((e) => e.id === id);

    if (!event) {
        return <p>Událost nenalezena.</p>;
    }

    return <EventDetail data={event} />;
}
