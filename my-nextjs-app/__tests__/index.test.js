// __tests__/index.test.js
import { render, screen } from '@testing-library/react';
import Home from '../pages/index'; // Assurez-vous que le chemin est correct

test('renders home page', () => {
  render(<Home />);
  const heading = screen.getByRole('heading', { name: /home page/i }); // Remplacez 'home page' par un texte que vous attendez sur la page d'accueil
  expect(heading).toBeInTheDocument();
});
