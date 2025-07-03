import React, { useState, useEffect } from 'react';
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
            <svg className="alert-error-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="alert-error-text">{error}</p>
            </div>
            <button
              onClick={handleClearError}
              className="alert-close"
            >
              <svg className="alert-error-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
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