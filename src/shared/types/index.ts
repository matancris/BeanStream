export interface Customer {
  id: string;
  name: string;
  favoriteDrink: string;
  size: 'small' | 'medium' | 'large';
  milkType: 'whole' | 'skim' | 'oat' | 'almond';
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  available: boolean;
}

export interface Theme {
  primaryColor: string; // hex
  // prepare fields for secondaryColor, fonts… for future scaling
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
} 