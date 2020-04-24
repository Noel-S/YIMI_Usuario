import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, View, Alert, YellowBox } from 'react-native';
import NetInfo from '@react-native-community/netinfo';


import AppNavigator from './navigation/AppNavigator';

import Globals from './constants/Globals';
import Boot from './start/Boot'

/*
console.ignoredYellowBox = ['Remote debugger'];
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
*/

//const socket = io.connect(`${Globals.server}:3001/`);

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      Alert.alert('Sin conexión', 'Verifique su conexión e intente nuevamente.')
    }
  });
  
  //Boot.registerForPushNotificationsAsync();
  
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={Boot.loadResourcesAsync}
        onError={Boot.handleLoadingError}
        onFinish={() => Boot.handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    // enviarNotificacionLocal('Listo', 'Se inicio la aplicación');
    // enviarNotificacionLocalAprobar('Listo', 'Se inicio la aplicación');
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ff8834" barStyle="dark-content-content" />
        <AppNavigator screenProps={{ id_propietario: 0, rol: 0 }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
