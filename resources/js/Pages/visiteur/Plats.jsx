import React from 'react';
import Nav from '../templates/nav';
const Plats = ({plats, categorie, commandes}) => {
    let stars = 1;

if (commandes > 100) {
    stars = 5;
} else if (commandes >= 50) {
    stars = 4;
} else if (commandes >= 20) {
    stars = 3;
} else if (commandes > 4) {
    stars = 2;
} else {
    stars = 1;
}
    return (
        <div>
            <Nav/>
            <div className="container mt-5">
                <h1 className="mb-4">Plats de la catégorie :{categorie.titre}</h1>
                <div className="row">
                    {plats.map((plat) => (
    <div className="card" key={plat.id}>
        <img src={plat.photo} className="card-img-top" alt={plat.intitule} />

        <div className="card-body">
            <h5>{plat.intitule}</h5>
            <p>{plat.description}</p>
            <p>Prix : {plat.prix} €</p>

           <div>
    {stars >= 1 && <img src="/plats/star.png" alt="star" width="20" height="20" />}
    {stars >= 2 && <img src="/plats/star.png" alt="star" width="20" height="20" />}
    {stars >= 3 && <img src="/plats/star.png" alt="star" width="20" height="20" />}
    {stars >= 4 && <img src="/plats/star.png" alt="star" width="20" height="20" />}
    {stars >= 5 && <img src="/plats/star.png" alt="star" width="20" height="20" />}
</div>
        </div>
    </div>
))}
                </div>
            </div>
        </div>
    );
}

export default Plats;
