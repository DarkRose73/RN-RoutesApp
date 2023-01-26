import {useEffect, useRef, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {Location} from '../interfaces/appInterfaces';
import {LatLng} from 'react-native-maps';

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);

  const [initialPosition, setInitialPosition] = useState<Location>({
    lat: 0,
    lon: 0,
  });

  const [userLocation, setUserLocation] = useState<Location>({
    lat: 0,
    lon: 0,
  });

  const [routeLines, setRouteLines] = useState<LatLng[]>([]);

  const watchId = useRef<number>();

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Obtener coordenadas del dispositivo
  useEffect(() => {
    getCurrentLocation().then(location => {
      if (!isMounted) return;
      setInitialPosition(location);
      setUserLocation(location);
      setRouteLines(routeLines => [
        ...routeLines,
        {latitude: location.lat, longitude: location.lon},
      ]);
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

  const followUserLocation = () => {
    watchId.current = Geolocation.watchPosition(
      ({coords}) => {
        if (!isMounted) return;

        const location: Location = {
          lat: coords.latitude,
          lon: coords.longitude,
        };

        setUserLocation(location);
        setRouteLines(routeLines => [
          ...routeLines,
          {latitude: location.lat, longitude: location.lon},
        ]);
      },
      err => {},
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
      },
    );
  };

  const stopFollowUserLocation = () => {
    if (watchId.current) Geolocation.clearWatch(watchId.current);
  };

  return {
    hasLocation,
    initialPosition,
    userLocation,
    routeLines,
    getCurrentLocation,
    followUserLocation,
    stopFollowUserLocation,
  };
};
