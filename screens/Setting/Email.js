import { Container, Content, Text, Button, Grid, Col, Row, H3, View } from 'native-base';
import { ActivityIndicator, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Globals from '../../constants/Globals';
import React, { Component } from 'react';
import axios from 'axios';


class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
      telefono: this.props.navigation.getParam('telefono'),
      nombre: this.props.navigation.getParam('nombre'),
      apellido: this.props.navigation.getParam('apellido'),
      curp: this.props.navigation.getParam('curp'),
      email: this.props.navigation.getParam('correo'),
      id_usuario: this.props.navigation.getParam('id_usuario'),
      foto: this.props.navigation.getParam('foto'),
      loading: false, isConnected: true
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
      this.setState({ loading: true });
    } else {
      Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.', [{ text: 'OK', onPress: () => this.props.navigation.goBack() }]);
    }
  }

  //Método para redireccionar a la pantalla de Email2
  goEmail2 = () => {
    this.props.navigation.navigate('Email2', {
      id_usuario: this.state.id_usuario, nombre: this.state.nombre, apellido: this.state.apellido,
      curp: this.state.curp, telefono: this.state.telefono, foto: this.state.foto
    });
  }

  //Método para enviar el correo de confirmación.
  sendEmailConfirmation = async () => {
    try {
      const res = await axios.post(`${Globals.server}:${Globals.port}/mail`, { correo: this.state.email });
      if (res.status == 200) {
        Alert.alert('Aviso', 'Revisa tu correo, por favor. Te hemos enviado un correo de verificación.');
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
              <Row style={{ marginTop: 90, marginBottom: 10, marginLeft: 20 }}><H3 style={{fontFamily: 'aller-bd'}}>Correo electrónico actual</H3></Row>
              <Row style={{ marginLeft: 20 }}><Text style={{fontFamily: 'aller-lt'}}>{this.state.email}</Text></Row>
              <Row style={{ marginLeft: 20, marginRight: 20, marginTop:12 }}><Text style={{fontFamily: 'aller-lt'}}>Tu correo aún no está verificado. Te hemos enviado un correo de verificacion. ¿Recibiste?</Text></Row>
              <Row><Button transparent onPress={this.sendEmailConfirmation}><Text style={{ color: 'gray', fontFamily: 'aller-lt' }}>Enviar de nuevo correo de verificación</Text></Button></Row>
              <Row style={{ marginTop: 35 }}><Col><Button onPress={this.goEmail2} block style={{ marginLeft: 20, marginRight: 20, backgroundColor: '#ff8834' }}><Text style={{fontFamily: 'aller-bd'}}>Cambiar tu correo electrónico</Text></Button></Col></Row>
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

export default Email;