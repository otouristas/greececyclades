interface Price {
  from: number;
  currency: string;
}

export const formatPrice = (price: number, currency: string = 'EUR'): string => {
  if (typeof price !== 'number') return '€0';

  const currencySymbol = currency === 'EUR' ? '€' : currency;
  return `${currencySymbol}${price.toLocaleString()}`;
};
