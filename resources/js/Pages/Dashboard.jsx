// resources/js/Pages/serveur/Dashboard.jsx
import ServeurLayout from './ServeurLayout';
import { Link, router, useForm } from '@inertiajs/react';

function PlatCard({ plat, commande }) {
    const dejaDansCommande = commande?.plats?.some(p => p.id === plat.id) ?? false;

    const { data, setData, post, processing } = useForm({
        plat_id: plat.id,
        nombre: 1,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('serveur.commande.add_plat'));
    }

    return (
        <div style={{
            border: '1px solid #e5e7eb', borderRadius: '8px',
            overflow: 'hidden', background: '#fff', textAlign: 'center',
        }}>
            {/* Photo */}
            {plat.photo ? (
                <img
                    src={`/storage/${plat.photo}`}
                    alt={plat.intitulé}
                    style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                />
            ) : (
                <div style={{
                    width: '100%', height: '120px', background: '#f3f4f6',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', color: '#9ca3af',
                }}>
                    NO IMAGE<br />AVAILABLE
                </div>
            )}

            <div style={{ padding: '8px' }}>
                <p style={{ fontWeight: '500', fontSize: '13px', marginBottom: '2px' }}>{plat.intitulé}</p>
                <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '6px' }}>
                    {parseFloat(plat.prix).toFixed(2)}
                </p>

                {/* Formulaire d'ajout : affiché seulement si commande active et plat pas encore ajouté */}
                {commande && !dejaDansCommande && (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                        <input
                            type="number"
                            min="1"
                            value={data.nombre}
                            onChange={e => setData('nombre', e.target.value)}
                            style={{
                                width: '55px', padding: '3px 6px',
                                border: '1px solid #d1d5db', borderRadius: '4px',
                                fontSize: '13px',
                            }}
                        />
                        <button
                            type="submit"
                            disabled={processing}
                            style={{
                                width: '30px', height: '30px',
                                background: '#3b82f6', color: '#fff',
                                border: 'none', borderRadius: '50%',
                                cursor: 'pointer', fontSize: '16px',
                                lineHeight: '1',
                            }}
                            title="Ajouter"
                        >
                            +
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default function Dashboard({ categories, plats, categorieActive, commande }) {
    return (
        <ServeurLayout commande={commande}>
            {/* Barre des catégories */}
            <div style={{
                display: 'flex', gap: '20px', flexWrap: 'wrap',
                justifyContent: 'center', marginBottom: '24px',
            }}>
                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        href={route('dashboard.categorie.show', { categorie: cat.id })}
                        style={{ textAlign: 'center', textDecoration: 'none', color: '#111' }}
                    >
                        {cat.photo ? (
                            <img
                                src={`/storage/${cat.photo}`}
                                alt={cat.titre}
                                style={{
                                    width: '60px', height: '60px',
                                    objectFit: 'cover', borderRadius: '50%',
                                    border: categorieActive?.id === cat.id ? '3px solid #3b82f6' : '3px solid transparent',
                                }}
                            />
                        ) : (
                            <div style={{
                                width: '60px', height: '60px', borderRadius: '50%',
                                background: '#e5e7eb', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                fontSize: '10px', color: '#9ca3af',
                            }}>
                                N/A
                            </div>
                        )}
                        <p style={{ fontSize: '12px', marginTop: '4px' }}>{cat.titre}</p>
                    </Link>
                ))}
            </div>

            {/* Grille des plats */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: '16px',
                maxWidth: '1100px',
                margin: '0 auto',
            }}>
                {plats.map((plat) => (
                    <PlatCard key={plat.id} plat={plat} commande={commande} />
                ))}
            </div>
        </ServeurLayout>
    );
}