import React, { createContext, useContext, useState, useEffect } from 'react';
import { contentService } from '../services/contentService';

const WishlistContext = createContext();

const INITIAL_WISHLIST = [];

export function WishlistProvider({ children }) {
  const [destinations, setDestinations] = useState([]);
  const [wishlistSlugs, setWishlistSlugs] = useState(() => {
    try {
      const saved = localStorage.getItem('aagman_wishlist');
      return saved ? JSON.parse(saved) : INITIAL_WISHLIST;
    } catch {
      return INITIAL_WISHLIST;
    }
  });

  useEffect(() => {
    const unsubscribe = contentService.subscribe(({ destinations: records }) => setDestinations(records));
    contentService.getAllDestinations();
    return unsubscribe;
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('aagman_wishlist', JSON.stringify(wishlistSlugs));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [wishlistSlugs]);

  const toggleWishlist = (slug) => {
    setWishlistSlugs(prev => {
      if (prev.includes(slug)) {
        return prev.filter(s => s !== slug);
      } else {
        return [...prev, slug];
      }
    });
  };

  const isWishlisted = (slug) => wishlistSlugs.includes(slug);

  const wishlistedDestinations = destinations.filter(d => d.status === 'published' && wishlistSlugs.includes(d.slug));

  return (
    <WishlistContext.Provider value={{
      wishlistSlugs,
      wishlistedDestinations,
      wishlistCount: wishlistSlugs.length,
      toggleWishlist,
      isWishlisted
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
