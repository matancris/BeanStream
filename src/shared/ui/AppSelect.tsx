import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AppSelectOption {
  value: string;
  label: string;
}

interface AppSelectProps {
  label?: string;
  placeholder?: string;
  options: AppSelectOption[];
  value?: string;
  error?: string;
  helper?: string;
  variant?: 'default' | 'filled';
  icon?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  className?: string;
  'data-testid'?: string;
}

const AppSelect: React.FC<AppSelectProps> = ({
  label,
  placeholder = 'Select an option...',
  options,
  value = '',
  error,
  helper,
  variant = 'default',
  icon,
  disabled = false,
  required = false,
  onChange,
  onBlur,
  className = '',
  'data-testid': testId,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  // Auto-focus management
  useEffect(() => {
    if (isFocused && selectRef.current) {
      selectRef.current.focus();
    }
  }, [isFocused]);

  const selectClasses = [
    'app-select',
    `app-select--${variant}`,
    isFocused && 'app-select--focused',
    error && 'app-select--error',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className="app-select-group">
      {label && (
        <label className="app-select__label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className={selectClasses}>
        {icon && (
          <div className="app-select__icon">
            {icon}
          </div>
        )}
        
        <select
          ref={selectRef}
          className="app-select__field"
          value={value}
          disabled={disabled}
          required={required}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          data-testid={testId}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="app-select__chevron">
          <ChevronDown size={16} />
        </div>
      </div>
      
      {error && (
        <div className="app-select__error">
          <span>⚠</span>
          {error}
        </div>
      )}
      
      {helper && !error && (
        <div className="app-select__helper">
          {helper}
        </div>
      )}
    </div>
  );
};

export default AppSelect; 