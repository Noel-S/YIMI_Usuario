import { Container, Content, Text, Input, Button, Grid, Col, Row, H3, View } from 'native-base';
import { Alert, ActivityIndicator } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Globals from '../../constants/Globals';
import React, { Component } from 'react';
import axios from 'axios';

class Phone2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      telefono: '',
      nombre: this.props.navigation.getParam('nombre'),
      apellido: this.props.navigation.getParam('apellido'),
      curp: this.props.navigation.getParam('curp'),
      email: this.props.navigation.getParam('correo'),
      id_usuario: this.props.navigation.getParam('id_usuario'),
      foto: this.props.navigation.getParam('foto'),
      loading: false, isConnected: true, respuesta: ''
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

  //Método para validar el número de teléfono.
  onValidateInput = async () => {
    var validatePhone = /^[0-9]{10}$/;
    if (this.state.telefono.trim() == "") {
      this.setState(() => ({ msgError: "Campo obligatorio" }));
    } else if (!validatePhone.test(this.state.telefono)) {
      this.setState(() => ({ msgError: "Favor de Ingresar 10 dígitos" }));
    } else {
      try {
        const res = await axios.post(`${Globals.server}:${Globals.port}/validar_cuenta`, { campo: this.state.telefono });
        if (res.status == 200) {
          console.log(res.data)
          res.data.data.forEach(element => {
            this.setState({
              respuesta: element["respuesta"]
            })
          });
          if (this.state.respuesta == 0) {
            this.setState(() => ({ msgError: "" }));
            this.sendCode();
          } else {
            this.setState(() => ({ msgError: "Número de Teléfono Existente" }));
          }
        } else {
          Alert.alert('Error', 'Servicio no disponible, intente más tarde.');
        }
      } catch (error) {
        Alert.alert('Sin Conexión', 'Verifique su conexión e intente nuevamente.');
      }
    }
  }

  //Método para enviar código de verificación y redireccionar a la pantalla de Código de Verificación.
  sendCode = async () => {
    try {
      const res = await axios.post(`${Globals.server}:${Globals.port}/get_codigo_validacion`, { telefono: this.state.telefono });
      if (res.status == 200) {
        this.props.navigation.navigate('VerificationCodePhone', {
          id_usuario: this.state.id_usuario, correo: this.state.email, nombre: this.state.nombre, apellido: this.state.apellido,
          curp: this.state.curp, telefono: this.state.telefono, foto: this.state.foto
        });
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
              <Row style={{ marginTop: 90, marginBottom: 10, marginLeft: 20 }}><H3 style={{ fontFamily: 'aller-bd' }}>Cambiar número de teléfono</H3></Row>
              <Row style={{ marginBottom: 15, marginLeft: 20, marginRight: 20 }}><Text style={{ fontFamily: 'aller-lt' }}>Ingrese el  nuevo número de teléfono que usaras en tu cuenta.</Text></Row>
              <Row>
                <Col style={{ marginRight: 20, marginLeft: 20 }}>
                  <Input value={this.state.telefono} onChangeText={telefono => this.setState({ telefono })} style={{ borderBottomWidth: 0.5, fontFamily: 'aller-lt' }} keyboardType='numeric' maxLength={10} placeholder="Ingresa tu número de teléfono" />
                  {!!this.state.msgError && (<Text style={{ color: "red", fontSize: 11, fontFamily: 'aller-lt' }}>{this.state.msgError}</Text>)}
                </Col>
              </Row>
              <Row style={{ marginTop: 35 }}><Col><Button onPress={this.onValidateInput} block style={{ marginLeft: 20, marginRight: 20, backgroundColor: '#ff8834' }}><Text style={{ fontFamily: 'aller-bd' }}>Siguiente</Text></Button></Col></Row>
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

export default Phone2;