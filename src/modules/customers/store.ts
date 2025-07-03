import { create } from 'zustand';
import type { Customer } from '../../shared/types';
import { CustomersService } from './services';

interface CustomersStore {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  
  // Actions
  loadCustomers: () => Promise<void>;
  addCustomer: (customer: Omit<Customer, 'id'>) => Promise<void>;
  updateCustomer: (id: string, updates: Partial<Omit<Customer, 'id'>>) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useCustomersStore = create<CustomersStore>((set, get) => ({
  customers: [],
  loading: false,
  error: null,
  
  loadCustomers: async () => {
    set({ loading: true, error: null });
    try {
      const customers = await CustomersService.getAll();
      set({ customers, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load customers',
        loading: false 
      });
    }
  },
  
  addCustomer: async (customerData) => {
    set({ loading: true, error: null });
    try {
      const newCustomer = await CustomersService.create(customerData);
      const { customers } = get();
      set({ 
        customers: [...customers, newCustomer],
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add customer',
        loading: false 
      });
    }
  },
  
  updateCustomer: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const updatedCustomer = await CustomersService.update(id, updates);
      if (updatedCustomer) {
        const { customers } = get();
        set({ 
          customers: customers.map(customer => 
            customer.id === id ? updatedCustomer : customer
          ),
          loading: false 
        });
      } else {
        set({ 
          error: 'Customer not found',
          loading: false 
        });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update customer',
        loading: false 
      });
    }
  },
  
  deleteCustomer: async (id) => {
    set({ loading: true, error: null });
    try {
      const success = await CustomersService.delete(id);
      if (success) {
        const { customers } = get();
        set({ 
          customers: customers.filter(customer => customer.id !== id),
          loading: false 
        });
      } else {
        set({ 
          error: 'Customer not found',
          loading: false 
        });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete customer',
        loading: false 
      });
    }
  },
  
  clearError: () => {
    set({ error: null });
  },
})); 