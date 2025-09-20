# React TypeScript Template

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF)](https://vitejs.dev/)

React template with TypeScript, Vite, Styled Components, and testing setup.

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

## 📦 Cool Really Awesome

- **React 19** - Latest React with modern features
- **Vite** - Lightning-fast build tool and dev server
- **TypeScript** - Full type safety and IntelliSense
- **Styled Components** - CSS-in-JS with TypeScript support
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Simple and complete testing utilities
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting with import sorting

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
├── components/          # Reusable UI components
│   ├── Card.tsx        # Example card component
│   ├── Card.test.tsx   # Card component tests
│   └── index.ts        # Component exports
├── test/               # Test configuration
│   └── setup.ts        # Test setup file
├── assets/             # Static assets
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
├── index.css           # Global styles
└── vite-env.d.ts       # Vite type definitions
```

## 🎨 Styling

This template uses Styled Components for CSS-in-JS styling:

- **Styled Components** - CSS-in-JS with TypeScript support
- **TypeScript Support** - Full type safety for styled components
- **Component-based Styling** - Encapsulated styles per component
- **Global Styles** - CSS file for global styles and resets

### Example Usage

```tsx
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;
  background-color: #f5f5f5;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;

function App() {
  return (
    <Container>
      <Button>Click me</Button>
    </Container>
  );
}
```

## 🧪 Testing

The project includes a comprehensive testing setup:

- **Vitest** - Fast test runner with Jest-compatible API
- **React Testing Library** - Simple and complete testing utilities
- **User Event** - Realistic user interaction simulation
- **JSDOM** - Browser-like environment for tests

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui
```

### Example Test

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './Button';

test('button handles click events', async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(<Button onClick={handleClick}>Click me</Button>);

  await user.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

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
