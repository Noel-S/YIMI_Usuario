/** HOME SCREEN */
import Principal from '../screens/Principal';


import { createStackNavigator } from 'react-navigation-stack';

const StartStack = createStackNavigator({
    Principal:{
        screen: Principal,
        navigationOptions:{
            header: null
        }
    }
}, { headerLayoutPreset: 'center' });

export default StartStack;