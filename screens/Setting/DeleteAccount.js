import { Container, Content, Text, Button, Grid, Col, Row, H3, View } from 'native-base';
import { ActivityIndicator, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Globals from '../../constants/Globals';
import React, { Component } from 'react';
import axios from 'axios';

class DeleteAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_usuario: this.props.navigation.getParam('id_usuario'),
      telefono: this.props.navigation.getParam('telefono'),
      loading: false, isConnected: true
    }
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
      this.setState({ loading: true });
    } else {
      Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.', [{ text: 'OK', onPress: () => this.props.navigation.goBack() }]);
    }
  }

  //Método para enviar código de verificación y redireccionar a la pantalla de Código de Verificación.
  sendCode = async () => {
    try {
      const res = await axios.post(`${Globals.server}:${Globals.port}/get_codigo_validacion`, { telefono: this.state.telefono });
      if (res.status == 200) {
        Alert.alert('Aviso', 'Esto significa que se eliminarán todos los datos', [{ text: 'Cancelar' }, { text: 'Eliminar Cuenta', onPress: () => this.props.navigation.navigate('VerificationCodeAccount', { id_usuario: this.state.id_usuario, telefono: this.state.telefono }) }]);
      } else {
        Alert.alert('Error', 'Servicio no disponible, intente más tarde.');
      }
    } catch (error) {
      Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.');
    }
  }

  render() {
    if (this.state.loading == true) {
      return (
        <Container>
          <Content>
            <Grid>
              <Row style={{ marginTop: 90, marginBottom: 10, marginLeft: 20 }}><H3 style={{ fontFamily: 'aller-bd' }}>Eliminar cuenta actual</H3></Row>
              <Row style={{ marginBottom: 30, marginLeft: 20 }}><Text style={{ fontFamily: 'aller-lt' }}>Eliminar cuenta vinculada a: {this.state.telefono}</Text></Row>
              <Row style={{ marginLeft: 20 }}><Text style={{ fontFamily: 'aller-lt' }}>Se eliminará la siguiente información y no se podrá recuperar:</Text></Row>
              <Row style={{ marginTop: 5, marginLeft: 20 }}><Text style={{ fontFamily: 'aller-lt' }}>* Información de viajes.</Text></Row>
              <Row style={{ marginLeft: 20 }}><Text style={{ fontFamily: 'aller-lt' }}>* Información de facturas, cupones, etc.</Text></Row>
              <Row style={{ marginLeft: 20 }}><Text style={{ fontFamily: 'aller-lt' }}>* Información personal.</Text></Row>
              <Row style={{ marginTop: 35 }}><Col><Button onPress={this.sendCode} block danger style={{ marginLeft: 20, marginRight: 20, fontFamily: 'aller-lt' }}><Text>Eliminar Cuenta</Text></Button></Col></Row>
            </Grid>
          </Content>
        </Container>
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

export default DeleteAccount;