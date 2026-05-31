// resources/js/Layouts/VisiteurLayout.jsx
import { Link } from '@inertiajs/react';

export default function VisiteurLayout({ children }) {
    return (
        <div style={{ fontFamily: 'sans-serif' }}>
            {/* Navbar */}
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 20px',
                borderBottom: '1px solid #eee',
            }}>
                <span style={{ fontWeight: 'bold' }}>Mon Resto</span>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <Link href={route('menu')}>Menu</Link>
                    <a href="#">Présentation</a>
                    <a href="#">Localisation et horaires</a>
                    <a href="#">Contact</a>
                    <Link href="/login">Login</Link>
                </div>
            </nav>

            {/* Contenu */}
            <main style={{ padding: '20px' }}>
                {children}
            </main>
        </div>
    );
}