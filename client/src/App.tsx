import {Routes, Route, Navigate, useParams} from 'react-router-dom'
import EventsList from './components/EventsList'
import EventDetail from './components/EventDetail'
import NewEventForm from './components/NewEventForm'
import Navigation from './components/Navigation'
import {useEvent} from './hooks/useEvent'

export default function App() {
    return (
        <>
            <Navigation/>
            <Routes>
                <Route path="/" element={<Navigate to="/events" replace/>}/>
                <Route path="/events" element={<EventsList/>}/>
                <Route path="/events/new" element={<NewEventForm/>}/>
                <Route path="/events/:id" element={<EventDetailWrapper/>}/>
                <Route path="*" element={<Navigate to="/events" replace/>}/>
            </Routes>
        </>
    )
}

function EventDetailWrapper() {
    const { id } = useParams<{ id: string }>()
    const safeId = id ?? ''                  // vždy string
    const { event, loading, error } = useEvent(safeId)

    if (loading) return <p>Načítám...</p>
    if (error) return <p style={{ color: 'red' }}>{error}</p>
    if (!event) return <p>Událost nenalezena.</p>

    return <EventDetail data={event} />
}
