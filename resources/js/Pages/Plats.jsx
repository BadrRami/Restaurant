// resources/js/Pages/visiteur/Plats.jsx
import VisiteurLayout from './VisiteurLayout';

function getEtoiles(nbCommandes) {
    if (nbCommandes > 100) return 5;
    if (nbCommandes >= 50) return 4;
    if (nbCommandes >= 20) return 3;
    if (nbCommandes > 4)  return 2;
    return 1;
}

function Stars({ count, total = 5 }) {
    return (
        <span style={{ color: '#f59e0b', fontSize: '16px' }}>
            {'★'.repeat(count)}{'☆'.repeat(total - count)}
            <span style={{ color: '#6b7280', fontSize: '12px', marginLeft: '4px' }}>({count})</span>
        </span>
    );
}

export default function Plats({ categorie }) {
    return (
        <VisiteurLayout>
            {/* Header catégorie */}
            <div style={{ position: 'relative', marginBottom: '30px' }}>
                {categorie.photo ? (
                    <img
                        src={`/storage/${categorie.photo}`}
                        alt={categorie.titre}
                        style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                ) : (
                    <div style={{
                        width: '100%', height: '250px', background: '#e5e7eb',
                        borderRadius: '8px', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', color: '#9ca3af'
                    }}>
                        NO IMAGE AVAILABLE
                    </div>
                )}
                {/* Badge */}
                <div style={{
                    position: 'absolute', top: '12px', left: '12px',
                    background: 'rgba(0,0,0,0.6)', color: '#fff',
                    padding: '6px 12px', borderRadius: '6px',
                }}>
                    <strong>{categorie.titre}</strong>
                    <span style={{ marginLeft: '8px', fontSize: '13px' }}>
                        {categorie.plats.length} plats
                    </span>
                </div>
            </div>

            {/* Liste des plats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
                {categorie.plats.map((plat) => {
                    const etoiles = getEtoiles(plat.commandes_count);
                    const composantsListe = plat.composants.map(c => c.libelle).join(', ');

                    return (
                        <div key={plat.id} style={{
                            display: 'flex', gap: '16px', alignItems: 'flex-start',
                            border: '1px solid #e5e7eb', borderRadius: '8px',
                            padding: '12px', background: '#fff'
                        }}>
                            {/* Photo plat */}
                            <div style={{ flexShrink: 0, width: '100px', height: '100px' }}>
                                {plat.photo ? (
                                    <img
                                        src={`/storage/${plat.photo}`}
                                        alt={plat.intitulé}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }}
                                    />
                                ) : (
                                    <div style={{
                                        width: '100%', height: '100%', background: '#f3f4f6',
                                        borderRadius: '6px', display: 'flex', flexDirection: 'column',
                                        alignItems: 'center', justifyContent: 'center',
                                        fontSize: '10px', color: '#9ca3af', textAlign: 'center'
                                    }}>
                                        NO IMAGE<br />AVAILABLE
                                    </div>
                                )}
                            </div>

                            {/* Infos */}
                            <div style={{ flex: 1 }}>
                                <p style={{ fontWeight: '600', marginBottom: '4px' }}>{plat.intitule}</p>
                                <p style={{ color: '#3b82f6', fontWeight: '600', marginBottom: '4px' }}>
                                    {parseFloat(plat.prix).toFixed(2)} Dhs
                                </p>
                                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>
                                    <strong>Description :</strong> {plat.description} ...
                                </p>
                                <p style={{ fontSize: '13px', color: '#6b7280' }}>
                                    <strong>Compositions :</strong> {composantsListe} ...
                                </p>
                            </div>

                            {/* Étoiles */}
                            <div style={{ flexShrink: 0 }}>
                                <Stars count={etoiles} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </VisiteurLayout>
    );
}