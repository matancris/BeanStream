import React from 'react';
import type { Customer } from '../../../shared/types';
import { AppButton } from '../../../shared/ui';

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customerId: string) => void;
  loading?: boolean;
}

const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  onEdit,
  onDelete,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading customers...</p>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state-text">No customers found.</p>
        <p className="empty-state-subtext">Add your first customer to get started!</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead className="table-header">
          <tr>
            <th>Name</th>
            <th>Favorite Drink</th>
            <th>Size</th>
            <th>Milk Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>
                <div className="table-cell-name">{customer.name}</div>
              </td>
              <td>
                <div className="table-cell-text">{customer.favoriteDrink}</div>
              </td>
              <td>
                <span className="badge">
                  {customer.size}
                </span>
              </td>
              <td>
                <div className="table-cell-text">
                  {customer.milkType.charAt(0).toUpperCase() + customer.milkType.slice(1)} Milk
                </div>
              </td>
              <td>
                <div className="table-cell-actions">
                  <AppButton
                    variant="secondary"
                    size="small"
                    onClick={() => onEdit(customer)}
                  >
                    Edit
                  </AppButton>
                  <AppButton
                    variant="danger"
                    size="small"
                    onClick={() => onDelete(customer.id)}
                  >
                    Delete
                  </AppButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList; 