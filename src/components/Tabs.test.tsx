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

  describe('Keyboard Navigation', () => {
    it('navigates to next tab with right arrow key', async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={mockTabs} />);
      
      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      await user.click(firstTab);
      await user.keyboard('{ArrowRight}');
      
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content 2')).toBeVisible();
    });

    it('navigates to previous tab with left arrow key', async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={mockTabs} activeTabId="tab2" />);
      
      const secondTab = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(secondTab);
      await user.keyboard('{ArrowLeft}');
      
      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content 1')).toBeVisible();
    });

    it('wraps to last tab when pressing left arrow on first tab', async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={mockTabs} activeTabId="tab1" />);
      
      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      await user.click(firstTab);
      await user.keyboard('{ArrowLeft}');
      
      expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content 3')).toBeVisible();
    });

    it('wraps to first tab when pressing right arrow on last tab', async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={mockTabs} activeTabId="tab3" />);
      
      const thirdTab = screen.getByRole('tab', { name: 'Tab 3' });
      await user.click(thirdTab);
      await user.keyboard('{ArrowRight}');
      
      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content 1')).toBeVisible();
    });

    it('calls onTabChange callback when navigating with arrow keys', async () => {
      const onTabChange = vi.fn();
      const user = userEvent.setup();
      render(<Tabs tabs={mockTabs} onTabChange={onTabChange} />);
      
      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      await user.click(firstTab);
      await user.keyboard('{ArrowRight}');
      
      expect(onTabChange).toHaveBeenCalledWith(mockTabs[1]);
    });

    it('focuses the correct tab after keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={mockTabs} />);
      
      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      await user.click(firstTab);
      await user.keyboard('{ArrowRight}');
      
      const secondTab = screen.getByRole('tab', { name: 'Tab 2' });
      expect(secondTab).toHaveFocus();
    });
  });

  describe('Automatic Activation & Focus Management', () => {
    it('activates tab when focused', async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={mockTabs} />);
      
      const secondTab = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(secondTab);
      
      expect(secondTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content 2')).toBeVisible();
    });

    it('calls onTabChange when tab is focused and activated', async () => {
      const onTabChange = vi.fn();
      const user = userEvent.setup();
      render(<Tabs tabs={mockTabs} onTabChange={onTabChange} />);
      
      const secondTab = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(secondTab);
      
      expect(onTabChange).toHaveBeenCalledWith(mockTabs[1]);
    });

    it('does not activate already active tab when focused', async () => {
      const onTabChange = vi.fn();
      const user = userEvent.setup();
      render(<Tabs tabs={mockTabs} onTabChange={onTabChange} />);
      
      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      await user.click(firstTab);
      
      // Clear previous calls
      onTabChange.mockClear();
      
      // Focus the already active tab using Tab key navigation
      await user.keyboard('{Tab}');
      await user.keyboard('{Shift>}{Tab}{/Shift}');
      
      // Should not call onTabChange for already active tab
      expect(onTabChange).not.toHaveBeenCalled();
    });

    it('works with Tab key to exit tablist', async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={mockTabs} />);
      
      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      await user.click(firstTab);
      
      // Tab key should move focus away from tablist
      await user.keyboard('{Tab}');
      
      // Focus should move to the next focusable element
      expect(firstTab).not.toHaveFocus();
    });

    it('integrates automatic activation with keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={mockTabs} />);
      
      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      await user.click(firstTab);
      
      // Use arrow key to navigate
      await user.keyboard('{ArrowRight}');
      
      const secondTab = screen.getByRole('tab', { name: 'Tab 2' });
      expect(secondTab).toHaveAttribute('aria-selected', 'true');
      expect(secondTab).toHaveFocus();
      expect(screen.getByText('Content 2')).toBeVisible();
    });

    it('maintains focus management with controlled mode', async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={mockTabs} activeTabId="tab2" />);
      
      const secondTab = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(secondTab);
      
      // Focus should work even in controlled mode
      expect(secondTab).toHaveFocus();
    });
  });
});
