import React from 'react';

const Nav = () => {
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">MonResto</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Menu</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Présentation</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Localisation et Horaires</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Contact</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Login</a>
                </li>
                </ul>
            </div>
        </div>
        </nav>
    );
}

export default Nav;
