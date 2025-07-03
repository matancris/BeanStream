import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomerForm from './CustomerForm';
import type { Customer } from '../../../shared/types';

describe('CustomerForm', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  const defaultProps = {
    onSubmit: mockOnSubmit,
    onCancel: mockOnCancel,
    loading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form fields correctly', () => {
    render(<CustomerForm {...defaultProps} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/favorite drink/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/size/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/milk type/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add customer/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('displays validation errors for empty fields', async () => {
    const user = userEvent.setup();
    render(<CustomerForm {...defaultProps} />);

    const submitButton = screen.getByRole('button', { name: /add customer/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/favorite drink is required/i)).toBeInTheDocument();
      expect(screen.getByText(/size is required/i)).toBeInTheDocument();
      expect(screen.getByText(/milk type is required/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    render(<CustomerForm {...defaultProps} />);

    // Fill out the form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/favorite drink/i), 'Latte');
    await user.selectOptions(screen.getByLabelText(/size/i), 'medium');
    await user.selectOptions(screen.getByLabelText(/milk type/i), 'oat');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /add customer/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        favoriteDrink: 'Latte',
        size: 'medium',
        milkType: 'oat',
      });
    });
  });

  it('populates form when editing existing customer', () => {
    const existingCustomer: Customer = {
      id: '1',
      name: 'Jane Smith',
      favoriteDrink: 'Cappuccino',
      size: 'large',
      milkType: 'whole',
    };

    render(<CustomerForm {...defaultProps} customer={existingCustomer} />);

    expect(screen.getByDisplayValue('Jane Smith')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Cappuccino')).toBeInTheDocument();
    expect(screen.getByDisplayValue('large')).toBeInTheDocument();
    expect(screen.getByDisplayValue('whole')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update customer/i })).toBeInTheDocument();
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(<CustomerForm {...defaultProps} />);

    await user.click(screen.getByRole('button', { name: /cancel/i }));

    expect(mockOnCancel).toHaveBeenCalledOnce();
  });

  it('clears validation errors when user starts typing', async () => {
    const user = userEvent.setup();
    render(<CustomerForm {...defaultProps} />);

    // Trigger validation errors
    await user.click(screen.getByRole('button', { name: /add customer/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });

    // Start typing in the name field
    await user.type(screen.getByLabelText(/name/i), 'J');

    // Error should be cleared
    await waitFor(() => {
      expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
    });
  });

  it('disables buttons when loading', () => {
    render(<CustomerForm {...defaultProps} loading={true} />);

    expect(screen.getByRole('button', { name: /add customer/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeDisabled();
  });

  it('shows loading state on submit button', () => {
    render(<CustomerForm {...defaultProps} loading={true} />);

    const submitButton = screen.getByRole('button', { name: /add customer/i });
    expect(submitButton).toBeDisabled();
    // Note: We could also check for loading spinner, but it's handled by the Button component
  });
}); 