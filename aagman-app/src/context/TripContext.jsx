import React, { createContext, useContext, useState, useEffect } from 'react';

const TripContext = createContext();

const INITIAL_TRIPS = [
  {
    id: "trip-01",
    name: "Royal Sahyadri Weekend: Raigad & Pratapgad",
    circuit: "Maratha Imperial Circuit",
    startDate: "2026-12-05",
    endDate: "2026-12-07",
    durationDays: 3,
    destinations: ["Raigad Fort", "Pratapgad Fort", "Mahabaleshwar Hills"],
    allocatedBudget: 14000,
    estimatedSpent: 4800,
    status: "Upcoming",
    itineraryDays: [
      {
        day: 1,
        title: "Ascent to the Royal Capital (Raigad)",
        highlights: "Morning departure from Pune via Varandha Ghat, cable ropeway ascent, exploration of Maha Darwaja, Rajbhavan, and Chhatrapati Shivaji Maharaj Samadhi.",
        nightStay: "MTDC Resort Raigad base / Pachad"
      },
      {
        day: 2,
        title: "Battlefield of Valor (Pratapgad)",
        highlights: "Drive along the Par Pass to Pratapgad Fort. Visit Bhavani Mata Temple, Afzal Khan tomb site, and sunset point overlooking Konkan valleys.",
        nightStay: "Heritage Homestay near Mahabaleshwar"
      },
      {
        day: 3,
        title: "Sahyadri Panoramic Points & Return",
        highlights: "Morning walk at Arthur's Seat and Kate's Point. Taste local strawberries, farm-fresh Pithla Bhakri, and drive back to Pune.",
        nightStay: "Return Journey"
      }
    ]
  },
  {
    id: "trip-02",
    name: "Divine Ashtavinayak Sacred Yatra",
    circuit: "Ashtavinayak Circuit",
    startDate: "2027-01-14",
    endDate: "2027-01-16",
    durationDays: 3,
    destinations: ["Mayureshwar (Morgaon)", "Siddhivinayak (Siddhatek)", "Ballaleshwar (Pali)", "Varadvinayak (Mahad)"],
    allocatedBudget: 18000,
    estimatedSpent: 0,
    status: "Planned",
    itineraryDays: [
      {
        day: 1,
        title: "Stop 1 & 2: Morgaon and Siddhatek",
        highlights: "Traditional sankalp at Morgaon Mayureshwar temple, drive across the Bhima river to Siddhatek Siddhivinayak shrine.",
        nightStay: "Daund / Pune outskirts"
      },
      {
        day: 2,
        title: "Stop 3 & 4: Theur and Ranjangaon",
        highlights: "Darshan at Chintamani Theur on the Mula-Mutha river followed by Mahaganapati at Ranjangaon with ancient stone carvings.",
        nightStay: "Narayangaon / Junnar"
      },
      {
        day: 3,
        title: "Stop 5 & 6: Ozar and Lenyadri",
        highlights: "Vighneshwar at Ozar on the Kukadi river, and 283 rock-cut steps up to the Buddhist cave shrine of Girijatmaj Lenyadri.",
        nightStay: "Return Journey"
      }
    ]
  }
];

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
