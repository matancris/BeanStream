import React, { useState, useEffect } from 'react';
import type { Customer } from '../../../shared/types';
import { AppInput, AppSelect, AppButton } from '../../../shared/ui';

interface CustomerFormProps {
  customer?: Customer;
  onSubmit: (customer: Omit<Customer, 'id'>) => void;
  onCancel: () => void;
  loading?: boolean;
}

interface FormData {
  name: string;
  favoriteDrink: string;
  size: 'small' | 'medium' | 'large' | '';
  milkType: 'whole' | 'skim' | 'oat' | 'almond' | '';
}

interface FormErrors {
  name?: string;
  favoriteDrink?: string;
  size?: string;
  milkType?: string;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  customer,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    favoriteDrink: '',
    size: '',
    milkType: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  
  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name,
        favoriteDrink: customer.favoriteDrink,
        size: customer.size,
        milkType: customer.milkType,
      });
    }
  }, [customer]);
  
  const sizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];
  
  const milkOptions = [
    { value: 'whole', label: 'Whole Milk' },
    { value: 'skim', label: 'Skim Milk' },
    { value: 'oat', label: 'Oat Milk' },
    { value: 'almond', label: 'Almond Milk' },
  ];
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.favoriteDrink.trim()) {
      newErrors.favoriteDrink = 'Favorite drink is required';
    }
    
    if (!formData.size) {
      newErrors.size = 'Size is required';
    }
    
    if (!formData.milkType) {
      newErrors.milkType = 'Milk type is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    onSubmit({
      name: formData.name.trim(),
      favoriteDrink: formData.favoriteDrink.trim(),
      size: formData.size as 'small' | 'medium' | 'large',
      milkType: formData.milkType as 'whole' | 'skim' | 'oat' | 'almond',
    });
  };
  
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="form">
      <AppInput
        label="Name"
        type="text"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors.name}
        placeholder="Enter customer name"
        required
      />
      
      <AppInput
        label="Favorite Drink"
        type="text"
        value={formData.favoriteDrink}
        onChange={(e) => handleChange('favoriteDrink', e.target.value)}
        error={errors.favoriteDrink}
        placeholder="Enter favorite drink"
        required
      />
      
      <AppSelect
        label="Size"
        value={formData.size}
        onChange={(value) => handleChange('size', value)}
        error={errors.size}
        options={sizeOptions}
        placeholder="Select size"
        required
      />
      
      <AppSelect
        label="Milk Type"
        value={formData.milkType}
        onChange={(value) => handleChange('milkType', value)}
        error={errors.milkType}
        options={milkOptions}
        placeholder="Select milk type"
        required
      />
      
      <div className="form-actions">
        <AppButton
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </AppButton>
        <AppButton
          type="submit"
          loading={loading}
          disabled={loading}
        >
          {customer ? 'Update Customer' : 'Add Customer'}
        </AppButton>
      </div>
    </form>
  );
};

export default CustomerForm; 