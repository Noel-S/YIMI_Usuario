import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons'
import { View, Button} from 'native-base';

class Menu extends Component {
    render() {
    return (
        <Button rounded style={{zIndex: 9, position: 'absolute', top: 40, left: 20, backgroundColor:'#ff8834', borderRadius:50, width:40, height:40}} onPress={()=>this.props.navigation.toggleDrawer()}><Ionicons name='md-menu' color='white' size={32} style={{marginLeft: 8}} /></Button>
        
        );
  }
}

export default Menu