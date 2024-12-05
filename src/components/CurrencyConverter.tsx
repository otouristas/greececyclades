import React, { useState } from 'react';
import { ArrowRight, Euro } from 'lucide-react';

const currencies = [
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' }
];

// Mock exchange rates (in production, these would come from an API)
const rates = {
  EUR: 1,
  USD: 1.09,
  GBP: 0.86,
  AUD: 1.65
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');

  const convert = (value: string, from: string, to: string) => {
    if (!value) return '';
    const euros = parseFloat(value) / rates[from as keyof typeof rates];
    const result = euros * rates[to as keyof typeof rates];
    return result.toFixed(2);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Currency Converter</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
            <Euro className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 items-center">
          <div className="col-span-2">
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-center">
            <ArrowRight className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="col-span-2">
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {amount && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <span className="text-lg font-medium">
                {amount} {fromCurrency} = 
              </span>
              <span className="text-xl font-bold ml-2">
                {convert(amount, fromCurrency, toCurrency)} {toCurrency}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}