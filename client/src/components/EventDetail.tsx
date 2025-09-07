import type { PollingEvent } from './EventTypes';
import WeatherAt from './WeatherAt';

type Props = { data: PollingEvent };

export default function EventDetail({ data }: Props) {
    return (
        <div style={{ padding: 16 }}>
            <h1>{data.title}</h1>
            <p>Lokace: {data.location ?? '—'}</p>

            {Array.isArray(data.dates) && data.dates.length > 0 ? (
                <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: 800 }}>
                    <thead>
                    <tr>
                        <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Datum/čas</th>
                        <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Počasí</th>
                        <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Účastníci</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.dates.map((d) => (
                        <tr key={d.timestamp}>
                            <td style={{ padding: 8, borderBottom: '1px solid #f3f4f6' }}>
                                {new Date(d.timestamp).toLocaleString()}
                            </td>
                            <td style={{ padding: 8, borderBottom: '1px solid #f3f4f6' }}>
                                {data.location ? (
                                    <WeatherAt city={data.location} timestamp={d.timestamp} />
                                ) : (
                                    <small>—</small>
                                )}
                            </td>
                            <td style={{ padding: 8, borderBottom: '1px solid #f3f4f6' }}>
                                {d.records?.length ? (
                                    d.records.map((r, i) => (
                                        <span key={i}>
                        {r.name} ({r.answer})
                                            {i < d.records.length - 1 ? ', ' : ''}
                      </span>
                                    ))
                                ) : (
                                    <span>—</span>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Žádné termíny.</p>
            )}
        </div>
    );
}
