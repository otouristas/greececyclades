interface Price {
  from: number;
  currency: string;
}

export const formatPrice = (price: Price | string | number | undefined): string => {
  if (!price) return '€0';
  
  if (typeof price === 'object' && 'from' in price) {
    const currencySymbol = price.currency === 'EUR' ? '€' : price.currency;
    return `${currencySymbol}${price.from}`;
  }
  
  if (typeof price === 'number') {
    return `€${price}`;
  }
  
  return `€${price}`;
};
