import React, { createContext, useContext, useState, useEffect } from 'react';

const TripContext = createContext();

const INITIAL_TRIPS = [];

export function TripProvider({ children }) {
  const [trips, setTrips] = useState(() => {
    try {
      const saved = localStorage.getItem('aagman_trips');
      return saved ? JSON.parse(saved) : INITIAL_TRIPS;
    } catch {
      return INITIAL_TRIPS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aagman_trips', JSON.stringify(trips));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [trips]);

  const addTrip = (newTrip) => {
    const tripWithId = {
      id: `trip-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...newTrip
    };
    setTrips(prev => [tripWithId, ...prev]);
    return tripWithId;
  };

  const deleteTrip = (id) => {
    setTrips(prev => prev.filter(t => t.id !== id));
  };

  const upcomingTrip = trips[0] || null;

  return (
    <TripContext.Provider value={{
      trips,
      upcomingTrip,
      addTrip,
      deleteTrip
    }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrips() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrips must be used within a TripProvider');
  }
  return context;
}
