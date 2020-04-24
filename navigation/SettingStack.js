/** SETTING */
import Configuracion from '../screens/Setting'
import PersonalInformation from '../screens/Setting/PersonalInformation'

import AddProfilePhoto from '../screens/Setting/AddProfilePhoto'

import Phone from '../screens/Setting/Phone'
import Phone2 from '../screens/Setting/Phone2'
import VerificationCodePhone from '../screens/Setting/VerificationCodePhone'

import Password from '../screens/Setting/Password'
import RestorePassword from '../screens/Setting/RestorePassword'
import VerficationCodePassword from '../screens/Setting/VerificationCodePassword'

import Email from '../screens/Setting/Email'
import Email2 from '../screens/Setting/Email2'
import VerficationCodeEmail from '../screens/Setting/VerficationCodeEmail'

import Social from '../screens/Setting/Social'

import DeleteAccount from '../screens/Setting/DeleteAccount'
import VerificationCodeAccount from '../screens/Setting/VerificationCodeAccount'

import UploadPhoto from '../screens/Setting/UploadPhoto'


import { createStackNavigator } from 'react-navigation-stack';

const SettingStack = createStackNavigator({
    "Configuración": {
        screen: Configuracion,
        navigationOptions:{
            header: null
        }
    },
    PersonalInformation:{
        screen : PersonalInformation,
        navigationOptions: {
          headerTitle:'Información Personal',
          headerTitleStyle: {
            fontFamily: 'aller-bd',
            fontWeight: "200"
          }
        }
      },
      UploadPhoto:{
        screen : UploadPhoto,
        navigationOptions: {
          header:null
        }
      },
      AddProfilePhoto:{
        screen : AddProfilePhoto,
        navigationOptions: {
          headerTransparent:true
        }
      },
      Phone:{
        screen : Phone,
        navigationOptions: {
          headerTransparent:true
        }
      },
      Phone2:{
        screen : Phone2,
        navigationOptions: {
          headerTransparent:true
        }
      },
      VerificationCodePhone:{
        screen : VerificationCodePhone,
        navigationOptions: {
          headerTransparent:true
        }
      },
      Password:{
        screen : Password,
        navigationOptions: {
          headerTransparent:true
        }
      },
      RestorePassword:{
        screen : RestorePassword,
        navigationOptions: {
          headerTransparent:true
        }
      },
      VerficationCodePassword:{
        screen : VerficationCodePassword,
        navigationOptions: {
          headerTransparent:true
        }
      },
      Email:{
        screen : Email,
        navigationOptions: {
          headerTransparent:true
        }
      },
      Email2:{
        screen : Email2,
        navigationOptions: {
          headerTransparent:true
        }
      },
      VerficationCodeEmail:{
        screen : VerficationCodeEmail,
        navigationOptions: {
          headerTransparent:true
        }
      },
      Social:{
        screen : Social,
        navigationOptions: {
          headerTitle:'Cuentas en redes sociales',
          headerTitleStyle: {
            fontFamily: 'aller-bd',
            fontWeight: "200"
          }
        }
      },
      DeleteAccount:{
        screen : DeleteAccount,
        navigationOptions: {
          headerTransparent:true
        }
      },
      VerificationCodeAccount:{
        screen : VerificationCodeAccount,
        navigationOptions: {
          headerTransparent:true
        }
      }
},{headerLayoutPreset:'center'});

export default SettingStack;