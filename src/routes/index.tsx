import { createBrowserRouter } from 'react-router-dom';
import { authRoutes } from './auth.routes';
import { protectedRoutes } from './protected.routes';

export const router = createBrowserRouter([
  authRoutes,
  protectedRoutes,
]); 