// client/src/components/Navigation.tsx
import { NavLink } from 'react-router-dom';

export default function Navigation() {
    const linkBase: React.CSSProperties = {
        padding: '8px 12px',
        borderRadius: 8,
        textDecoration: 'none',
        color: '#1f2937',
    };
    const activeStyle: React.CSSProperties = {
        ...linkBase,
        background: '#eef2ff',
        color: '#4338ca',
        fontWeight: 600,
    };
    const navStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: 12,
        borderBottom: '1px solid #e5e7eb',
    };

    return (
        <nav style={navStyle}>
            <NavLink to="/events" style={({ isActive }) => (isActive ? activeStyle : linkBase)} end>
                Události
            </NavLink>
            <NavLink to="/events/new" style={({ isActive }) => (isActive ? activeStyle : linkBase)}>
                Nová událost
            </NavLink>
        </nav>
    );
}
