import React from 'react';
import { router } from '@inertiajs/react';

const Dashboard = ({ user, categories, plats }) => {

    const [nouvellecommande, setNouvelleCommande] = React.useState(false);
    const [commande, setCommande] = React.useState(null);

    // quantité par plat
    const [quantites, setQuantites] = React.useState({});

    // plats déjà ajoutés (pour cacher formulaire)
    const [platsAjoutes, setPlatsAjoutes] = React.useState([]);

    // =========================
    // CREER UNE COMMANDE
    // =========================
    const nouvelleCommande = () => {

        const data = {
            serveur_id: user.id,
            etat: "en cours",
            paye: false
        };

        setNouvelleCommande(true);
        setCommande(data);

        router.post('/serveur/commande', data, {
            onSuccess: (page) => {
                // si Laravel retourne la commande créée
                setCommande(page.props.commande);
            }
        });
    };

    // =========================
    // CHANGE QUANTITE PAR PLAT
    // =========================
    const handleQuantiteChange = (platId, value) => {
        setQuantites(prev => ({
            ...prev,
            [platId]: value
        }));
    };

    // =========================
    // AJOUTER UN PLAT A LA COMMANDE
    // =========================
    const handleAddPlat = (platId) => {

        const commandePlat = {
            commande_id: commande?.id,
            plat_id: platId,
            nombre: quantites[platId] || 1
        };

        router.post('/serveur/plat/add', commandePlat);

        // cacher uniquement ce formulaire
        setPlatsAjoutes(prev => [...prev, platId]);
    };

    const handleTerminerCommande = () => {
    if (!commande?.id) return;

    router.get(`/serveur/commande/terminer/${commande.id}`);
    setNouvelleCommande(false);
    setPlatsAjoutes([]);
};
const handleCommandeClick = () => {
    if (!nouvellecommande) {
        nouvelleCommande();
    } else {
        handleTerminerCommande();
    }
};
    return (
        <div>

            {/* NAVBAR */}
            <nav className="navbar navbar-expand-lg bg-light">
                <h5>serveur: {user.name}</h5>

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/menu">Dashboard</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/orders">Commandes</a>
                    </li>
                </ul>

                <div>
                    {nouvellecommande && (
                        <p className="text-success">Commande en cours</p>
                    )}

                    <button className="btn btn-primary" onClick={handleCommandeClick}>
                        {nouvellecommande ? "Terminer" : "Nouvelle Commande"}
                        ({platsAjoutes.length})
                    </button>
                     {nouvellecommande &&
    <a
        className="btn btn-sm btn-success ms-2"
        href={route('serveur.commande.show')}
    >
        Editer
    </a>
}
                </div>
            </nav>

            {/* CATEGORIES */}
            <div className="container mt-4 d-flex flex-wrap gap-3">
                {categories?.map((categorie) => (
                    <a
                        key={categorie.id}
                        href={`/dashboard/${categorie.id}`}
                        className="btn btn-outline-primary"
                    >
                        {categorie.titre}
                    </a>
                ))}
            </div>

            {/* PLATS */}
            <div className="container mt-4 d-flex flex-wrap gap-3">

                {plats?.map((plat) => (
                    <div key={plat.id} className="card p-3" style={{ width: "250px" }}>

                        <h4>{plat.intitule}</h4>
                        <p>{plat.description}</p>
                        <p><strong>{plat.prix} €</strong></p>

                        {/* FORMULAIRE */}
                        {nouvellecommande && !platsAjoutes.includes(plat.id) && (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleAddPlat(plat.id);
                                }}
                            >
                                <input
                                    type="number"
                                    className="form-control mb-2"
                                    placeholder="Quantité"
                                    value={quantites[plat.id] || 1}
                                    onChange={(e) =>
                                        handleQuantiteChange(
                                            plat.id,
                                            parseInt(e.target.value)
                                        )
                                    }
                                />

                                <button className="btn btn-success w-100">
                                    Ajouter
                                </button>
                            </form>
                        )}

                        {/* MESSAGE SI AJOUTÉ */}
                        {platsAjoutes.includes(plat.id) && (
                            <p className="text-success mt-2">
                                ✔ Ajouté à la commande
                            </p>
                        )}

                    </div>
                ))}

            </div>
        </div>
    );
};

export default Dashboard;