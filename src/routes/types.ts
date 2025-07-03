export const RoutePaths = {
  // Auth routes
  LOGIN: '/login',
  
  // Protected routes
  HOME: '/',
  CUSTOMERS: '/customers',
  MENU: '/menu',
  THEME: '/theme',
} as const;

export type RoutePathsType = typeof RoutePaths[keyof typeof RoutePaths];

export interface RouteConfig {
  path: string;
  title: string;
  description?: string;
  protected: boolean;
}

export const routeConfigs: Record<string, RouteConfig> = {
  [RoutePaths.LOGIN]: {
    path: RoutePaths.LOGIN,
    title: 'Login',
    description: 'Sign in to your account',
    protected: false,
  },
  [RoutePaths.CUSTOMERS]: {
    path: RoutePaths.CUSTOMERS,
    title: 'Customers',
    description: 'Manage customer information and preferences',
    protected: true,
  },
  [RoutePaths.MENU]: {
    path: RoutePaths.MENU,
    title: 'Menu',
    description: 'Manage menu items and availability',
    protected: true,
  },
  [RoutePaths.THEME]: {
    path: RoutePaths.THEME,
    title: 'Theme',
    description: 'Customize application appearance',
    protected: true,
  },
}; 