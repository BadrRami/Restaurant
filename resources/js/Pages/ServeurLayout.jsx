// resources/js/Layouts/ServeurLayout.jsx
import { Link, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function ServeurLayout({ children, commande }) {
    const { auth } = usePage().props;
    const nbPlats = commande?.plats_count ?? 0;

    function handleNouvelleCommande() {
        router.get(route('serveur.commande.creer'));
    }

    function handleTerminer() {
        router.get(route('commande.terminer'));
    }

    function handleEditer() {
        if (commande) {
            router.get(route('serveur.commande.edit', commande.id));
        }
    }

    return (
        <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', background: '#f9fafb' }}>
            {/* Navbar */}
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 20px',
                background: '#fff',
                borderBottom: '1px solid #e5e7eb',
                position: 'sticky',
                top: 0,
                zIndex: 10,
            }}>
                {/* Logo + serveur */}
                <div>
                    <div style={{ fontWeight: 'bold', fontSize: '15px' }}>Mon Resto</div>
                    {auth?.user && (
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                            Serveur : {auth.user.name}
                        </div>
                    )}
                </div>

                {/* Liens centraux */}
                <div style={{ display: 'flex', gap: '24px' }}>
                    <Link href={route('dashboard')} style={{ textDecoration: 'none', color: '#111' }}>
                        Dashboard
                    </Link>
                    <Link href={route('serveur.commande.index')} style={{ textDecoration: 'none', color: '#111' }}>
                        Commandes
                    </Link>
                </div>

                {/* Bouton(s) commande */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {!commande ? (
                        <button
                            onClick={handleNouvelleCommande}
                            style={{
                                padding: '6px 16px', background: '#3b82f6',
                                color: '#fff', border: 'none', borderRadius: '6px',
                                cursor: 'pointer', fontWeight: '500',
                            }}
                        >
                            Nouvelle commande
                        </button>
                    ) : (
                        <>
                            <span style={{ fontSize: '13px', color: '#6b7280' }}>Commande créée</span>
                            <button
                                onClick={handleEditer}
                                style={{
                                    padding: '6px 14px', background: '#3b82f6',
                                    color: '#fff', border: 'none', borderRadius: '6px',
                                    cursor: 'pointer',
                                }}
                            >
                                Editer
                            </button>
                            <button
                                onClick={handleTerminer}
                                style={{
                                    padding: '6px 14px', background: '#10b981',
                                    color: '#fff', border: 'none', borderRadius: '6px',
                                    cursor: 'pointer',
                                }}
                            >
                                Terminer ({nbPlats})
                            </button>
                        </>
                    )}
                </div>
            </nav>

            {/* Contenu */}
            <main style={{ padding: '20px' }}>
                {children}
            </main>
        </div>
    );
}