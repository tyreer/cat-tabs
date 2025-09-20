import { useCallback, useState } from 'react';
import styled from 'styled-components';
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
  background-color: ${props => props.$isActive ? '#ffffff' : '#c0c0c0'};
  border: 2px ${props => props.$isActive ? 'inset' : 'outset'} #c0c0c0;
  padding: 4px 12px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #000000;
  cursor: pointer;
  min-width: 60px;
  
  &:hover {
    background-color: ${props => props.$isActive ? '#ffffff' : '#d4d0c8'};
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
  display: ${props => props.$isActive ? 'block' : 'none'};
  background-color: #ffffff;
  border: 2px inset #c0c0c0;
  padding: 8px;
  min-height: 200px;
`;

function TabList({
  children,
  ...props
}: { children: ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <StyledTabList role="tablist" {...props}>
      {children}
    </StyledTabList>
  );
}

function Tab({
  tab,
  isActive,
  onClick,
  ...props
}: {
  tab: TabObject;
  isActive: boolean;
  onClick: () => void;
} & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <StyledTab
      id={`tab-${tab.id}`}
      role="tab"
      aria-selected={isActive}
      $isActive={isActive}
      onClick={onClick}
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
  // Determine if component is controlled or uncontrolled
  const isControlled = activeTabId !== undefined;

  // Internal state for uncontrolled mode
  const [internalActiveTabId, setInternalActiveTabId] = useState(
    tabs[0]?.id || ''
  );

  // Get the current active tab ID
  const currentActiveTabId = isControlled ? activeTabId : internalActiveTabId;

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

  return (
    <StyledTabsContainer>
      <TabList aria-label={ariaLabel}>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            tab={tab}
            isActive={tab.id === currentActiveTabId}
            onClick={() => handleTabClick(tab.id)}
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
