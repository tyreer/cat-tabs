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

function TabList({ children, ...props }: { children: ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
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
  // TODO: Implement state management and event handlers
  // Suppress unused variable warnings for now
  console.log({ activeTabId, onTabChange });
  
  // For now, just render the basic structure
  return (
    <div>
      <TabList aria-label={ariaLabel}>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            tab={tab}
            isActive={false} // TODO: Implement active state logic
            onClick={() => {}} // TODO: Implement click handler
          />
        ))}
      </TabList>
      {tabs.map((tab) => (
        <TabPanel
          key={tab.id}
          tab={tab}
          isActive={false} // TODO: Implement active state logic
        />
      ))}
    </div>
  );
}
