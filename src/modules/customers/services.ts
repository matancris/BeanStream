import type { Customer } from '../../shared/types';

const CUSTOMERS_KEY = 'customers';

export class CustomersService {
  static async getAll(): Promise<Customer[]> {
    try {
      const data = localStorage.getItem(CUSTOMERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load customers:', error);
      return [];
    }
  }

  static async getById(id: string): Promise<Customer | null> {
    const customers = await this.getAll();
    return customers.find(customer => customer.id === id) || null;
  }

  static async create(customer: Omit<Customer, 'id'>): Promise<Customer> {
    const customers = await this.getAll();
    const newCustomer: Customer = {
      ...customer,
      id: Date.now().toString(), // Simple ID generation
    };
    
    customers.push(newCustomer);
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
    
    return newCustomer;
  }

  static async update(id: string, updates: Partial<Omit<Customer, 'id'>>): Promise<Customer | null> {
    const customers = await this.getAll();
    const index = customers.findIndex(customer => customer.id === id);
    
    if (index === -1) {
      return null;
    }
    
    customers[index] = { ...customers[index], ...updates };
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
    
    return customers[index];
  }

  static async delete(id: string): Promise<boolean> {
    const customers = await this.getAll();
    const initialLength = customers.length;
    const filteredCustomers = customers.filter(customer => customer.id !== id);
    
    if (filteredCustomers.length === initialLength) {
      return false; // Customer not found
    }
    
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(filteredCustomers));
    return true;
  }
} 