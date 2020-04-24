import { StyleSheet, Text, View, TextInput, SafeAreaView, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Root, ListItem, Left, Body, Right, Radio, ActionSheet } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import { FontAwesome5 } from '@expo/vector-icons';
import Globals from '../../constants/Globals';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';
import React from 'react';
import axios from 'axios';

var BUTTONS = [
  { text: "Agregar Contacto", icon: "md-add-circle-outline", iconColor: "green" },
  { text: "Cancelar", icon: "close", iconColor: "red" }
];
var nombreC = '';
var phoneC = '';

export default class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      id_usuario: global.id_usuario,
      selected: -1,
      nombre: '',
      telefono: '',
      contacts: []
    };
  }

  //Método para montar la vista.
  componentDidMount() {
    this.checkConnection();
  }

  //Método para verificar la conexión a internet.
  checkConnection = async () => {
    const state = await NetInfo.fetch();
    this.setState({ isConnected: state.isConnected });
    if (this.state.isConnected == true) {
      this.setState({ isLoading: true });
      this.loadContacts();

    } else {
      Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.', [{ text: 'OK', onPress: () => this.props.navigation.goBack() }]);
    }
  }

  //Método para pedir el permiso de acceder a los contactos o obtener una lista.
  loadContacts = async () => {
    const permission = await Permissions.askAsync(
      Permissions.CONTACTS
    );

    if (permission.status !== 'granted') {
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers]
    });

    this.setState({ contacts: data, inMemoryContacts: data, isLoading: false });
  }

  //Método para seleccionar el contacto a través del id.
  handleClick(index, id) {
    var item = this.state.contacts.find(item => item.id === id);
    this.setState({ selected: index });
    nombreC = item.firstName;
    phoneC = item.phoneNumbers.map(entry => entry.number)[0].replace(/ /g, "");
    console.log(phoneC)
  }

  //Método para agregar al contacto de confianza.
  addContact = async () => {
    try {
      const res = await axios.post(`${Globals.server}:${Globals.port}/registrar_contacto_confianza`, { nombre_contacto: nombreC, num_telefono: phoneC, id_usuario: this.state.id_usuario });
      if (res.status == 200) {
        this.setState({ selected: -1 });
        Alert.alert('Aviso', `Has añadido a: ${nombreC} como tu contacto de confianza.`,[{text: 'OK', onPress: () => this.props.navigation.navigate('ListContact')}]);
      } else {
        Alert.alert('Error', 'Servicio no disponible, intente más tarde.');
      }
    } catch (error) {
      Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.');
    }
  }

  //Método para buscar contactos.
  searchContacts = value => {
    const filteredContacts = this.state.inMemoryContacts.filter(contact => {
      let contactLowercase = (
        contact.firstName +
        ' ' +
        contact.lastName
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ contacts: filteredContacts });
  }

  //Rederizar esta vista en el FlatList.
  renderItem = ({ item: { firstName, phoneNumbers, id }, index }) => (
    <Root>
      <View style={{ flex: 1 }}>
        <ListItem avatar>
          <Left>
            <FontAwesome5 name='user-circle' color='#ff8834' size={50} />
            {/*<Thumbnail source={{ uri: 'https://www.webespacio.com/wp-content/uploads/2010/12/perfil-facebook.jpg' }} />*/}
          </Left>
          <Body>
            <Text style={{ fontFamily: 'aller-bd' }}>{firstName} </Text>
            <Text style={{ fontFamily: 'aller-lt' }} note> {`${phoneNumbers ? phoneNumbers.map(entry => entry.number)[0] : ""}`}</Text>
          </Body>
          <Right style={{ alignSelf: 'flex-start' }}>
            <Radio style={{ height: 50, width: 50 }} selectedColor='#ff8834' onPress={() => {
              this.handleClick(index, id/*, firstName, phoneNumbers ? phoneNumbers.map(entry => entry.number)[0] : ""*/);
              ActionSheet.show(
                {
                  options: BUTTONS
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    this.addContact();
                  } else {
                    this.setState({ selected: -1 });
                  }
                }
              );
            }} selected={this.state.selected == index} style={{ paddingRight: 5, marginTop: 15 }} />
          </Right>
        </ListItem>
      </View>
    </Root>
  );

  getItemLayout = (data, index) => (
    { length: 80, offset: 80 * index, index }
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ backgroundColor: 'white' }} />
        <TextInput
          placeholder="Buscar"
          placeholderTextColor="#ff8834"
          style={{
            marginTop: 2,
            backgroundColor: 'white',
            height: 50,
            fontSize: 20,
            padding: 10,
            color: 'black',
            borderBottomWidth: 0.5,
            borderBottomColor: '#7d90a0',
            fontFamily: 'aller-bd'

          }}
          onChangeText={value => this.searchContacts(value)}
        />
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          {this.state.isLoading ? (
            <View
              style={{
                ...StyleSheet.absoluteFill,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ActivityIndicator size="large" color="#ff8834" />
            </View>
          ) : null}
          <View>
            <FlatList
              data={this.state.contacts}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              disableVirtualization={false}
              getItemLayout={this.getItemLayout}
              initialNumToRender={1}
              maxToRenderPerBatch={10}
              windowSize={10}
            />
          </View>
        </View>
      </View>
    );
  }
}
