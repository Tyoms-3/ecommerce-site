// __tests__/SectionPrincipale.test.js
import { render, screen } from '@testing-library/react';
import SectionPrincipale from '../components/SectionPrincipale';

test('renders SectionPrincipale with correct content', () => {
  render(<SectionPrincipale />);
  
  const title = screen.getByText(/L'attention à portée de main/i);
  const slogan = screen.getByText(/Exprimez votre amour en offrant et partageant des moments précieux et uniques où chaque détail compte./i);

  expect(title).toBeInTheDocument();
  expect(slogan).toBeInTheDocument();
});
