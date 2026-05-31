import React from 'react';

const Edit = ({ commande, plats }) => {
    return (
        <div>
            <table>
                <tbody>
                    {plats.map(plat => (
                        <tr key={plat.id}>
                            <td>
                                <form>
                                    <input type= "checkbox" />
                                </form>
                            </td>
                            <td>{plat.intitule}</td>
                            <td>{plat.prix} €</td>
                            <td>
                                Quantité: {commande.plats[plat.id] || 0}
                            </td>
                           
                        </tr>
                    ))}
                     <td>
                                Total:  €
                            </td>
                </tbody>
            </table>
        </div>
    );
}

export default Edit;