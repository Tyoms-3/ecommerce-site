// __tests__/pricing.test.js
import { calculateCustomizationPrice, calculateFinalPrice } from '../lib/pricing';

describe('calculateCustomizationPrice', () => {
  it('should return the correct price for each border type', () => {
    expect(calculateCustomizationPrice('2 small')).toBe(2.49);
    expect(calculateCustomizationPrice('1 small and 1 large')).toBe(4.99);
    expect(calculateCustomizationPrice('2 large')).toBe(6.99);
    expect(calculateCustomizationPrice('3 mixed')).toBe(9.99);
    expect(calculateCustomizationPrice('unknown')).toBe(0); // Test pour une valeur non reconnue
  });
});

describe('calculateFinalPrice', () => {
  it('should return the correct final price', () => {
    expect(calculateFinalPrice(10.00, { border: '2 small' })).toBe(12.49);
    expect(calculateFinalPrice(15.00, { border: '1 small and 1 large' })).toBe(19.99);
    expect(calculateFinalPrice(20.00, { border: '2 large' })).toBe(26.99);
    expect(calculateFinalPrice(25.00, { border: '3 mixed' })).toBe(34.99);
  });
});
