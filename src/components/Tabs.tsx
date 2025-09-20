import styled from 'styled-components';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

export interface TabObject {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs: TabObject[];
  activeTabId?: string;
  onTabChange?: (activeTab: TabObject) => void;
  'aria-label'?: string;
}

// Styled Components for Old-School Windows Interface
const StyledTabsContainer = styled.div`
  font-family: 'Courier New', monospace;
  background-color: #c0c0c0;
  border: 2px inset #c0c0c0;
  padding: 4px;
`;

const StyledTabList = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: 2px;
`;

const StyledTab = styled.button<{ $isActive: boolean }>`
  background-color: ${(props) => (props.$isActive ? '#ffffff' : '#c0c0c0')};
  border: 2px ${(props) => (props.$isActive ? 'inset' : 'outset')} #c0c0c0;
  padding: 4px 12px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #000000;
  cursor: pointer;
  min-width: 60px;

  &:hover {
    background-color: ${(props) => (props.$isActive ? '#ffffff' : '#d4d0c8')};
  }

  &:active {
    border: 2px inset #c0c0c0;
  }

  &:focus {
    outline: 2px solid #000080;
    outline-offset: 1px;
  }
`;

const StyledTabPanel = styled.div<{ $isActive: boolean }>`
  display: ${(props) => (props.$isActive ? 'block' : 'none')};
  background-color: #ffffff;
  border: 2px inset #c0c0c0;
  padding: 8px;
  min-height: 200px;
`;

const ErrorContainer = styled.div`
  background-color: #ffcccc;
  border: 2px inset #ff0000;
  padding: 12px;
  margin: 8px 0;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #000000;
`;

const ErrorTitle = styled.h3`
  margin: 0 0 8px 0;
  color: #ff0000;
  font-size: 14px;
  font-weight: bold;
`;

const ErrorList = styled.ul`
  margin: 0;
  padding-left: 16px;
`;

const ErrorItem = styled.li`
  margin: 4px 0;
`;

const EmptyStateContainer = styled.div`
  background-color: #f0f0f0;
  border: 2px inset #c0c0c0;
  padding: 20px;
  text-align: center;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #666666;
`;

const TabList = React.forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    onKeyDown?: (event: React.KeyboardEvent) => void;
  } & React.HTMLAttributes<HTMLDivElement>
>(({ children, onKeyDown, ...props }, ref) => {
  return (
    <StyledTabList ref={ref} role="tablist" onKeyDown={onKeyDown} {...props}>
      {children}
    </StyledTabList>
  );
});

function Tab({
  tab,
  isActive,
  onClick,
  onKeyDown,
  onFocus,
  ...props
}: {
  tab: TabObject;
  isActive: boolean;
  onClick: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onFocus?: (tabId: string) => void;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'onFocus'>) {
  const handleFocus = useCallback(() => {
    if (onFocus) {
      onFocus(tab.id);
    }
  }, [onFocus, tab.id]);

  return (
    <StyledTab
      id={`tab-${tab.id}`}
      role="tab"
      aria-selected={isActive}
      $isActive={isActive}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onFocus={handleFocus}
      {...props}
    >
      {tab.label}
    </StyledTab>
  );
}

function TabPanel({
  tab,
  isActive,
  ...props
}: {
  tab: TabObject;
  isActive: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <StyledTabPanel
      role="tabpanel"
      aria-labelledby={`tab-${tab.id}`}
      $isActive={isActive}
      {...props}
    >
      {tab.content}
    </StyledTabPanel>
  );
}

export default function Tabs({
  tabs,
  activeTabId,
  onTabChange,
  'aria-label': ariaLabel,
}: TabsProps) {
  // Validation state
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Validate tabs on mount
  useEffect(() => {
    const errors: string[] = [];

    // Only validate if tabs is an array (not null/undefined)
    if (Array.isArray(tabs)) {
      // Check for empty tabs array
      if (tabs.length === 0) {
        errors.push('No tabs provided. Please provide at least one tab.');
      } else {
        // Check for required properties
        tabs.forEach((tab, index) => {
          if (!tab.id) {
            errors.push(
              `Tab at index ${index} is missing required 'id' property.`
            );
          }
          if (!tab.label) {
            errors.push(
              `Tab at index ${index} is missing required 'label' property.`
            );
          }
          if (tab.content === undefined || tab.content === null) {
            errors.push(
              `Tab at index ${index} is missing required 'content' property.`
            );
          }
        });

        // Check for duplicate IDs
        const ids = tabs.map((tab) => tab.id).filter(Boolean);
        const uniqueIds = new Set(ids);
        if (ids.length !== uniqueIds.size) {
          errors.push('All tabs must have unique IDs.');
        }
      }
    }

    setValidationErrors(errors);
  }, [tabs]);

  // Determine if component is controlled or uncontrolled
  const isControlled = activeTabId !== undefined;

  // Internal state for uncontrolled mode
  const [internalActiveTabId, setInternalActiveTabId] = useState(
    tabs && tabs.length > 0 ? tabs[0].id : ''
  );

  // Get the current active tab ID
  const currentActiveTabId = isControlled ? activeTabId : internalActiveTabId;

  // Ref for the tablist container
  const tabListRef = useRef<HTMLDivElement>(null);

  // Handle tab click
  const handleTabClick = useCallback(
    (tabId: string) => {
      if (!isControlled) {
        setInternalActiveTabId(tabId);
      }

      const clickedTab = tabs.find((tab) => tab.id === tabId);
      if (clickedTab && onTabChange) {
        onTabChange(clickedTab);
      }
    },
    [isControlled, onTabChange, tabs]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const { key } = event;

      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        event.preventDefault();

        const currentIndex = tabs.findIndex(
          (tab) => tab.id === currentActiveTabId
        );
        let nextIndex: number;

        if (key === 'ArrowLeft') {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        } else {
          nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        }

        const nextTab = tabs[nextIndex];
        if (nextTab) {
          // Update the active tab first
          if (!isControlled) {
            setInternalActiveTabId(nextTab.id);
          }

          // Call the callback
          if (onTabChange) {
            onTabChange(nextTab);
          }

          // Focus the next tab
          const nextTabElement = tabListRef.current?.querySelector(
            `#tab-${nextTab.id}`
          ) as HTMLButtonElement;
          nextTabElement?.focus();
        }
      }
    },
    [tabs, currentActiveTabId, isControlled, onTabChange]
  );

  // Handle focus events for automatic activation
  const handleTabFocus = useCallback(
    (tabId: string) => {
      // Only activate if the tab is not already active
      if (tabId !== currentActiveTabId) {
        if (!isControlled) {
          setInternalActiveTabId(tabId);
        }

        const focusedTab = tabs.find((tab) => tab.id === tabId);
        if (focusedTab && onTabChange) {
          onTabChange(focusedTab);
        }
      }
    },
    [tabs, currentActiveTabId, isControlled, onTabChange]
  );

  // Show error messages if validation failed
  if (validationErrors.length > 0) {
    return (
      <StyledTabsContainer>
        <ErrorContainer>
          <ErrorTitle>⚠️ Tabs Component Error</ErrorTitle>
          <ErrorList>
            {validationErrors.map((error, index) => (
              <ErrorItem key={index}>{error}</ErrorItem>
            ))}
          </ErrorList>
        </ErrorContainer>
      </StyledTabsContainer>
    );
  }

  // Show empty state if no tabs
  if (!tabs || tabs.length === 0) {
    return (
      <StyledTabsContainer>
        <EmptyStateContainer>
          <p>No tabs to display.</p>
        </EmptyStateContainer>
      </StyledTabsContainer>
    );
  }

  return (
    <StyledTabsContainer>
      <TabList ref={tabListRef} aria-label={ariaLabel}>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            tab={tab}
            isActive={tab.id === currentActiveTabId}
            onClick={() => handleTabClick(tab.id)}
            onKeyDown={handleKeyDown}
            onFocus={handleTabFocus}
          />
        ))}
      </TabList>
      {tabs.map((tab) => (
        <TabPanel
          key={tab.id}
          tab={tab}
          isActive={tab.id === currentActiveTabId}
        />
      ))}
    </StyledTabsContainer>
  );
}
