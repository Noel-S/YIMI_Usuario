import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import SecurityStack from './SecurityStack';
import SettingStack from './SettingStack';
import PaymentStack from './PaymentStack';
import StartStack from './StartStack';
import { Dimensions } from 'react-native';
import MenuDrawer from './MenuDrawer';
import React  from 'react';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
    drawerWidth: WIDTH*0.83,
    contentComponent: ({ navigation }) =>{
        return (<MenuDrawer navigation={navigation}/>)
    }
}

const DrawerNavigator = createDrawerNavigator({
    StartStack,
    PaymentStack,
    SecurityStack,
    SettingStack,     
}, DrawerConfig);


export default createAppContainer(DrawerNavigator)