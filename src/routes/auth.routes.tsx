import { RouteObject } from 'react-router-dom';
import UserSignUp from '../pages/auth/UserSignUp';
import UserSignIn from '../pages/auth/UserSignIn';
import BusinessSignUp from '../pages/auth/BusinessSignUp';
import BusinessSignIn from '../pages/auth/BusinessSignIn';

export const authRoutes: RouteObject[] = [
  {
    path: '/signup',
    element: <UserSignUp />,
  },
  {
    path: '/signin',
    element: <UserSignIn />,
  },
  {
    path: '/business/signup',
    element: <BusinessSignUp />,
  },
  {
    path: '/business/signin',
    element: <BusinessSignIn />,
  },
];
