import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { Event } from './components/Event';
import { sampleEvent } from './testData/sampleEvent';

describe('Event component', () => {
    it('renders title and location', () => {
        render(<Event {...sampleEvent} />);
        expect(screen.getByText('Team Meeting')).toBeInTheDocument();
        expect(screen.getByText('Conference Room')).toBeInTheDocument();
    });

    it('renders a table with participants and dates', () => {
        render(<Event {...sampleEvent} />);

        const table = screen.getByRole('table');
        const rows = within(table).getAllByRole('row');

        // přeskočíme hlavičku (rows[0])
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
