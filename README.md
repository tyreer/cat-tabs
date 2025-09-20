# Tabs Component - Accessible React Component

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF)](https://vitejs.dev/)
[![Tests](https://img.shields.io/badge/Tests-36%2F36%20passing-brightgreen)](https://vitest.dev/)

A fully accessible, ARIA-compliant Tabs component with retro Windows 95 styling, built with React, TypeScript, and styled-components.

## 🛠️ Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tyreer/react-ts-template.git
   cd dev-template
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

4. **Run tests:**

   ```bash
   npm test
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## ✨ Features

### 🎯 Core Functionality

- **Full ARIA Compliance** - Follows [W3C ARIA Tabs pattern guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- **Keyboard Navigation** - Arrow keys, Tab key, and focus management
- **Automatic Activation** - Tabs activate when focused
- **Controlled/Uncontrolled** - Supports both component patterns
- **Error Handling** - Comprehensive validation with user-friendly messages

### ♿ Accessibility Features

- **Screen Reader Support** - Full compatibility with assistive technologies
- **Keyboard Navigation** - Complete keyboard accessibility
- **Focus Management** - Proper focus indicators and movement
- **ARIA Attributes** - All required ARIA roles and properties
- **Semantic HTML** - Proper semantic structure

### 🎨 Styling & Design

- **Retro Windows 95 Aesthetic** - Authentic old-school interface
- **3D Beveled Effects** - Classic raised/inset button styling
- **Responsive Design** - Works on all screen sizes
- **Customizable** - Easy to theme and modify
- **Styled Components** - CSS-in-JS with TypeScript support

### 🧪 Testing & Quality

- **100% Test Coverage** - 36/36 tests passing
- **User Interaction Testing** - Comprehensive user behavior testing following [Testing Library query priority guidelines](https://testing-library.com/docs/queries/about#priority)
- **Accessibility Testing** - ARIA and screen reader testing
- **Edge Case Testing** - Error handling and validation testing
- **Performance Optimized** - React.memo and useCallback optimizations

### Dependencies

- `react` & `react-dom` - React framework
- `styled-components` - CSS-in-JS styling
- `@types/styled-components` - TypeScript definitions

### Dev Dependencies

- `@vitejs/plugin-react` - Vite React plugin
- `typescript` - TypeScript compiler
- `vitest` - Testing framework
- `@testing-library/react` - React testing utilities
- `@testing-library/jest-dom` - Custom Jest matchers
- `@testing-library/user-event` - User interaction testing
- `jsdom` - DOM environment for testing
- `eslint` - Code linting

## 📁 Project Structure

```
src/
├── components/          # Tabs component implementation
│   ├── Tabs.tsx         # Main Tabs component with sub-components
│   ├── Tabs.test.tsx    # Comprehensive test suite (36 tests)
│   └── index.ts         # Component exports
├── test/               # Test configuration
│   └── setup.ts        # Test setup file
├── public/             # Static assets
│   └── cat/            # Demo cat images (8 images)
├── llm-spec/           # Project documentation
│   └── todo.md         # Implementation checklist
├── App.tsx             # Demo application with Hans cat gallery
├── main.tsx            # Application entry point
├── index.css           # Global styles
└── vite-env.d.ts       # Vite type definitions
```

## 🎨 Usage Examples

### Basic Usage

```tsx
import { Tabs } from './components';

const tabs = [
  {
    id: 'tab1',
    label: 'First Tab',
    content: <div>Content for first tab</div>,
  },
  {
    id: 'tab2',
    label: 'Second Tab',
    content: <div>Content for second tab</div>,
  },
];

function App() {
  return <Tabs tabs={tabs} aria-label="Main navigation" />;
}
```

### Controlled Mode

```tsx
import { useState } from 'react';

import { Tabs } from './components';

function App() {
  const [activeTabId, setActiveTabId] = useState('tab1');

  const handleTabChange = (activeTab) => {
    setActiveTabId(activeTab.id);
  };

  return (
    <Tabs
      tabs={tabs}
      activeTabId={activeTabId}
      onTabChange={handleTabChange}
      aria-label="Controlled tabs"
    />
  );
}
```

### With Custom Styling

The component uses styled-components with a 90s style:

- **3D Beveled Effects** - Classic raised/inset button styling
- **Retro Color Scheme** - Gray backgrounds with blue accents
- **Pixelated Typography** - Courier New monospace font
- **Authentic Interactions** - Hover, focus, and active states

## 🧪 Testing

The project includes comprehensive testing with **36/36 tests passing**:

- **Vitest** - Fast test runner with Jest-compatible API
- **React Testing Library** - User-focused testing utilities
- **User Event** - Realistic user interaction simulation
- **JSDOM** - Browser-like environment for tests

### Test Coverage

- ✅ **User Interaction Tests** - Click, keyboard, and focus navigation
- ✅ **Accessibility Tests** - ARIA attributes and screen reader compatibility
- ✅ **Edge Case Tests** - Empty arrays, invalid objects, error handling
- ✅ **Integration Tests** - Controlled/uncontrolled modes, callbacks
- ✅ **Performance Tests** - Component memoization and event handlers

### Running Tests

```bash
# Run all tests
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests without type checking
npm run test:only
```

### Demo Application

The project includes a live demo with 8 cat images named "Hans 1" through "Hans 8":

**Local Development:**

```bash
npm run dev
# Visit http://localhost:5175/
```

**Live Demo:**

- [GitHub Pages Demo](https://tyreer.github.io/cat-tabs/) - Live demo with Hans cat gallery
- Automatically deployed from the `main` branch
- Updates automatically when you push changes

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests with type checking
- `npm run test:run` - Run tests once with type checking
- `npm run test:ui` - Run tests with UI
- `npm run test:only` - Run tests without type checking
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration with Vitest setup
- `tsconfig.json` - TypeScript configuration
- `vitest.config.ts` - Vitest testing configuration
- `.gitignore` - Comprehensive git ignore rules

## 📚 References

This implementation follows established best practices and guidelines:

- **[W3C ARIA Authoring Practices Guide - Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)** - Official accessibility guidelines for tab interfaces
- **[Testing Library Query Priority Guidelines](https://testing-library.com/docs/queries/about#priority)** - Best practices for semantic testing queries
- **[[Margin considered harmful]](https://mxstbr.com/thoughts/margin)** - Guidelines for spacing and layout via Max Stoiber

These resources informed our implementation decisions for accessibility, testing, and styling approaches.

## 🚀 GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages:

### Setup Instructions

1. **Push to GitHub:**

   ```bash
   git add .
   git commit -m "feat: add GitHub Pages deployment configuration"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy your site
   - **Important:** Make sure your repository has "Pages" enabled in Settings → Actions → General → Workflow permissions

3. **Update Repository Name:**
   - Edit `vite.config.ts` and replace `'Tabs'` with your actual repository name
   - Update the demo link in README.md with your GitHub username

### Deployment Features

- ✅ **Automatic Deployment** - Deploys on every push to `main` branch
- ✅ **Test Integration** - Runs tests before deployment
- ✅ **Build Optimization** - Production-optimized build
- ✅ **GitHub Actions** - No manual deployment needed

### Manual Deployment

If you need to deploy manually:

```bash
npm run build
# Upload the 'dist' folder contents to your web server
```

Your site will be available at: `https://your-username.github.io/your-repo-name/`

### Troubleshooting

**If deployment fails with permission errors:**

1. **Check Repository Settings:**
   - Go to Settings → Actions → General
   - Under "Workflow permissions", select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"

2. **Verify Pages Settings:**
   - Go to Settings → Pages
   - Source should be set to "GitHub Actions"
   - If you see "gh-pages" as an option, make sure it's set to "GitHub Actions" instead

3. **Check Workflow Permissions:**
   - The workflow now includes proper permissions for Pages deployment
   - No personal access tokens needed - uses built-in GITHUB_TOKEN
