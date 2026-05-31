// resources/js/Pages/serveur/commande/Edit.jsx
import ServeurLayout from '@/Layouts/ServeurLayout';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ commande, commandeSession }) {
    const [platsASupprimer, setPlatsASupprimer] = useState([]);
    const [quantites, setQuantites] = useState(
        Object.fromEntries(commande.plats.map(p => [p.id, p.nombre]))
    );

    function toggleSupprimer(platId) {
        setPlatsASupprimer(prev =>
            prev.includes(platId)
                ? prev.filter(id => id !== platId)
                : [...prev, platId]
        );
    }

    function handleSupprimer(e) {
        e.preventDefault();
        if (platsASupprimer.length === 0) return;

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = route('serveur.commande.update', commande.id);

        const methodField = document.createElement('input');
        methodField.type = 'hidden';
        methodField.name = '_method';
        methodField.value = 'PUT';
        form.appendChild(methodField);

        const tokenField = document.createElement('input');
        tokenField.type = 'hidden';
        tokenField.name = '_token';
        tokenField.value = document.querySelector('meta[name="csrf-token"]')?.content ?? '';
        form.appendChild(tokenField);

        const actionField = document.createElement('input');
        actionField.type = 'hidden';
        actionField.name = 'action';
        actionField.value = 'supprimer';
        form.appendChild(actionField);

        platsASupprimer.forEach(id => {
            const f = document.createElement('input');
            f.type = 'hidden';
            f.name = 'plats_a_supprimer[]';
            f.value = id;
            form.appendChild(f);
        });

        document.body.appendChild(form);
        form.submit();
    }

    function handleMettreAJour(e) {
        e.preventDefault();

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = route('serveur.commande.update', commande.id);

        const methodField = document.createElement('input');
        methodField.type = 'hidden';
        methodField.name = '_method';
        methodField.value = 'PUT';
        form.appendChild(methodField);

        const tokenField = document.createElement('input');
        tokenField.type = 'hidden';
        tokenField.name = '_token';
        tokenField.value = document.querySelector('meta[name="csrf-token"]')?.content ?? '';
        form.appendChild(tokenField);

        const actionField = document.createElement('input');
        actionField.type = 'hidden';
        actionField.name = 'action';
        actionField.value = 'mettre_a_jour';
        form.appendChild(actionField);

        Object.entries(quantites).forEach(([platId, nombre]) => {
            const f = document.createElement('input');
            f.type = 'hidden';
            f.name = `quantites[${platId}]`;
            f.value = nombre;
            form.appendChild(f);
        });

        document.body.appendChild(form);
        form.submit();
    }

    return (
        <ServeurLayout commande={commandeSession}>
            <div style={{ maxWidth: '700px', margin: '0 auto', background: '#fff', borderRadius: '8px', padding: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                        {commande.plats.map((plat) => (
                            <tr key={plat.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                {/* Checkbox */}
                                <td style={{ padding: '10px', width: '30px' }}>
                                    <input
                                        type="checkbox"
                                        checked={platsASupprimer.includes(plat.id)}
                                        onChange={() => toggleSupprimer(plat.id)}
                                    />
                                </td>

                                {/* Nom */}
                                <td style={{ padding: '10px' }}>{plat.intitulé}</td>

                                {/* Quantité */}
                                <td style={{ padding: '10px', width: '80px' }}>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantites[plat.id] ?? plat.nombre}
                                        onChange={e => setQuantites(prev => ({
                                            ...prev,
                                            [plat.id]: parseInt(e.target.value) || 1,
                                        }))}
                                        style={{
                                            width: '60px', padding: '4px',
                                            border: '1px solid #d1d5db', borderRadius: '4px',
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}

                        {/* Ligne total */}
                        <tr>
                            <td colSpan={2} />
                            <td style={{ padding: '10px', fontWeight: 'bold', textAlign: 'right', whiteSpace: 'nowrap' }}>
                                Total: {commande.total} Dhs
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Boutons */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                    <button
                        onClick={handleSupprimer}
                        style={{
                            padding: '7px 16px', background: '#ef4444',
                            color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer',
                        }}
                    >
                        Supprimer
                    </button>
                    <button
                        onClick={handleMettreAJour}
                        style={{
                            padding: '7px 16px', background: '#3b82f6',
                            color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer',
                        }}
                    >
                        Mettre à jour
                    </button>
                    <Link
                        href={route('dashboard')}
                        style={{
                            padding: '7px 16px', background: '#e5e7eb',
                            color: '#111', borderRadius: '6px', textDecoration: 'none',
                        }}
                    >
                        Ajouter un autre plat
                    </Link>
                </div>
            </div>
        </ServeurLayout>
    );
}