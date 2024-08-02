// __tests__/products.test.js
import { getProductById, getAllProducts } from '../lib/products';

describe('getProductById', () => {
  it('should return the correct product based on ID', () => {
    expect(getProductById('1')).toEqual({
      id: 1,
      name: 'Produit 1',
      description: 'Description du produit 1',
      price: 10,
      imageUrl: '/image1.jpg',
    });
    expect(getProductById('2')).toEqual({
      id: 2,
      name: 'Produit 2',
      description: 'Description du produit 2',
      price: 20,
      imageUrl: '/image2.jpg',
    });
    expect(getProductById('999')).toBeUndefined(); // Test pour un ID non existant
  });
});

describe('getAllProducts', () => {
  it('should return all products', () => {
    expect(getAllProducts()).toEqual([
      { id: 1, name: 'Produit 1', description: 'Description du produit 1', price: 10, imageUrl: '/image1.jpg' },
      { id: 2, name: 'Produit 2', description: 'Description du produit 2', price: 20, imageUrl: '/image2.jpg' },
      { id: 3, name: 'Produit 3', description: 'Description du produit 3', price: 30, imageUrl: '/image3.jpg' },
    ]);
  });
});
