
import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, Clock, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MeesevaCenter {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  distance: number;
  lat: number;
  lng: number;
}

const MeesevaCenterLocator: React.FC = () => {
  const { t } = useLanguage();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [centers, setCenters] = useState<MeesevaCenter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationDenied, setLocationDenied] = useState(false);

  // Mock data for demonstration - will be replaced with actual API
  const mockCenters: MeesevaCenter[] = [
    {
      id: '1',
      name: 'Meeseva Center - Hyderabad Central',
      address: 'Tank Bund Road, Domalguda, Hyderabad, Telangana 500029',
      phone: '+91-40-2345-6789',
      hours: '9:00 AM - 5:00 PM',
      distance: 2.3,
      lat: 17.4239,
      lng: 78.4738
    },
    {
      id: '2',
      name: 'Meeseva Center - Secunderabad',
      address: 'SP Road, Secunderabad, Telangana 500003',
      phone: '+91-40-2765-4321',
      hours: '9:00 AM - 5:00 PM',
      distance: 4.7,
      lat: 17.4399,
      lng: 78.4983
    },
    {
      id: '3',
      name: 'Meeseva Center - Kukatpally',
      address: 'KPHB Colony, Kukatpally, Hyderabad, Telangana 500072',
      phone: '+91-40-2987-6543',
      hours: '9:00 AM - 5:00 PM',
      distance: 8.1,
      lat: 17.4847,
      lng: 78.4138
    }
  ];

  const requestLocation = () => {
    setLoading(true);
    setError(null);
    setLocationDenied(false);

    if (!navigator.geolocation) {
      setError(t('meeseva.noGeolocation'));
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        fetchNearbyCenters(location);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLocationDenied(true);
        setError(t('meeseva.locationDenied'));
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const fetchNearbyCenters = async (location: { lat: number; lng: number }) => {
    try {
      // Mock API call - replace with actual API
      // const response = await fetch(`https://api.gov/meeseva-locator?lat=${location.lat}&lng=${location.lng}`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Calculate distances and sort by proximity
      const centersWithDistance = mockCenters
        .map(center => ({
          ...center,
          distance: calculateDistance(location.lat, location.lng, center.lat, center.lng)
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5); // Show top 5 nearest centers

      setCenters(centersWithDistance);
      setLoading(false);
    } catch (err) {
      setError(t('meeseva.fetchError'));
      setLoading(false);
    }
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round((R * c) * 10) / 10; // Round to 1 decimal place
  };

  const openDirections = (center: MeesevaCenter) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}&travelmode=driving`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="bg-[#44646f] bg-opacity-10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <MapPin size={40} className="text-[#44646f]" />
          </div>
          <h2 className="text-2xl font-bold text-[#3c392b] mb-4">
            {t('meeseva.title')}
          </h2>
          <p className="text-[#5d5c54] mb-6">
            {t('meeseva.subtitle')}
          </p>

          {!userLocation && !locationDenied && (
            <button
              onClick={requestLocation}
              disabled={loading}
              className="bg-[#44646f] text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 flex items-center space-x-2 mx-auto"
            >
              <Navigation size={20} />
              <span>{loading ? t('meeseva.locating') : t('meeseva.findNearby')}</span>
            </button>
          )}

          {locationDenied && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 text-red-700">
                <AlertCircle size={20} />
                <p className="font-medium">{error}</p>
              </div>
              <button
                onClick={requestLocation}
                className="mt-3 bg-[#44646f] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                {t('meeseva.tryAgain')}
              </button>
            </div>
          )}
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#44646f]"></div>
            <p className="mt-2 text-[#5d5c54]">{t('meeseva.searching')}</p>
          </div>
        )}

        {centers.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#3c392b] mb-4">
              {t('meeseva.nearbycenters')} ({centers.length})
            </h3>
            
            {centers.map((center) => (
              <div key={center.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-[#3c392b] mb-2">
                      {center.name}
                    </h4>
                    <div className="space-y-2 text-sm text-[#5d5c54]">
                      <div className="flex items-start space-x-2">
                        <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                        <span>{center.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone size={16} />
                        <span>{center.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={16} />
                        <span>{center.hours}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="bg-[#44646f] text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
                      {center.distance} km
                    </div>
                    <button
                      onClick={() => openDirections(center)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center space-x-1"
                    >
                      <Navigation size={16} />
                      <span>{t('meeseva.directions')}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {userLocation && centers.length === 0 && !loading && (
          <div className="text-center py-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <AlertCircle size={48} className="text-yellow-600 mx-auto mb-4" />
              <p className="text-[#5d5c54]">{t('meeseva.noCenters')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeesevaCenterLocator;
