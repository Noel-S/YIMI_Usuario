import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

/*
const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('No se pudo obtener el permiso para mostrar notificaciónes!');
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync();
      console.log('token:', token);
    } else {
      alert('Debes usar un dispositivo real para usar las notificaciones.');
    }
  };

  Notifications.createCategoryAsync('aprove', [
    {
      actionId: 'aprove',
      buttonTitle: 'Aceptar',
    },
    {
      actionId: 'cancel',
      buttonTitle: 'Cancelar',
    },
  ]);

  Notifications.addListener( notification => {
    // console.log(notification);
    const { actionId, data } = notification;
    if (actionId != null) {
      if (actionId == 'aprove') {
        console.log('Notificación aprobada.')
      }
    }
    if (data.accepted) {
      // actualizar agregar a los conductores ddel propietario.
      
    }
  });
*/
  async function loadResourcesAsync() {
    await Promise.all([
      Asset.loadAsync([
        require('../assets/images/robot-dev.png'),
        require('../assets/images/robot-prod.png'), 
      ]),
      Font.loadAsync({
        ...FontAwesome.font,
        'aller-lt': require('../assets/fonts/Aller_Lt.ttf'),
        'aller-rg': require('../assets/fonts/Aller_Rg.ttf'),
        'aller-bd': require('../assets/fonts/Aller_Bd.ttf'),
        Roboto: require('../assets/fonts/Aller_Lt.ttf'),
        Roboto_medium: require('../assets/fonts/Aller_Bd.ttf')
      }),
    ]);
  }
  
  function handleLoadingError(error) {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
  }
  
  function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
  }

  // const enviarNotificacionLocal = async (title, body) => {
//   // let notificationId = 
//   await Notifications.presentLocalNotificationAsync({
//     title: title,
//     body: body,
//     data: {
//       id: '1',
//     },
//     android: {
//       sound: true,
//     },
//     ios: {
//       sound: true,
//     },
//     // categoryId: 'aprove',
//   });
//   // console.log(notificationId); // can be saved in AsyncStorage or send to server
// };

// const enviarNotificacionLocalAprobar = async (title, body) => {
//   await Notifications.presentLocalNotificationAsync({
//     title: title,
//     body: body,
//     data: {
//       id_propietario: 2,
//       id_chofer: 3,
//       respuesta: true
//     },
//     android: {
//       sound: true,
//     },
//     ios: {
//       sound: true,
//     },
//     categoryId: 'aprove',
//   });
//   // console.log(notificacion); // can be saved in AsyncStorage or send to server
// };

  module.exports = {
    //registerForPushNotificationsAsync,
    loadResourcesAsync,
    handleLoadingError,
    handleFinishLoading
  }