import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { AppInput, AppButton } from '../../../shared/ui';

const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/customers" replace />;
  }

  const validateForm = () => {
    const newErrors = { email: '', password: '', general: '' };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({ email: '', password: '', general: '' });

    try {
      await login(formData.email, formData.password);
    } catch (error) {
      setErrors({
        email: '',
        password: '',
        general: error instanceof Error ? error.message : 'Login failed',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: 'email' | 'password', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">
            Sign in to Bean Stream
          </h2>
          <p className="auth-subtitle">
            Coffee Cart Management System
          </p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <AppInput
            label="Email address"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
            placeholder="Enter your email"
            required
          />
          
          <AppInput
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            error={errors.password}
            placeholder="Enter your password"
            required
          />

          {errors.general && (
            <div className="alert alert-error">
              <p className="alert-error-text">{errors.general}</p>
            </div>
          )}

          <AppButton
            type="submit"
            loading={loading}
            disabled={loading}
            fullWidth
          >
            Sign in
          </AppButton>
          
          <div className="auth-demo-text">
            <p>
              Demo credentials: Use any email and password (minimum 3 characters)
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 