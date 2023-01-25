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
    // getCurrentPosition(success, error, options{})
    Geolocation.getCurrentPosition(
      ({coords}) => {
        setInitialPosition({
          lat: coords.latitude,
          lon: coords.longitude,
        });
        setHasLocation(true);
      },
      err => console.log(err),
      {
        distanceFilter: 100,
        enableHighAccuracy: true,
      },
    );
  }, []);

  return {
    hasLocation,
    initialPosition,
  };
};
