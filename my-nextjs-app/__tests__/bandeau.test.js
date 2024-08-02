// __tests__/bandeau.test.js

import { render, screen, fireEvent } from '@testing-library/react';
import Bandeau from '../components/Bandeau'; // Assurez-vous que le chemin est correct

test('renders Bandeau component', () => {
  render(<Bandeau />);

  // Vérifier que le titre principal est affiché
  const titrePrincipal = screen.getByText(/one tmd/i);
  expect(titrePrincipal).toBeInTheDocument();

  // Vérifier que l'icône du menu (HamburgerIcon) est affichée
  const hamburgerIcon = screen.getByRole('button', { name: /open menu/i });
  expect(hamburgerIcon).toBeInTheDocument();

  // Vérifier que le logo est affiché
  const logo = screen.getByAltText(/logo one tmd/i);
  expect(logo).toBeInTheDocument();
});

test('opens and closes drawer on button click', () => {
  render(<Bandeau />);

  // Simuler un clic sur le bouton pour ouvrir le menu
  const hamburgerIcon = screen.getByRole('button', { name: /open menu/i });
  fireEvent.click(hamburgerIcon);

  // Vérifier que le menu est ouvert
  const page1 = screen.getByText(/page 1/i);
  expect(page1).toBeInTheDocument();

  // Simuler un clic sur le bouton de fermeture du menu
  const closeButton = screen.getByRole('button', { name: /close menu/i });
  fireEvent.click(closeButton);

  // Vérifier que le menu est fermé
  expect(page1).not.toBeInTheDocument();
});
