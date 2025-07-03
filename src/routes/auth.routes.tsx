import type { RouteObject } from 'react-router-dom';
import AuthLayout from '../modules/auth/components/AuthLayout';
import Login from '../modules/auth/components/Login';

export const authRoutes: RouteObject = {
  path: '/login',
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <Login />,
    },
  ],
}; 