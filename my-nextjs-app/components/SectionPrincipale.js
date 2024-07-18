// components/SectionPrincipale.js

import React from 'react';
import styles from '../styles/globals.css';

const SectionPrincipale = () => {
    return (
        <section className={styles.sectionPrincipale}>
            <div className={styles.imageFond}>
                <img src="/image-fond.jpg" alt="Image de fond" />
                <div className={styles.contenuTexte}>
                    <h2 className={styles.titrePrincipal}>L'attention à portée de main</h2>
                    <p className={styles.slogan}>Exprimez votre amour en offrant et partageant des moments précieux et uniques où chaque détail compte.</p>
                </div>
            </div>
        </section>
    );
};

export default SectionPrincipale;
