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

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 8px;
`;

const CatImage = styled.img`
  max-width: 100%;
  max-height: 500px;
  border: 2px inset #c0c0c0;
  object-fit: cover;
`;

function App() {
  // Available cat images
  const catImages = [
    'IMG_9330.webp',
    'IMG_0328.webp',
    'IMG_0920.webp',
    'IMG_0992.webp',
    'IMG_1544.webp',
    'IMG_2145.webp',
    'IMG_2280.webp',
    'IMG_2399.webp',
  ];

  // Get the correct base path for images
  const basePath = import.meta.env.PROD ? '/cat-tabs' : '';
  const imagePath = `${basePath}/cat`;

  // Create tabs - one for each cat image
  const tabs = catImages.map((image, index) => ({
    id: `hans-${index + 1}`,
    label: `Hans ${index + 1}`,
    content: (
      <ImageContainer>
        <CatImage
          src={`${imagePath}/${image}`}
          alt={`Hans ${index + 1}: ${image}`}
          onError={(e) => {
            console.error('Failed to load image:', image);
            e.currentTarget.style.display = 'none';
          }}
        />
      </ImageContainer>
    ),
  }));

  return (
    <AppContainer>
      <AppTitle>Cat tabs</AppTitle>
      <Tabs tabs={tabs} aria-label="Hans cat gallery" />
    </AppContainer>
  );
}

export default App;
