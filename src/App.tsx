import { Box, ChakraProvider, Divider, Spacer } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Bpp } from './Bpp';
import { Info } from './Info';
import { LZ77 } from './Lz77';
import { PaletteViewer } from './Palette';
import { Top } from './Top';
import { Header } from './components';
import { BinaryProvider } from './contexts/Binary';
import theme from './theme';
import { APP_NAME } from './utils';

const App: React.FC = () => {
  return (
    <Providers>
      <Box className="App">
        <Spacer h="4" />
        <Header />

        <Spacer h="4" />
        <Divider />
        <Spacer h="4" />

        <Routes>
          <Route path={`/${APP_NAME}/top`} element={<Top />} />
          <Route path={`/${APP_NAME}/info`} element={<Info />} />
          <Route path={`/${APP_NAME}/bpp`} element={<Bpp />} />
          <Route path={`/${APP_NAME}/lz77`} element={<LZ77 />} />
          <Route path={`/${APP_NAME}/pal`} element={<PaletteViewer />} />
          <Route path="*" element={<Navigate to={`/${APP_NAME}/top`} replace />} />
        </Routes>
      </Box>
    </Providers>
  );
};

const Providers: React.FC = React.memo(({ children }) => {
  return (
    <ChakraProvider>
      <ThemeProvider theme={theme}>
        <BinaryProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </BinaryProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
});

export default App;
