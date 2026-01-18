# Product Dashboard

**Live Demo:** [https://your-app.vercel.app](https://product-dashboard-silk.vercel.app/products)

A modern, responsive product management dashboard built with React, featuring advanced filtering, search, and CRUD operations.

![Screenshot](./screenshot.png)

## Features

### Core Features
-  **Product List** - Paginated view with 10 items per page
-  **Search** - Real-time search by product name with debouncing
-  **Advanced Filters**:
  - Category dropdown (from API)
  - Brand dropdown (from current products)
  - Price range (min/max)
  - Active filter tags with individual clear buttons
  - Clear all filters button
-  **Sorting** - Newest/Oldest first
-  **Responsive Design** - Table view (desktop) + Card view (mobile)
-  **Product Details** - Full product information with reviews
-  **Enhanced Pagination** - Page numbers + Previous/Next buttons

### Stretch Features (Bonus)
-  **Add Product Form** - CRUD operations with validation
-  **Testing** - Vitest + React Testing Library (15+ tests)
-  **Performance Optimizations**:
  - React.memo for ProductCard
  - useMemo for filtered results
  - Debounced search (500ms)
  - Lazy loading images
  - React Query caching

### Accessibility Features
-  Semantic HTML (nav, main, article, footer)
-  ARIA attributes (role, aria-label, aria-live)
-  Keyboard navigation (Tab, Enter, Space)
-  Screen reader friendly
-  Focus management

##  Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite 5
- **Routing:** React Router v6
- **Data Fetching:** TanStack Query (React Query)
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS
- **Testing:** Vitest + React Testing Library
- **API:** DummyJSON REST API

##  Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/product-dashboard.git
cd product-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

##  Running Tests
```bash
# Run tests in watch mode
npm test

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

##  Building for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

##  Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Loading.jsx
│   ├── ErrorMessage.jsx
│   ├── EmptyState.jsx
│   ├── ProductCard.jsx
│   ├── ProductTable.jsx
│   ├── ProductFilters.jsx
│   ├── Pagination.jsx
│   ├── AddProductForm.jsx
│   └── __tests__/      # Component tests
├── pages/              # Page components
│   ├── ProductList.jsx
│   └── ProductDetails.jsx
├── hooks/              # Custom React hooks
│   ├── useProducts.js
│   ├── useCategories.js
│   └── useDebounce.js
├── services/           # API integration
│   └── api.js
├── utils/              # Utility functions
│   ├── filterUtils.js
│   └── __tests__/      # Utility tests
└── tests/              # Test configuration
    ├── setup.js
    └── test-utils.jsx
```

##  Design Decisions

### Architecture
- **Component-based**: Modular, reusable components
- **Custom hooks**: Extract logic for reusability (useProducts, useCategories, useDebounce)
- **Utility functions**: Separate business logic from UI (filterUtils)
- **Service layer**: API calls abstracted for easy mocking

### State Management
- **React Query**: Server state with automatic caching and refetching
- **Local state**: UI-specific state with useState
- **Controlled components**: Forms with validation

### Performance
- **React.memo**: Prevent unnecessary re-renders of ProductCard
- **useMemo**: Cache filtered results and extracted brands
- **Debouncing**: Reduce API calls during search typing
- **keepPreviousData**: Smooth pagination transitions

### Code Quality
- **JSDoc comments**: Document all functions
- **Consistent naming**: handle{Action}, is{State} patterns
- **Single responsibility**: Each component/function does one thing
- **Testing**: Unit tests for utils, component tests for UI

##  Deployment

Deployed on Vercel: https://your-app.vercel.app

To deploy your own:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

##  Screenshots

### Desktop View
![Desktop View](./screenshots/desktop.png)

### Mobile View
![Mobile View](./screenshots/mobile.png)

### Filters
![Filters](./screenshots/filters.png)

##  Assessment Requirements

All core requirements met:
- Routing (/products and /product/:id)
- Data fetching with caching (React Query)
- Pagination (10 items per page)
- Search by product name
- Filters (category, brand, price)
- Sort by newest/oldest
- Product details page
- Error/Loading/Empty states
- Accessibility
- Responsive design

 Stretch goals completed:
- Add Product form with validation
- Testing infrastructure with 15+ tests
- Performance optimizations

## Future Enhancements

With more time, I would add:
- TypeScript for type safety
- More comprehensive test coverage
- URL state synchronization
- Infinite scroll as pagination alternative
- Advanced sorting (by price, rating, name)
- Product comparison feature
- Dark mode
- Export to CSV
- Offline support with service worker
- Internationalization (i18n)

##  Author

Created as part of the Front-end Developer assessment for Lotus Beta Analytics.

## 📄 License

This project is for assessment purposes.
