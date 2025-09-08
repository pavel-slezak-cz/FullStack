import type { components } from '../types'

type DateRecord = components['schemas']['DateRecord']

type Props = {
    dates: DateRecord[]
}

export default function EventTable({ dates }: Props) {
    if (!dates || dates.length === 0) {
        return <div>Žádné termíny</div>
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Datum</th>
                <th>Účastníci</th>
            </tr>
            </thead>
            <tbody>
            {dates.map((d) => (
                <tr key={d.timestamp}>
                    <td>{new Date(d.timestamp).toLocaleDateString()}</td>
                    <td>
                        {d.records?.map((r, i) => (
                            <span key={i}>
                                    {r.name} ({r.answer})
                                {i < d.records.length - 1 ? ', ' : ''}
                                </span>
                        ))}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}
