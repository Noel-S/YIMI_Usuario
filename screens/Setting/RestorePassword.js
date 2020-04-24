import { Container, Content, Text, Input, Button, Grid, Col, Row, H3 } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { FontAwesome5 } from '@expo/vector-icons';
import Globals from '../../constants/Globals';
import React, { Component } from 'react';
import axios from 'axios';

class RestorePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry1: true,
      respuesta: '',
      contrasena: '',
      id_usuario: this.props.navigation.getParam('id_usuario'),
      telefono: this.props.navigation.getParam('telefono')
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

  //Método para actualizar la contraseña del usuario.
  updatePassword = async () => {
    try {
      const res = await axios.put(`${Globals.server}:${Globals.port}/modificar_contrasena`, { id_usuario: this.state.id_usuario, pass: this.state.contrasena });
      if (res.status == 200) {
        Alert.alert('Aviso', 'Se ha actualizado tu contraseña con éxito!', [{ text: 'OK', onPress: () => this.props.navigation.navigate('PersonalInformation') }]);
      } else {
        Alert.alert('Error', 'Servicio no disponible, intente más tarde.');
      }
    } catch (error) {
      Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.');
    }
  }

  //Método para validar la contraseña.
  onValidateInput = () => {
    var validateContrasena = /^(?=\w*\d)(?=\w*[a-zA-Z])\S{6}$/;

    if (this.state.contrasena.trim() == "") {
      this.setState(() => ({ contrasenaError1: "Ingresa tu contraseña" }));
    } else if (!validateContrasena.test(this.state.contrasena)) {
      this.setState(() => ({ contrasenaError1: "Formato Incorrecto" }));
    } else {
      this.setState(() => ({ contrasenaError1: "" }));
      this.updatePassword();
    }
  }

  //Método para mostrar la contraseña.
  showPass = () => {
    this.setState({
      secureTextEntry1: !this.state.secureTextEntry1
    });
  }

  render() {
    if (this.state.loading == true) {
      return (
        <Container>
          <Content>
            <Grid>
              <Row style={{ marginTop: 90, marginBottom: 10, marginLeft: 20 }}><H3>Configurar Contraseña</H3></Row>
              <Row style={{ marginBottom: 15, marginLeft: 20, marginRight: 20 }}>
                <Text style={{ textAlign: 'justify' }}>Puedes iniciar la sesión de {this.state.telefono} en la app YiMi.</Text>
              </Row>
              <Row>
                <Col style={{ marginLeft: 20, marginRight: 20 }}>
                  <Input value={this.state.contrasena} onChangeText={contrasena => this.setState({ contrasena })} secureTextEntry={this.state.secureTextEntry1} style={{ borderBottomWidth: 0.5 }} placeholder='Contraseña'></Input>
                  {!!this.state.contrasenaError1 && (<Text style={{ color: "red", fontSize: 11, marginLeft: 15 }}>{this.state.contrasenaError1}</Text>)}
                </Col>
                <Col style={{ marginTop: 20, position: 'absolute', marginLeft: 350 }}>
                  <TouchableOpacity onPress={this.showPass} style={{ height: 30 }}>
                    <FontAwesome5 name='eye' size={20} style={{ color: 'gray' }} />
                  </TouchableOpacity>
                </Col>
              </Row>
              <Row>
                <Col style={{ marginTop: 10, marginLeft: 20 }}>
                  <Text onPress={this.sendCode} style={{ fontSize: 14 }}>La contraseña debe ser de 6 dígitos e incluir al menos una letra o un número.</Text>
                </Col>
              </Row>
              <Row style={{ marginTop: 35 }}><Col><Button onPress={this.onValidateInput} block style={{ marginLeft: 20, marginRight: 20, backgroundColor: '#ff8834' }}><Text>Confirmar</Text></Button></Col></Row>
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

export default RestorePassword;