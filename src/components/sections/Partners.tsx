import React from 'react';

const partners = [
  {
    name: 'AGGELOS Rentals',
    logo: 'https://rentacarantiparos.gr/wp-content/uploads/2024/03/Aggelos-Rentals-Logo-Small.png',
    category: 'Car Rental'
  }
];

export default function Partners() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Trusted Partners</h2>
          <p className="mt-2 text-gray-600">Working with the best local businesses in the Cyclades</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <div key={partner.name} className="flex flex-col items-center">
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-12 object-contain"
              />
              <p className="mt-2 text-sm text-gray-600">{partner.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}