/** PAYMENT */
import Pago from '../screens/Payment';
import Cash from '../screens/Payment/Cash'
import Card from '../screens/Payment/Card'
import PaymentInformation from '../screens/Payment/PaymentInformation'


import { createStackNavigator } from 'react-navigation-stack';

const PaymentStack = createStackNavigator({
    Pago:{
        screen: Pago,
        navigationOptions:{
            header: null
        }
    },
    Cash: {
        screen: Cash,
        navigationOptions: {
            headerTitle: 'Pago en efectivo',
            headerTitleStyle: {
                fontFamily: 'aller-bd',
                fontWeight: "200"
            }
        }
    },
    Card: {
        screen: Card,
        navigationOptions: {
            headerTitle: 'Agregar Tarjeta',
            headerTitleStyle: {
                fontFamily: 'aller-bd',
                fontWeight: "200"
            }
        }
    },
    PaymentInformation: {
        screen: PaymentInformation,
        navigationOptions: {
            headerTitle: 'Información de Pago',
            headerTitleStyle: {
                fontFamily: 'aller-bd',
                fontWeight: "200"
            }
        }
    }
}, { headerLayoutPreset: 'center' });

export default PaymentStack;