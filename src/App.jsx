import React, { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { TripProvider } from './context/TripContext';
import { supabase } from './lib/supabase';

export default function App() {
  useEffect(() => {
    async function testSupabase() {
      try {
        const { data, error } = await supabase
          .from('destinations')
          .select('*')
          .limit(1);

        if (error) {
          console.log('Supabase check status:', error.message);
        } else {
          console.log('Supabase connection verified. Initial data:', data);
        }
      } catch (err) {
        console.log('Supabase check status:', err.message);
      }
    }

    testSupabase();
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AdminAuthProvider>
            <WishlistProvider>
              <TripProvider>
                <AppRoutes />
              </TripProvider>
            </WishlistProvider>
          </AdminAuthProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
