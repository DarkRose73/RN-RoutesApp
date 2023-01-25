import React, {useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../screens/LoadingScreen';
import {FAB} from './FAB';

interface Props {
  markers?: (typeof Marker)[];
}

export const Map = ({markers}: Props) => {
  const {hasLocation, initialPosition, getCurrentLocation} = useLocation();

  const mapViewRef = useRef<MapView>();

  const centerPosition = async () => {
    const {lat, lon} = await getCurrentLocation();
    mapViewRef.current?.animateCamera({
      center: {
        latitude: lat,
        longitude: lon,
      },
    });
  };

  if (!hasLocation) {
    // Espere mientras se carga la geolocalizacion
    return <LoadingScreen />;
  }

  return (
    <>
      <MapView
        ref={el => (mapViewRef.current = el!)}
        style={{flex: 1}}
        showsUserLocation
        initialRegion={{
          latitude: initialPosition.lat,
          longitude: initialPosition.lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {/* <Marker
          image={require('../assets/custom-marker.png')}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="Title"
          description="Description"
        /> */}
      </MapView>
      <FAB
        iconName="compass-outline"
        onPress={centerPosition}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
      />
    </>
  );
};
