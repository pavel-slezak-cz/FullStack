import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EventTable } from './EventTable';
import type { DateRecord } from './EventTypes';

const mockDates: DateRecord[] = [
    {
        timestamp: new Date('2025-09-10').getTime(),
        records: [
            { name: 'Alice', answer: 'yes' },
            { name: 'Bob', answer: 'no' },
        ],
    },
    {
        timestamp: new Date('2025-09-11').getTime(),
        records: [{ name: 'Alice', answer: 'if-needed' }],
    },
];

describe('EventTable', () => {
    it('renders a table with participants and answers', () => {
        render(<EventTable dates={mockDates} />);

        expect(screen.getByText('Participant')).toBeInTheDocument();
        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.getByText('Bob')).toBeInTheDocument();
        expect(screen.getByText('yes')).toBeInTheDocument();
        expect(screen.getByText('no')).toBeInTheDocument();
        expect(screen.getByText('if-needed')).toBeInTheDocument();
        expect(screen.getAllByRole('row')).toHaveLength(3); // header + 2 rows
    });
});
