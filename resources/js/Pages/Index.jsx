// resources/js/Pages/serveur/commande/Index.jsx
import ServeurLayout from '@/Layouts/ServeurLayout';
import { Link } from '@inertiajs/react';

function Actions({ commande }) {
    if (commande.etat === 'en_cours') {
        return (
            <Link
                href={route('commande.terminer', { commande: commande.id })}
                style={{ color: '#3b82f6', textDecoration: 'underline' }}
            >
                Terminé
            </Link>
        );
    }

    if (commande.etat === 'terminé') {
        return (
            <div style={{ display: 'flex', gap: '12px' }}>
                <Link
                    href={route('serveur.commande.changer_etat', { commande: commande.id, etat: 'servi' })}
                    style={{ color: '#10b981', textDecoration: 'underline' }}
                >
                    Servi
                </Link>
                <Link
                    href={route('serveur.commande.changer_etat', { commande: commande.id, etat: 'emporté' })}
                    style={{ color: '#f59e0b', textDecoration: 'underline' }}
                >
                    Emporté
                </Link>
            </div>
        );
    }

    return null;
}

export default function Index({ commandes, commande }) {
    return (
        <ServeurLayout commande={commande}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
                    <thead>
                        <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                            <th style={{ padding: '12px', textAlign: 'left' }}>#</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Plats</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Total</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Etat</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commandes.map((cmd) => (
                            <tr key={cmd.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                <td style={{ padding: '12px' }}>{cmd.id}</td>
                                <td style={{ padding: '12px' }}>
                                    <ul style={{ listStyle: 'disc', paddingLeft: '16px', margin: 0 }}>
                                        {cmd.plats.map((plat, idx) => (
                                            <li key={idx} style={{ fontSize: '13px' }}>
                                                {plat.intitulé} ({plat.nombre})
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>
                                    {cmd.total} Dhs
                                </td>
                                <td style={{ padding: '12px' }}>{cmd.etat}</td>
                                <td style={{ padding: '12px' }}>
                                    <Actions commande={cmd} />
                                </td>
                            </tr>
                        ))}

                        {commandes.length === 0 && (
                            <tr>
                                <td colSpan={5} style={{ padding: '20px', textAlign: 'center', color: '#9ca3af' }}>
                                    Aucune commande.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </ServeurLayout>
    );
}