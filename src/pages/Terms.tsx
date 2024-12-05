import React from 'react';
import SEO from '../components/SEO';

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service - Discover Cyclades"
        description="Read our terms of service to understand your rights and responsibilities when using Discover Cyclades."
      />
      
      <div className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-blue max-w-none">
            <p className="text-gray-600 mb-6">Last updated: March 15, 2024</p>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using Discover Cyclades, you agree to be bound by these Terms of Service
                and all applicable laws and regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">2. Booking and Reservations</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>All bookings are subject to availability and confirmation</li>
                <li>Prices are subject to change without notice</li>
                <li>Cancellation policies vary by service provider</li>
                <li>You must be at least 18 years old to make a booking</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">3. User Responsibilities</h2>
              <p className="mb-4">You agree to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Comply with all local laws and regulations</li>
                <li>Not engage in fraudulent activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">4. Intellectual Property</h2>
              <p className="mb-4">
                All content on Discover Cyclades, including text, images, logos, and software,
                is protected by copyright and other intellectual property rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">5. Limitation of Liability</h2>
              <p className="mb-4">
                Discover Cyclades is not liable for any direct, indirect, incidental, or
                consequential damages arising from your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">6. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. Continued use of our
                services constitutes acceptance of any changes.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}