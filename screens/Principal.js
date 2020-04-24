import { Text, Button, View } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import React, { Component } from 'react';

class Principal extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button rounded style={{ zIndex: 9, position: 'absolute', top: 40, left: 20, backgroundColor: '#ff8834', borderRadius: 50, width: 40, height: 40 }} onPress={() => this.props.navigation.toggleDrawer()}><Ionicons name='md-menu' color='white' size={32} style={{ marginLeft: 8 }} /></Button>
        <Text style={{ marginTop: 90 }} >Pantalla de Inicioo</Text>
      </View>
    );
  }
}


export default Principal;