import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewEventForm() {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [dates, setDates] = useState<string[]>(['']);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleDateChange = (index: number, value: string) => {
        const newDates = [...dates];
        newDates[index] = value;
        setDates(newDates);
    };

    const addDateField = () => {
        if (dates.length < 10) {
            setDates([...dates, '']);
        }
    };

    const removeDateField = (index: number) => {
        const newDates = dates.filter((_, i) => i !== index);
        setDates(newDates);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('Název události je povinný.');
            return;
        }

        const parsedDates = dates
            .map((d) => new Date(d).getTime())
            .filter((ts) => !isNaN(ts));

        if (parsedDates.length === 0) {
            setError('Musíte zadat alespoň jedno platné datum.');
            return;
        }

        const payload = {
            title,
            location,
            dates: parsedDates,
            name: 'Organizátor', // pevně nastaveno
        };

        try {
            console.log('📤 Odesílám payload:', payload); // ✅ log do konzole

            await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            navigate('/events');
        } catch (err) {
            console.error('Chyba při odesílání:', err);
            setError('Nepodařilo se odeslat formulář.');
        }
    };

    return (
        <div>
            <h1>Nová událost</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Název události*:</label><br />
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Místo konání:</label><br />
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <div>
                    <label>Data konání (1–10):</label>
                    {dates.map((date, index) => (
                        <div key={index}>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => handleDateChange(index, e.target.value)}
                            />
                            {dates.length > 1 && (
                                <button type="button" onClick={() => removeDateField(index)}>Odstranit</button>
                            )}
                        </div>
                    ))}
                    {dates.length < 10 && (
                        <button type="button" onClick={addDateField}>Přidat datum</button>
                    )}
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="submit">Odeslat</button>
            </form>
        </div>
    );
}
