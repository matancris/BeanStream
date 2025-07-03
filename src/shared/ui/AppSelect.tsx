import React, { useState } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface AppSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  leftIcon?: React.ReactNode;
}

const AppSelect: React.FC<AppSelectProps> = ({
  label,
  error,
  helperText,
  options,
  placeholder = 'Select an option...',
  leftIcon,
  className = '',
  id,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const selectId = id || `app-select-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseClasses = 'app-select';
  const errorClass = error ? 'app-select--error' : '';
  const focusClass = isFocused ? 'app-select--focused' : '';
  const hasIconClass = leftIcon ? 'app-select--with-icon' : '';
  
  const containerClasses = [
    baseClasses,
    errorClass,
    focusClass,
    hasIconClass,
    className
  ].filter(Boolean).join(' ');

  const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };
  
  return (
    <div className="app-select-group">
      {label && (
        <label htmlFor={selectId} className="app-select__label">
          {label}
        </label>
      )}
      
      <div className={containerClasses}>
        {leftIcon && (
          <span className="app-select__icon">
            {leftIcon}
          </span>
        )}
        
        <select
          id={selectId}
          className="app-select__field"
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        <span className="app-select__chevron">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4.427 6.573L8 10.146l3.573-3.573a.5.5 0 11.708.708L8.354 11.207a.5.5 0 01-.708 0L3.72 7.28a.5.5 0 11.708-.708z"/>
          </svg>
        </span>
      </div>
      
      {error && (
        <p className="app-select__error">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="app-select__helper">{helperText}</p>
      )}
    </div>
  );
};

export default AppSelect; 