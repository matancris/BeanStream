import React from 'react';

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const AppButton: React.FC<AppButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  fullWidth = false,
  disabled,
  className = '',
  leftIcon,
  rightIcon,
  children,
  ...props
}) => {
  const baseClasses = 'app-button';
  const variantClass = `app-button--${variant}`;
  const sizeClass = `app-button--${size}`;
  const fullWidthClass = fullWidth ? 'app-button--full' : '';
  const loadingClass = loading ? 'app-button--loading' : '';
  
  const classes = [
    baseClasses,
    variantClass,
    sizeClass,
    fullWidthClass,
    loadingClass,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="app-button__loading-spinner" />
      )}
      
      {leftIcon && !loading && (
        <span className="app-button__icon app-button__icon--left">
          {leftIcon}
        </span>
      )}
      
      <span className="app-button__content">
        {children}
      </span>
      
      {rightIcon && !loading && (
        <span className="app-button__icon app-button__icon--right">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default AppButton; 