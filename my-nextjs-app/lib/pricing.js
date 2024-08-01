// lib/pricing.js

export const calculateCustomizationPrice = (borderType) => {
  switch (borderType) {
    case '2 small':
      return 2.49;
    case '1 small and 1 large':
      return 4.99;
    case '2 large':
      return 6.99;
    case '3 mixed':
      return 9.99;
    default:
      return 0;
  }
};

export const calculateFinalPrice = (basePrice, customizations) => {
  const customizationPrice = calculateCustomizationPrice(customizations.border);
  return (basePrice + customizationPrice).toFixed(2);
};
