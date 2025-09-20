# Tabs Component Specification

## Overview

A fully accessible, ARIA-compliant Tabs component built with React, TypeScript, and styled-components. The component follows W3C ARIA guidelines and includes comprehensive testing coverage using React Testing Library.

## Core Requirements

### Functional Requirements

- **Array-based API**: Accepts an array of tab objects with `id`, `label`, and `content` properties
- **Automatic activation**: Tabs activate automatically when focused (W3C recommended pattern)
- **Keyboard navigation**: Arrow keys for tab navigation, Tab key for focus management
- **Controlled/Uncontrolled**: Supports both patterns, defaults to uncontrolled
- **Error handling**: Validates tab objects on mount, displays inline error messages
- **Accessibility**: Full ARIA compliance following W3C guidelines

### Technical Requirements

- **Framework**: React with TypeScript
- **Styling**: styled-components with old-school Windows interface aesthetic
- **Testing**: React Testing Library with user-event for comprehensive coverage
- **Performance**: React.memo optimization, useCallback for event handlers
- **Documentation**: JSDoc comments for all interfaces and props

## API Specification

### Props Interface

```typescript
interface TabObject {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabObject[];
  activeTabId?: string; // For controlled mode
  onTabChange?: (activeTab: TabObject) => void;
  'aria-label'?: string;
}
```

### Component Structure

```typescript
// Main component with sub-components in same file
export default function Tabs({
  tabs,
  activeTabId,
  onTabChange,
  'aria-label': ariaLabel,
}: TabsProps);

// Sub-components (internal to Tabs.tsx)
-TabList((role = 'tablist')) -
  Tab((role = 'tab')) -
  TabPanel((role = 'tabpanel'));
```

## Architecture Decisions

### State Management

- **Primary**: useState for active tab state
- **Controlled mode**: Parent manages state via `activeTabId` prop
- **Uncontrolled mode**: Internal state management (default)
- **Custom hooks**: Consider `useTabs` if keyboard logic becomes complex

### Styling Approach

- **Library**: styled-components (matches existing project pattern)
- **Structure**: Separate styled-components for each element
- **Aesthetic**: Old-school Windows interface with 3D beveled look
- **Spacing**: Follow [margin guidance](https://mxstbr.com/thoughts/margin) - no margin, use spacers
- **Customization**: Hardcoded styling (not customizable)

### Error Handling Strategy

- **Validation**: Tab objects validated on mount only
- **Required fields**: `id`, `label`, `content`
- **Error display**: Inline error messages within component
- **Edge cases**: Empty tabs array, invalid tab objects, missing required properties

## Accessibility Implementation

### ARIA Attributes (W3C Compliant)

- `role="tablist"` on container
- `role="tab"` on each tab button
- `role="tabpanel"` on each content panel
- `aria-selected="true/false"` on tabs
- `aria-controls` linking tabs to panels
- `aria-labelledby` linking panels to tabs
- `aria-label` on tablist (if provided)

### Keyboard Navigation

- **Arrow Keys**: Left/Right for tab navigation
- **Tab Key**: Standard focus management
- **Automatic Activation**: Tabs activate on focus
- **Focus Management**: First tab selected by default

### Focus Behavior

- Initial focus on first tab
- Arrow keys wrap around (first ↔ last)
- Tab key moves to next focusable element outside tablist
- Automatic activation on focus change

## Testing Strategy

### Test Organization

- **Structure**: Single test file with multiple describe blocks
- **Pattern**: User interaction patterns (not technical implementation)
- **Library**: React Testing Library with user-event
- **Query Priority**: Follow [RTL guidelines](https://testing-library.com/docs/queries/about#priority)

### Test Categories

#### 1. User Can Navigate Tabs

- Arrow key navigation (left/right)
- Focus wrapping (first ↔ last)
- Tab key focus management
- Mouse click activation

#### 2. User Can See Content

- First tab selected by default
- Content changes when switching tabs
- Only one panel visible at a time
- Correct tab highlighted as active

#### 3. User Can Access All Features

- All tabs accessible via keyboard
- Screen reader compatibility
- ARIA attributes present and correct
- Focus indicators visible

#### 4. Edge Cases and Error Handling

- Empty tabs array
- Invalid tab objects
- Missing required properties
- Single tab scenario
- Controlled vs uncontrolled modes

### Test Implementation Guidelines

- Use `getByRole` as primary query method
- Test with `userEvent.setup()` for interactions
- Focus on user behavior, not implementation details
- Test accessibility tree, not DOM structure
- Comprehensive edge case coverage

## File Structure

```
src/components/
├── Tabs.tsx          # Main component with sub-components
├── Tabs.test.tsx     # Comprehensive test suite
└── index.ts          # Export Tabs component
```

## Implementation Details

### Component Structure

```typescript
// Tabs.tsx
export default function Tabs({
  tabs,
  activeTabId,
  onTabChange,
  'aria-label': ariaLabel,
}: TabsProps) {
  // State management
  // Validation logic
  // Keyboard handlers
  // Render logic
}

// Sub-components (internal)
function TabList({ children, ...props }) {
  /* ... */
}
function Tab({ tab, isActive, onClick, ...props }) {
  /* ... */
}
function TabPanel({ tab, isActive, ...props }) {
  /* ... */
}
```

### Styling Requirements

- **TabList**: Horizontal layout with old-school button styling
- **Tab**: 3D beveled appearance, active/inactive states
- **TabPanel**: Content area with proper spacing
- **Colors**: Gray scale with blue accents (retro Windows)
- **Typography**: System fonts, pixelated appearance
- **Spacing**: No margins, use gap/padding for spacing

### Performance Optimizations

- `React.memo` for component memoization
- `useCallback` for event handlers
- Minimal re-renders on tab changes
- Efficient keyboard event handling

## Example Usage

```typescript
const tabs = [
  { id: 'tab1', label: 'Photos', content: <PhotoGallery /> },
  { id: 'tab2', label: 'Settings', content: <SettingsPanel /> },
  { id: 'tab3', label: 'About', content: <AboutSection /> }
];

// Uncontrolled
<Tabs tabs={tabs} onTabChange={(tab) => console.log(tab)} />

// Controlled
<Tabs
  tabs={tabs}
  activeTabId={activeTabId}
  onTabChange={setActiveTabId}
  aria-label="Main navigation"
/>
```

## Development Guidelines

### Code Quality

- TypeScript strict mode
- ESLint + Prettier configuration
- JSDoc documentation for all public APIs
- Follow existing project patterns

### Testing Requirements

- 100% user interaction coverage
- Comprehensive edge case testing
- Accessibility testing with semantic queries
- Performance testing for keyboard navigation

### Documentation

- JSDoc comments for all interfaces
- Inline comments for complex logic
- README with usage examples
- Accessibility notes for developers

## Success Criteria

### Functional

- ✅ All W3C ARIA guidelines implemented
- ✅ Keyboard navigation works perfectly
- ✅ Screen reader compatibility
- ✅ Error handling for edge cases
- ✅ Controlled/uncontrolled modes

### Technical

- ✅ TypeScript strict compliance
- ✅ Comprehensive test coverage
- ✅ Performance optimized
- ✅ Follows React best practices
- ✅ Matches existing project patterns

### User Experience

- ✅ Intuitive keyboard navigation
- ✅ Clear visual feedback
- ✅ Accessible to all users
- ✅ Retro aesthetic maintained
- ✅ Smooth interactions

## Implementation Priority

1. **Core Component**: Basic Tabs structure with ARIA attributes
2. **Keyboard Navigation**: Arrow key handling and focus management
3. **Styling**: Old-school Windows interface implementation
4. **Testing**: Comprehensive test suite with user interactions
5. **Error Handling**: Validation and error message display
6. **Performance**: Optimizations and React best practices
7. **Documentation**: JSDoc comments and usage examples

This specification provides everything needed for immediate implementation while maintaining high standards for accessibility, testing, and user experience.
