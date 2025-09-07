// src/components/EventHeader.tsx
type EventHeaderProps = {
    title: string;
    location?: string;
};

export default function EventHeader({ title, location }: EventHeaderProps) {
    return (
        <div style={{ paddingBottom: 8 }}>
            <h2>{title}</h2>
            {location && <p>Místo: {location}</p>}
        </div>
    );
}
