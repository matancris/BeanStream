import React, { useState } from 'react';

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled';
}

const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'default',
  className = '',
  id,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = id || `app-input-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseClasses = 'app-input';
  const variantClass = `app-input--${variant}`;
  const errorClass = error ? 'app-input--error' : '';
  const focusClass = isFocused ? 'app-input--focused' : '';
  const hasIconClass = (leftIcon || rightIcon) ? 'app-input--with-icons' : '';
  
  const containerClasses = [
    baseClasses,
    variantClass,
    errorClass,
    focusClass,
    hasIconClass,
    className
  ].filter(Boolean).join(' ');

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };
  
  return (
    <div className="app-input-group">
      {label && (
        <label htmlFor={inputId} className="app-input__label">
          {label}
        </label>
      )}
      
      <div className={containerClasses}>
        {leftIcon && (
          <span className="app-input__icon app-input__icon--left">
            {leftIcon}
          </span>
        )}
        
        <input
          id={inputId}
          className="app-input__field"
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {rightIcon && (
          <span className="app-input__icon app-input__icon--right">
            {rightIcon}
          </span>
        )}
      </div>
      
      {error && (
        <p className="app-input__error">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="app-input__helper">{helperText}</p>
      )}
    </div>
  );
};

export default AppInput; 