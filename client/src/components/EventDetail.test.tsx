import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import EventDetail from './EventDetail';
import type { PollingEvent } from './EventTypes';

//  Mockujeme globální fetch
global.fetch = vi.fn();

const mockEvent: PollingEvent = {
    id: '1',
    title: 'Testovací událost',
    location: 'Praha',
    dates: [
        {
            timestamp: new Date('2025-09-01').getTime(),
            records: [
                { name: 'Pavel', answer: 'yes' },
                { name: 'Jana', answer: 'no' },
            ],
        },
    ],
};

describe('EventDetail component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders event data and weather', async () => {
        // 🔧 Mock geolokace
        (fetch as any)
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    results: [{ latitude: 50.08, longitude: 14.42 }],
                }),
            })
            // 🔧 Mock počasí
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    current: {
                        temperature_2m: 22.5,
                        time: '2025-09-01T12:00:00',
                    },
                }),
            });

        render(<EventDetail data={mockEvent} />);

        // Ověření statického obsahu
        expect(screen.getByText(/Testovací událost/)).toBeInTheDocument();

        // Ověření počasí (načítání + výsledek)
        await waitFor(() =>
            expect(
                screen.getByText(/Aktuální teplota v Praha: 22.5°C/)
            ).toBeInTheDocument()
        );
    });

    it('handles weather API error', async () => {
        (fetch as any)
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ results: [] }), // žádná lokalita
            });

        render(<EventDetail data={mockEvent} />);

        await waitFor(() =>
            expect(
                screen.getByText(/Počasí se nepodařilo načíst/i)
            ).toBeInTheDocument()
        );
    });

    it('handles fetch failure', async () => {
        (fetch as any).mockRejectedValueOnce(new Error('API down'));

        render(<EventDetail data={mockEvent} />);

        await waitFor(() =>
            expect(
                screen.getByText(/Počasí se nepodařilo načíst/i)
            ).toBeInTheDocument()
        );
    });
});
