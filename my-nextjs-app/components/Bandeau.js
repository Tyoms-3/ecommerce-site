// components/Bandeau.js

import React from 'react';
import styles from '../styles/Bandeau.module.css'; // Utilisez un module CSS pour les styles locaux

const Bandeau = () => {
    return (
        <div className={styles.bandeau}>
            <img src="/logo.png" alt="Logo One TMD" className={styles.logo} />
            <h1>One TMD</h1>
        </div>
    );
};

export default Bandeau;
