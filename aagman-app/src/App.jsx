import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { WishlistProvider } from './context/WishlistContext';
import { TripProvider } from './context/TripContext';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <WishlistProvider>
          <TripProvider>
            <AppRoutes />
          </TripProvider>
        </WishlistProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
