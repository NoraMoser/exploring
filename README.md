# 🌍 Country Explorer

This is a lightweight React app to explore countries around the world. It uses the [REST Countries API](https://restcountries.com/) for real-time data and [Leaflet](https://leafletjs.com/) for interactive maps.

---

## 🚀 Getting Started

### 1. Clone the repository
### 2. Install dependencies with npm install
### 3. Run the development server with npm start



## ✨ Features

- **Search** countries by name  
- **Sort** countries alphabetically  
- **Paginated** list view (12 per page)  
- **Responsive** design for mobile and desktop  
- **Country detail pages** with:
  - Official name  
  - Flag  
  - Region, capital, population  
  - Interactive Leaflet map  


## 🌐 APIs & Libraries

### REST Countries API  
Used to fetch country details like names, regions, flags, population, and coordinates.  
🔗 [https://restcountries.com/](https://restcountries.com/)

### Leaflet  
Used for rendering dynamic and interactive maps on the detail page.  
🔗 [https://leafletjs.com/](https://leafletjs.com/)

### React Testing Library
Used to test the components and functions for this app
🔗 [https://testing-library.com/docs/react-testing-library/intro/](https://testing-library.com/docs/react-testing-library/intro/)

---

## ⚙️ Tech Stack

- **React** — UI framework  
- **React Router** — Navigation  
- **React Query** — Data fetching and caching  
- **React Error Boundaries** - catching errors and displaying fallback UI
- **Leaflet** — Map rendering  
- **CSS / Flexbox** — Layout and styling  
- **React Testing Library** - Unit and Integration Tests

## ⚡ Performance Notes

- Lazy loaded routes with `React.lazy` + `Suspense`  
- Pagination improves load/render performance  
- Images (flags, map tiles) use `loading="lazy"`  
- Fonts and layout optimized for minimal layout shift  
- Accessability taken into consideration from  🔗 [https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
