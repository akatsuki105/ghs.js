import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Bpp } from './Bpp';
import { LZ77 } from './Lz77';
import { Page, Separator, Spacer, Header } from './components';
import { ModalsProvider } from './contexts';
import theme from './theme';
import './tailwind.css';

const App = (): JSX.Element => {
  return (
    <Providers>
      <div className="App">
        <Spacer axis="vertical" size="sm" />
        <Header />
        <Page>
          <Spacer size="sm" />
          <Separator />
          <Spacer size="sm" />

          <Routes>
            <Route path="/GBAC.js/bpp" element={<Bpp />} />
            <Route path="/GBAC.js/lz77" element={<LZ77 />} />
            <Route path="*" element={<Navigate to="/GBAC.js/bpp" replace />} />
          </Routes>
        </Page>
      </div>
    </Providers>
  );
};

const Providers: React.FC = React.memo(({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <ModalsProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </ModalsProvider>
    </ThemeProvider>
  );
});

export default App;
