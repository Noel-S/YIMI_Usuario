import { Container, Content, Text, Button, Grid, Col, Row, H3, View } from 'native-base';
import CodeInput from 'react-native-confirmation-code-input';
import { ActivityIndicator, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Globals from '../../constants/Globals';
import React, { Component } from 'react';
import axios from 'axios';

class VerificationCodePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      telefono: this.props.navigation.getParam('telefono'),
      id_usuario: this.props.navigation.getParam('id_usuario'),
      error: '', code: '', loading: false, isConnected: true
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

  //Método para validar el código ingresado.
  validateCode = async () => {
    try {
      const res = await axios.post(`${Globals.server}:${Globals.port}/validar_codigo`, { telefono: this.state.telefono, codigo: this.state.code });

      if (res.status == 200) {
        if (res.data.respuesta == 0) {
          this.refs.codeInputRef1.clear();
          this.setState({ error: 'El código de verificación es incorrecto' });
        } else {
          this.refs.codeInputRef1.clear();
          this.props.navigation.navigate('RestorePassword',{id_usuario: this.state.id_usuario, telefono: this.state.telefono});
        }
      } else {
        Alert.alert('Error', 'Servicio no disponible, intente más tarde.');
      }
    } catch (error) {
      Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.');
    }
  }

  //Método para enviar código de verificación y redireccionar a la pantalla de Configurar Mi Nueva Contraseña.
  sendCode = async () =>  {
    try {
      const res = await axios.post(`${Globals.server}:${Globals.port}/get_codigo_validacion`, { telefono: this.state.telefono });
      if (res.status == 200) {
        Alert.alert('Aviso', 'Se ha enviado un nuevo código de verificación');
      } else {
        Alert.alert('Error', 'Servicio no disponible, intente más tarde.');
      }
    } catch (error) {
      Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.');
    }
  }

  //Método que recibe el código ingresado.
  _code(code) {
    if (code != '') {
      this.setState({ code: code });
    } else {
      this.setState({ error: 'Ingrese todos los campos' })
    }
  }

  render() {
    if (this.state.loading == true) {
      return (
        <Container>
          <Content>
            <Grid>
              <Row style={{ marginTop: 90, marginBottom: 10, marginLeft: 10 }}><H3 style={{fontFamily: 'aller-bd' }}>Código de verificación</H3></Row>
              <Row style={{ marginBottom: 50, marginLeft: 10 }}><Text style={{fontFamily: 'aller-lt' }}>El código de verificación se ha enviado al: {this.state.telefono}</Text></Row>
              <Row style={{ marginBottom: 10, marginLeft: 10 }}><Text style={{fontFamily: 'aller-lt' }}>Ingrese el código de 6 dígitos:</Text></Row>
              <Row>
                <Col>
                  <CodeInput
                    ref="codeInputRef1"
                    codeLength={6}
                    className={'border-b'}
                    space={3}
                    size={30}
                    activeColor='rgba(0, 0, 0, 1)'
                    inactiveColor='rgba(0, 0, 0, 0.5)'
                    inputPosition='full-width'
                    keyboardType='numeric'
                    style={{ marginLeft: 10, marginRight: 10, width: 45, borderBottomWidth: 2, textAlign: 'center', fontSize: 25, fontFamily: 'aller-lt'  }}
                    onFulfill={(code) => this._code(code)}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <Col><Button transparent onPress={this.sendCode}><Text style={{ color: 'black', fontFamily: 'aller-lt'  }}>No recibí el código ></Text></Button></Col>
                <Col style={{ marginTop: 15 }}><Text style={{ color: "red", fontSize: 11, fontFamily: 'aller-lt' }}>{this.state.error}{this.state.nameError}</Text></Col>
              </Row>
              <Row style={{ marginTop: 40 }}>
                <Col style={{ display: 'flex', alignContent: 'center', alignItems: 'center', marginLeft: 85, marginRight: 85 }}>
                  <Button onPress={this.validateCode} block style={{ backgroundColor: '#ff8834' }}><Text style={{fontFamily: 'aller-bd' }}>Siguiente</Text></Button>
                </Col>
              </Row>
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

export default VerificationCodePassword;