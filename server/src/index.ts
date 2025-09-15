import express from 'express';
import cors from 'cors';
import db from './db';


const app = express();
const PORT = 4000;


app.use(cors());
app.use(express.json());

// dočasná databáze v paměti
let events = [
    {
        id: 1,
        location: 'Praha',
        title: 'Super akce',
        dates: [
            {
                timestamp: 1726514405258,
                records: [
                    { name: 'Honza', answer: 'yes' },
                    { name: 'Jana', answer: 'no' }
                ]
            },
            {
                timestamp: 1726600861177,
                records: [
                    { name: 'Jana', answer: 'no' }
                ]
            }
        ]
    },
    {
        id: 2,
        location: 'Brno',
        title: 'Super akce 2',
        dates: [
            {
                timestamp: 1726514405258,
                records: [
                    { name: 'Honza', answer: 'no' },
                    { name: 'Jana', answer: 'no' },
                    { name: 'Petr', answer: 'no' }
                ]
            },
            {
                timestamp: 1726600861177,
                records: [
                    { name: 'Jana', answer: 'no' }
                ]
            }
        ]
    }
];

// GET /api/events
app.get('/api/events', (req, res) => {
    res.json({ items: events });
});

// GET /api/events/:id
app.get('/api/events/:id', (req, res) => {
    const id = Number(req.params.id);
    const event = events.find((e) => e.id === id);
    if (!event) {
        return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
});

// POST /api/events
app.post('/api/events', (req, res) => {
    const { name, title, location, dates } = req.body;
    if (!name || !title || !Array.isArray(dates) || dates.length === 0) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    const newEvent = {
        id: events.length + 1,
        name,
        title,
        location,
        dates: dates.map((ts: number) => ({
            timestamp: ts,
            records: [], // přidáno!
        })),
    };

    events.push(newEvent);
    res.status(201).json(newEvent);
});
app.get('/health', (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));


// spuštění serveru
app.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
});
