import { RouteObject } from 'react-router-dom';
import BusinessSignIn from '../pages/auth/BusinessSignIn';
import BusinessDashboard from '../pages/business/Dashboard';
import Bookings from '../pages/business/Bookings';
import Properties from '../pages/business/Properties';
import Documentation from '../pages/business/Documentation';
import Support from '../pages/business/Support';
import Settings from '../pages/business/Settings';
import PropertyDetail from '../pages/business/PropertyDetail';
import BookingDetail from '../pages/business/BookingDetail';

export const businessRoutes: RouteObject[] = [
  {
    path: '/business/signin',
    element: <BusinessSignIn />,
  },
  {
    path: '/business/dashboard',
    element: <BusinessDashboard />,
  },
  {
    path: '/business/bookings',
    element: <Bookings />,
  },
  {
    path: '/business/bookings/:id',
    element: <BookingDetail />,
  },
  {
    path: '/business/properties',
    element: <Properties />,
  },
  {
    path: '/business/properties/:id',
    element: <PropertyDetail />,
  },
  {
    path: '/business/docs',
    element: <Documentation />,
  },
  {
    path: '/business/support',
    element: <Support />,
  },
  {
    path: '/business/settings',
    element: <Settings />,
  },
];
