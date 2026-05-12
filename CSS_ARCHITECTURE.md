# KWES NGO Website - CSS Architecture

## Styling Structure

The project uses a modular CSS architecture with Tailwind CSS for utility-first styling. Styles are organized into separate files for better maintainability:

### File Structure

```
src/
├── styles/
│   ├── components.css    # Reusable component styles
│   ├── utilities.css     # Custom utility classes and animations
│   └── pages.css         # Page-specific layout styles
├── index.css             # Global styles and imports
└── tailwind.config.js    # Tailwind configuration
```

### CSS Files Description

#### `index.css` - Global Styles
- Tailwind CSS directives (@tailwind base, components, utilities)
- Google Fonts import (Inter font family)
- Global base styles (html, body)
- Imports for all separate style files

#### `styles/components.css` - Component Styles
Contains reusable component classes:
- `.btn-primary`, `.btn-secondary` - Button styles
- `.navbar`, `.navbar-transparent`, `.navbar-solid` - Navigation styles
- `.card`, `.card-hover` - Card component styles
- `.form-input`, `.form-label` - Form element styles
- `.footer`, `.footer-link` - Footer styles

#### `styles/utilities.css` - Custom Utilities
Custom utility classes and animations:
- `.text-shadow` - Text shadow utility
- `.gradient-primary`, `.gradient-secondary` - Gradient backgrounds
- `.shadow-soft`, `.shadow-strong` - Custom shadow utilities
- `.animate-fade-in`, `.animate-slide-up`, `.animate-bounce-in` - Animation classes

#### `styles/pages.css` - Page Layouts
Page-specific layout classes:
- `.home-hero`, `.home-stats`, `.home-programs` - Home page layouts
- `.about-mission`, `.about-story` - About page layouts
- `.programs-grid`, `.program-details` - Programs page layouts
- `.impact-cards`, `.testimonials-grid` - Impact page layouts
- `.contact-grid`, `.contact-form` - Contact page layouts

### Usage Guidelines

1. **Global Styles**: Use `index.css` for site-wide styles and Tailwind imports
2. **Component Styles**: Add reusable component classes to `components.css`
3. **Page Styles**: Use `pages.css` for page-specific layout classes
4. **Utilities**: Add custom utility classes to `utilities.css`

### Benefits

- **Modularity**: Styles are organized by purpose and reusability
- **Maintainability**: Easy to find and modify specific styles
- **Performance**: CSS is properly imported and bundled
- **Scalability**: Easy to add new styles without cluttering the main CSS file

### Development

When adding new styles:
1. Determine the appropriate file based on the style's purpose
2. Use Tailwind's `@apply` directive for consistent utility application
3. Follow the existing naming conventions
4. Test styles across different screen sizes