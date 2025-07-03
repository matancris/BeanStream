import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useCustomersStore } from '../store';
import type { Customer } from '../../../shared/types';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';
import { AppButton } from '../../../shared/ui';

const CustomersPage: React.FC = () => {
  const {
    customers,
    loading,
    error,
    loadCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    clearError,
  } = useCustomersStore();
  
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | undefined>();
  
  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);
  
  const handleAddCustomer = () => {
    setEditingCustomer(undefined);
    setShowForm(true);
  };
  
  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };
  
  const handleFormSubmit = async (customerData: Omit<Customer, 'id'>) => {
    try {
      if (editingCustomer) {
        await updateCustomer(editingCustomer.id, customerData);
      } else {
        await addCustomer(customerData);
      }
      setShowForm(false);
      setEditingCustomer(undefined);
    } catch (error) {
      // Error is handled by the store
      console.error('Form submission error:', error);
    }
  };
  
  const handleFormCancel = () => {
    setShowForm(false);
    setEditingCustomer(undefined);
  };
  
  const handleDeleteCustomer = async (customerId: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      await deleteCustomer(customerId);
    }
  };
  
  const handleClearError = () => {
    clearError();
  };
  
  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Customers</h1>
          <p className="page-subtitle">
            Manage your coffee shop customers and their preferences
          </p>
        </div>
        <div>
          <AppButton onClick={handleAddCustomer} disabled={loading}>
            Add Customer
          </AppButton>
        </div>
      </div>
      
      {error && (
        <div className="alert alert-error">
          <div className="alert-error-content">
            <AlertTriangle className="alert-error-icon" size={20} />
            <div>
              <p className="alert-error-text">{error}</p>
            </div>
            <button
              onClick={handleClearError}
              className="alert-close"
            >
              <X className="alert-error-icon" size={20} />
            </button>
          </div>
        </div>
      )}
      
      {showForm ? (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">
              {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
            </h2>
            <CustomerForm
              customer={editingCustomer}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              loading={loading}
            />
          </div>
        </div>
      ) : (
        <div className="card">
          <CustomerList
            customers={customers}
            onEdit={handleEditCustomer}
            onDelete={handleDeleteCustomer}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

export default CustomersPage; 