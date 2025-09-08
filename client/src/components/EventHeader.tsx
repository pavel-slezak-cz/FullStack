// src/components/EventHeader.tsx
interface Props {
    title: string;
    location?: string;
}

export function EventHeader({ title, location }: Props) {
    return (
        <h2>
            {title}
            {location ? ` (${location})` : ''}
        </h2>
    );
}
