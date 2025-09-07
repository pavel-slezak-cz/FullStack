import { Link } from 'react-router-dom';

export default function Navigation() {
    return (
        <nav style={{ padding: '1em', borderBottom: '1px solid #ccc' }}>
            <Link to="/events" style={{ marginRight: '1em' }}>
                Seznam událostí
            </Link>
            <Link to="/events/new">
                Nová událost
            </Link>
        </nav>
    );
}
