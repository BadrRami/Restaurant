import React from 'react';

const Nav = () => {
    return (
        <nav>
            <ul>
                <li><a href="/">Menu</a></li>
                <li><a href="/about">Présentation</a></li>
                <li><a href="/contact">Localisation & Horaires</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href={route('login')}>Login</a></li>
            </ul>
        </nav>
    );
};

export default Nav;