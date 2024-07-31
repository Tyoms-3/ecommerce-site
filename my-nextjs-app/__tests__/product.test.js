// __tests__/product.test.js
import { render, screen } from '@testing-library/react';
import ProductPage from '../pages/product/[id]'; // Assurez-vous que le chemin est correct
import { useRouter } from 'next/router';

// Mock useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

test('renders product page with specific product', () => {
  // Mock router to return a specific id
  useRouter.mockImplementation(() => ({
    query: { id: '1' },
  }));

  render(<ProductPage />);

  const productTitle = screen.getByText(/product 1/i); // Remplacez 'product 1' par un texte attendu pour ce produit
  expect(productTitle).toBeInTheDocument();
});
