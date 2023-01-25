import {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {Location} from '../interfaces/appInterfaces';

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Location>({
    lat: 0,
    lon: 0,
  });

  // Obtener coordenadas del dispositivo
  useEffect(() => {
    getCurrentLocation().then(location => {
      setInitialPosition(location);
      setHasLocation(true);
    });
  }, []);

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      // getCurrentPosition(success, error, options{})
      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve({
            lat: coords.latitude,
            lon: coords.longitude,
          });
        },
        err => reject({err}),
        {
          distanceFilter: 100,
          enableHighAccuracy: true,
        },
      );
    });
  };

  return {
    hasLocation,
    initialPosition,
    getCurrentLocation,
  };
};
