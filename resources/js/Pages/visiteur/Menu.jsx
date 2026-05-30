import React from 'react';
import Nav from '../templates/nav';

const Menu = ({ categories = [], plats = [] }) => {
    return (
        <div>
            <Nav />

            <div className="container mt-5">
                <h1 className="mb-4">Menu</h1>

                <div className="row">
                    {categories.map((category) => (
                        <div className="col-md-4 mb-4" key={category.id}>
                            <div className="card h-100">

                                <img
                                    src={category.image}
                                    className="card-img-top"
                                    alt={category.titre}
                                />

                                <div className="card-body">
                                    <h5 className="card-title">
                                        {category.titre}
                                    </h5>

                                    <a
                                        href={`/plats/${category.id}`}
                                        className="btn btn-primary"
                                    >
                                        Voir les {category.plats?.length || 0} plats
                                    </a>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Menu;