import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useEffect} from 'react';

interface Props {
  markers?: (typeof Marker)[];
}

export const Map = ({markers}: Props) => {
  useEffect(() => {
    // getCurrentPosition(success, error, options{})
    Geolocation.getCurrentPosition(
      info => console.log(info),
      err => console.log(err),
      {
        distanceFilter: 100,
        enableHighAccuracy: true,
      },
    );
  }, []);

  return (
    <>
      <MapView
        style={{flex: 1}}
        showsUserLocation
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
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
    </>
  );
};
