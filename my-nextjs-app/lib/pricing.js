// lib/pricing.js

// Calcule le prix en fonction du type de bordure
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
      return 0; // Retourne 0 si le type de bordure n'est pas reconnu
  }
};

// Calcule le prix final en ajoutant le prix de base et le prix de personnalisation
export const calculateFinalPrice = (basePrice, customizations) => {
  const customizationPrice = calculateCustomizationPrice(customizations.border);
  return parseFloat((basePrice + customizationPrice).toFixed(2)); // Convertit en nombre flottant pour éviter les problèmes de précision
};
