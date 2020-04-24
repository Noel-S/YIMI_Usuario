import { Text, View, FlatList, ActivityIndicator, Alert } from 'react-native';
import { ListItem, Left, Body, Icon } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import { FontAwesome5 } from '@expo/vector-icons';
import Globals from '../../constants/Globals';
import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      id_usuario: global.id_usuario,
      array: [],
      nombre: '',
      telefono: '',
      isConnected: true

    };
  }

  //Método para montar la vista.
  componentDidMount() {
    this.checkConnection();
  }

  //Método para desmontar la vista.
  componentWillUnmount() {
    if (this.state.isConnected == true) {
      this.focusListener.remove();
    }
  }

  //Método para verificar la conexión a internet.
  checkConnection = async () => {
    const state = await NetInfo.fetch();
    this.setState({ isConnected: state.isConnected });
    if (this.state.isConnected == true) {
      const { navigation } = this.props;
      this.focusListener = navigation.addListener('didFocus', () => {
        this.getContacts();
      });
    } else {
      Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.', [{ text: 'OK', onPress: () => this.props.navigation.goBack() }]);
    }
  }

  //Método para obtener los contactos de confianza.
  async getContacts() {
    try {
      const res = await axios.post(`${Globals.server}:${Globals.port}/consultar_contacto_confianza`, { id_usuario: this.state.id_usuario });
      if (res.status == 200) {
        res.data.data.forEach(element => {
          this.state.array.push({ 'nombre': element['nombre_contacto_out'], "telefono": element['telefono_out'] });
          this.setState({ isLoading: true });
        })
      } else {
        Alert.alert('Error', 'Servicio no disponible, intente más tarde.');
      }
    } catch (error) {
      Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.');
    }
  }

  //Método para redireccionar a la pantalla de Agregagar Contactos de Confianza.
  goAddContact = () => {
    this.setState({ array: [] });
    this.props.navigation.navigate('AddContact');
  }

  //Renderizar esta vista en el FlatList
  renderItem = ({ item: { nombre, telefono } }) => (
    <View style={{ flex: 1 }}>
      <ListItem avatar>
        <Left>
          <FontAwesome5 name='user-circle' color='#ff8834' size={50} />
        </Left>
        <Body>
          <Text style={{ fontFamily: 'aller-bd' }}>{nombre}</Text>
          <Text style={{ fontFamily: 'aller-lt' }} note>{`${telefono}`}</Text>
        </Body>
      </ListItem>
    </View>
  );


  render() {
    if (this.state.isLoading == true) {
      return (
        <View>
          <FlatList
            data={this.state.array}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                <ActivityIndicator size={45} color="#ff8834" />
              </View>
            )}
            ListFooterComponent={() => (
              <View>
                <ListItem>
                  <Left>
                    <Icon name='md-person-add' style={{ fontSize: 20 }} />
                    <Text onPress={this.goAddContact} style={{ fontSize: 15, fontFamily: 'aller-bd' }}>   Agregar contactos de confianza</Text>
                  </Left>
                </ListItem>
              </View>
            )}
          />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
          <ActivityIndicator size='large' color="#ff8834" />
        </View>
      );
    }
  }
}
