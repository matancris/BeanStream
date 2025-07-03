# CSS Architecture Documentation

## Overview

This CSS architecture follows modern 2025 best practices using the **ITCSS (Inverted Triangle CSS)** methodology combined with **CSS custom properties** for design tokens and semantic naming conventions.

## Architecture Principles

### 1. ITCSS (Inverted Triangle CSS)
Organizes CSS from generic to specific, managing specificity naturally:

```
        /\
       /  \     Settings    - Variables, configs
      /    \    Tools       - Mixins, functions
     /      \   Generic     - Resets, normalize
    /        \  Base        - Element defaults
   /          \ Objects     - Layout patterns
  /____________\Components  - UI components
 /______________\Utilities  - Helper classes
```

### 2. Design Tokens
Uses CSS custom properties for consistent, scalable design tokens:
- **Semantic naming** (purpose-based rather than descriptive)
- **Dark mode support** with automatic and manual toggles
- **Fluid typography** using `clamp()` for responsive design
- **Consistent spacing** using a mathematical scale

### 3. Modern CSS Features
- CSS Custom Properties (CSS Variables)
- Fluid typography with `clamp()`
- Logical properties for better internationalization
- Modern reset with accessibility considerations
- Container queries ready structure

## Folder Structure

```
src/assets/styles/
├── 01-settings/          # Design tokens and variables
│   ├── variables.css     # App variables, z-index, animations
│   ├── colors.css        # Color system with semantic tokens
│   ├── typography.css    # Font system and fluid typography
│   ├── spacing.css       # Spacing scale and semantic tokens
│   └── breakpoints.css   # Responsive breakpoints
│
├── 02-tools/             # Mixins and functions
│   └── mixins.css        # CSS "mixins" (patterns for reference)
│
├── 03-generic/           # Resets and normalization
│   ├── reset.css         # Modern CSS reset
│   └── normalize.css     # Cross-browser normalization
│
├── 04-base/              # Element defaults (no classes)
│   ├── typography.css    # Base heading and text styles
│   ├── forms.css         # Default form element styles
│   └── media.css         # Image, video, svg defaults
│
├── 05-objects/           # Layout patterns
│   ├── container.css     # Container layouts
│   ├── grid.css          # Grid systems
│   └── media.css         # Media object patterns
│
├── 06-components/        # UI components
│   ├── buttons.css       # Button component styles
│   ├── forms.css         # Form component styles
│   ├── cards.css         # Card component styles
│   ├── navigation.css    # Navigation components
│   ├── tables.css        # Table component styles
│   └── alerts.css        # Alert component styles
│
├── 07-utilities/         # Helper classes
│   ├── spacing.css       # Margin, padding utilities
│   ├── typography.css    # Text utilities
│   ├── display.css       # Display utilities
│   └── visibility.css    # Visibility utilities
│
├── main.css              # Main entry point (imports all layers)
└── README.md             # This documentation
```

## Design Token System

### Color System
The color system uses semantic naming for better maintainability:

```css
/* Raw colors (palette) */
--color-blue-500: #3b82f6;

/* Semantic tokens (purpose-based) */
--color-interactive-primary: var(--color-blue-500);
--color-text-link: var(--color-blue-600);
```

#### Color Categories
- **Background**: `--color-bg-primary`, `--color-bg-secondary`
- **Surface**: `--color-surface-primary`, `--color-surface-raised`
- **Text**: `--color-text-primary`, `--color-text-secondary`
- **Interactive**: `--color-interactive-primary`, `--color-interactive-primary-hover`
- **Status**: `--color-status-success`, `--color-status-error`
- **Border**: `--color-border-primary`, `--color-border-strong`

### Typography System
Fluid typography using modern CSS techniques:

```css
/* Fluid font sizes using clamp() */
--font-size-lg: clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem);

/* Semantic typography tokens */
--typography-h1: var(--font-weight-extrabold) var(--font-size-4xl) / var(--line-height-tight) var(--font-family-sans);
```

### Spacing System
Consistent spacing using a mathematical scale:

```css
/* Base spacing scale (8px base) */
--space-4: 1rem;      /* 16px */
--space-8: 2rem;      /* 32px */

/* Semantic spacing tokens */
--space-component-md: var(--space-4);  /* Standard internal spacing */
--space-layout-lg: var(--space-12);    /* Large layout gap */
```

## Dark Mode Support

The system supports both automatic and manual dark mode:

### Automatic (System Preference)
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-primary: var(--color-gray-900);
    --color-text-primary: var(--color-gray-100);
  }
}
```

### Manual Toggle
```css
[data-theme="dark"] {
  --color-bg-primary: var(--color-gray-900);
  --color-text-primary: var(--color-gray-100);
}
```

## Component Guidelines

### Naming Convention
- **Objects**: `.o-container`, `.o-grid`
- **Components**: `.c-button`, `.c-card` (or just `.button`, `.card`)
- **Utilities**: `.u-margin-top-lg`, `.u-text-center`

### Component Structure
```css
/* Component block */
.component {
  /* Layout properties */
  /* Box model properties */
  /* Typography properties */
  /* Visual properties */
  /* Misc properties */
}

/* Component elements */
.component__element {
  /* Styles for component parts */
}

/* Component modifiers */
.component--modifier {
  /* Variant styles */
}
```

## Best Practices

### 1. Use Design Tokens
Always use design tokens instead of hard-coded values:

```css
/* ❌ Avoid */
.my-component {
  color: #3b82f6;
  padding: 16px;
}

/* ✅ Prefer */
.my-component {
  color: var(--color-interactive-primary);
  padding: var(--space-component-md);
}
```

### 2. Follow ITCSS Layers
Place styles in the appropriate layer:
- **Settings**: Variables only, no output
- **Components**: Specific UI pieces
- **Utilities**: Single-purpose helpers

### 3. Semantic Naming
Use purpose-based names rather than descriptive ones:

```css
/* ❌ Avoid */
--color-light-blue: #3b82f6;

/* ✅ Prefer */
--color-interactive-primary: #3b82f6;
```

### 4. Mobile-First Responsive Design
Write mobile styles first, then enhance for larger screens:

```css
.component {
  padding: var(--space-4);
}

@media (min-width: 768px) {
  .component {
    padding: var(--space-8);
  }
}
```

## Adding New Components

1. **Create component file**: `src/assets/styles/06-components/new-component.css`
2. **Import in main.css**: Add `@import './06-components/new-component.css';`
3. **Use design tokens**: Reference existing design tokens
4. **Follow naming convention**: Use semantic, purpose-based class names

## Browser Support

This architecture uses modern CSS features:
- **CSS Custom Properties**: IE 11+ (with fallbacks)
- **CSS Grid**: IE 11+ (with @supports)
- **Flexbox**: IE 11+
- **clamp()**: Chrome 79+, Firefox 75+, Safari 13.1+

For older browser support, consider using PostCSS plugins or providing fallbacks.

## Performance Considerations

- **Critical CSS**: Consider inlining critical styles
- **Unused CSS**: Use tools like PurgeCSS in production
- **CSS Modules**: Consider for component isolation
- **Bundle size**: Monitor CSS bundle size in builds

## Migration Guide

When migrating existing styles:

1. **Audit existing styles**: Identify reusable patterns
2. **Extract design tokens**: Convert hard-coded values to tokens
3. **Reorganize by ITCSS**: Move styles to appropriate layers
4. **Update class names**: Use semantic naming conventions
5. **Test thoroughly**: Ensure visual consistency

## Tools and Workflow

### Recommended Tools
- **PostCSS**: For modern CSS features and optimizations
- **Stylelint**: For CSS linting and consistency
- **CSS Stats**: For analyzing CSS complexity
- **Browser DevTools**: For debugging custom properties

### Development Workflow
1. **Design tokens first**: Define tokens before writing components
2. **Component-driven**: Build components in isolation
3. **Test responsiveness**: Test across different screen sizes
4. **Validate accessibility**: Ensure good contrast and focus states
5. **Review and refactor**: Regular code reviews for consistency 