import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
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

  describe('Tab Switching', () => {
    it('shows first tab as active by default', () => {
      render(<Tabs tabs={mockTabs} />);
      
      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(firstTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content 1')).toBeVisible();
    });

    it('switches tabs when clicked', async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={mockTabs} />);
      
      const secondTab = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(secondTab);
      
      expect(secondTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content 2')).toBeVisible();
    });

    it('hides inactive panels', async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={mockTabs} />);
      
      const secondTab = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(secondTab);
      
      expect(screen.getByText('Content 1')).not.toBeVisible();
      expect(screen.getByText('Content 2')).toBeVisible();
    });

    it('calls onTabChange callback when tab is clicked', async () => {
      const onTabChange = vi.fn();
      const user = userEvent.setup();
      render(<Tabs tabs={mockTabs} onTabChange={onTabChange} />);
      
      const secondTab = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(secondTab);
      
      expect(onTabChange).toHaveBeenCalledWith(mockTabs[1]);
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works in uncontrolled mode by default', async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={mockTabs} />);
      
      const secondTab = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(secondTab);
      
      expect(secondTab).toHaveAttribute('aria-selected', 'true');
    });

    it('works in controlled mode when activeTabId is provided', () => {
      render(<Tabs tabs={mockTabs} activeTabId="tab2" />);
      
      const secondTab = screen.getByRole('tab', { name: 'Tab 2' });
      expect(secondTab).toHaveAttribute('aria-selected', 'true');
    });

    it('updates when activeTabId prop changes in controlled mode', () => {
      const { rerender } = render(<Tabs tabs={mockTabs} activeTabId="tab1" />);
      
      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true');
      
      rerender(<Tabs tabs={mockTabs} activeTabId="tab2" />);
      
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true');
    });
  });
});
