// components/Bandeau.js

import React from 'react';
import '../styles/globals.css'; // Assurez-vous que le chemin est correct

const Bandeau = () => {
    return (
        <div className="bandeau"> {/* Utilisation des classes CSS globales */}
            <img src="/logo.png" alt="Logo One TMD" className="logo" />
            <h1>One TMD</h1>
        </div>
    );
};

export default Bandeau;

