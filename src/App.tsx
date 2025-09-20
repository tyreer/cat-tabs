import styled from 'styled-components';

import { Tabs } from './components';

const AppContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Courier New', monospace;
  background-color: #c0c0c0;
  min-height: 100vh;
`;

const AppTitle = styled.h1`
  color: #000080;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const ContentCard = styled.div`
  background-color: #ffffff;
  border: 2px outset #c0c0c0;
  padding: 16px;
  margin-top: 8px;
`;

function App() {
  const tabs = [
    {
      id: 'tab1',
      label: 'Photos',
      content: (
        <ContentCard>
          <h3>Photo Gallery</h3>
          <p>This is where photos would be displayed.</p>
        </ContentCard>
      ),
    },
    {
      id: 'tab2',
      label: 'Settings',
      content: (
        <ContentCard>
          <h3>Settings</h3>
          <p>Configure your preferences here.</p>
        </ContentCard>
      ),
    },
    {
      id: 'tab3',
      label: 'About',
      content: (
        <ContentCard>
          <h3>About</h3>
          <p>Learn more about this application.</p>
        </ContentCard>
      ),
    },
  ];

  return (
    <AppContainer>
      <AppTitle>Tabs Component Demo</AppTitle>
      <Tabs tabs={tabs} aria-label="Main navigation" />
    </AppContainer>
  );
}

export default App;
