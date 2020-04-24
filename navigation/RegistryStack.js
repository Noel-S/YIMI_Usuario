import Login from '../screens/Registry/Login'

import VerificationCode from '../screens/Registry/VerificationCode'
import VerificationCodeAPI from '../screens/Registry/VerificationCodeAPI'

import AddPersonalInformation from '../screens/Registry/AddPersonalInformation'
import AddPersonalInformationAPI from '../screens/Registry/AddPersonalInformationAPI'

import AddPassword from '../screens/Registry/AddPassword'

import Legal from '../screens/Registry/Policy/Legal'
import Privacy from '../screens/Registry/Policy/Privacy'
import Terms from '../screens/Registry/Policy/Terms'
import TermsAndConditions from '../screens/Registry/Policy/TermsAndConditions'
import NoticeOfPrivacy from '../screens/Registry/Policy/NoticeOfPrivacy'


import { createStackNavigator } from 'react-navigation-stack';

const RegistryStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  VerificationCode: {
    screen: VerificationCode,
    navigationOptions: {
      headerTransparent: true,
    }
  },
  VerificationCodeAPI: {
    screen: VerificationCodeAPI,
    navigationOptions: {
      headerTransparent: true
    }
  },
  AddPersonalInformation: {
    screen: AddPersonalInformation,
    navigationOptions: {
      headerTransparent: true
    }
  },
  AddPersonalInformationAPI: {
    screen: AddPersonalInformationAPI,
    navigationOptions: {
      headerTransparent: true
    }
  },
  AddPassword: {
    screen: AddPassword,
    navigationOptions: {
      headerTransparent: true
    }
  },
  Legal: {
    screen: Legal,
    navigationOptions: {
      header: null
    }
  },
  Privacy: {
    screen: NoticeOfPrivacy,
    navigationOptions: {
      header: null
    }
  },
  Terms: {
    screen: TermsAndConditions,
    navigationOptions: {
      header: null
    }
  },
},
  {
    initialRouteName: 'Login',
  }
);

export default RegistryStack;