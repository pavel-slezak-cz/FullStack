// src/components/EventTable.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { EventTable } from './EventTable';
import type { DateRecord } from './EventTypes';

const sampleDates: DateRecord[] = [
    {
        timestamp: new Date('2025-08-25').getTime(),
        records: [
            { name: 'Alice', answer: 'yes' },
            { name: 'Bob', answer: 'no' },
        ],
    },
    {
        timestamp: new Date('2025-08-26').getTime(),
        records: [
            { name: 'Alice', answer: 'if-needed' },
            { name: 'Bob', answer: 'yes' },
        ],
    },
];

describe('EventTable component', () => {
    it('renders participants and dates correctly', () => {
        const participants = ['Alice', 'Bob'];
        render(<EventTable dates={sampleDates} participants={participants} />);

        const table = screen.getByRole('table');
        const rows = within(table).getAllByRole('row');

        const aliceRowCells = within(rows[1]).getAllByRole('cell');
        expect(aliceRowCells[0]).toHaveTextContent('Alice');
        expect(aliceRowCells[1]).toHaveTextContent('yes');
        expect(aliceRowCells[2]).toHaveTextContent('if-needed');

        const bobRowCells = within(rows[2]).getAllByRole('cell');
        expect(bobRowCells[0]).toHaveTextContent('Bob');
        expect(bobRowCells[1]).toHaveTextContent('no');
        expect(bobRowCells[2]).toHaveTextContent('yes');
    });
});
