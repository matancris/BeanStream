import React, { useState } from 'react';
import { AppButton, AppInput, AppSelect } from '../../../shared/ui';

const ComponentsDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [loading, setLoading] = useState(false);

  const selectOptions = [
    { value: 'option1', label: 'Option One' },
    { value: 'option2', label: 'Option Two' },
    { value: 'option3', label: 'Option Three' },
    { value: 'option4', label: 'Option Four (Disabled)', disabled: true },
  ];

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  const UserIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 00-11.215 0c-.22.578.254 1.139.872 1.139h9.47z"/>
    </svg>
  );

  const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path fillRule="evenodd" d="M9.965 11.026a5 5 0 111.06-1.06l2.755 2.754a.75.75 0 11-1.06 1.06l-2.755-2.754zM10.5 7a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" clipRule="evenodd"/>
    </svg>
  );

  const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 2a.5.5 0 01.5.5v5h5a.5.5 0 010 1h-5v5a.5.5 0 01-1 0v-5h-5a.5.5 0 010-1h5v-5A.5.5 0 018 2z"/>
    </svg>
  );

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Design System Demo</h1>
        <p className="page-subtitle">
          Showcasing our modern, accessible component library
        </p>
      </div>

      {/* Button Variations */}
      <section className="demo-section">
        <h2 className="demo-section__title">Buttons</h2>
        
        <div className="demo-group">
          <h3 className="demo-group__title">Button Variants</h3>
          <div className="demo-grid demo-grid--4">
            <AppButton variant="primary">Primary Button</AppButton>
            <AppButton variant="secondary">Secondary Button</AppButton>
            <AppButton variant="ghost">Ghost Button</AppButton>
            <AppButton variant="danger">Danger Button</AppButton>
          </div>
        </div>

        <div className="demo-group">
          <h3 className="demo-group__title">Button Sizes</h3>
          <div className="demo-grid demo-grid--3">
            <AppButton size="small">Small Button</AppButton>
            <AppButton size="medium">Medium Button</AppButton>
            <AppButton size="large">Large Button</AppButton>
          </div>
        </div>

        <div className="demo-group">
          <h3 className="demo-group__title">Button States</h3>
          <div className="demo-grid demo-grid--4">
            <AppButton loading={loading} onClick={handleLoadingDemo}>
              {loading ? 'Loading...' : 'Click for Loading'}
            </AppButton>
            <AppButton disabled>Disabled Button</AppButton>
            <AppButton fullWidth>Full Width Button</AppButton>
            <AppButton leftIcon={<PlusIcon />}>With Left Icon</AppButton>
          </div>
        </div>
      </section>

      {/* Input Variations */}
      <section className="demo-section">
        <h2 className="demo-section__title">Form Inputs</h2>
        
        <div className="demo-group">
          <h3 className="demo-group__title">Input Variants</h3>
          <div className="demo-grid demo-grid--2">
            <AppInput
              label="Default Input"
              placeholder="Enter some text..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              helperText="This is a helpful message"
            />
            <AppInput
              label="Filled Input"
              variant="filled"
              placeholder="Filled variant..."
              helperText="Filled background style"
            />
          </div>
        </div>

        <div className="demo-group">
          <h3 className="demo-group__title">Input with Icons</h3>
          <div className="demo-grid demo-grid--2">
            <AppInput
              label="Search Input"
              placeholder="Search customers..."
              leftIcon={<SearchIcon />}
              helperText="Input with left icon"
            />
            <AppInput
              label="User Input"
              placeholder="Enter username..."
              rightIcon={<UserIcon />}
              helperText="Input with right icon"
            />
          </div>
        </div>

        <div className="demo-group">
          <h3 className="demo-group__title">Input States</h3>
          <div className="demo-grid demo-grid--2">
            <AppInput
              label="Input with Error"
              placeholder="Enter invalid data..."
              error="This field has an error"
            />
            <AppInput
              label="Disabled Input"
              placeholder="Cannot edit this..."
              disabled
              helperText="This input is disabled"
            />
          </div>
        </div>
      </section>

      {/* Select Variations */}
      <section className="demo-section">
        <h2 className="demo-section__title">Select Dropdowns</h2>
        
        <div className="demo-group">
          <div className="demo-grid demo-grid--2">
            <AppSelect
              label="Basic Select"
              options={selectOptions}
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              placeholder="Choose an option..."
              helperText="Select from available options"
            />
            <AppSelect
              label="Select with Icon"
              options={selectOptions}
              leftIcon={<UserIcon />}
              placeholder="Choose with icon..."
              helperText="Select with left icon"
            />
          </div>
        </div>

        <div className="demo-group">
          <div className="demo-grid demo-grid--2">
            <AppSelect
              label="Select with Error"
              options={selectOptions}
              error="Please select a valid option"
              placeholder="This has an error..."
            />
            <AppSelect
              label="Disabled Select"
              options={selectOptions}
              disabled
              placeholder="Cannot select..."
              helperText="This select is disabled"
            />
          </div>
        </div>
      </section>

      {/* Layout Demo */}
      <section className="demo-section">
        <h2 className="demo-section__title">Layout Components</h2>
        
        <div className="demo-group">
          <h3 className="demo-group__title">Card Layout</h3>
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Sample Card</h4>
              <p className="card-subtitle">This is a card component using our design system</p>
            </div>
            <div className="card-body">
              <p>
                Cards provide a flexible container for grouping related content and actions.
                They use consistent spacing, borders, and shadows from our design tokens.
              </p>
              <div className="form-actions">
                <AppButton variant="secondary" size="small">Cancel</AppButton>
                <AppButton size="small">Save Changes</AppButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color & Typography Demo */}
      <section className="demo-section">
        <h2 className="demo-section__title">Design Tokens</h2>
        
        <div className="demo-group">
          <h3 className="demo-group__title">Typography Scale</h3>
          <div className="typography-demo">
            <h1 style={{ margin: '0 0 var(--space-2) 0', fontSize: 'var(--font-size-2xl)' }}>
              Heading 1 - 2xl
            </h1>
            <h2 style={{ margin: '0 0 var(--space-2) 0', fontSize: 'var(--font-size-xl)' }}>
              Heading 2 - xl
            </h2>
            <h3 style={{ margin: '0 0 var(--space-2) 0', fontSize: 'var(--font-size-lg)' }}>
              Heading 3 - lg
            </h3>
            <p style={{ margin: '0 0 var(--space-2) 0', fontSize: 'var(--font-size-base)' }}>
              Body text - base size with proper line height for readability
            </p>
            <p style={{ margin: '0', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
              Small text - sm size for captions and helper text
            </p>
          </div>
        </div>

        <div className="demo-group">
          <h3 className="demo-group__title">Color Tokens</h3>
          <div className="color-demo">
            <div className="color-demo__grid">
              <div className="color-demo__item">
                <div className="color-demo__swatch" style={{ backgroundColor: 'var(--color-interactive-primary)' }}></div>
                <span>Primary</span>
              </div>
              <div className="color-demo__item">
                <div className="color-demo__swatch" style={{ backgroundColor: 'var(--color-status-success)' }}></div>
                <span>Success</span>
              </div>
              <div className="color-demo__item">
                <div className="color-demo__swatch" style={{ backgroundColor: 'var(--color-status-warning)' }}></div>
                <span>Warning</span>
              </div>
              <div className="color-demo__item">
                <div className="color-demo__swatch" style={{ backgroundColor: 'var(--color-status-error)' }}></div>
                <span>Error</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComponentsDemo; 