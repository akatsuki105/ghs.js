import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Bpp } from './Bpp';
import { LZ77 } from './Lz77';
import { Top } from './Top';
import { Center, Separator, Spacer, Header } from './components';
import { BinaryProvider } from './contexts/Binary';
import theme from './theme';
import { APP_NAME } from './utils';
import './tailwind.css';

const App: React.FC = () => {
  return (
    <Providers>
      <div className="App">
        <Spacer axis="vertical" size="sm" />
        <Header />
        <Center>
          <Spacer size="sm" />
          <Separator />
          <Spacer size="sm" />

          <Routes>
            <Route path={`/${APP_NAME}/top`} element={<Top />} />
            <Route path={`/${APP_NAME}/bpp`} element={<Bpp />} />
            <Route path={`/${APP_NAME}/lz77`} element={<LZ77 />} />
            <Route path="*" element={<Navigate to={`/${APP_NAME}/top`} replace />} />
          </Routes>
        </Center>
      </div>
    </Providers>
  );
};

const Providers: React.FC = React.memo(({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <BinaryProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </BinaryProvider>
    </ThemeProvider>
  );
});

export default App;
