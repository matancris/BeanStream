import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuthStore } from '../../modules/auth/store';
import { AppButton, ThemeToggle } from '.';

const Layout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-container">
          <div className="header-content container">
            <div className="header-left">
              <h1 className="logo">Bean Stream</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="nav nav--desktop">
              <NavLink
                to="/customers"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                Customers
              </NavLink>
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                Menu
              </NavLink>
              <NavLink
                to="/theme"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                Theme
              </NavLink>
            </nav>
            
            <div className="header-right">
              <div className="user-info">
                <ThemeToggle />
                <span className="user-name">
                  Welcome, {user?.name || user?.email}
                </span>
                <AppButton
                  variant="secondary"
                  size="small"
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  Logout
                </AppButton>
              </div>
              
              {/* Mobile Menu Button */}
              <button
                className="mobile-menu-toggle"
                onClick={toggleMobileMenu}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <div className={`nav nav--mobile ${isMobileMenuOpen ? 'nav--mobile-open' : ''}`}>
          <div className="nav-mobile-content">
            <NavLink
              to="/customers"
              className={({ isActive }) =>
                `nav-link nav-link--mobile ${isActive ? 'active' : ''}`
              }
              onClick={closeMobileMenu}
            >
              Customers
            </NavLink>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `nav-link nav-link--mobile ${isActive ? 'active' : ''}`
              }
              onClick={closeMobileMenu}
            >
              Menu
            </NavLink>
            <NavLink
              to="/theme"
              className={({ isActive }) =>
                `nav-link nav-link--mobile ${isActive ? 'active' : ''}`
              }
              onClick={closeMobileMenu}
            >
              Theme
            </NavLink>
            
            <div className="nav-mobile-user">
              <span className="user-name-mobile">
                Welcome, {user?.name || user?.email}
              </span>
              <AppButton
                variant="danger"
                size="medium"
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                fullWidth
              >
                Logout
              </AppButton>
            </div>
          </div>
        </div>
      </header>
      
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout; 