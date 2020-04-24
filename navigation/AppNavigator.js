import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import HamburgerNavigator from './HamburgerNavigator';
import RegistryStack from './RegistryStack';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Login: RegistryStack,
    Main: HamburgerNavigator,
  },
   {
     initialRouteName: 'Login',
   }
  )
);
