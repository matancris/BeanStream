import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import CustomersPage from '../modules/customers/components/CustomersPage';
import MenuPage from '../modules/menu/components/MenuPage';
import ThemePage from '../modules/theme/components/ThemePage';
import Layout from '../shared/ui/Layout';
import ProtectedRoute from '../shared/ui/ProtectedRoute';

export const protectedRoutes: RouteObject = {
  path: '/',
  element: (
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: <Navigate to="/customers" replace />,
    },
    {
      path: 'customers',
      element: <CustomersPage />,
    },
    {
      path: 'menu',
      element: <MenuPage />,
    },
    {
      path: 'theme',
      element: <ThemePage />,
    },
  ],
}; 