/**
 * AAGMAN - Central Image Asset Registry & Mapping
 * 
 * Provides an organized, scalable mapping between website destinations/festivals,
 * their standard local asset paths under `/assets/...`, and their verified fallback images.
 * 
 * Categories:
 *   - Forts: main.jpg, landscape.jpg, architecture.jpg, details.jpg
 *   - Heritage Sites: main.jpg, architecture.jpg, interiors.jpg, details.jpg
 *   - Temples: main.jpg, temple-view.jpg, architecture.jpg, rituals.jpg
 *   - Festivals: main.jpg, celebrations.jpg, rituals.jpg, decorations.jpg
 *   - Homepage: /assets/homepage/hero/, /assets/homepage/featured/
 *   - Branding: /assets/branding/logo/, /assets/branding/icons/
 */

// Global toggle for preferring local images when downloaded
// By default, false until local photos are populated, preventing broken 404 images
export const PREFER_LOCAL_ASSETS = false;

// Per-destination local download status flag registry
// Set to true for any destination where you have downloaded the local photos
export const LOCAL_DOWNLOAD_STATUS = {
  // Forts
  'raigad-fort': false,
  'sinhagad-fort': false,
  'pratapgad-fort': false,
  'murud-janjira-fort': false,
  'shivneri-fort': false,
  'rajgad-fort': false,
  'torna-fort': false,
  'harishchandragad': false,
  'sindhudurg-fort': false,
  'panhala-fort': false,
  'lohagad-visapur': false,
  'kalsubai-peak': false,

  // Heritage
  'ajanta-caves': false,
  'ellora-caves': false,
  'elephanta-caves': false,
  'csmt-station': false,

  // Temples
  'trimbakeshwar': false,
  'morgaon-mayureshwar': false,
  'shirdi-sai-baba': false,
  'pandharpur-vitthal': false,

  // Festivals
  'ganeshotsav': false,
  'shiv-jayanti': false,
  'pandharpur-wari': false,
  'ellora-ajanta-festival': false,
  'gudhi-padwa': false,
  'banganga-festival': false
};

/**
 * Forts Image Mappings
 */
export const FORTS_IMAGE_REGISTRY = {
  'raigad-fort': {
    id: 'raigad-fort',
    slug: 'raigad',
    category: 'forts',
    folder: '/assets/forts/raigad-fort',
    slots: {
      main: '/assets/forts/raigad-fort/main.jpg',
      landscape: '/assets/forts/raigad-fort/landscape.jpg',
      architecture: '/assets/forts/raigad-fort/architecture.jpg',
      details: '/assets/forts/raigad-fort/details.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1600&q=80',
    thumbnailFallback: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=600&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80',
      landscape: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      architecture: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      details: 'https://images.unsplash.com/photo-1600100397608-f010f4439066?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'sinhagad-fort': {
    id: 'sinhagad-fort',
    slug: 'sinhagad',
    category: 'forts',
    folder: '/assets/forts/sinhagad-fort',
    slots: {
      main: '/assets/forts/sinhagad-fort/main.jpg',
      landscape: '/assets/forts/sinhagad-fort/landscape.jpg',
      architecture: '/assets/forts/sinhagad-fort/architecture.jpg',
      details: '/assets/forts/sinhagad-fort/details.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1600&q=80',
    thumbnailFallback: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=600&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80',
      landscape: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1200&q=80',
      architecture: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
      details: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'pratapgad-fort': {
    id: 'pratapgad-fort',
    slug: 'pratapgad',
    category: 'forts',
    folder: '/assets/forts/pratapgad-fort',
    slots: {
      main: '/assets/forts/pratapgad-fort/main.jpg',
      landscape: '/assets/forts/pratapgad-fort/landscape.jpg',
      architecture: '/assets/forts/pratapgad-fort/architecture.jpg',
      details: '/assets/forts/pratapgad-fort/details.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1600&q=80',
    thumbnailFallback: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
      landscape: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      architecture: 'https://images.unsplash.com/photo-1626014303757-6466299b39be?auto=format&fit=crop&w=1200&q=80',
      details: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'murud-janjira-fort': {
    id: 'murud-janjira-fort',
    slug: 'murud-janjira',
    category: 'forts',
    folder: '/assets/forts/murud-janjira-fort',
    slots: {
      main: '/assets/forts/murud-janjira-fort/main.jpg',
      landscape: '/assets/forts/murud-janjira-fort/landscape.jpg',
      architecture: '/assets/forts/murud-janjira-fort/architecture.jpg',
      details: '/assets/forts/murud-janjira-fort/details.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80',
    thumbnailFallback: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
      landscape: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
      architecture: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80',
      details: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'shivneri-fort': {
    id: 'shivneri-fort',
    slug: 'shivneri',
    category: 'forts',
    folder: '/assets/forts/shivneri-fort',
    slots: {
      main: '/assets/forts/shivneri-fort/main.jpg',
      landscape: '/assets/forts/shivneri-fort/landscape.jpg',
      architecture: '/assets/forts/shivneri-fort/architecture.jpg',
      details: '/assets/forts/shivneri-fort/details.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1626014303757-6466299b39be?auto=format&fit=crop&w=1600&q=80',
    thumbnailFallback: 'https://images.unsplash.com/photo-1626014303757-6466299b39be?auto=format&fit=crop&w=600&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1626014303757-6466299b39be?auto=format&fit=crop&w=1200&q=80',
      landscape: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1200&q=80',
      architecture: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80',
      details: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'rajgad-fort': {
    id: 'rajgad-fort',
    slug: 'rajgad',
    category: 'forts',
    folder: '/assets/forts/rajgad-fort',
    slots: {
      main: '/assets/forts/rajgad-fort/main.jpg',
      landscape: '/assets/forts/rajgad-fort/landscape.jpg',
      architecture: '/assets/forts/rajgad-fort/architecture.jpg',
      details: '/assets/forts/rajgad-fort/details.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=80',
    thumbnailFallback: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
      landscape: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      architecture: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80',
      details: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'torna-fort': {
    id: 'torna-fort',
    slug: 'torna',
    category: 'forts',
    folder: '/assets/forts/torna-fort',
    slots: {
      main: '/assets/forts/torna-fort/main.jpg',
      landscape: '/assets/forts/torna-fort/landscape.jpg',
      architecture: '/assets/forts/torna-fort/architecture.jpg',
      details: '/assets/forts/torna-fort/details.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
    thumbnailFallback: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      landscape: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1200&q=80',
      architecture: 'https://images.unsplash.com/photo-1626014303757-6466299b39be?auto=format&fit=crop&w=1200&q=80',
      details: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'harishchandragad': {
    id: 'harishchandragad',
    slug: 'harishchandragad',
    category: 'forts',
    folder: '/assets/forts/harishchandragad',
    slots: {
      main: '/assets/forts/harishchandragad/main.jpg',
      landscape: '/assets/forts/harishchandragad/landscape.jpg',
      architecture: '/assets/forts/harishchandragad/architecture.jpg',
      details: '/assets/forts/harishchandragad/details.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1600&q=80',
    thumbnailFallback: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=600&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1200&q=80',
      landscape: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      architecture: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      details: 'https://images.unsplash.com/photo-1600100397608-f010f4439066?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'sindhudurg-fort': {
    id: 'sindhudurg-fort',
    slug: 'sindhudurg',
    category: 'forts',
    folder: '/assets/forts/sindhudurg-fort',
    slots: {
      main: '/assets/forts/sindhudurg-fort/main.jpg',
      landscape: '/assets/forts/sindhudurg-fort/landscape.jpg',
      architecture: '/assets/forts/sindhudurg-fort/architecture.jpg',
      details: '/assets/forts/sindhudurg-fort/details.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1600&q=80',
    thumbnailFallback: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
      landscape: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
      architecture: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
      details: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'panhala-fort': {
    id: 'panhala-fort',
    slug: 'panhala',
    category: 'forts',
    folder: '/assets/forts/panhala-fort',
    slots: {
      main: '/assets/forts/panhala-fort/main.jpg',
      landscape: '/assets/forts/panhala-fort/landscape.jpg',
      architecture: '/assets/forts/panhala-fort/architecture.jpg',
      details: '/assets/forts/panhala-fort/details.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=80',
    thumbnailFallback: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
      landscape: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      architecture: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
      details: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'lohagad-visapur': {
    id: 'lohagad-visapur',
    slug: 'lohagad-visapur',
    category: 'forts',
    folder: '/assets/forts/lohagad-visapur',
    slots: {
      main: '/assets/forts/lohagad-visapur/main.jpg',
      landscape: '/assets/forts/lohagad-visapur/landscape.jpg',
      architecture: '/assets/forts/lohagad-visapur/architecture.jpg',
      details: '/assets/forts/lohagad-visapur/details.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=1600&q=80',
    thumbnailFallback: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=600&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=1200&q=80',
      landscape: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1200&q=80',
      architecture: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80',
      details: 'https://images.unsplash.com/photo-1626014303757-6466299b39be?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'kalsubai-peak': {
    id: 'kalsubai-peak',
    slug: 'kalsubai',
    category: 'forts',
    folder: '/assets/forts/kalsubai-peak',
    slots: {
      main: '/assets/forts/kalsubai-peak/main.jpg',
      landscape: '/assets/forts/kalsubai-peak/landscape.jpg',
      architecture: '/assets/forts/kalsubai-peak/architecture.jpg',
      details: '/assets/forts/kalsubai-peak/details.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1600&q=80',
    thumbnailFallback: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=600&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1200&q=80',
      landscape: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      architecture: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      details: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80'
    }
  }
};

/**
 * Heritage Sites Image Mappings
 */
export const HERITAGE_IMAGE_REGISTRY = {
  'ajanta-caves': {
    id: 'ajanta-caves',
    slug: 'ajanta-caves',
    category: 'heritage',
    folder: '/assets/heritage/ajanta-caves',
    slots: {
      main: '/assets/heritage/ajanta-caves/main.jpg',
      architecture: '/assets/heritage/ajanta-caves/architecture.jpg',
      interiors: '/assets/heritage/ajanta-caves/interiors.jpg',
      details: '/assets/heritage/ajanta-caves/details.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80',
    thumbnailFallback: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      architecture: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1200&q=80',
      interiors: 'https://images.unsplash.com/photo-1600100397608-f010f4439066?auto=format&fit=crop&w=1200&q=80',
      details: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'ellora-caves': {
    id: 'ellora-caves',
    slug: 'ellora-caves',
    category: 'heritage',
    folder: '/assets/heritage/ellora-caves',
    slots: {
      main: '/assets/heritage/ellora-caves/main.jpg',
      architecture: '/assets/heritage/ellora-caves/architecture.jpg',
      interiors: '/assets/heritage/ellora-caves/interiors.jpg',
      details: '/assets/heritage/ellora-caves/details.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1600&q=80',
    thumbnailFallback: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=600&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1200&q=80',
      architecture: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      interiors: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      details: 'https://images.unsplash.com/photo-1600100397608-f010f4439066?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'elephanta-caves': {
    id: 'elephanta-caves',
    slug: 'elephanta-caves',
    category: 'heritage',
    folder: '/assets/heritage/elephanta-caves',
    slots: {
      main: '/assets/heritage/elephanta-caves/main.jpg',
      architecture: '/assets/heritage/elephanta-caves/architecture.jpg',
      interiors: '/assets/heritage/elephanta-caves/interiors.jpg',
      details: '/assets/heritage/elephanta-caves/details.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1600&q=80',
    thumbnailFallback: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=600&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=80',
      architecture: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1200&q=80',
      interiors: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      details: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'csmt-station': {
    id: 'csmt-station',
    slug: 'csmt-station',
    category: 'heritage',
    folder: '/assets/heritage/csmt-station',
    slots: {
      main: '/assets/heritage/csmt-station/main.jpg',
      architecture: '/assets/heritage/csmt-station/architecture.jpg',
      interiors: '/assets/heritage/csmt-station/interiors.jpg',
      details: '/assets/heritage/csmt-station/details.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1600&q=80',
    thumbnailFallback: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
      architecture: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=80',
      interiors: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      details: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1200&q=80'
    }
  }
};

/**
 * Temples Image Mappings
 */
export const TEMPLES_IMAGE_REGISTRY = {
  'trimbakeshwar': {
    id: 'trimbakeshwar',
    slug: 'trimbakeshwar',
    category: 'temples',
    folder: '/assets/temples/trimbakeshwar-temple',
    slots: {
      main: '/assets/temples/trimbakeshwar-temple/main.jpg',
      templeView: '/assets/temples/trimbakeshwar-temple/temple-view.jpg',
      architecture: '/assets/temples/trimbakeshwar-temple/architecture.jpg',
      rituals: '/assets/temples/trimbakeshwar-temple/rituals.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1600100397608-f010e42e4e7a?auto=format&fit=crop&w=1600&q=80',
    thumbnailFallback: 'https://images.unsplash.com/photo-1600100397608-f010e42e4e7a?auto=format&fit=crop&w=600&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1600100397608-f010e42e4e7a?auto=format&fit=crop&w=1200&q=80',
      templeView: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      architecture: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1200&q=80',
      rituals: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'morgaon-mayureshwar': {
    id: 'morgaon-mayureshwar',
    slug: 'mayureshwar',
    category: 'temples',
    folder: '/assets/temples/mayureshwar-temple',
    slots: {
      main: '/assets/temples/mayureshwar-temple/main.jpg',
      templeView: '/assets/temples/mayureshwar-temple/temple-view.jpg',
      architecture: '/assets/temples/mayureshwar-temple/architecture.jpg',
      rituals: '/assets/temples/mayureshwar-temple/rituals.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80',
    thumbnailFallback: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      templeView: 'https://images.unsplash.com/photo-1600100397608-f010e42e4e7a?auto=format&fit=crop&w=1200&q=80',
      architecture: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1200&q=80',
      rituals: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'shirdi-sai-baba': {
    id: 'shirdi-sai-baba',
    slug: 'shirdi',
    category: 'temples',
    folder: '/assets/temples/shirdi-sai-baba-temple',
    slots: {
      main: '/assets/temples/shirdi-sai-baba-temple/main.jpg',
      templeView: '/assets/temples/shirdi-sai-baba-temple/temple-view.jpg',
      architecture: '/assets/temples/shirdi-sai-baba-temple/architecture.jpg',
      rituals: '/assets/temples/shirdi-sai-baba-temple/rituals.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80',
    thumbnailFallback: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
      templeView: 'https://images.unsplash.com/photo-1600100397608-f010e42e4e7a?auto=format&fit=crop&w=1200&q=80',
      architecture: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      rituals: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'pandharpur-vitthal': {
    id: 'pandharpur-vitthal',
    slug: 'pandharpur',
    category: 'temples',
    folder: '/assets/temples/pandharpur-vitthal-temple',
    slots: {
      main: '/assets/temples/pandharpur-vitthal-temple/main.jpg',
      templeView: '/assets/temples/pandharpur-vitthal-temple/temple-view.jpg',
      architecture: '/assets/temples/pandharpur-vitthal-temple/architecture.jpg',
      rituals: '/assets/temples/pandharpur-vitthal-temple/rituals.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1600&q=80',
    thumbnailFallback: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
      templeView: 'https://images.unsplash.com/photo-1600100397608-f010e42e4e7a?auto=format&fit=crop&w=1200&q=80',
      architecture: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      rituals: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=1200&q=80'
    }
  }
};

/**
 * Festivals Image Mappings
 */
export const FESTIVALS_IMAGE_REGISTRY = {
  'ganeshotsav': {
    id: 'ganeshotsav',
    category: 'festivals',
    folder: '/assets/festivals/ganeshotsav',
    slots: {
      main: '/assets/festivals/ganeshotsav/main.jpg',
      celebrations: '/assets/festivals/ganeshotsav/celebrations.jpg',
      rituals: '/assets/festivals/ganeshotsav/rituals.jpg',
      decorations: '/assets/festivals/ganeshotsav/decorations.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=800&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=800&q=80',
      celebrations: 'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?auto=format&fit=crop&w=800&q=80',
      rituals: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
      decorations: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&w=800&q=80'
    }
  },
  'shiv-jayanti': {
    id: 'shiv-jayanti',
    category: 'festivals',
    folder: '/assets/festivals/shiv-jayanti',
    slots: {
      main: '/assets/festivals/shiv-jayanti/main.jpg',
      celebrations: '/assets/festivals/shiv-jayanti/celebrations.jpg',
      rituals: '/assets/festivals/shiv-jayanti/rituals.jpg',
      decorations: '/assets/festivals/shiv-jayanti/decorations.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?auto=format&fit=crop&w=800&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?auto=format&fit=crop&w=800&q=80',
      celebrations: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=800&q=80',
      rituals: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
      decorations: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80'
    }
  },
  'pandharpur-wari': {
    id: 'pandharpur-wari',
    category: 'festivals',
    folder: '/assets/festivals/pandharpur-wari',
    slots: {
      main: '/assets/festivals/pandharpur-wari/main.jpg',
      celebrations: '/assets/festivals/pandharpur-wari/celebrations.jpg',
      rituals: '/assets/festivals/pandharpur-wari/rituals.jpg',
      decorations: '/assets/festivals/pandharpur-wari/decorations.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
      celebrations: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=800&q=80',
      rituals: 'https://images.unsplash.com/photo-1600100397608-f010e42e4e7a?auto=format&fit=crop&w=800&q=80',
      decorations: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&w=800&q=80'
    }
  },
  'ellora-ajanta-festival': {
    id: 'ellora-ajanta-festival',
    category: 'festivals',
    folder: '/assets/festivals/ellora-ajanta-festival',
    slots: {
      main: '/assets/festivals/ellora-ajanta-festival/main.jpg',
      celebrations: '/assets/festivals/ellora-ajanta-festival/celebrations.jpg',
      rituals: '/assets/festivals/ellora-ajanta-festival/rituals.jpg',
      decorations: '/assets/festivals/ellora-ajanta-festival/decorations.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
      celebrations: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
      rituals: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80',
      decorations: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
    }
  },
  'gudhi-padwa': {
    id: 'gudhi-padwa',
    category: 'festivals',
    folder: '/assets/festivals/gudhi-padwa',
    slots: {
      main: '/assets/festivals/gudhi-padwa/main.jpg',
      celebrations: '/assets/festivals/gudhi-padwa/celebrations.jpg',
      rituals: '/assets/festivals/gudhi-padwa/rituals.jpg',
      decorations: '/assets/festivals/gudhi-padwa/decorations.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&w=800&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&w=800&q=80',
      celebrations: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=800&q=80',
      rituals: 'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?auto=format&fit=crop&w=800&q=80',
      decorations: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80'
    }
  },
  'banganga-festival': {
    id: 'banganga-festival',
    category: 'festivals',
    folder: '/assets/festivals/banganga-festival',
    slots: {
      main: '/assets/festivals/banganga-festival/main.jpg',
      celebrations: '/assets/festivals/banganga-festival/celebrations.jpg',
      rituals: '/assets/festivals/banganga-festival/rituals.jpg',
      decorations: '/assets/festivals/banganga-festival/decorations.jpg'
    },
    fallback: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
    galleryFallbacks: {
      main: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
      celebrations: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
      rituals: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
      decorations: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&w=800&q=80'
    }
  }
};

/**
 * Homepage Hero & Featured Image Mappings
 */
export const HOMEPAGE_IMAGE_REGISTRY = {
  hero: [
    {
      id: 'hero-raigad',
      tag: 'CAPITAL OF SWARAJYA',
      title: "Chhatrapati Shivaji Maharaj's Royal Fort Raigad",
      local: '/assets/homepage/hero/slide-1.jpg',
      fallback: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1920&q=85'
    },
    {
      id: 'hero-ellora',
      tag: 'UNESCO WORLD HERITAGE',
      title: 'The Monolithic Wonder: Kailasa Temple & Ellora',
      local: '/assets/homepage/hero/slide-2.jpg',
      fallback: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1920&q=85'
    },
    {
      id: 'hero-malvan',
      tag: 'PRISTINE KONKAN SHORELINE',
      title: 'Sea Fortresses & Coral Reefs of Malvan',
      local: '/assets/homepage/hero/slide-3.jpg',
      fallback: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1920&q=85'
    },
    {
      id: 'hero-kalsubai',
      tag: 'HIGHEST SUMMIT OF MAHARASHTRA',
      title: 'Kalsubai Peak: Crown of the Sahyadri Ranges',
      local: '/assets/homepage/hero/slide-4.jpg',
      fallback: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1920&q=85'
    }
  ],
  featured: {
    'raigad-fort': '/assets/homepage/featured/raigad.jpg',
    'kailasa-ellora': '/assets/homepage/featured/ellora.jpg',
    'tarkarli-beach': '/assets/homepage/featured/tarkarli.jpg',
    'sinhagad-fort': '/assets/homepage/featured/sinhagad.jpg',
    'trimbakeshwar-temple': '/assets/homepage/featured/trimbakeshwar.jpg',
    'ajanta-caves': '/assets/homepage/featured/ajanta.jpg',
    'pratapgad-fort': '/assets/homepage/featured/pratapgad.jpg',
    'ganpatipule-beach': '/assets/homepage/featured/ganpatipule.jpg'
  }
};

/**
 * Branding Assets Mapping
 */
export const BRANDING_IMAGE_REGISTRY = {
  logo: {
    svg: '/assets/branding/logo/aagman-logo.svg',
    symbol: '/assets/branding/logo/aagman-symbol.svg',
    fallbackIcon: 'Castle'
  },
  icons: {
    favicon: '/assets/branding/icons/favicon.ico',
    appleTouch: '/assets/branding/icons/apple-touch-icon.png'
  }
};

// Unified Destination Lookup by ID or Slug
export const ALL_DESTINATION_IMAGE_REGISTRY = {
  ...FORTS_IMAGE_REGISTRY,
  ...HERITAGE_IMAGE_REGISTRY,
  ...TEMPLES_IMAGE_REGISTRY
};

/**
 * Resolves a destination image URL with safe fallback.
 * Checks local availability flag, defaulting to working remote fallback
 * to guarantee zero broken images.
 */
export function getDestinationImage(destinationOrId, slot = 'main') {
  if (!destinationOrId) return { src: '', fallback: '', localPath: '' };

  const id = typeof destinationOrId === 'string'
    ? destinationOrId
    : (destinationOrId.id || destinationOrId.slug);

  const entry = ALL_DESTINATION_IMAGE_REGISTRY[id] ||
    Object.values(ALL_DESTINATION_IMAGE_REGISTRY).find(
      e => e.slug === id || e.id === id
    );

  if (!entry) {
    // If not in the registry, fallback to object properties
    const fb = destinationOrId.heroImage || destinationOrId.thumbnail || '';
    return { src: fb, fallback: fb, localPath: '' };
  }

  const localPath = entry.slots[slot] || entry.slots.main;
  const isAvailable = PREFER_LOCAL_ASSETS || LOCAL_DOWNLOAD_STATUS[entry.id] === true;
  const fallback = slot === 'thumbnail' ? entry.thumbnailFallback : entry.fallback;
  const src = isAvailable ? localPath : fallback;

  return {
    src,
    localPath,
    fallback,
    isLocalAvailable: Boolean(isAvailable)
  };
}

/**
 * Returns a 4-photo gallery specification for DestinationDetailPage.
 * Respects standard image names:
 *  - Forts: main, landscape, architecture, details
 *  - Heritage: main, architecture, interiors, details
 *  - Temples: main, templeView, architecture, rituals
 */
export function getDestinationGallery(destinationOrId) {
  if (!destinationOrId) return [];

  const id = typeof destinationOrId === 'string'
    ? destinationOrId
    : (destinationOrId.id || destinationOrId.slug);

  const entry = ALL_DESTINATION_IMAGE_REGISTRY[id] ||
    Object.values(ALL_DESTINATION_IMAGE_REGISTRY).find(
      e => e.slug === id || e.id === id
    );

  if (!entry) return [];

  const isAvailable = PREFER_LOCAL_ASSETS || LOCAL_DOWNLOAD_STATUS[entry.id] === true;

  if (entry.category === 'forts') {
    return [
      {
        slot: 'main',
        label: 'Citadel Main Vista',
        localPath: entry.slots.main,
        fallback: entry.galleryFallbacks.main,
        src: isAvailable ? entry.slots.main : entry.galleryFallbacks.main
      },
      {
        slot: 'landscape',
        label: 'Sahyadri Cloudscape',
        localPath: entry.slots.landscape,
        fallback: entry.galleryFallbacks.landscape,
        src: isAvailable ? entry.slots.landscape : entry.galleryFallbacks.landscape
      },
      {
        slot: 'architecture',
        label: 'Stone Bastions & Gateways',
        localPath: entry.slots.architecture,
        fallback: entry.galleryFallbacks.architecture,
        src: isAvailable ? entry.slots.architecture : entry.galleryFallbacks.architecture
      },
      {
        slot: 'details',
        label: 'Memorials & Inscriptions',
        localPath: entry.slots.details,
        fallback: entry.galleryFallbacks.details,
        src: isAvailable ? entry.slots.details : entry.galleryFallbacks.details
      }
    ];
  }

  if (entry.category === 'heritage') {
    return [
      {
        slot: 'main',
        label: 'Monumental Overview',
        localPath: entry.slots.main,
        fallback: entry.galleryFallbacks.main,
        src: isAvailable ? entry.slots.main : entry.galleryFallbacks.main
      },
      {
        slot: 'architecture',
        label: 'Rock-Cut Facades',
        localPath: entry.slots.architecture,
        fallback: entry.galleryFallbacks.architecture,
        src: isAvailable ? entry.slots.architecture : entry.galleryFallbacks.architecture
      },
      {
        slot: 'interiors',
        label: 'Sanctum & Cave Interiors',
        localPath: entry.slots.interiors,
        fallback: entry.galleryFallbacks.interiors,
        src: isAvailable ? entry.slots.interiors : entry.galleryFallbacks.interiors
      },
      {
        slot: 'details',
        label: 'Ancient Murals & Sculptures',
        localPath: entry.slots.details,
        fallback: entry.galleryFallbacks.details,
        src: isAvailable ? entry.slots.details : entry.galleryFallbacks.details
      }
    ];
  }

  if (entry.category === 'temples') {
    return [
      {
        slot: 'main',
        label: 'Sanctum Darshan',
        localPath: entry.slots.main,
        fallback: entry.galleryFallbacks.main,
        src: isAvailable ? entry.slots.main : entry.galleryFallbacks.main
      },
      {
        slot: 'templeView',
        label: 'Temple Complex & Shikhara',
        localPath: entry.slots.templeView,
        fallback: entry.galleryFallbacks.templeView,
        src: isAvailable ? entry.slots.templeView : entry.galleryFallbacks.templeView
      },
      {
        slot: 'architecture',
        label: 'Hemadpanthi Basalt Carvings',
        localPath: entry.slots.architecture,
        fallback: entry.galleryFallbacks.architecture,
        src: isAvailable ? entry.slots.architecture : entry.galleryFallbacks.architecture
      },
      {
        slot: 'rituals',
        label: 'Sacred Kund & Aarti Rituals',
        localPath: entry.slots.rituals,
        fallback: entry.galleryFallbacks.rituals,
        src: isAvailable ? entry.slots.rituals : entry.galleryFallbacks.rituals
      }
    ];
  }

  return [];
}

/**
 * Resolves a festival image URL with safe fallback.
 */
export function getFestivalImage(festivalOrId, slot = 'main') {
  if (!festivalOrId) return { src: '', fallback: '', localPath: '' };

  const id = typeof festivalOrId === 'string' ? festivalOrId : festivalOrId.id;
  const entry = FESTIVALS_IMAGE_REGISTRY[id];

  if (!entry) {
    const fb = festivalOrId.image || '';
    return { src: fb, fallback: fb, localPath: '' };
  }

  const localPath = entry.slots[slot] || entry.slots.main;
  const isAvailable = PREFER_LOCAL_ASSETS || LOCAL_DOWNLOAD_STATUS[entry.id] === true;
  const fallback = entry.fallback;
  const src = isAvailable ? localPath : fallback;

  return {
    src,
    localPath,
    fallback,
    isLocalAvailable: Boolean(isAvailable)
  };
}

/**
 * Returns a 4-photo gallery specification for Festival Modal / Details.
 * Standard slots: main, celebrations, rituals, decorations.
 */
export function getFestivalGallery(festivalOrId) {
  if (!festivalOrId) return [];

  const id = typeof festivalOrId === 'string' ? festivalOrId : festivalOrId.id;
  const entry = FESTIVALS_IMAGE_REGISTRY[id];

  if (!entry) return [];

  const isAvailable = PREFER_LOCAL_ASSETS || LOCAL_DOWNLOAD_STATUS[entry.id] === true;

  return [
    {
      slot: 'main',
      label: 'Festival Showcase',
      localPath: entry.slots.main,
      fallback: entry.galleryFallbacks.main,
      src: isAvailable ? entry.slots.main : entry.galleryFallbacks.main
    },
    {
      slot: 'celebrations',
      label: 'Dhol Tasha & Celebrations',
      localPath: entry.slots.celebrations,
      fallback: entry.galleryFallbacks.celebrations,
      src: isAvailable ? entry.slots.celebrations : entry.galleryFallbacks.celebrations
    },
    {
      slot: 'rituals',
      label: 'Sacred Rituals & Aarti',
      localPath: entry.slots.rituals,
      fallback: entry.galleryFallbacks.rituals,
      src: isAvailable ? entry.slots.rituals : entry.galleryFallbacks.rituals
    },
    {
      slot: 'decorations',
      label: 'Rangoli & Pandals',
      localPath: entry.slots.decorations,
      fallback: entry.galleryFallbacks.decorations,
      src: isAvailable ? entry.slots.decorations : entry.galleryFallbacks.decorations
    }
  ];
}

/**
 * React onError fallback handler to seamlessly recover if a local image is missing
 */
export function handleImageFallback(fallbackUrl) {
  return (event) => {
    if (fallbackUrl && event.currentTarget.src !== fallbackUrl) {
      event.currentTarget.onerror = null; // Prevent infinite loop
      event.currentTarget.src = fallbackUrl;
    }
  };
}
