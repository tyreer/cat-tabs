import { useState, useCallback } from 'react';
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

function TabList({
  children,
  ...props
}: { children: ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div role="tablist" {...props}>
      {children}
    </div>
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
    <button
      id={`tab-${tab.id}`}
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      {...props}
    >
      {tab.label}
    </button>
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
    <div
      role="tabpanel"
      aria-labelledby={`tab-${tab.id}`}
      hidden={!isActive}
      {...props}
    >
      {tab.content}
    </div>
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
  const [internalActiveTabId, setInternalActiveTabId] = useState(tabs[0]?.id || '');
  
  // Get the current active tab ID
  const currentActiveTabId = isControlled ? activeTabId : internalActiveTabId;
  
  // Find the active tab object
  const activeTab = tabs.find(tab => tab.id === currentActiveTabId) || tabs[0];
  
  // Handle tab click
  const handleTabClick = useCallback((tabId: string) => {
    if (!isControlled) {
      setInternalActiveTabId(tabId);
    }
    
    const clickedTab = tabs.find(tab => tab.id === tabId);
    if (clickedTab && onTabChange) {
      onTabChange(clickedTab);
    }
  }, [isControlled, onTabChange, tabs]);
  
  return (
    <div>
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
    </div>
  );
}
