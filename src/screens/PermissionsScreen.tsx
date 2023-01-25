import {View, Text, StyleSheet, Button} from 'react-native';
import React, {useContext} from 'react';
import {PermissionsContext} from '../contexts/PermissionsContext';
import {BlackButton} from '../components/BlackButton';

export const PermissionsScreen = () => {
  const {permissions, askLocationPermission} = useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This app uses GPS to work</Text>
      <BlackButton onPress={askLocationPermission} title="Grant permission" />

      <Text style={{marginTop: 20}}>
        {JSON.stringify(permissions, null, 5)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});
