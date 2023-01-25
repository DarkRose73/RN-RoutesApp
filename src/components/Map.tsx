import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../screens/LoadingScreen';
import {FAB} from './FAB';

interface Props {
  markers?: (typeof Marker)[];
}

export const Map = ({markers}: Props) => {
  const {hasLocation, initialPosition} = useLocation();

  if (!hasLocation) {
    // Espere mientras se carga la geolocalizacion
    return <LoadingScreen />;
  }

  return (
    <>
      <MapView
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
        iconName="star-outline"
        onPress={() => {}}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
      />
    </>
  );
};
