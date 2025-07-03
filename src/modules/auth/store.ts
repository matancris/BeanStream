import { create } from 'zustand';
import type { AuthState, User } from '../../shared/types';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email: string, password: string) => {
    // Mock authentication - in real app, this would call an API
    if (email && password) {
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
      };
      
      set({ user: mockUser, isAuthenticated: true });
      
      // Store in localStorage for persistence
      localStorage.setItem('authUser', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid credentials');
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('authUser');
  },
}));

// Initialize auth state from localStorage
const storedUser = localStorage.getItem('authUser');
if (storedUser) {
  try {
    const user: User = JSON.parse(storedUser);
    useAuthStore.setState({ user, isAuthenticated: true });
  } catch (error) {
    console.error('Failed to parse stored user:', error);
    localStorage.removeItem('authUser');
  }
} 