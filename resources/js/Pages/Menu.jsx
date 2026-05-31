// resources/js/Pages/visiteur/Menu.jsx
import VisiteurLayout from './VisiteurLayout';
import { Link } from '@inertiajs/react';

export default function Menu({ categories }) {
    return (
        <VisiteurLayout>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px',
                maxWidth: '900px',
                margin: '0 auto',
            }}>
                {categories.map((categorie) => (
                    <div key={categorie.id} style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                        {/* Photo */}
                        {categorie.photo ? (
                            <img
                                src={`/storage/${categorie.photo}`}
                                alt={categorie.titre}
                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                            />
                        ) : (
                            <div style={{
                                width: '100%', height: '200px',
                                background: '#f0f0f0', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                color: '#999'
                            }}>
                                NO IMAGE AVAILABLE
                            </div>
                        )}

                        <div style={{ padding: '12px' }}>
                            <p style={{ fontWeight: '600', marginBottom: '8px' }}>{categorie.titre}</p>
                            <Link
                                href={route('plats_categorie', { categorie: categorie.id })}
                                style={{
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    background: '#3b82f6',
                                    color: '#fff',
                                    borderRadius: '4px',
                                    fontSize: '13px',
                                    textDecoration: 'none',
                                }}
                            >
                                Découvrir les {categorie.plats_count} plats
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </VisiteurLayout>
    );
}