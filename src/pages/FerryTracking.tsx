import { Helmet } from 'react-helmet-async';
import FerryTracker from '../components/ferries/FerryTracker';

export default function FerryTracking() {
  return (
    <>
      <Helmet>
        <title>Ferry Tracking - Greece Cyclades</title>
        <meta name="description" content="Track ferries in real-time between Greek islands in the Cyclades" />
      </Helmet>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Ferry Tracking</h1>
            <p className="text-lg text-gray-600">Track ferries in real-time between Greek islands</p>
          </div>

          <FerryTracker />
        </div>
      </div>
    </>
  );
}
