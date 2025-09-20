import { render, screen } from '@testing-library/react';
import Tabs from './Tabs';

// Mock tab data for testing
const mockTabs = [
  { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
  { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div> },
];

describe('Tabs Component', () => {
  describe('Basic Rendering', () => {
    it('renders without errors', () => {
      render(<Tabs tabs={mockTabs} />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('renders all tabs', () => {
      render(<Tabs tabs={mockTabs} />);
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });

    it('renders all tab panels', () => {
      render(<Tabs tabs={mockTabs} />);
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.getByText('Content 3')).toBeInTheDocument();
    });
  });

  describe('ARIA Roles', () => {
    it('has correct ARIA roles', () => {
      render(<Tabs tabs={mockTabs} />);
      
      // Check tablist role
      expect(screen.getByRole('tablist')).toBeInTheDocument();
      
      // Check tab roles
      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(3);
      
      // Check tabpanel roles (they exist but are hidden for now)
      const panels = screen.getAllByRole('tabpanel', { hidden: true });
      expect(panels).toHaveLength(3);
    });

    it('supports aria-label prop', () => {
      render(<Tabs tabs={mockTabs} aria-label="Test navigation" />);
      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-label', 'Test navigation');
    });
  });

  describe('Component Structure', () => {
    it('renders tabs in tablist', () => {
      render(<Tabs tabs={mockTabs} />);
      const tablist = screen.getByRole('tablist');
      const tabs = screen.getAllByRole('tab');
      
      tabs.forEach(tab => {
        expect(tablist).toContainElement(tab);
      });
    });

    it('has proper tab IDs for accessibility', () => {
      render(<Tabs tabs={mockTabs} />);
      const panels = screen.getAllByRole('tabpanel', { hidden: true });
      
      panels.forEach((panel, index) => {
        expect(panel).toHaveAttribute('aria-labelledby', `tab-${mockTabs[index].id}`);
      });
    });
  });
});
