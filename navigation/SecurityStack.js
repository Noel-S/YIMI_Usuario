/** SECURITY CENTER */
import CentroSeguridad from '../screens/Security';
import Contact from '../screens/Security/Contact'
import AddContact from '../screens/Security/AddContact'
import ListContact from '../screens/Security/ListContact'


import { createStackNavigator } from 'react-navigation-stack';

const SettingStack = createStackNavigator({
    "Centro de Seguridad": {
        screen: CentroSeguridad
    },
    Contact: {
        screen: Contact,
        navigationOptions: {
            headerTitle: 'Contacto de Confianza',
            headerTitleStyle: {
                fontFamily: 'aller-bd',
                fontWeight: "200"
            }
        }
    },
    AddContact: {
        screen: AddContact,
        navigationOptions: {
            headerTitle: 'Contactos',
            headerTitleStyle: {
                fontFamily: 'aller-bd',
                fontWeight: "200"
            }
        }
    },
    ListContact: {
        screen: ListContact,
        navigationOptions: {
            headerTitle: 'Contactos de Confianza',
            headerTitleStyle: {
                fontFamily: 'aller-bd',
                fontWeight: "200"
            }
        }
    }
}, { headerLayoutPreset: 'center' });

export default SettingStack;