import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'centered' | 'full-width';
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  header,
  sidebar,
  footer,
  className = '',
  variant = 'default'
}) => {
  const baseClasses = 'app-layout';
  const variantClass = `app-layout--${variant}`;
  
  const containerClasses = [
    baseClasses,
    variantClass,
    className
  ].filter(Boolean).join(' ');

  if (sidebar) {
    return (
      <div className={`${containerClasses} app-layout--with-sidebar`}>
        {header && (
          <header className="app-layout__header">
            {header}
          </header>
        )}
        
        <div className="app-layout__body">
          <aside className="app-layout__sidebar">
            {sidebar}
          </aside>
          
          <main className="app-layout__main">
            {children}
          </main>
        </div>
        
        {footer && (
          <footer className="app-layout__footer">
            {footer}
          </footer>
        )}
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {header && (
        <header className="app-layout__header">
          {header}
        </header>
      )}
      
      <main className="app-layout__main">
        {children}
      </main>
      
      {footer && (
        <footer className="app-layout__footer">
          {footer}
        </footer>
      )}
    </div>
  );
};

export default AppLayout; 