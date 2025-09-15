import express from 'express';
import cors from 'cors';
import db from './db';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// ---------------- Typy pro databázové tabulky ----------------
type EventRow = {
    id: number;
    title: string;
    location: string;
    created_at: string;
};

type DateRow = {
    id: number;
    event_id: number;
    timestamp: number;
};

type ResponseRow = {
    id: number;
    date_id: number;
    name: string;
    answer: 'yes' | 'no' | 'maybe';
};

// ---------------- Middleware pro logování requestů ----------------
app.use((req, _res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// ---------------- GET /api/events ----------------
app.get('/api/events', (req, res) => {
    const events = db.prepare('SELECT * FROM events').all() as EventRow[];
    res.json({ items: events });
});

// ---------------- GET /api/events/:id ----------------
app.get('/api/events/:id', (req, res) => {
    const id = Number(req.params.id);

    const event = db.prepare('SELECT * FROM events WHERE id = ?').get(id) as EventRow | undefined;
    if (!event) {
        return res.status(404).json({ error: 'Event not found' });
    }

    // Načteme termíny
    const dates = db.prepare('SELECT * FROM dates WHERE event_id = ?').all(id) as DateRow[];

    // Načteme odpovědi pro každý termín
    const responses = db.prepare('SELECT * FROM responses WHERE date_id = ?');

    const datesWithResponses = dates.map(date => {
        return {
            ...date,
            records: responses.all(date.id) as ResponseRow[]
        };
    });

    res.json({
        ...event,
        dates: datesWithResponses
    });
});

// ---------------- POST /api/events ----------------
app.post('/api/events', (req, res) => {
    const { title, location, dates } = req.body;

    if (!title || !location || !Array.isArray(dates) || dates.length === 0) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    const insertEvent = db.prepare(`
    INSERT INTO events (title, location) VALUES (?, ?)
  `);
    const result = insertEvent.run(title, location);
    const eventId = result.lastInsertRowid as number;

    const insertDate = db.prepare(`
    INSERT INTO dates (event_id, timestamp) VALUES (?, ?)
  `);
    for (const ts of dates) {
        insertDate.run(eventId, ts);
    }

    res.status(201).json({ id: eventId, title, location, dates });
});

// ---------------- Healthcheck ----------------
app.get('/health', (_req, res) => {
    res.json({ ok: true, time: new Date().toISOString() });
});

// ---------------- Spuštění serveru ----------------
app.listen(PORT, () => {
    console.log(`🚀 Server běží na http://localhost:${PORT}`);
});
